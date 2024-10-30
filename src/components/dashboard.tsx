'use client'

import { useState, useEffect } from 'react'
import { Bell, LogOut, Search, Settings, User, Thermometer, Clock, Gauge, Wifi, Bluetooth, Heart, AlertCircle, Activity, Link as LinkIcon, Calendar as CalendarIcon, Video, Users, Camera, Moon, Sun, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Lock, Globe, Shield, Smartphone } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { FootUlcerRiskChart } from "@/components/foot-ulcer-risk-chart"

import { PressureTrackerComponent } from "@/components/pressure-tracker"
import { FootprintWidgetComponent } from "@/components/footprint-widget"
import { HealthStatsWidget } from "@/components/health-stats-widget"

const CircularProgress = ({ value, max, icon: Icon, label, unit }: { 
  value: number; 
  max: number; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  unit: string 
}) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <svg className="w-24 h-24">
        <circle
          className="text-gray-200 dark:text-gray-700 stroke-current"
          strokeWidth="5"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-primary stroke-current"
          strokeWidth="5"
          strokeDasharray={2 * Math.PI * 45}
          strokeDashoffset={2 * Math.PI * 45 * (1 - value / max)}
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary" />
      </div>
    </div>
    <div className="mt-2 text-center">
      <div className="text-2xl font-semibold text-primary">{value}{unit}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  </div>
)

const ProfileContent = () => {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [location, setLocation] = useState('New York, USA')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg')

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <TabsTrigger value="personal" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Personal Info</TabsTrigger>
        <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Security</TabsTrigger>
        <TabsTrigger value="preferences" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Image 
                  src={profilePicture} 
                  alt="Profile" 
                  width={100} 
                  height={100} 
                  className="rounded-full border-4 border-primary"
                />
                <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/80 transition-colors duration-200">
                  <Camera className="h-4 w-4" />
                  <input 
                    id="profile-picture-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click the camera icon to change your profile picture</p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 dark:bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 dark:bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-50 dark:bg-gray-700" />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Last password change</span>
                <span className="text-gray-500 dark:text-gray-400">30 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Two-factor authentication</span>
                <Switch checked={true} />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="preferences">
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">User Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
                  <span className="text-gray-700 dark:text-gray-300">Theme</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-700 dark:text-gray-300">Language</Label>
                <select id="language" className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

interface NotificationCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ icon: Icon, title, description, color }) => (
  <Card className={`overflow-hidden ${color} shadow-md hover:shadow-lg transition-shadow duration-200`}>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${color.replace('bg-', 'bg-opacity-20')} ${color.replace('bg-', 'text-')}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const NotificationsContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-6">Notifications</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NotificationCard
        icon={Heart}
        title="Health Update"
        description="Your daily step goal has been achieved!"
        color="bg-green-100 dark:bg-green-900"
      />
      <NotificationCard
        icon={AlertCircle}
        title="Alert"
        description="Unusual pressure detected on your left foot."
        color="bg-red-100 dark:bg-red-900"
      />
    </div>

    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-6 w-6" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {[
            { icon: Heart, text: "New health report available", time: "2 hours ago" },
            { icon: AlertCircle, text: "Pressure anomaly detected", time: "Yesterday" },
            { icon: Bell, text: "Weekly summary ready", time: "3 days ago" },
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="bg-primary bg-opacity-10 p-2 rounded-full">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>All Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Health Updates", icon: Heart, color: "from-green-100 to-green-200" },
            { name: "Alerts", icon: AlertCircle, color: "from-red-100 to-red-200" },
            { name: "System Notifications", icon: Bell, color: "from-blue-100 to-blue-200" },
          ].map((item, index) => (
            <BentoCard
              key={index}
              name={item.name}
              className="col-span-1"
              background={<div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />}
              Icon={item.icon}
              description={`View all your ${item.name.toLowerCase()}`}
              href="#"
              cta="View"
            />
          ))}
        </BentoGrid>
      </CardContent>
    </Card>
  </div>
)

const AppointmentContent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [meetingType, setMeetingType] = useState("zoom")

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Schedule an Appointment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select a Doctor</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                  <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Meeting Type</Label>
              <RadioGroup defaultValue="zoom" onValueChange={setMeetingType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zoom" id="zoom" />
                  <Label htmlFor="zoom">Zoom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google-meet" id="google-meet" />
                  <Label htmlFor="google-meet">Google Meet</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full">
              {meetingType === 'zoom' ? <Video className="mr-2 h-4 w-4" /> : <Users className="mr-2 h-4 w-4" />}
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {[
              { doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM", type: "Zoom" },
              { doctor: "Dr. Johnson", date: "2023-06-20", time: "2:30 PM", type: "Google Meet" },
            ].map((appointment, index) => (
              <li key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{appointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(appointment.date), "MMMM d, yyyy")} at {appointment.time}
                  </p>
                </div>
                <div className="flex items-center">
                  {appointment.type === "Zoom" ? (
                    <Video className="mr-2 h-4 w-4" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  <span>{appointment.type}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

const SettingsContent = () => {
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('en')
  const [fontSize, setFontSize] = useState(16)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Moon className="mr-2 h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="font-size">Font Size</Label>
              <span>{fontSize}px</span>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notifications"
              checked={notifications}
              onCheckedChange={(checked: boolean) => setNotifications(checked)}
            />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
          <div className="pl-6 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" disabled={!notifications} />
              <Label htmlFor="email-notifications" className={!notifications ? 'text-muted-foreground' : ''}>
                Email notifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push-notifications" disabled={!notifications} />
              <Label htmlFor="push-notifications" className={!notifications ? 'text-muted-foreground' : ''}>
                Push notifications
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password</Label>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="mr-2 h-5 w-5" />
            Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {[
              { name: "iPhone 12", lastActive: "2 hours ago" },
              { name: "MacBook Pro", lastActive: "Active now" },
              { name: "iPad Air", lastActive: "1 day ago" },
            ].map((device, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-muted-foreground">{device.lastActive}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

const ConnectContent = () => {
  const [connectMethod, setConnectMethod] = useState<'wifi' | 'bluetooth' | null>(null)

  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Connect Device</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <Card className={`cursor-pointer transition-all ${connectMethod === 'wifi' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setConnectMethod('wifi')}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wifi className="mr-2 h-5 w-5" />
              Connect via WiFi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base">Connect your device using your local WiFi network.</p>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer transition-all ${connectMethod === 'bluetooth' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setConnectMethod('bluetooth')}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bluetooth className="mr-2 h-5 w-5" />
              Connect via Bluetooth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base">Connect your device using Bluetooth.</p>
          </CardContent>
        </Card>
      </div>

      {connectMethod && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{connectMethod === 'wifi' ? 'WiFi Connection' : 'Bluetooth Connection'}</CardTitle>
          </CardHeader>
          <CardContent>
            {connectMethod === 'wifi' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ssid">WiFi Network Name (SSID)</Label>
                  <Input id="ssid" placeholder="Enter WiFi network name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">WiFi Password</Label>
                  <Input id="password" type="password" placeholder="Enter WiFi password" />
                </div>
                <Button className="w-full">Connect to WiFi</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Searching for nearby Bluetooth devices...</p>
                <ul className="space-y-2">
                  {['Device 1', 'Device 2', 'Device 3'].map((device, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-accent/10 rounded">
                      <span>{device}</span>
                      <Button size="sm">Connect</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function DashboardComponent() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [userName, setUserName] = useState('Moni Roy')
  const [isEditingName, setIsEditingName] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Initialize darkMode based on user preference or system setting
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleNavClick = (pageName: string) => {
    setActivePage(pageName)
  }

  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log("User signed out")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditingName(false)
    // Here you would typically update the name on your backend
  }

  const handleNotificationClick = () => {
    handleNavClick('Notifications')
    setNotificationCount(0) // Reset notification count when viewed
  }

  const handleProfilePictureChange = (newPicture: string) => {
    setProfilePicture(newPicture)
  }

  // Simulating new notifications (remove this in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => prev + 1)
    }, 30000) // Add a new notification every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const renderContent = () => {
    switch (activePage) {
      case 'Profile':
        return <ProfileContent />
      case 'Notifications':
        return <NotificationsContent />
      case 'Appointment':
        return <AppointmentContent />
      case 'Settings':
        return <SettingsContent />
      case 'Connect':
        return <ConnectContent />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First row - FootprintWidget centered */}
            <div className="col-span-full md:col-span-2 md:col-start-2 lg:col-start-2 lg:col-span-2">
              <FootprintWidgetComponent />
            </div>
            
            {/* Second row - Pressure Tracker with Connections */}
            <div className="col-span-full">
              <PressureTrackerComponent />
            </div>

            {/* Third row - Health Stats */}
            <div className="col-span-full">
              <HealthStatsWidget />
            </div>

            {/* Fourth row - Risk Chart */}
            <div className="col-span-full">
              <FootUlcerRiskChart />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-lg">
        {/* Mobile view: Icon-only sidebar */}
        <div className="lg:hidden flex flex-col items-center w-16 py-6 h-full">
          <div className="bg-primary text-primary-foreground font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center mb-8">
            a
          </div>
          <nav className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Connect', icon: LinkIcon },
                { name: 'Appointment', icon: CalendarIcon },
                { name: 'Profile', icon: User },
                { name: 'Notifications', icon: Bell },
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`p-3 rounded-lg transition-colors duration-200
                    ${activePage === item.name 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <item.icon className="h-6 w-6" />
                </button>
              ))}
            </div>
            <div className="space-y-6">
              <button 
                onClick={() => handleNavClick('Settings')}
                className={`p-3 rounded-lg transition-colors duration-200
                  ${activePage === 'Settings'
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Settings className="h-6 w-6" />
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    className="p-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <LogOut className="h-6 w-6" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of your account and redirected to the login page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </nav>
        </div>

        {/* Desktop view: Full sidebar */}
        <div className="hidden lg:flex flex-col w-64 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-primary text-primary-foreground font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center">
              a
            </div>
            <span className="text-2xl font-bold text-primary">appo</span>
          </div>
          <nav className="space-y-2">
            {[
              { name: 'Dashboard', icon: LayoutDashboard },
              { name: 'Connect', icon: LinkIcon },
              { name: 'Appointment', icon: CalendarIcon },
              { name: 'Profile', icon: User },
              { name: 'Notifications', icon: Bell },
              { name: 'Settings', icon: Settings },
            ].map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`flex items-center space-x-4 w-full p-3 rounded-lg transition-colors duration-200
                  ${activePage === item.name 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start text-secondary-foreground hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Sign Out</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account and redirected to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="mt-auto mb-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-700" />}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="flex justify-end items-center space-x-4">
            <button 
              onClick={handleNotificationClick}
              className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-primary" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 py-2 px-3 rounded-full shadow-sm">
              <Image src={profilePicture} alt="User" width={32} height={32} className="rounded-full" />
              {isEditingName ? (
                <form onSubmit={handleNameSubmit} className="flex items-center">
                  <Input
                    type="text"
                    value={userName}
                    onChange={handleNameChange}
                    className="mr-2 text-sm bg-white dark:bg-gray-800"
                    autoFocus
                  />
                  <Button type="submit" size="sm">Save</Button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsEditingName(true)}
                  className="text-sm font-medium hover:underline"
                >
                  {userName}
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search" className="pl-10 bg-gray-100 dark:bg-gray-700 w-full" />
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}