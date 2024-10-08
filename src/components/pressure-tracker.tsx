'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PressureTrackerComponent() {
  return (
    <Card className="w-full h-full bg-black text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-lg">Pressure Readings</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Heel", color: "blue", value: 120 },
            { label: "Middle", color: "yellow", value: 80 },
            { label: "Toe", color: "green", value: 90 }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`text-xl font-bold text-${item.color}-500`}>{item.value}</div>
              <div className="text-xs text-gray-400">mmHg</div>
              <div className={`text-xs mt-1 text-${item.color}-500`}>{item.label}</div>
              <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`bg-${item.color}-500 h-1.5 rounded-full`} 
                  style={{width: `${(item.value / 150) * 100}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}