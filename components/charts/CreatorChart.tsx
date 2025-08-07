"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const engagementData = [
  { platform: "instagram", engagement: 1243, fill: "var(--color-instagram)" },
  { platform: "youtube", engagement: 687, fill: "var(--color-youtube)" },
  { platform: "tiktok", engagement: 523, fill: "var(--color-tiktok)" },
  { platform: "twitter", engagement: 234, fill: "var(--color-twitter)" },
  { platform: "linkedin", engagement: 160, fill: "var(--color-linkedin)" },
]

const chartConfig = {
  engagement: {
    label: "Engagement",
  },
  instagram: {
    label: "Instagram",
    color: "var(--chart-1)",
  },
  youtube: {
    label: "YouTube",
    color: "var(--chart-2)",
  },
  tiktok: {
    label: "TikTok",
    color: "var(--chart-3)",
  },
  twitter: {
    label: "Twitter",
    color: "var(--chart-4)",
  },
  linkedin: {
    label: "LinkedIn",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function CreatorChart() {
  const id = "creator-engagement"
  const [activePlatform, setActivePlatform] = React.useState(engagementData[0].platform)

  const activeIndex = React.useMemo(
    () => engagementData.findIndex((item) => item.platform === activePlatform),
    [activePlatform]
  )
  const platforms = React.useMemo(() => engagementData.map((item) => item.platform), [])

  return (
    <Card data-chart={id} className="flex flex-col w-full">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Engagement du Contenu</CardTitle>
          <CardDescription>Interactions multi-plateformes des liens</CardDescription>
        </div>
        <Select value={activePlatform} onValueChange={setActivePlatform}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Sélectionner une plateforme"
          >
            <SelectValue placeholder="Sélectionner plateforme" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {platforms.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={engagementData}
              dataKey="engagement"
              nameKey="platform"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {engagementData[activeIndex].engagement.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clics
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
