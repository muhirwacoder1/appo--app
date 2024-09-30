'use client'

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"

export function DiabetesMonitorComponent() {
  const data = [
    {
      name: "Ulcer Risk",
      value: 65,
      fill: "hsl(var(--chart-1))"
    },
    {
      name: "Temperature",
      value: 80,
      fill: "hsl(var(--chart-2))"
    },
    {
      name: "Pressure",
      value: 45,
      fill: "hsl(var(--chart-3))"
    }
  ]

  // Convert Fahrenheit to Celsius
  const fahrenheit = 80
  const celsius = Math.round((fahrenheit - 32) * 5 / 9)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Diabetes Monitor</CardTitle>
        <CardDescription>Track factors affecting diabetic ulcers</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Pressure</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              45/100
              <span className="text-sm font-normal text-muted-foreground">
                mmHg
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Temperature</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {celsius}/100
              <span className="text-sm font-normal text-muted-foreground">
                °C
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Ulcer Risk</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              65/100
              <span className="text-sm font-normal text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto aspect-square w-full max-w-[50%]">
          <RadialBarChart
            width={200}
            height={200}
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={15}  // Adjusted from 30 to 15
              // Remove the barSize prop
            />
          </RadialBarChart>
        </div>
      </CardContent>
    </Card>
  )
}