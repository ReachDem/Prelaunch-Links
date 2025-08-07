"use client"

import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const revenueData = [
  {
    quarter: "Q1",
    traditional: 3200,
    intelligent: 4800,
  },
  {
    quarter: "Q2", 
    traditional: 3800,
    intelligent: 6200,
  },
  {
    quarter: "Q3",
    traditional: 3500,
    intelligent: 7400,
  },
  {
    quarter: "Q4",
    traditional: 4200,
    intelligent: 8600,
  },
]

const chartConfig = {
  traditional: {
    label: "Liens Traditionnels",
    color: "var(--chart-1)",
    icon: ArrowDown,
  },
  intelligent: {
    label: "Liens Intelligents", 
    color: "var(--chart-2)",
    icon: ArrowUp,
  },
} satisfies ChartConfig

export function EnterpriseChart() {
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.intelligent, 0)
  const growth = ((revenueData[3].intelligent - revenueData[0].intelligent) / revenueData[0].intelligent * 100).toFixed(1)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Analyse de Croissance du Chiffre d'Affaires
        </CardTitle>
        <CardDescription>
          Comparaison trimestrielle : Liens Traditionnels vs Liens Intelligents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={revenueData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="traditional"
              fill="var(--color-traditional)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="intelligent"
              fill="var(--color-intelligent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div className="flex items-center justify-between pt-4 text-sm">
          <div className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="font-medium">{growth}% de croissance</span>
            <span className="text-muted-foreground">avec les liens intelligents</span>
          </div>
          <div className="text-right">
            <div className="font-medium">${(totalRevenue / 1000).toFixed(1)}k</div>
            <div className="text-muted-foreground text-xs">Chiffre d'affaires total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
