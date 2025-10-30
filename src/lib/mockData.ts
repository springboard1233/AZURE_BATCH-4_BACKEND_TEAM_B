// Mock data for Azure Capacity Command Center

export interface ForecastDataPoint {
  date: string;
  actual: number;
  forecast: number;
  delta: number;
}

export interface RegionData {
  region: string;
  compute: number;
  storage: number;
  risk: "low" | "moderate" | "high";
  delta: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  savings: number;
}

export interface AlertMission {
  id: string;
  region: string;
  type: "under-provision" | "over-provision" | "optimization";
  severity: "low" | "medium" | "high";
  message: string;
  completed: boolean;
}

// Generate time-series data for the past 12 months
export const generateForecastData = (): ForecastDataPoint[] => {
  const data: ForecastDataPoint[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 12);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const baseValue = 1000 + Math.sin(i / 30) * 200; // Seasonal pattern
    const actual = Math.round(baseValue + (Math.random() - 0.5) * 100);
    const forecast = Math.round(baseValue + (Math.random() - 0.5) * 80);
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual,
      forecast,
      delta: actual - forecast,
    });
  }

  return data;
};

export const mockRegionData: RegionData[] = [
  { region: "West US 2", compute: 850, storage: 1200, risk: "low", delta: 25 },
  { region: "East US", compute: 1200, storage: 980, risk: "moderate", delta: 150 },
  { region: "Central US", compute: 650, storage: 800, risk: "low", delta: -30 },
  { region: "North Europe", compute: 1400, storage: 1100, risk: "high", delta: 320 },
  { region: "West Europe", compute: 890, storage: 950, risk: "moderate", delta: 85 },
  { region: "Southeast Asia", compute: 1100, storage: 1300, risk: "high", delta: 280 },
  { region: "East Asia", compute: 750, storage: 880, risk: "low", delta: 45 },
  { region: "Australia East", compute: 620, storage: 740, risk: "low", delta: -15 },
  { region: "UK South", compute: 980, storage: 1050, risk: "moderate", delta: 120 },
  { region: "Canada Central", compute: 540, storage: 630, risk: "low", delta: 20 },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", score: 98.5, savings: 15200000 },
  { rank: 2, name: "Marcus Johnson", score: 97.8, savings: 14800000 },
  { rank: 3, name: "Priya Patel", score: 96.2, savings: 13500000 },
  { rank: 4, name: "Alex Rodriguez", score: 95.1, savings: 12900000 },
  { rank: 5, name: "Emma Wilson", score: 94.3, savings: 11700000 },
];

export const mockAlerts: AlertMission[] = [
  {
    id: "1",
    region: "North Europe",
    type: "under-provision",
    severity: "high",
    message: "Compute capacity projected to fall short by 22% in Q4",
    completed: false,
  },
  {
    id: "2",
    region: "Southeast Asia",
    type: "under-provision",
    severity: "high",
    message: "Storage demand spike detected - 18% above forecast",
    completed: false,
  },
  {
    id: "3",
    region: "East US",
    type: "optimization",
    severity: "medium",
    message: "Opportunity to optimize storage allocation",
    completed: false,
  },
  {
    id: "4",
    region: "UK South",
    type: "under-provision",
    severity: "medium",
    message: "Seasonal demand increase approaching",
    completed: true,
  },
  {
    id: "5",
    region: "Central US",
    type: "over-provision",
    severity: "low",
    message: "Over-provisioned resources detected",
    completed: true,
  },
];

export const getAccuracyScore = (): number => {
  // Mock accuracy score based on MAPE
  return 98.5;
};

export const getCapExSavings = (): number => {
  // Mock total CapEx savings in millions
  return 87.4;
};

export const getCapExTarget = (): number => {
  // The $120M challenge target
  return 120;
};

export const getProvisioningRisk = (): "low" | "moderate" | "high" => {
  // Mock overall provisioning risk
  return "moderate";
};

export const getTopFeatures = () => {
  return [
    { name: "Economic Indicator", impact: "↑", value: 12 },
    { name: "Seasonal Peak", impact: "↑", value: 8 },
    { name: "New Product Launch", impact: "↑", value: 15 },
    { name: "Competitor Activity", impact: "↓", value: -5 },
    { name: "Pricing Adjustment", impact: "↓", value: -3 },
  ];
};

// Generate confidence interval data for forecasts
export const getConfidenceInterval = (forecast: number) => {
  const margin = forecast * 0.1; // 10% margin
  return {
    upper: Math.round(forecast + margin),
    lower: Math.round(forecast - margin),
  };
};
