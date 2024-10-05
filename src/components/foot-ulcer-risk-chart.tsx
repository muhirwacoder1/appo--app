"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { hour: "00:00", heel: 30, middle: 40, toe: 50 },
  { hour: "01:00", heel: 35, middle: 45, toe: 55 },
  { hour: "02:00", heel: 40, middle: 50, toe: 60 },
  { hour: "03:00", heel: 45, middle: 55, toe: 65 },
  { hour: "04:00", heel: 50, middle: 60, toe: 70 },
  { hour: "05:00", heel: 55, middle: 65, toe: 75 },
  { hour: "06:00", heel: 60, middle: 70, toe: 80 },
  { hour: "07:00", heel: 65, middle: 75, toe: 85 },
  // Add more hours as needed
]

export function FootUlcerRiskChart() {
  return (
    <Card className="w-full bg-black text-white">
      <CardHeader>
        <CardTitle className="text-center">Foot Ulcer Risk Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="hour" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="heel" fill="#3b82f6" name="Heel" barSize={10} />
            <Bar dataKey="middle" fill="#eab308" name="Middle" barSize={10} />
            <Bar dataKey="toe" fill="#22c55e" name="Toe" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}