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
  const { isConnected, connectionType } = useConnection()
  const [stats, setStats] = useState<HealthStats>({
    heartRate: 72,
    temperature: 36.6
  })
  const [isFlashing, setIsFlashing] = useState(false)

  // Function to generate random values
  const getRandomValue = (min: number, max: number, decimals: number = 0) => {
    const value = Math.random() * (max - min) + min
    return Number(value.toFixed(decimals))
  }

  // Function to calculate progress bar width based on connection type
  const calculateTemperatureWidth = (value: number): string => {
    if (connectionType === 'bluetooth') {
      return `${((value - 42) / (49 - 42)) * 100}%`
    } else {
      return `${((value - 35.5) / (37.7 - 35.5)) * 100}%`
    }
  }

  // Flash effect for WiFi connection
  useEffect(() => {
    let flashInterval: NodeJS.Timeout | null = null
    if (isConnected && connectionType === 'wifi') {
      flashInterval = setInterval(() => {
        setIsFlashing(prev => !prev)
      }, 1000)
    } else {
      setIsFlashing(false)
    }

    return () => {
      if (flashInterval) clearInterval(flashInterval)
    }
  }, [isConnected, connectionType])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isConnected) {
      interval = setInterval(() => {
        setStats(prev => ({
          heartRate: connectionType === 'bluetooth' ? 0 : getRandomValue(60, 100),
          temperature: connectionType === 'bluetooth' 
            ? getRandomValue(42, 49, 1)
            : getRandomValue(35.5, 37.7, 1)
        }))
      }, 5000)
    } else {
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
      <CardHeader className="p-3">
        <CardTitle className="text-center text-lg">
          Health Stats {isConnected ? `(${connectionType === 'bluetooth' ? 'Bluetooth' : 'WiFi'})` : '(Not Connected)'}
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
              <Thermometer className={`h-5 w-5 ${connectionType === 'bluetooth' ? 'text-red-500' : 'text-blue-500'}`} />
              <div className={`text-xl font-bold flex items-center gap-2 ${
                connectionType === 'bluetooth' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stats.temperature}
                {connectionType === 'wifi' && (
                  <div className={`h-2 w-2 rounded-full ${isFlashing ? 'bg-red-500' : 'bg-transparent'}`}
                       style={{ transition: 'background-color 0.3s ease-in-out' }} />
                )}
              </div>
            </div>
            <div className="text-xs text-gray-400">°C</div>
            <div className={`text-xs mt-1 ${connectionType === 'bluetooth' ? 'text-red-500' : 'text-blue-500'}`}>
              Temperature
            </div>
            <div className="w-full mt-2 bg-gray-700 rounded-full h-1.5">
              <div 
                className={`${connectionType === 'bluetooth' ? 'bg-red-500' : 'bg-blue-500'} h-1.5 rounded-full transition-all duration-300`}
                style={{width: calculateTemperatureWidth(stats.temperature)}}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}