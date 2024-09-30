"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

const chartData = [
  { hour: "00:00", risk: 2 },
  { hour: "04:00", risk: 1 },
  { hour: "08:00", risk: 3 },
  { hour: "12:00", risk: 5 },
  { hour: "16:00", risk: 4 },
  { hour: "20:00", risk: 3 },
]

const chartConfig = {
  risk: {
    label: "Risk",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function FootUlcerRiskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Foot Ulcer Risk Over 24 Hours</CardTitle>
        <CardDescription>Risk level (1-5) at different times of day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
            barSize={30}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="risk" fill="var(--color-risk)" radius={4}>
              <LabelList
                dataKey="risk"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}