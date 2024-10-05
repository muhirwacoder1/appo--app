'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Thermometer } from 'lucide-react'

export function HealthStatsWidget() {
  return (
    <Card className="w-full h-full bg-black text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-lg">Health Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Heart Rate", icon: Heart, color: "red", value: 72, unit: "bpm" },
            { label: "Temperature", icon: Thermometer, color: "blue", value: 36.6, unit: "°C" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <item.icon className={`w-8 h-8 text-${item.color}-500 mb-2`} />
              <div className={`text-2xl font-bold text-${item.color}-500`}>{item.value}</div>
              <div className="text-xs text-gray-400">{item.unit}</div>
              <div className={`text-sm mt-1 text-${item.color}-500`}>{item.label}</div>
              <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`bg-${item.color}-500 h-1.5 rounded-full`} 
                  style={{width: `${(item.value / (item.label === "Heart Rate" ? 120 : 40)) * 100}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}