"use client"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart as AreaChartRoot, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Document } from "@/generated/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
interface AreaChartProps {
  title: string
  description: string
  data: Array<Document>
  height?: number
  showYAxis?: boolean
  showGrid?: boolean
  gradientColors?: {
    start: string
    end: string
  }
  strokeColor?: string
  strokeWidth?: number
  fillOpacity?: number
  showTrend?: boolean
  trendValue?: number
  trendPeriod?: string
  className?: string
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink' | 'indigo'
}
// Predefined color schemes with enhanced gradients
const colorSchemes = {
  primary: {
    start: "hsl(221, 83%, 63%)",
    mid: "hsl(221, 83%, 53%)",
    end: "hsl(221, 83%, 53% / 0.1)",
    stroke: "hsl(221, 83%, 53%)",
    trend: "text-blue-600",
    className: "from-blue-500/10 to-blue-500/5"
  },
  success: {
    start: "hsl(142, 76%, 46%)",
    mid: "hsl(142, 76%, 36%)",
    end: "hsl(142, 76%, 36% / 0.1)",
    stroke: "hsl(142, 76%, 36%)",
    trend: "text-green-600",
    className: "from-green-500/10 to-green-500/5"
  },
  warning: {
    start: "hsl(38, 96%, 60%)",
    mid: "hsl(38, 96%, 50%)",
    end: "hsl(38, 96%, 50% / 0.1)",
    stroke: "hsl(38, 96%, 50%)",
    trend: "text-yellow-600",
    className: "from-yellow-500/10 to-yellow-500/5"
  },
  danger: {
    start: "hsl(0, 91%, 70%)",
    mid: "hsl(0, 84%, 60%)",
    end: "hsl(0, 84%, 60% / 0.1)",
    stroke: "hsl(0, 84%, 60%)",
    trend: "text-red-600",
    className: "from-red-500/10 to-red-500/5"
  },
  info: {
    start: "hsl(199, 98%, 58%)",
    mid: "hsl(199, 89%, 48%)",
    end: "hsl(199, 89%, 48% / 0.1)",
    stroke: "hsl(199, 89%, 48%)",
    trend: "text-cyan-600",
    className: "from-cyan-500/10 to-cyan-500/5"
  },
  purple: {
    start: "hsl(262, 83%, 68%)",
    mid: "hsl(262, 83%, 58%)",
    end: "hsl(262, 83%, 58% / 0.1)",
    stroke: "hsl(262, 83%, 58%)",
    trend: "text-purple-600",
    className: "from-purple-500/10 to-purple-500/5"
  },
  pink: {
    start: "hsl(330, 81%, 70%)",
    mid: "hsl(330, 81%, 60%)",
    end: "hsl(330, 81%, 60% / 0.1)",
    stroke: "hsl(330, 81%, 60%)",
    trend: "text-pink-600",
    className: "from-pink-500/10 to-pink-500/5"
  },
  indigo: {
    start: "hsl(239, 84%, 77%)",
    mid: "hsl(239, 84%, 67%)",
    end: "hsl(239, 84%, 67% / 0.1)",
    stroke: "hsl(239, 84%, 67%)",
    trend: "text-indigo-600",
    className: "from-indigo-500/10 to-indigo-500/5"
  }
}

export function DocumentsAreaChart({
  title,
  description,
  data,
  height = 300,
  showYAxis = true,
  showGrid = true,
  gradientColors,
  strokeColor,
  strokeWidth = 2,
  showTrend = true,
  trendValue = 5.2,
  trendPeriod = "January - June 2024",
  className,
  colorScheme = 'primary'
}: AreaChartProps) {
  // Calculate trend direction
  const isTrendingUp = trendValue >= 0
  const TrendIcon = isTrendingUp ? TrendingUp : TrendingDown
  const [chartDisplayConfig,setChartDisplayConfig] = useState({
    tickLine:false,
    axisLine:false
  })
  // Use color scheme or custom colors with enhanced gradient support
  const colors = gradientColors ? {
    start: gradientColors.start,
    mid: gradientColors.start,
    end: gradientColors.end,
    stroke: strokeColor || gradientColors.start,
    trend: isTrendingUp ? "text-green-600" : "text-red-600",
    className: ""
  } : colorSchemes[colorScheme]
  const [documentGroupCriteria,setDocumentGroupCriteria] = useState<"day"|"week"|"month"|"year">("day")
  // Generate unique gradient ID
  const gradientId = `area-gradient-${Math.random().toString(36).substr(2, 9)}`
  // Process the data to count items per xValue
  const chartData = data.map(item => ({
    name: item.createdAt,
    value: Number(item.views), // Ensure this is a number
    date: item.createdAt // Or any other date field you want to use
  }));
  const documentGroupData = chartData.reduce((acc, doc) => {
    const date = new Date(doc.date);
    const groupKey = documentGroupCriteria === "day" ? date.toDateString() :
      documentGroupCriteria === "week" ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) :
        documentGroupCriteria === "month" ? date.toLocaleDateString("en-US", { year: "numeric", month: "short" }) :
          date.getFullYear().toString();
    if (!acc[groupKey]) {
      acc[groupKey] = { count: 0 };
    }
    acc[groupKey].count++;
    return acc;
  }, {} as Record<string, { count: number }>)
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="tickLine"
              checked={chartDisplayConfig.tickLine}
              onChange={()=>setChartDisplayConfig({...chartDisplayConfig,tickLine:!chartDisplayConfig.tickLine})}
              />
            <Label htmlFor="tickLine" className="text-sm font-medium">Tick Line</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="axisLine"
              checked={chartDisplayConfig.axisLine} 
              onChange={()=>setChartDisplayConfig({...chartDisplayConfig,axisLine:!chartDisplayConfig.axisLine})}
            />
            <Label htmlFor="axisLine" className="text-sm font-medium">Axis Line</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="documentGroupCriteria" className="text-sm font-medium">Group By</Label>
            <Select
              value={documentGroupCriteria}
              onValueChange={(e)=>setDocumentGroupCriteria(e as "day"|"week"|"month"|"year")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a group by option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer 
          config={{
            desktop: {
              label: "Desktop",
              color: colors.stroke,
            },
          }}
          className="w-full"
        >
          <ResponsiveContainer width="100%" height={height}>
            <AreaChartRoot
              data={Object.entries(documentGroupData).map(([name, { count }]) => ({ name, count }))}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke="hsl(var(--border) / 0.2)"
                  strokeOpacity={0.5}
                  strokeWidth={strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tickLine={chartDisplayConfig.tickLine}
                axisLine={chartDisplayConfig.axisLine}
                tickMargin={8}
                strokeWidth={strokeWidth}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground) / 0.8)" }}
                tickFormatter={(value) => {
                  if (typeof value === 'string') {
                    return value.length > 3 ? value.slice(0, 3) : value
                  }
                  return value.toString()
                }}
              />
              {showYAxis && (
                <YAxis
                  dataKey="count"
                  tickLine={chartDisplayConfig.tickLine}
                  axisLine={chartDisplayConfig.axisLine}
                  tickMargin={8}
                  strokeWidth={strokeWidth}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground) / 0.8)" }}
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `${(value / 1000).toFixed(1)}k`
                    }
                    return value.toString()
                  }}
                />
              )}
              <ChartTooltip 
                cursor={{ 
                  stroke: colors.stroke, 
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                  strokeOpacity: 0.5
                }} 
                content={<ChartTooltipContent />} 
              />
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.start} stopOpacity={0.8} />
                  <stop offset="80%" stopColor={colors.end} stopOpacity={0.2} />
                </linearGradient>
                <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <Area
                type="monotone"
                dataKey="count"
                fill={`url(#${gradientId})`}
                fillOpacity={0.8}
                stroke={colors.stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={{
                  fill: "#fff",
                  stroke: colors.stroke,
                  strokeWidth: 2,
                  r: 4,
                  fillOpacity: 1,
                }}
                activeDot={{
                  fill: "#fff",
                  stroke: colors.stroke,
                  strokeWidth: 2,
                  r: 6,
                }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChartRoot>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {showTrend && (
        <CardFooter>
          <div className="flex items-start w-full gap-2 text-sm">
            <div className="grid gap-2">
              <div className={`flex items-center gap-2 leading-none font-medium ${colors.trend}`}>
                Trending {isTrendingUp ? 'up' : 'down'} by {Math.abs(trendValue)}% this period
                <TrendIcon className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {trendPeriod}
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}