"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", variantA: 186, variantB: 80 },
  { month: "Feb", variantA: 305, variantB: 200 },
  { month: "Mar", variantA: 237, variantB: 320 },
  { month: "Apr", variantA: 373, variantB: 190 },
  { month: "May", variantA: 409, variantB: 330 },
  { month: "Jun", variantA: 514, variantB: 440 },
]

const chartConfig = {
  variantA: {
    label: "Variante A",
    color: "var(--chart-1)",
    icon: TrendingUp,
  },
  variantB: {
    label: "Variante B",
    color: "var(--chart-2)",
    icon: TrendingDown,
  },
} satisfies ChartConfig

export function MarketingChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Résultats des Tests A/B</CardTitle>
        <CardDescription>
          Comparaison des taux de conversion sur 6 mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="variantB"
              type="natural"
              fill="var(--color-variantB)"
              fillOpacity={0.4}
              stroke="var(--color-variantB)"
              stackId="a"
            />
            <Area
              dataKey="variantA"
              type="natural"
              fill="var(--color-variantA)"
              fillOpacity={0.4}
              stroke="var(--color-variantA)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Variante A performe 34% mieux <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Optimisation intelligente des CTA activée
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
