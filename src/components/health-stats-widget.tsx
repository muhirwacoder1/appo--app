'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useConnection } from '@/context/ConnectionContext'
import { Heart, Thermometer } from 'lucide-react'

interface HealthStats {
  heartRate: number
  temperature: number
}

export function HealthStatsWidget() {
  const { isConnected } = useConnection()
  const [stats, setStats] = useState<HealthStats>({
    heartRate: 72,
    temperature: 36.6
  })

  // Function to generate random values
  const getRandomValue = (min: number, max: number, decimals: number = 0) => {
    const value = Math.random() * (max - min) + min
    return Number(value.toFixed(decimals))
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isConnected) {
      interval = setInterval(() => {
        setStats({
          heartRate: getRandomValue(60, 100),
          temperature: getRandomValue(35.5, 37.7, 1)
        })
      }, 5000)
    } else {
      // Reset to static values when disconnected
      setStats({
        heartRate: 72,
        temperature: 36.6
      })
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  return (
    <Card className="w-full bg-black text-white">
      <CardHeader className="p-3">
        <CardTitle className="text-center text-lg">
          Health Stats {isConnected ? '(Live)' : '(Not Connected)'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {/* Heart Rate */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div className="text-xl font-bold text-red-500">
                {stats.heartRate}
              </div>
            </div>
            <div className="text-xs text-gray-400">bpm</div>
            <div className="text-xs mt-1 text-red-500">Heart Rate</div>
            <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                style={{width: `${(stats.heartRate / 200) * 100}%`}}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-500" />
              <div className="text-xl font-bold text-blue-500">
                {stats.temperature}
              </div>
            </div>
            <div className="text-xs text-gray-400">°C</div>
            <div className="text-xs mt-1 text-blue-500">Temperature</div>
            <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{width: `${((stats.temperature - 35) / 5) * 100}%`}}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}