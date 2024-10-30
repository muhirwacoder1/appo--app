'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Thermometer } from 'lucide-react'

export function HealthStatsWidget() {
  const [healthValues, setHealthValues] = useState({
    heartRate: 72,
    temperature: 36.6
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthValues({
        heartRate: Math.floor(Math.random() * (85 - 65) + 65),
        temperature: Number((Math.random() * (37.2 - 36.2) + 36.2).toFixed(1))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const healthData = [
    { 
      label: "Heart Rate", 
      icon: Heart, 
      iconClass: "text-red-500",
      textClass: "text-red-500",
      bgClass: "bg-red-500",
      value: healthValues.heartRate, 
      unit: "bpm",
      maxValue: 120
    },
    { 
      label: "Temperature", 
      icon: Thermometer, 
      iconClass: "text-blue-500",
      textClass: "text-blue-500",
      bgClass: "bg-blue-500",
      value: healthValues.temperature, 
      unit: "°C",
      maxValue: 40
    }
  ]

  return (
    <Card className="w-full h-full bg-black text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-lg">Health Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {healthData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <item.icon className={`w-8 h-8 ${item.iconClass} mb-2`} />
              <div className={`text-2xl font-bold ${item.textClass}`}>
                {item.value}
              </div>
              <div className="text-xs text-gray-400">{item.unit}</div>
              <div className={`text-sm mt-1 ${item.textClass}`}>
                {item.label}
              </div>
              <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`${item.bgClass} h-1.5 rounded-full transition-all duration-300`} 
                  style={{
                    width: `${(item.value / item.maxValue) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}