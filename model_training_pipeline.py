# model_training_pipeline.py - INTELLIGENT MODEL SELECTION VERSION
import os
import sys
import pandas as pd
import numpy as np
import pickle
import json
import logging
from datetime import datetime, timedelta
import hashlib
import sqlite3
from pathlib import Path
import threading
import time
import schedule

# ML Libraries
from statsmodels.tsa.arima.model import ARIMA
import xgboost as xgb
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

# # Setup logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(levelname)s - %(message)s',
#     handlers=[
#         logging.FileHandler('pipeline.log'),
#         logging.StreamHandler()
#     ]
# )
# Set your desired log directory
log_dir = "D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/backend automated reports/pipelogs files"
os.makedirs(log_dir, exist_ok=True)
log_file_path = os.path.join(log_dir, "pipeline.log")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file_path),
        logging.StreamHandler()
    ]
)

class ModelTrainingPipeline:
    def __init__(self, data_path='D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/data/processed/cleaned_merged.csv', 
                 models_dir='D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/models/cpu_forecasting_models', 
                 users_models_dir='D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/models/users_active_forecasting_models',
                 storage_models_dir='D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/models/storage_forecasting_models',
                 performance_db='model_performance.db'):
        
        self.data_path = data_path
        self.models_dir = Path(models_dir)
        self.users_models_dir = Path(users_models_dir)
        self.storage_models_dir = Path(storage_models_dir)
        self.performance_db = performance_db
        



        # All available model types to test
        self.ALL_MODEL_TYPES = ['ARIMA', 'XGBoost', 'LSTM']
        
        # Current best model configuration (will be updated automatically)
        self.CPU_MODELS = {
            'East US': 'LSTM',
            'North Europe': 'ARIMA', 
            'Southeast Asia': 'LSTM',
            'West US': 'LSTM'
        }
        
        self.USERS_MODELS = {
            'East US': 'LSTM',
            'North Europe': 'XGBoost',
            'Southeast Asia': 'ARIMA', 
            'West US': 'XGBoost'
        }

        # NEW: Storage usage models configuration
        self.STORAGE_MODELS = {
            'East US': 'LSTM',
            'North Europe': 'XGBoost', 
            'Southeast Asia': 'ARIMA',
            'West US': 'LSTM'
          }
        
        self.init_database()
        logging.info("🤖 Intelligent Model Training Pipeline initialized")
        logging.info("📊 Will train ALL model types and select the best performing ones")

    def init_database(self):
        """Initialize performance tracking database"""
        conn = sqlite3.connect(self.performance_db)
        cursor = conn.cursor()
        
        # Create tables for tracking model performance
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS model_performance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                model_type TEXT,
                metric_type TEXT,
                region TEXT,
                rmse REAL,
                mae REAL,
                mape REAL,
                training_date TIMESTAMP,
                data_hash TEXT,
                data_size INTEGER,
                is_active BOOLEAN DEFAULT 0
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS data_monitoring (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                check_date TIMESTAMP,
                data_hash TEXT,
                data_size INTEGER,
                new_records INTEGER,
                training_triggered BOOLEAN
            )
        ''')

        cursor.execute('''
             CREATE TABLE IF NOT EXISTS best_model (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  region TEXT,
                  metric_type TEXT,
                  model_type TEXT,
                  rmse REAL,
                  mae REAL,
                  mape REAL,
                  updated_date TIMESTAMP
                )
        ''')

        
        conn.commit()
        conn.close()

    def calculate_data_hash(self, df):
        """Calculate hash of dataset for change detection"""
        return hashlib.md5(pd.util.hash_pandas_object(df, index=True).values).hexdigest()

    def check_data_changes(self, threshold_percent=5, force_training=False):
        """Check if dataset has changed significantly"""
        try:
            # Load current data
            df = pd.read_csv(self.data_path, parse_dates=['date'])
            current_hash = self.calculate_data_hash(df)
            current_size = len(df)
            
            # Get last check from database
            conn = sqlite3.connect(self.performance_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT data_hash, data_size FROM data_monitoring 
                ORDER BY check_date DESC LIMIT 1
            ''')
            
            last_check = cursor.fetchone()
            
            if last_check is None:
                # First run - record baseline
                new_records = current_size
                percent_change = 100.0  # First run = 100% change
                training_needed = True
            else:
                last_hash, last_size = last_check
                
                # Handle edge cases for last_size
                if last_size is None or last_size == 0:
                    last_size = 1  # Prevent division by zero
                
                new_records = current_size - last_size
                percent_change = (new_records / last_size * 100) if last_size > 0 else 100.0
                hash_changed = current_hash != last_hash
                
                # Training needed if forced OR significant changes detected
                training_needed = force_training or (hash_changed and (percent_change >= threshold_percent))
            
            # Record current check
            cursor.execute('''
                INSERT INTO data_monitoring 
                (check_date, data_hash, data_size, new_records, training_triggered)
                VALUES (?, ?, ?, ?, ?)
            ''', (datetime.now(), current_hash, current_size, new_records, training_needed))
            
            conn.commit()
            conn.close()
            
            if force_training:
                logging.info(f"🚀 FORCE TRAINING triggered by user")
            elif training_needed:
                logging.info(f"📈 Data changes detected: {new_records} new records ({percent_change:.1f}% change)")
            
            return training_needed, df, new_records
            
        except Exception as e:
            logging.error(f"❌ Error checking data changes: {e}")
            return False, None, 0

    def prepare_region_data(self, df, target_metric='usage_cpu'):
        """Prepare region-specific data for modeling"""
        # Aggregate data by region and date
        if target_metric == 'usage_cpu':
            region_daily = df.groupby(['region', 'date']).agg({
                'usage_cpu': 'mean',
                'usage_storage': 'mean', 
                'users_active': 'mean',
                'economic_index': 'first',
                'cloud_market_demand': 'first',
                'holiday': 'max'
            }).reset_index()
        elif target_metric == 'users_active':
              # users_active
            region_daily = df.groupby(['region', 'date']).agg({
                'users_active': 'sum',
                'usage_cpu': 'mean',
                'usage_storage': 'mean',
                'economic_index': 'first',
                'cloud_market_demand': 'first',
                'holiday': 'max'
            }).reset_index()
        else:  # NEW: usage_storage
           region_daily = df.groupby(['region', 'date']).agg({
            'usage_storage': 'mean',  # Average storage usage per day
            'usage_cpu': 'mean',
            'users_active': 'mean',
            'economic_index': 'first',
            'cloud_market_demand': 'first',
            'holiday': 'max'
        }).reset_index()
        
        # Create region-specific DataFrames
        region_dfs = {}
        for region in region_daily['region'].unique():
            region_data = region_daily[region_daily['region'] == region].copy()
            region_data = region_data.drop('region', axis=1).set_index('date').sort_index()
            region_dfs[region] = region_data
        
        return region_dfs

    def train_arima_model(self, ts, region):
        """Train ARIMA model with parameter optimization"""
        logging.info(f"    🔄 Training ARIMA for {region}...")
        
        best_rmse = np.inf
        best_model = None
        best_params = None
        
        # Parameter search space
        param_combinations = [
            (1,1,0), (2,1,0), (1,1,1), (2,1,1), (3,1,0), (3,1,1), (5,1,0)
        ]
        
        split = int(0.8 * len(ts))
        train_ts, test_ts = ts.iloc[:split], ts.iloc[split:]
        
        for params in param_combinations:
            try:
                model = ARIMA(train_ts, order=params).fit()
                preds = model.forecast(steps=len(test_ts))
                rmse = np.sqrt(mean_squared_error(test_ts.values, preds.values))
                
                if rmse < best_rmse:
                    best_rmse = rmse
                    best_model = model
                    best_params = params
            except:
                continue
        
        if best_model:
            mae = mean_absolute_error(test_ts.values, 
                                    best_model.forecast(steps=len(test_ts)).values)
            mape = np.mean(np.abs((test_ts.values - best_model.forecast(steps=len(test_ts)).values) / test_ts.values)) * 100
            
            logging.info(f"    ✅ ARIMA {best_params} - RMSE: {best_rmse:.2f}, MAE: {mae:.2f}, MAPE: {mape:.2f}%")
            return best_model, best_rmse, mae, mape
        
        logging.warning(f"    ❌ ARIMA training failed for {region}")
        return None, np.inf, np.inf, np.inf

    def train_xgboost_model(self, region_data, target_col, region):
        """Train XGBoost model with feature engineering"""
        logging.info(f"    🔄 Training XGBoost for {region}...")
        
        try:
            df_xgb = region_data.copy()
            
            # Feature engineering matching your training
            df_xgb[f'lag1_{target_col}'] = df_xgb[target_col].shift(1)
            df_xgb[f'lag7_{target_col}'] = df_xgb[target_col].shift(7)
            df_xgb[f'roll7_mean_{target_col}'] = df_xgb[target_col].rolling(7).mean()
            df_xgb['dow'] = df_xgb.index.dayofweek
            
            # Add other features based on target
            if target_col == 'usage_cpu':
                features = [f'lag1_{target_col}', f'lag7_{target_col}', f'roll7_mean_{target_col}',
                           'usage_storage', 'users_active', 'economic_index', 
                           'cloud_market_demand', 'dow', 'holiday']
                
            elif target_col == 'users_active':
                df_xgb['lag1_cpu'] = df_xgb['usage_cpu'].shift(1)
                df_xgb['lag1_storage'] = df_xgb['usage_storage'].shift(1)
                features = [f'lag1_{target_col}', f'lag7_{target_col}', f'roll7_mean_{target_col}',
                           'lag1_cpu', 'lag1_storage', 'usage_cpu', 'usage_storage',
                           'economic_index', 'dow', 'holiday']
            else:  # NEW: usage_storage
               df_xgb['lag1_cpu'] = df_xgb['usage_cpu'].shift(1)
               df_xgb['lag1_users'] = df_xgb['users_active'].shift(1)
               features = [f'lag1_{target_col}', f'lag7_{target_col}', f'roll7_mean_{target_col}',
                          'lag1_cpu', 'lag1_users', 'usage_cpu', 'users_active',
                          'economic_index', 'dow', 'holiday']
            
            df_xgb = df_xgb.dropna()
            
            if len(df_xgb) == 0:
                logging.warning(f"    ❌ XGBoost: No data after feature engineering for {region}")
                return None, np.inf, np.inf, np.inf
            
            X = df_xgb[features]
            y = df_xgb[target_col]
            
            split = int(0.8 * len(X))
            X_train, X_test = X.iloc[:split], X.iloc[split:]
            y_train, y_test = y.iloc[:split], y.iloc[split:]
            
            # Grid search for best parameters
            best_rmse = np.inf
            best_model = None
            
            param_grid = [
                {'n_estimators': 50, 'max_depth': 3, 'learning_rate': 0.01},
                {'n_estimators': 100, 'max_depth': 3, 'learning_rate': 0.01},
                {'n_estimators': 50, 'max_depth': 6, 'learning_rate': 0.01},
                {'n_estimators': 100, 'max_depth': 6, 'learning_rate': 0.1}
            ]
            
            for params in param_grid:
                model = xgb.XGBRegressor(
                    objective='reg:squarederror',
                    random_state=42,
                    **params
                )
                
                model.fit(X_train, y_train)
                preds = model.predict(X_test)
                rmse = np.sqrt(mean_squared_error(y_test, preds))
                
                if rmse < best_rmse:
                    best_rmse = rmse
                    best_model = model
            
            if best_model:
                preds = best_model.predict(X_test)
                mae = mean_absolute_error(y_test, preds)
                mape = np.mean(np.abs((y_test - preds) / y_test)) * 100
                
                logging.info(f"    ✅ XGBoost - RMSE: {best_rmse:.2f}, MAE: {mae:.2f}, MAPE: {mape:.2f}%")
                return best_model, best_rmse, mae, mape
            
        except Exception as e:
            logging.error(f"    ❌ XGBoost training error for {region}: {e}")
        
        return None, np.inf, np.inf, np.inf

    def train_lstm_model(self, ts, target_col, region):
        """Train LSTM model with sequence optimization"""
        logging.info(f"    🔄 Training LSTM for {region}...")
        
        try:
            seq = ts.values
            scaler = MinMaxScaler()
            seq_scaled = scaler.fit_transform(seq.reshape(-1, 1)).flatten()
            
            best_rmse = np.inf
            best_model = None
            best_scaler = None
            best_seq_length = 7
            
            # Try different sequence lengths
            for n_steps in [7, 14, 21]:
                try:
                    Xs, ys = [], []
                    
                    for i in range(n_steps, len(seq_scaled)):
                        Xs.append(seq_scaled[i-n_steps:i])
                        ys.append(seq_scaled[i])
                    
                    Xs, ys = np.array(Xs), np.array(ys)
                    
                    if len(Xs) == 0:
                        continue
                    
                    split = int(0.8 * len(Xs))
                    X_train, X_test = Xs[:split], Xs[split:]
                    y_train, y_test = ys[:split], ys[split:]
                    
                    X_train = X_train.reshape((len(X_train), n_steps, 1))
                    X_test = X_test.reshape((len(X_test), n_steps, 1))
                    
                    # Build LSTM model
                    model = Sequential([
                        LSTM(64, input_shape=(n_steps, 1), return_sequences=True),
                        Dropout(0.2),
                        LSTM(32),
                        Dropout(0.2),
                        Dense(1)
                    ])
                    
                    model.compile(optimizer='adam', loss='mse')
                    
                    # Train with early stopping
                    model.fit(
                        X_train, y_train,
                        epochs=50, batch_size=16,
                        validation_split=0.2,
                        callbacks=[EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)],
                        verbose=0
                    )
                    
                    preds_scaled = model.predict(X_test, verbose=0).flatten()
                    y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
                    preds_inv = scaler.inverse_transform(preds_scaled.reshape(-1, 1)).flatten()
                    
                    rmse = np.sqrt(mean_squared_error(y_test_inv, preds_inv))
                    
                    if rmse < best_rmse:
                        best_rmse = rmse
                        best_model = model
                        best_scaler = scaler
                        best_seq_length = n_steps
                        
                        mae = mean_absolute_error(y_test_inv, preds_inv)
                        mape = np.mean(np.abs((y_test_inv - preds_inv) / y_test_inv)) * 100
                        
                except Exception as e:
                    logging.warning(f"    ⚠️ LSTM sequence length {n_steps} failed: {e}")
                    continue
            
            if best_model:
                logging.info(f"    ✅ LSTM (seq={best_seq_length}) - RMSE: {best_rmse:.2f}, MAE: {mae:.2f}, MAPE: {mape:.2f}%")
                return best_model, best_scaler, best_rmse, mae, mape, best_seq_length
            
        except Exception as e:
            logging.error(f"    ❌ LSTM training error for {region}: {e}")
        
        return None, None, np.inf, np.inf, np.inf, 7

    def train_all_models_for_region(self, region_data, region, metric_type='cpu'):
        """Train ALL model types for a region and return performance comparison"""
        if metric_type == 'cpu':
           target_col = 'usage_cpu'
        elif metric_type == 'users':
           target_col = 'users_active'
        else:  # storage
           target_col = 'usage_storage'
        
        logging.info(f"  🎯 Training ALL models for {region} ({metric_type.upper()})")
        
        model_results = {}
        
        # Train ARIMA
        arima_model, arima_rmse, arima_mae, arima_mape = self.train_arima_model(region_data[target_col], region)
        model_results['ARIMA'] = {
            'model': arima_model,
            'scaler': None,
            'rmse': arima_rmse,
            'mae': arima_mae,
            'mape': arima_mape
        }
        
        # Train XGBoost
        xgb_model, xgb_rmse, xgb_mae, xgb_mape = self.train_xgboost_model(region_data, target_col, region)
        model_results['XGBoost'] = {
            'model': xgb_model,
            'scaler': None,
            'rmse': xgb_rmse,
            'mae': xgb_mae,
            'mape': xgb_mape
        }
        
        # Train LSTM
        lstm_model, lstm_scaler, lstm_rmse, lstm_mae, lstm_mape, seq_length = self.train_lstm_model(region_data[target_col], target_col, region)
        model_results['LSTM'] = {
            'model': lstm_model,
            'scaler': lstm_scaler,
            'rmse': lstm_rmse,
            'mae': lstm_mae,
            'mape': lstm_mape
        }
        
        # Find best model based on RMSE
        valid_models = {k: v for k, v in model_results.items() if v['model'] is not None}
        
        if valid_models:
            best_model_name = min(valid_models.keys(), key=lambda x: valid_models[x]['rmse'])
            best_model_info = valid_models[best_model_name]
            
            logging.info(f"  🏆 BEST MODEL for {region}: {best_model_name} (RMSE: {best_model_info['rmse']:.2f})")
            
            # Performance summary
            logging.info("  📊 Performance Summary:")
            for model_name, result in model_results.items():
                status = "✅" if result['model'] is not None else "❌"
                rmse = result['rmse'] if result['rmse'] != np.inf else "FAILED"
                logging.info(f"     {status} {model_name}: RMSE={rmse}")
            
            return best_model_name, best_model_info, model_results
        else:
            logging.error(f"  ❌ ALL models failed for {region}")
            return None, None, model_results
    def upsert_best_model(self, region, metric_type, model_type, rmse, mae, mape):
         """Insert or update the best model record in best_model table"""
         try:
            conn = sqlite3.connect(self.performance_db)
            cursor = conn.cursor()
        
            # Check if record for region and metric_type exists
            cursor.execute('''
                SELECT id, rmse FROM best_model
                WHERE region = ? AND metric_type = ?
            ''', (region, metric_type))
            record = cursor.fetchone()
        
            now = datetime.now()
        
            if record is None:
                # Insert new record
                cursor.execute('''
                    INSERT INTO best_model (region, metric_type, model_type, rmse, mae, mape, updated_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (region, metric_type, model_type, rmse, mae, mape, now))
            else:
                rec_id, existing_rmse = record
                # Update only if new rmse is better or equal (optional)
                if rmse <= existing_rmse:
                    cursor.execute('''
                        UPDATE best_model
                        SET model_type = ?, rmse = ?, mae = ?, mape = ?, updated_date = ?
                        WHERE id = ?
                    ''', (model_type, rmse, mae, mape, now, rec_id))
        
            conn.commit()
            conn.close()
            logging.info(f"  💾 Best model record upserted for {region} {metric_type} - {model_type} (RMSE: {rmse:.2f})")
            return True
         except Exception as e:
             logging.error(f"  ❌ Error upserting best model record: {e}")
             return False


    def train_models_for_metric(self, region_dfs, metric_type='cpu'):
        """Train all models for all regions for a specific metric"""
        if metric_type == 'cpu':
           models_dir = self.models_dir
        elif metric_type == 'users':
           models_dir = self.users_models_dir  
        else:  # storage
           models_dir = self.storage_models_dir

        results = {}
        
        logging.info(f"🚀 Training {metric_type.upper()} models for all regions...")
        
        for region, region_data in region_dfs.items():
            logging.info(f"\n📍 Processing Region: {region}")
            
            # Train all models and get the best one
            best_model_name, best_model_info, all_results = self.train_all_models_for_region(
                region_data, region, metric_type)
            
            if best_model_name and best_model_info:
                # Get current best performance (if exists)
                current_best_rmse = self.get_current_best_rmse(region, metric_type)

                # NEW ─────────────
                model_file_expected = models_dir / f"{region.replace(' ', '')}{best_model_name}{metric_type}.pkl"
                if current_best_rmse is not None and not model_file_expected.exists():
                    current_best_rmse = float('inf')      # Force redeploy if file is gone
                # ─────────────────
                
                # Check if new model is better
                new_rmse = best_model_info['rmse']
                improved = current_best_rmse is None or new_rmse < current_best_rmse
                
                if improved:
                    # Save the new best model
                    success = self.save_model(
                        best_model_info['model'], 
                        best_model_info['scaler'], 
                        region, 
                        best_model_name, 
                        metric_type, 
                        models_dir
                    )
                    
                    if success:
                        # Update model configuration
                        if metric_type == 'cpu':
                           self.CPU_MODELS[region] = best_model_name
                        elif metric_type == 'users':
                           self.USERS_MODELS[region] = best_model_name
                        else:  # storage
                           self.STORAGE_MODELS[region] = best_model_name  # NEW
                        
                        # Record performance
                        self.record_performance(
                            best_model_name, metric_type, region,
                            new_rmse, best_model_info['mae'], best_model_info['mape'],
                            len(region_data), True
                        )

                         # NEW - update best_model table
                        self.upsert_best_model(region, metric_type, best_model_name,
                               new_rmse, best_model_info['mae'], best_model_info['mape'])
                        
                        improvement_text = f"(improved from {current_best_rmse:.2f})" if current_best_rmse else "(new)"
                        logging.info(f"  ✅ DEPLOYED: {best_model_name} model - RMSE: {new_rmse:.2f} {improvement_text}")
                        
                        deployed = True
                    else:
                        logging.error(f"  ❌ Failed to save {best_model_name} model for {region}")
                        deployed = False
                else:
                    logging.info(f"  ⚠️ No improvement: {best_model_name} RMSE {new_rmse:.2f} vs current {current_best_rmse:.2f}")
                    deployed = False
                
                # Record all model performances for analysis
                for model_name, model_result in all_results.items():
                    if model_result['model'] is not None:
                        self.record_performance(
                            model_name, metric_type, region,
                            model_result['rmse'], model_result['mae'], model_result['mape'],
                            len(region_data), deployed and model_name == best_model_name
                        )
                
                results[region] = {
                    'best_model': best_model_name,
                    'rmse': new_rmse,
                    'mae': best_model_info['mae'],
                    'mape': best_model_info['mape'],
                    'improved': improved,
                    'deployed': deployed,
                    'all_results': all_results
                }
            else:
                logging.error(f"  ❌ No valid models for {region}")
                results[region] = {
                    'best_model': None,
                    'rmse': np.inf,
                    'mae': np.inf,
                    'mape': np.inf,
                    'improved': False,
                    'deployed': False,
                    'all_results': all_results
                }
        
        return results

    def get_current_best_rmse(self, region, metric_type):
        """Get current best RMSE for a region and metric"""
        try:
            conn = sqlite3.connect(self.performance_db)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT rmse FROM model_performance 
                WHERE region = ? AND metric_type = ? AND is_active = 1
                ORDER BY training_date DESC LIMIT 1
            ''', (region, metric_type))
            
            result = cursor.fetchone()
            conn.close()
            
            return result[0] if result else None
        except:
            return None

    def save_model(self, model, scaler, region, model_type, metric_type, models_dir):
        """Save trained model to disk"""
        try:
            models_dir.mkdir(exist_ok=True)
            region_clean = region.replace(' ', '')
            
            if model_type == 'ARIMA':
               if metric_type == 'cpu':
                  model_path = models_dir / f"{region_clean}_ARIMA_cpu.pkl"
                  
               elif metric_type == 'storage':
                    model_path = models_dir / f"{region_clean}_ARIMA_storage.pkl"
                    
               else:      
                   model_path = models_dir / f"{region_clean}_ARIMA_users.pkl"
               with open(model_path, 'wb') as f:
                  pickle.dump(model, f)
                   
                   
                    
            elif model_type == 'XGBoost':
                if metric_type == 'cpu':
                    model_path = models_dir / f"{region_clean}_XGBoost_cpu.pkl"
                elif metric_type == 'storage':
                    model_path = models_dir / f"{region_clean}_XGBoost_storage.pkl"
                else:
                    model_path = models_dir / f"{region_clean}_XGBoost_users.pkl"
                with open(model_path, 'wb') as f:
                    pickle.dump(model, f)
                    
            elif model_type == 'LSTM':
                if metric_type == 'cpu':
                    model_path = models_dir / f"{region_clean}_LSTMmodel_cpu.h5"
                    scaler_path = models_dir / f"{region_clean}_LSTMscaler_cpu.pkl"
                elif metric_type == 'storage':
                     model_path = models_dir / f"{region_clean}_LSTMmodel_storage.h5"
                     scaler_path = models_dir / f"{region_clean}LSTMscaler_storage.pkl"
                else:
                    model_path = models_dir / f"{region_clean}_LSTMmodel_users.h5"
                    scaler_path = models_dir / f"{region_clean}_LSTMscaler_users.pkl"
                
                model.save(model_path)
                with open(scaler_path, 'wb') as f:
                    pickle.dump(scaler, f)
            
            logging.info(f"    💾 Model saved: {model_path}")
            return True
            
        except Exception as e:
            logging.error(f"    ❌ Error saving model: {e}")
            return False

    def record_performance(self, model_type, metric_type, region, rmse, mae, mape, data_size, is_active):
        """Record model performance in database"""
        try:
            conn = sqlite3.connect(self.performance_db)
            cursor = conn.cursor()
            
            # Deactivate previous models for this region/metric if this is the new active one
            if is_active:
                cursor.execute('''
                    UPDATE model_performance 
                    SET is_active = 0 
                    WHERE region = ? AND metric_type = ?
                ''', (region, metric_type))
            
            # Insert new performance record
            cursor.execute('''
                INSERT INTO model_performance 
                (model_type, metric_type, region, rmse, mae, mape, training_date, data_size, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (model_type, metric_type, region, rmse, mae, mape, datetime.now(), data_size, is_active))

            conn.commit()
            conn.close()
            logging.info(f"  💾 Performance recorded: {model_type} for {region} ({metric_type}) - RMSE: {rmse:.2f}")
            
        except Exception as e:
            logging.error(f"❌ Error recording performance: {e}")

    def run_training_pipeline(self, force_training=False):
        """Execute the complete intelligent training pipeline"""
        if force_training:
            logging.info("🚀 Starting FORCED INTELLIGENT training pipeline")
        else:
            logging.info("🚀 Starting INTELLIGENT training pipeline")
        
        start_time = time.time()
        
        # Check for data changes (or force training)
        data_changed, df, new_records = self.check_data_changes(force_training=force_training)
        
        if not data_changed and not force_training:
            logging.info("📊 No significant data changes detected. Skipping training.")
            return
        
        if df is None:
            logging.error("❌ Failed to load data. Aborting training.")
            return
        
        if force_training:
            logging.info(f"🔥 FORCED training executing with {len(df)} total records")
        else:
            logging.info(f"📈 Training triggered: {new_records} new records detected")
        
        # Prepare data for both metrics
        logging.info("📊 Preparing regional data...")
        cpu_region_dfs = self.prepare_region_data(df, 'usage_cpu')
        users_region_dfs = self.prepare_region_data(df, 'users_active')
        storage_region_dfs = self.prepare_region_data(df, 'usage_storage')
        
        logging.info(f"✅ Prepared data for {len(cpu_region_dfs)} regions")
        
        # Train CPU models
        logging.info("\n" + "="*60)
        logging.info("🖥️ TRAINING CPU USAGE MODELS")
        logging.info("="*60)
        cpu_results = self.train_models_for_metric(cpu_region_dfs, 'cpu')
        
        # Train Users models  
        logging.info("\n" + "="*60)
        logging.info("👥 TRAINING ACTIVE USERS MODELS")
        logging.info("="*60)
        users_results = self.train_models_for_metric(users_region_dfs, 'users')


        # NEW: Train Storage models
        logging.info("\n" + "="*60)
        logging.info("👥 TRAINING Storage usageghey MODELS")
        logging.info("="*60)
        storage_results = self.train_models_for_metric(storage_region_dfs, 'storage')
        
        # Generate comprehensive report
        self.generate_comprehensive_report(cpu_results, users_results,storage_results, new_records)
        
        total_time = time.time() - start_time
        logging.info("\n" + "="*60)
        logging.info(f"✅ INTELLIGENT training pipeline completed in {total_time:.2f} seconds")
        logging.info("="*60)

    def generate_comprehensive_report(self, cpu_results, users_results,storage_results, new_records):
        """Generate comprehensive training summary report"""
        
        # Count deployments and improvements
        cpu_deployed = sum(1 for r in cpu_results.values() if r.get('deployed', False))
        users_deployed = sum(1 for r in users_results.values() if r.get('deployed', False))
        storage_deployed = sum(1 for r in storage_results.values() if r.get('deployed', False))  # NEW

        cpu_improved = sum(1 for r in cpu_results.values() if r.get('improved', False))
        users_improved = sum(1 for r in users_results.values() if r.get('improved', False))
        storage_improved = sum(1 for r in storage_results.values() if r.get('improved', False))  # NEW


        
        report = {
            'timestamp': datetime.now().isoformat(),
            'training_type': 'intelligent_auto_selection',
            'new_records': new_records,
            'cpu_results': cpu_results,
            'users_results': users_results,
            'storage_results': storage_results,  # NEW
            'summary': {
                'cpu_models_deployed': cpu_deployed,
                'users_models_deployed': users_deployed,
                'storage_models_deployed': storage_deployed,  # NEW
                'cpu_models_improved': cpu_improved,
                'users_models_improved': users_improved,
                'storage_models_improved': storage_improved,  # NEW
                'total_models_trained': len(cpu_results) * 3 + len(users_results) * 3 + len(storage_results) * 3,  # 3 models per region
                'total_regions': len(cpu_results)
            },
            'current_best_models': {
                'cpu': self.CPU_MODELS,
                'users': self.USERS_MODELS,
                'storage': self.STORAGE_MODELS  # NEW
            }
        }
        # Create reports directory structure
        reports_dir = Path("D:/infosysspringboard projects/project1-1stmilestine/AZURE_BACKEND_TEAM-B/backend automated reports")
        reports_dir.mkdir(parents=True, exist_ok=True)
        # Save detailed report
        report_path = reports_dir / f"intelligent_training_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2, default=str)
        
        # Terminal summary
        logging.info("\n📋 TRAINING SUMMARY REPORT")
        logging.info("="*40)
        logging.info(f"🖥️  CPU Models - Deployed: {cpu_deployed}, Improved: {cpu_improved}")
        logging.info(f"👥 Users Models - Deployed: {users_deployed}, Improved: {users_improved}")
        logging.info(f"Storage  Models - Deployed: {storage_deployed}, Improved: {storage_improved}")

        logging.info(f"📊 Total Models Trained: {report['summary']['total_models_trained']}")
        logging.info(f"🎯 Total Regions: {report['summary']['total_regions']}")
        
        logging.info("\n🏆 CURRENT BEST MODELS:")
        logging.info("CPU Models:")
        for region, model in self.CPU_MODELS.items():
            status = "✅ DEPLOYED" if cpu_results.get(region, {}).get('deployed', False) else "⚡ CURRENT"
            rmse = cpu_results.get(region, {}).get('rmse', 'N/A')
            logging.info(f"  {region}: {model} {status} (RMSE: {rmse})")
        
        logging.info("Users Models:")
        for region, model in self.USERS_MODELS.items():
            status = "✅ DEPLOYED" if users_results.get(region, {}).get('deployed', False) else "⚡ CURRENT"
            rmse = users_results.get(region, {}).get('rmse', 'N/A')
            logging.info(f"  {region}: {model} {status} (RMSE: {rmse})")


        logging.info("Storage Models:")
        for region, model in self.STORAGE_MODELS.items():
            status = "✅ DEPLOYED" if storage_results.get(region, {}).get('deployed', False) else "⚡ CURRENT"
            rmse = storage_results.get(region, {}).get('rmse', 'N/A')
            logging.info(f"  {region}: {model} {status} (RMSE: {rmse})")

        
        logging.info(f"\n💾 Detailed report saved: {report_path}")

    def get_model_status(self):
        """Get current model performance status"""
        conn = sqlite3.connect(self.performance_db)
        
        query = '''
            SELECT model_type, metric_type, region, rmse, mae, mape, training_date
            FROM model_performance 
            WHERE is_active = 1
            ORDER BY region, metric_type
        '''
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        return df

def run_scheduled_pipeline():
    """Function to run the pipeline on schedule"""
    pipeline = ModelTrainingPipeline()
    pipeline.run_training_pipeline()

def run_forced_pipeline():
    """Function to run the pipeline immediately (forced)"""
    pipeline = ModelTrainingPipeline()
    pipeline.run_training_pipeline(force_training=True)

# Schedule setup
def setup_scheduler():
    """Setup the training schedule"""
    # Run every day at 2 AM
    schedule.every().day.at("02:00").do(run_scheduled_pipeline)
    
    # Run weekly on Sunday at 3 AM for comprehensive retraining
    schedule.every().sunday.at("03:00").do(run_scheduled_pipeline)
    
    logging.info("⏰ Scheduler configured: Daily at 2AM, Weekly on Sunday at 3AM")

def run_scheduler():
    """Run the scheduler continuously"""
    setup_scheduler()
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    # Can run immediately or start scheduler
    if len(sys.argv) > 1 and sys.argv[1] == "--now":
        # Run training immediately
        logging.info("🚀 Running scheduled pipeline now...")
        run_scheduled_pipeline()
    elif len(sys.argv) > 1 and sys.argv[1] == "--force":
        # Force training immediately
        logging.info("🔥 Running FORCED training pipeline now...")
        run_forced_pipeline()
    elif len(sys.argv) > 1 and sys.argv[1] == "--status":
        # Show current model status
        logging.info("📊 Current model status:")
        pipeline = ModelTrainingPipeline()
        status = pipeline.get_model_status()
        print(status)
    else:
        # Start continuous scheduler
        logging.info("⏰ Starting automated intelligent training scheduler...")
        run_scheduler()
        
