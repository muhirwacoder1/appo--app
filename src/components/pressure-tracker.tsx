'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PressureReading {
  label: string
  color: string
  value: number
}

export function PressureTrackerComponent() {
  const [readings, setReadings] = useState<PressureReading[]>([
    { label: "Heel", color: "blue", value: 120 },
    { label: "Middle", color: "yellow", value: 80 },
    { label: "Toe", color: "green", value: 90 }
  ])

  // Function to generate random number within a range
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings([
        { label: "Heel", color: "blue", value: getRandomNumber(100, 140) },
        { label: "Middle", color: "yellow", value: getRandomNumber(70, 90) },
        { label: "Toe", color: "green", value: getRandomNumber(80, 100) }
      ])
    }, 5000)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full h-full bg-black text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-lg">Pressure Readings</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {readings.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`text-xl font-bold text-${item.color}-500`}>
                {item.value}
              </div>
              <div className="text-xs text-gray-400">mmHg</div>
              <div className={`text-xs mt-1 text-${item.color}-500`}>
                {item.label}
              </div>
              <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`bg-${item.color}-500 h-1.5 rounded-full transition-all duration-300`} 
                  style={{width: `${(item.value / 150) * 100}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}