import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Create necessary folders
# Get the backend directory (parent of scripts)
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
output_dir = os.path.join(backend_dir, 'reports', 'figures')
processed_dir = os.path.join(backend_dir, 'data', 'processed')
os.makedirs(output_dir, exist_ok=True)
os.makedirs(processed_dir, exist_ok=True)

# Load raw datasets
azure_df = pd.read_csv(os.path.join(backend_dir, 'data', 'raw', 'azure_usage.csv'))
external_df = pd.read_csv(os.path.join(backend_dir, 'data', 'raw', 'external_factors.csv'))

# Convert 'date' columns to datetime
azure_df['date'] = pd.to_datetime(azure_df['date'])
external_df['date'] = pd.to_datetime(external_df['date'])

# Basic Data Inspection
print(azure_df.info())
print(azure_df.describe())
print(azure_df.isnull().sum())

# Data Cleaning - Fill missing 'usage_storage' via forward fill as example
if azure_df['usage_storage'].isnull().any():
    azure_df['usage_storage'].fillna(method='ffill', inplace=True)

print("Missing values after cleaning:")
print(azure_df.isnull().sum())

# Visualizations

# 1. Total CPU usage trend over time
plt.figure(figsize=(10, 4))
azure_df.groupby('date')['usage_cpu'].sum().plot()
plt.title("Total CPU Usage Over Time")
plt.xlabel("Date")
plt.ylabel("CPU Usage")
plt.tight_layout()
plt.savefig(f'{output_dir}/total_cpu_usage_over_time.png')
plt.close()

# 2. Region-wise average CPU usage bar chart
plt.figure(figsize=(8, 5))
region_usage = azure_df.groupby('region')['usage_cpu'].mean().reset_index()
sns.barplot(data=region_usage, x='region', y='usage_cpu')
plt.title("Average CPU Usage by Region")
plt.xlabel("Region")
plt.ylabel("Average CPU Usage")
plt.tight_layout()
plt.savefig(f'{output_dir}/avg_cpu_usage_by_region.png')
plt.close()

# 3. Correlation Heatmap for usage and external factors
merged_df = pd.merge(azure_df, external_df, on='date', how='left')
corr_cols = ['usage_cpu', 'usage_storage', 'users_active', 'economic_index', 'cloud_market_demand']
plt.figure(figsize=(8, 6))
sns.heatmap(merged_df[corr_cols].corr(), annot=True, cmap='coolwarm')
plt.title("Correlation Heatmap")
plt.tight_layout()
plt.savefig(f'{output_dir}/correlation_heatmap.png')
plt.close()

# Save the cleaned and merged dataset for feature engineering
merged_df.to_csv(f'{processed_dir}/cleaned_merged.csv', index=False)

print(f"Cleaned and merged dataset saved at {processed_dir}/cleaned_merged.csv")
