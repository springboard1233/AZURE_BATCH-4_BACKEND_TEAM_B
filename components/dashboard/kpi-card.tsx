import { Card, CardContent } from "@/components/ui/card"

interface KPICardProps {
  title: string
  value: string
  subtitle: string
  icon?: React.ReactNode
}

export default function KPICard({ title, value, subtitle, icon }: KPICardProps) {
  return (
    <Card className="
      bg-slate-900/60 
      backdrop-blur-xl 
      border border-slate-800 
      shadow-lg 
      hover:shadow-blue-500/20 
      hover:border-blue-400/40 
      transition-all 
      duration-300 
      rounded-xl
    ">
      <CardContent className="p-6">
        <div className="space-y-4">
          
          {/* Title + Icon */}
          <div className="flex items-center gap-2">
            {icon && <div className="text-blue-400">{icon}</div>}
            <h3 className="text-sm font-semibold text-slate-300">
              {title}
            </h3>
          </div>

          {/* Value */}
          <p className="
            text-4xl 
            font-extrabold 
            bg-gradient-to-r 
            from-blue-400 
            to-cyan-300 
            bg-clip-text 
            text-transparent
          ">
            {value}
          </p>

          {/* Subtitle */}
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}
