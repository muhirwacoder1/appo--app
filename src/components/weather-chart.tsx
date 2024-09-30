"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', temperature: 20, pressure: 1013 },
  { time: '03:00', temperature: 19, pressure: 1012 },
  { time: '06:00', temperature: 18, pressure: 1011 },
  { time: '09:00', temperature: 22, pressure: 1010 },
  { time: '12:00', temperature: 26, pressure: 1009 },
  { time: '15:00', temperature: 28, pressure: 1008 },
  { time: '18:00', temperature: 25, pressure: 1009 },
  { time: '21:00', temperature: 22, pressure: 1011 },
]

export function WeatherChartComponent() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-black text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Weather Data</CardTitle>
        <CardDescription>Temperature and pressure changes over the day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="time" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} hPa`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="#FFD700"
                strokeWidth={2}
                dot={{ fill: '#FFD700', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pressure"
                stroke="#8B8000"
                strokeWidth={2}
                dot={{ fill: '#8B8000', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}