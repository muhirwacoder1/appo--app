'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useConnection } from '@/context/ConnectionContext'

interface PressureReading {
  label: string
  color: string
  value: number
}

interface WifiConfig {
  ssid: string
  password: string
}

interface BluetoothConfig {
  deviceName: string
}

export function PressureTrackerComponent() {
  const { isConnected, setIsConnected, setConnectionType, connectionType } = useConnection()
  const [readings, setReadings] = useState<PressureReading[]>([
    { label: "Heel", color: "blue", value: 120 },
    { label: "Middle", color: "yellow", value: 80 },
    { label: "Toe", color: "green", value: 90 }
  ])

  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('bg-green-500')
  const [wifiCredentials, setWifiCredentials] = useState<WifiConfig>({
    ssid: '',
    password: ''
  })
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothConfig>({
    deviceName: ''
  })
  const [isScanning, setIsScanning] = useState(false)
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false)

  // Function to generate random values
  const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Function to handle WiFi connection
  const handleWifiConnect = () => {
    if (wifiCredentials.ssid === 'appoltd' && wifiCredentials.password === 'appo12') {
      setIsConnected(true)
      setConnectionType('wifi')
      setNotificationMessage('Connected Successfully to WiFi')
      setNotificationColor('bg-green-500')
      setShowNotification(true)
    } else {
      setIsConnected(false)
      setConnectionType(null)
      setNotificationMessage('Invalid WiFi Credentials')
      setNotificationColor('bg-red-500')
      setShowNotification(true)
    }
    setTimeout(() => setShowNotification(false), 3000)
  }

  // Function to handle Bluetooth scanning
  const handleBluetoothScan = async () => {
    try {
      setIsScanning(true)
      setNotificationMessage('Scanning for Bluetooth devices...')
      setNotificationColor('bg-blue-500')
      setShowNotification(true)

      // Simulate Bluetooth scanning
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsScanning(false)
      setNotificationMessage('Found device: galaxyA54')
      setShowNotification(true)
      setBluetoothDevice({ deviceName: 'galaxyA54' })
      setTimeout(() => setShowNotification(false), 2000)
    } catch (error) {
      setIsScanning(false)
      setNotificationMessage('Bluetooth scanning failed')
      setNotificationColor('bg-red-500')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  // Function to handle Bluetooth connection
  const handleBluetoothConnect = () => {
    if (bluetoothDevice.deviceName === 'galaxyA54') {
      setIsBluetoothConnected(true)
      setIsConnected(true)
      setConnectionType('bluetooth')
      setNotificationMessage('Connected to galaxyA54')
      setNotificationColor('bg-green-500')
      setShowNotification(true)
    } else {
      setIsBluetoothConnected(false)
      setIsConnected(false)
      setConnectionType(null)
      setNotificationMessage('Invalid device name. Please use galaxyA54')
      setNotificationColor('bg-red-500')
      setShowNotification(true)
    }
    setTimeout(() => setShowNotification(false), 3000)
  }

  // Update readings every 5 seconds when connected
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isConnected) {
      interval = setInterval(() => {
        if (connectionType === 'bluetooth') {
          // Bluetooth connection: values between 30-40
          setReadings([
            { label: "Heel", color: "blue", value: getRandomValue(30, 40) },
            { label: "Middle", color: "yellow", value: getRandomValue(30, 40) },
            { label: "Toe", color: "green", value: getRandomValue(30, 40) }
          ])
        } else {
          // WiFi connection: original ranges
          setReadings([
            { label: "Heel", color: "blue", value: getRandomValue(100, 140) },
            { label: "Middle", color: "yellow", value: getRandomValue(70, 90) },
            { label: "Toe", color: "green", value: getRandomValue(80, 100) }
          ])
        }
      }, 5000)
    } else {
      // Reset to static values when disconnected
      setReadings([
        { label: "Heel", color: "blue", value: 120 },
        { label: "Middle", color: "yellow", value: 80 },
        { label: "Toe", color: "green", value: 90 }
      ])
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected, connectionType])

  return (
    <div className="flex flex-col gap-6">
      {/* WiFi Connection Section */}
      <Card className="w-full bg-black text-white">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">WiFi Connection</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-2">WiFi Network Name (SSID)</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={wifiCredentials.ssid}
                onChange={(e) => setWifiCredentials(prev => ({ ...prev, ssid: e.target.value }))}
                placeholder="Enter WiFi network name"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">WiFi Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={wifiCredentials.password}
                onChange={(e) => setWifiCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter WiFi password"
              />
            </div>
            <button
              onClick={handleWifiConnect}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Connect to WiFi
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Bluetooth Connection Section */}
      <Card className="w-full bg-black text-white">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Bluetooth Connection</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-2">Bluetooth Device</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={bluetoothDevice.deviceName}
                onChange={(e) => setBluetoothDevice({ deviceName: e.target.value })}
                placeholder="Enter device name or select from scan"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBluetoothScan}
                disabled={isScanning}
                className="flex-1 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Scan for Devices'}
              </button>
              <button
                onClick={handleBluetoothConnect}
                className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Connect to Device
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pressure Readings Card */}
      <Card className="w-full h-full bg-black text-white">
        <CardHeader className="p-4">
          <CardTitle className="text-center text-lg">
            Pressure Readings {isConnected ? '(Live)' : '(Not Connected)'}
          </CardTitle>
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

      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 p-3 ${notificationColor} text-white rounded-md shadow-lg transition-all duration-300`}>
          {notificationMessage}
        </div>
      )}
    </div>
  )
}