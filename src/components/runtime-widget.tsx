"use client"

import { Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

const data = [
  { runtime: 24, fill: "hsl(var(--primary))" },
]

export function RuntimeWidget() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Runtime</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              barSize={10}
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 24]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                clockWise
                dataKey="runtime"
                cornerRadius={30}
                fill="hsl(var(--primary))"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-primary text-3xl font-bold"
              >
                {data[0].runtime}h
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <CardDescription className="text-center mt-2">Total runtime</CardDescription>
      </CardContent>
    </Card>
  )
}