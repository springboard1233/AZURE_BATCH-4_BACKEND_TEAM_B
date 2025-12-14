interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({ 
  title = "Azure Demand Forecasting & Capacity Optimization", 
  subtitle = "End-to-end insights across regions, resources, forecasts and capacity risk." 
}: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#0A3D62] via-[#0078D4] to-[#38BDF8] text-white border-b border-slate-800">
      <div className="px-6 py-12">
        <h1 className="text-4xl font-bold text-white text-balance">{title}</h1>
        <p className="text-black text-lg mt-2 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  )
}