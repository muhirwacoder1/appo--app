'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConnectionProvider, useConnection } from '@/context/ConnectionContext'
import { PageHeader } from '@/components/ui/page-header'

interface DeviceInfo {
  id: string;
  name: string;
  lastActive: string;
  isConnected: boolean;
}

interface LanguageOption {
  code: 'en' | 'rw';
  name: string;
  nativeName: string;
}

export default function SettingsPage() {
  const { isConnected, setIsConnected, setConnectionType } = useConnection()
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'rw'>('en')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  const [devices] = useState<DeviceInfo[]>([
    {
      id: '1',
      name: 'iPhone 12',
      lastActive: '2 hours ago',
      isConnected: false
    },
    {
      id: '2',
      name: 'MacBook Pro',
      lastActive: 'Active now',
      isConnected: true
    },
    {
      id: '3',
      name: 'iPad Air',
      lastActive: '1 day ago',
      isConnected: false
    }
  ])

  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' }
  ]

  const handleLanguageChange = (langCode: 'en' | 'rw') => {
    setCurrentLanguage(langCode)
  }

  const handleDeviceLogout = (deviceId: string) => {
    // Handle device logout logic here
    console.log(`Logging out device: ${deviceId}`)
  }

  const handleLogout = () => {
    setIsConnected(false)
    setConnectionType(null)
    window.location.href = '/login'
  }

  const translations = {
    en: {
      settings: 'Settings',
      language: 'Language',
      devices: 'Devices',
      logout: 'Log Out',
      logoutDesc: 'Are you sure you want to log out?',
      logoutConfirm: 'Log Out',
      cancel: 'Cancel'
    },
    rw: {
      settings: 'Igenamiterere',
      language: 'Ururimi',
      devices: 'Ibyuma',
      logout: 'Sohoka',
      logoutDesc: 'Uremeza ko ushaka gusohoka?',
      logoutConfirm: 'Sohoka',
      cancel: 'Reka'
    }
  }

  const t = translations[currentLanguage]

  return (
    <ConnectionProvider>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <PageHeader title={t.settings} />
          
          <div className="space-y-6">
            {/* Language Settings */}
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle>{t.language}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      variant={currentLanguage === lang.code ? "default" : "outline"}
                      className={`w-full ${
                        currentLanguage === lang.code 
                          ? "bg-blue-500 hover:bg-blue-600" 
                          : "text-white border-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>{lang.name}</span>
                        <span className="text-sm opacity-75">{lang.nativeName}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Devices Section */}
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">📱</span>
                  {t.devices}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div 
                      key={device.id}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{device.name}</h3>
                        <p className="text-gray-400 text-sm">{device.lastActive}</p>
                      </div>
                      <Button
                        onClick={() => handleDeviceLogout(device.id)}
                        variant="ghost"
                        className="text-white hover:bg-gray-800"
                      >
                        <span className="flex items-center">
                          <span className="mr-2">🔒</span>
                          Logout
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logout Section */}
            <Card className="bg-red-900 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{t.logout}</h3>
                    <p className="text-red-200 mt-1">{t.logoutDesc}</p>
                  </div>
                  <Button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {t.logoutConfirm}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logout Confirmation Dialog */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-red-900 p-6 rounded-lg max-w-md w-full mx-4">
                  <h2 className="text-xl font-bold text-white mb-4">{t.logout}</h2>
                  <p className="text-red-200 mb-6">{t.logoutDesc}</p>
                  <div className="flex justify-end space-x-4">
                    <Button
                      onClick={() => setShowLogoutConfirm(false)}
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-red-900"
                    >
                      {t.cancel}
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      {t.logoutConfirm}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ConnectionProvider>
  )
} 