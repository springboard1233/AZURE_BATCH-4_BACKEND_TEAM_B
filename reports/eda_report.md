# Exploratory Data Analysis Report

## Data Quality

*   No missing values were found in either the `azure_usage` or `external_factors` dataframes during the initial check.
*   The 'date' columns in both dataframes were successfully converted from 'object' to 'datetime64[ns]' format.
*   No duplicate rows were identified or removed from either the `azure_usage` or `external_factors` dataframes.

## Data Integration

*   The two dataframes were successfully merged using an inner join on the 'date' column, resulting in a `merged_df`. The merged data was saved to `cleaned_merged.csv`.

## Key Findings from Exploratory Analysis

Based on the analysis of the `cleaned_merged.csv` dataset:

*   **Average Daily CPU Usage per Region:** The average daily CPU usage varies across regions over time. The visualizations show the trends for East US, West US, North Europe, and Southeast Asia.
*   **Peak Cloud Market Demand per Month:** The peak cloud market demand was calculated for each month in the dataset (January, February, and March 2023). The bar plot highlights the month with the highest peak demand.
*   **Top Regions by Total Usage:** The top 4 regions by total usage (sum of CPU and storage usage) were identified as West US, East US, North Europe, and Southeast Asia. The bar plot visually represents the total usage for these regions.

## Visualizations

*   **Average Daily CPU Usage per Region Over Time:** Line plots showing the trend of average daily CPU usage for each region.
*   **Peak Cloud Market Demand per Month:** Bar plot illustrating the peak cloud market demand for each month.
*   **Top Regions by Total Usage:** Bar plot comparing the total usage across the top regions.

## Conclusion

The exploratory data analysis revealed insights into the cloud usage patterns and their relationship with external factors. The data was successfully loaded, cleaned, and merged. The analysis identified variations in CPU usage by region, the months with peak cloud market demand, and the regions with the highest total usage.
