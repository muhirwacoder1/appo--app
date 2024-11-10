'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ConnectionProvider } from '@/context/ConnectionContext'
import { PageHeader } from '@/components/ui/page-header'

interface Notification {
  id: string
  type: 'health' | 'alert' | 'activity'
  title: string
  message: string
  time: string
  icon: string
  color: string
}

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'health',
      title: 'Health Update',
      message: 'Your daily step goal has been achieved!',
      time: 'Just now',
      icon: '❤️',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Alert',
      message: 'Unusual pressure detected on your left foot.',
      time: '5 minutes ago',
      icon: '⚠️',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: '3',
      type: 'activity',
      title: 'Recent Activity',
      message: 'New health report available',
      time: '2 hours ago',
      icon: '📊',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: '4',
      type: 'activity',
      title: 'Recent Activity',
      message: 'Pressure anomaly detected',
      time: 'Yesterday',
      icon: '📈',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: '5',
      type: 'activity',
      title: 'Recent Activity',
      message: 'Weekly summary ready',
      time: '3 days ago',
      icon: '📅',
      color: 'bg-gray-100 text-gray-800'
    }
  ])

  return (
    <ConnectionProvider>
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <PageHeader title="Notifications" />
          
          {/* Health Update and Alert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">❤️</div>
                  <div>
                    <h3 className="font-semibold text-green-800">Health Update</h3>
                    <p className="text-green-700">Your daily step goal has been achieved!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <h3 className="font-semibold text-red-800">Alert</h3>
                    <p className="text-red-700">Unusual pressure detected on your left foot.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <span className="mr-2">📈</span>
                Recent Activity
              </h2>
            </div>
            <div className="divide-y">
              {notifications
                .filter(notif => notif.type === 'activity')
                .map(notification => (
                  <div key={notification.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                          {notification.message.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">
                          {notification.message}
                        </div>
                        <div className="text-sm text-gray-500">
                          {notification.time}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* All Notifications Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">All Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <Card key={notification.id} className={notification.color}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{notification.icon}</div>
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p>{notification.message}</p>
                        <p className="text-sm opacity-75 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConnectionProvider>
  )
} 