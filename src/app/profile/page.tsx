'use client'

import { PageHeader } from '@/components/ui/page-header'
import { ConnectionProvider } from '@/context/ConnectionContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    avatar: 'JD'
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handleProfileUpdate = () => {
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!")
      return
    }
    setIsChangingPassword(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  return (
    <ConnectionProvider>
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <PageHeader title="Profile" />
          
          {/* Profile Information */}
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="text-xl">Profile Information</CardTitle>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Name</label>
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Email</label>
                        <Input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Phone</label>
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleProfileUpdate}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{profile.name}</h3>
                      <p className="text-gray-400">{profile.email}</p>
                      <p className="text-gray-400">{profile.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Change Section */}
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="text-xl">Security</CardTitle>
              {!isChangingPassword && (
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Change Password
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Current Password</label>
                    <Input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">New Password</label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Confirm New Password</label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={handlePasswordChange}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Update Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false)
                        setPasswords({ current: '', new: '', confirm: '' })
                      }}
                      className="text-white border-white hover:bg-white hover:text-black"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">
                  Your password was last changed 30 days ago
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ConnectionProvider>
  )
} 