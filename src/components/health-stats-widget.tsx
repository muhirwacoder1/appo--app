'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useConnection } from '@/context/ConnectionContext'

interface HealthStats {
  heartRate: number;
  temperature: number;
}

export function HealthStatsWidget() {
  const { isConnected, connectionType } = useConnection()
  const [stats, setStats] = useState<HealthStats>({
    heartRate: 72,
    temperature: 36.6
  })

  // Update readings based on connection type
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isConnected) {
      interval = setInterval(() => {
        if (connectionType === 'bluetooth') {
          // Bluetooth connection: smaller variations
          setStats({
            heartRate: 72 + Math.floor(Math.random() * 5),
            temperature: 36.6 + (Math.random() * 0.2)
          })
        } else {
          // WiFi connection: larger variations
          setStats({
            heartRate: 72 + Math.floor(Math.random() * 10),
            temperature: 36.6 + (Math.random() * 0.4)
          })
        }
      }, 5000)
    } else {
      // Reset to default values when disconnected
      setStats({
        heartRate: 72,
        temperature: 36.6
      })
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected, connectionType])

  return (
    <Card className="w-full bg-black text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-lg">Health Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Heart Rate */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">{stats.heartRate}</div>
            <div className="text-sm text-gray-400">bpm</div>
            <div className="text-sm mt-1">Heart Rate</div>
            <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                style={{width: `${(stats.heartRate / 100) * 100}%`}}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">{stats.temperature.toFixed(1)}</div>
            <div className="text-sm text-gray-400">°C</div>
            <div className="text-sm mt-1">Temperature</div>
            <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{width: `${((stats.temperature - 35) / 3) * 100}%`}}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}