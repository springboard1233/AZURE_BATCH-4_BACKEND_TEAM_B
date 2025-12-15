# 🚀 **Azure Demand Forecasting & Capacity Optimization System**

<div align="center">

<!-- TODO: Add project logo (e.g., an Azure-themed forecasting icon) -->
<!-- ![Logo](path-to-logo.png) -->

[![GitHub stars](https://img.shields.io/github/stars/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B/network)
[![GitHub issues](https://img.shields.io/github/issues/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B/issues)
[![GitHub license](https://img.shields.io/github/license/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B?style=for-the-badge)](LICENSE.txt)

</div>

**An 8-week Infosys Springboard virtual internship project developed by Batch 4 Team B, following an agile methodology, to forecast demand and optimize capacity in Azure environments**

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Milestones](#milestones)
- [Project Structure](#project-structure)
- [Team Members](#team-members)
- [License](#license)

##  Project Overview

This project, developed by **AZURE_BATCH-4_BACKEND_TEAM_B**, is a part of a virtual internship completed over 8 weeks. The **Azure Demand Forecasting & Capacity Optimization System** forecasts demand for Azure services and optimizes resource allocation to assist the Azure Supply Chain team in making data-driven infrastructure decisions.

The project follows an **Agile methodology**, with remote collaboration in sprints, achieving four significant milestones.

##  Features

- **Interactive Dashboards:** Visualize resource usage trends, regional insights, and user activity with interactive charts and graphs. 📈
- **Capacity Planning:** Forecast future resource needs based on historical data and selected parameters. 🔮
- **Model Comparison:** Compare the performance of different forecasting models using various metrics. ⚖️
- **Alerting System:** Configure alert thresholds and receive notifications when forecasted usage exceeds those thresholds. 🚨
- **Chatbot Integration:** Ask questions about resource usage, predictions, regions, anomalies, or capacity planning using a conversational interface. 🤖
- **Multi-Region Comparison:** Compare resource usage metrics across different regions and services. 🌍
- **User Activity Monitoring:** Track user activity and resource consumption patterns. 👤
- **Data Download:** Download raw data in CSV format for further analysis. ⬇️
- **Theme Support:** Supports both light and dark themes. ☀️/🌙

##  Tech Stack

*   **Frontend:**
    *   Next.js: React framework for building the user interface.
    *   React: JavaScript library for building user interfaces.
    *   TypeScript: Superset of JavaScript that adds static typing.
    *   Recharts: A composable charting library built on React.
    *   Lucide React: Beautifully simple icons.
    *   Shadcn UI: Re-usable components built using Radix UI and Tailwind CSS.
    *   next-themes: For theme management (dark mode).
*   **Backend:**
    *   Flask: Python web framework for creating the API.
    *   Python: Programming language for backend logic.
*   **Data Analysis & Dependencies (Backend):**
    *   pandas: Data manipulation and analysis.
    *   numpy: Numerical operations.
    *   python-dateutil: Date parsing.
    *   pytz: Timezone handling.
*   **Database:**
    *   CSV files: Data is loaded from CSV files.
*   **Other:**
    *   CORS: For handling Cross-Origin Resource Sharing.
    *   pip: Python package installer.
    *   npm or yarn: JavaScript package manager.

## Quick Start

### Prerequisites
- **Node.js**: `^18.17.0` or later.
- **npm**: `^9.6.7` or later.
- **Git**: To clone the repository.
- **(Optional) PowerShell**: For running development scripts.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/springboard1233/AZURE_BATCH-4_BACKEND_TEAM_B.git
    cd AZURE_BATCH-4_BACKEND_TEAM_B
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment:
    ```bash
    cp .env.example .env # Or create an empty .env file and configure your environment variables.
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and visit `http://localhost:3000`.

## Milestones

| **Milestone** | **Duration** | **Module**                      | **Objective**                                          | **Key Tasks**                                                                                                                                     |
|---------------|--------------|----------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Milestone 1   | Weeks 1-2    | Data Collection & Preparation    | Collect and prepare datasets for modeling              | Gather Azure usage data, clean and validate datasets, source external data, and ensure consistency in data formats.                               |
| Milestone 2   | Weeks 3-4    | Feature Engineering & Data Wrangling | Prepare the dataset for machine learning models        | Identify demand-driving features, engineer derived features (seasonality, spikes, etc.), and ensure dataset consistency and readiness for models. |
| Milestone 3   | Weeks 5-6    | Machine Learning Model Development | Develop and validate forecasting models                | Train and validate multiple ML models (ARIMA, XGBoost, etc.), optimize based on performance metrics, and select the best model for production.    |
| Milestone 4   | Weeks 7-8    | Forecast Integration & Capacity Planning | Integrate forecasting system into Azure’s ecosystem    | Deploy models, integrate with capacity planning dashboards, automate reporting, and establish monitoring pipelines.                              |

## Project Structure

```
├── BACKEND/
│   ├── app.py             # Flask backend application
│   ├── requirements.txt   # Python dependencies
│   └── ...
├── app/
│   ├── alerts/
│   │   └── page.tsx       # Alerts page
│   ├── capacity-planning/
│   │   └── page.tsx       # Capacity planning page
│   ├── chatbot/
│   │   └── page.tsx       # Chatbot page
│   ├── compare/
│   │   └── page.tsx       # Model comparison page
│   ├── forecasting/
│   │   └── page.tsx       # Forecasting page
│   ├── multi-region/
│   │   └── page.tsx       # Multi-region comparison page
│   ├── regional/
│   │   └── page.tsx       # Regional insights page
│   ├── resources/
│   │   └── page.tsx       # Resource trends page
│   ├── user-activity/
│   │   └── page.tsx       # User activity dashboard page
│   ├── layout.tsx         # Root layout for the application
│   ├── page.tsx           # Main dashboard page
│   └── ...
├── components/
│   ├── dashboard/
│   │   ├── dashboard-header.tsx # Dashboard header component
│   │   ├── kpi-card.tsx       # KPI card component
│   │   ├── sidebar.tsx        # Sidebar component
│   │   └── trend-chart.tsx    # Trend chart component
│   ├── ui/                # UI components (Shadcn UI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   └── ...
│   └── theme-provider.tsx   # Theme provider component
├── lib/
│   └── api.ts             # API functions for fetching data
├── public/
│   └── ...
├── styles/
│   └── globals.css        # Global CSS styles
├── next.config.mjs      # Next.js configuration file
├── tsconfig.json        # TypeScript configuration file
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```


## Team Members

This project was completed as part of a virtual internship by **Batch 4 Team B**. Below are the team members and their GitHub profiles:

- **[Yash06-blip](https://github.com/Yash06-blip)**  
- **[ChidviReddy](https://github.com/ChidviReddy)**  
- **[Himanshu-mali](https://github.com/Himanshu-mali)**  
- **[vaishnavikatare](https://github.com/vaishnavikatare)**
- **[vaishnavisxngh](https://github.com/vaishnavisxngh)**  
- **[girish-indurkar](https://github.com/girish-indurkar)**  
- **[Shravika-0212](https://github.com/Shravika-0212)**  

## License

This project is licensed under the [MIT License](LICENSE.txt) - see the [LICENSE.txt](LICENSE.txt) file for details.

