"use client"

import { GaugeCircle } from "lucide-react"
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { pressure: 760, fill: "hsl(var(--primary))" },
]

export function Component() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GaugeCircle className="h-5 w-5" />
          Overall Pressure
        </CardTitle>
        <CardDescription>Per Hour</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="aspect-square w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={250}
              innerRadius="80%"
              outerRadius="100%"
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
              />
              <PolarRadiusAxis
                tick={false}
                tickLine={false}
                axisLine={false}
              />
              <RadialBar
                dataKey="pressure"
                background
                cornerRadius={10}
                fill="hsl(var(--primary))"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-primary text-4xl font-bold"
              >
                {chartData[0].pressure}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-sm"
              >
                mmHg
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}