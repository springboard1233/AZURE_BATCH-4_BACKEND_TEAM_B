# src/data_processing.py
import pandas as pd
import os

RAW_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
PROC_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'processed')
os.makedirs(PROC_DIR, exist_ok=True)

def load_datasets():
    azure_file = os.path.join(RAW_DIR, 'azure_usage.csv')
    external_file = os.path.join(RAW_DIR, 'external_factors.csv')
    azure = pd.read_csv(azure_file)
    external = pd.read_csv(external_file)
    return azure, external

def clean_and_merge(azure, external):
    # Ensure 'date' column exists and is datetime
    for df in [azure, external]:
        df.columns = [c.lower().strip() for c in df.columns]
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date']).dt.date

    # Fill missing numeric values
    azure = azure.fillna(azure.mean(numeric_only=True))
    external = external.fillna(external.mean(numeric_only=True))

    # Merge on 'date'
    merged = pd.merge(azure, external, on='date', how='left')

    # Optional: add month, season features
    merged['date'] = pd.to_datetime(merged['date'])
    merged['month'] = merged['date'].dt.month
    merged['weekday'] = merged['date'].dt.weekday

    return merged

def main():
    azure, external = load_datasets()
    merged = clean_and_merge(azure, external)
    out_path = os.path.join(PROC_DIR, 'cleaned_merged.csv')
    merged.to_csv(out_path, index=False)
    print(f"✅ Cleaned dataset saved: {out_path}")
    print(f"Rows: {len(merged)}, Columns: {len(merged.columns)}")

if __name__ == "__main__":
    main()
