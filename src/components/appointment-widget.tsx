'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Appointment {
  id: string
  patientName: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export function AppointmentWidget() {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'upcoming'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      date: '2024-03-21',
      time: '2:30 PM',
      status: 'upcoming'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      date: '2024-03-19',
      time: '11:00 AM',
      status: 'completed'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="w-full bg-black text-white">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          + New Appointment
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-900"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    {appointment.patientName.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{appointment.patientName}</h4>
                  <p className="text-gray-400">
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {' '}at {appointment.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                <Button variant="ghost" className="text-white hover:bg-gray-800">
                  •••
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 