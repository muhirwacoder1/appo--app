'use client'

import { PageHeader } from '@/components/ui/page-header'
import { ConnectionProvider } from '@/context/ConnectionContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  time: string;
  meetLink: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Wilson',
      date: '2024-03-20',
      time: '10:00 AM',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'approved'
    }
  ])
  const [showBooking, setShowBooking] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    date: '',
    time: ''
  })

  const handleBookAppointment = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      doctorName: newAppointment.doctorName,
      date: newAppointment.date,
      time: newAppointment.time,
      meetLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
      status: 'pending'
    }

    setAppointments([...appointments, appointment])
    setShowBooking(false)
    setNewAppointment({ doctorName: '', date: '', time: '' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'approved': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <ConnectionProvider>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <PageHeader title="Appointments" />
            <Button 
              onClick={() => setShowBooking(true)}
              className="bg-black text-white hover:bg-gray-800"
            >
              Book New Appointment
            </Button>
          </div>

          {/* Booking Form */}
          {showBooking && (
            <Card className="mb-6 bg-black text-white">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Doctor Name</label>
                    <Input
                      value={newAppointment.doctorName}
                      onChange={(e) => setNewAppointment({
                        ...newAppointment,
                        doctorName: e.target.value
                      })}
                      className="bg-gray-800 text-white border-gray-700"
                      placeholder="Enter doctor's name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Date</label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({
                        ...newAppointment,
                        date: e.target.value
                      })}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Time</label>
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({
                        ...newAppointment,
                        time: e.target.value
                      })}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleBookAppointment}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Request Appointment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowBooking(false)}
                      className="text-white border-white hover:bg-white hover:text-black"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="bg-black text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                      <p className="text-gray-400">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {' '}at {appointment.time}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${getStatusColor(appointment.status)} text-white`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'approved' && (
                        <Button
                          onClick={() => window.open(appointment.meetLink, '_blank')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Join Meeting
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-black"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ConnectionProvider>
  )
} 