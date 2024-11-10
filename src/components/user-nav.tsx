'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function UserNav() {
  const router = useRouter()
  const [unreadCount, setUnreadCount] = useState(4)
  const [showDropdown, setShowDropdown] = useState(false)
  const user = {
    name: "Moni Roy",
    email: "moni.roy@example.com"
  }

  const handleNotificationClick = () => {
    router.push('/notifications')
  }

  return (
    <div className="flex items-center gap-4 relative">
      {/* Notifications */}
      <Button 
        variant="ghost" 
        className="relative p-2"
        onClick={handleNotificationClick}
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* User Menu */}
      <div className="relative">
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        </Button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {/* User Info */}
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              {/* Menu Items */}
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Profile Settings
              </Link>
              <Link 
                href="/notifications" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                <div className="flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Logout */}
              <div className="border-t">
                <Link 
                  href="/settings" 
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
} 