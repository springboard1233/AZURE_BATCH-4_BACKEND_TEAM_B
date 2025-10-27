🚀 Azure Demand Forecasting & Capacity Optimization System

📊 Project Overview
This project focuses on forecasting **Azure Compute & Storage demand** using Machine Learning models.  

## 🧰 Tech Stack
- **Python** (pandas, numpy, matplotlib, seaborn)
- **Flask** (for REST APIs)
- **Google Colab / Jupyter Notebook** (for EDA & data cleaning)
- **GitHub** (for version control)
- **Azure ML Studio** (for deployment in later milestones)


- Milestone 1 focuses on sourcing, cleaning, and merging key datasets to establish a foundation for forecasting.

  ## 🎯 Milestone 1 Goals
- [x] Set up Python environment  
- [x] Perform EDA on Azure & external datasets  
- [x] Clean and merge data → `data/processed/cleaned_merged.csv`  
- [x] Build dummy REST API (`/api/usage-trends` & `/api/forecast`) 


| Step                   | Description                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Data Collection        | Sourced Azure historical usage data and external factors (economic index, cloud market demand, holiday)                                 |
| Data Cleaning          | Handled missing values, removed duplicates, standardized date/time, normalized units                                                    |
| Data Integration       | Merged datasets by date and region; saved asdata/processed/cleaned_merged.csv                                                           |
| Exploratory Analysis   | Computed average daily CPU usage, monthly peak cloud market demand, and top-5 regional usage; created basic plots with Matplotlib/Seaborn|

📁 Repository Structure

```
azure-demand-forecasting/
│
├── data/
│   ├── raw/
│   │   ├── azure_usage.csv
│   │   └── external_factors.csv
│   └── processed/
│       └── cleaned_merged.csv
│
├── notebooks/
│   ├── 01_Basic_Exploratory_Analysis_and_Visualization.ipynb
│   └── 02_Data_cleaning.ipynb
│
├── scripts/
│   └── utils.py
│
├── reports/
│   └── eda_report.md
│
├── requirements.txt
└── README.md
```
  
