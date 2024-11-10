'use client'

import React, { useState } from 'react'
import { PressureTrackerComponent } from '../pressure-tracker'
import { HealthStatsWidget } from '../health-stats-widget'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useConnection } from '@/context/ConnectionContext'
import { UserNav } from '../user-nav'

const Dashboard = () => {
  const pathname = usePathname()
  const { setIsConnected, setConnectionType } = useConnection()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleLogout = () => {
    setIsConnected(false)
    setConnectionType(null)
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Toggle Button for small screens */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded-lg"
      >
        {isSidebarCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative w-[64px] md:w-64 h-full bg-white border-r transition-all duration-300 z-40 
        ${isSidebarCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center p-4 md:p-6 mb-8">
          <span className="text-2xl font-bold md:block hidden">appo</span>
          <span className="text-2xl font-bold md:hidden">a</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 px-2 md:px-6">
          <Link 
            href="/" 
            className={`flex items-center px-2 md:px-4 py-2 rounded-lg ${
              pathname === '/' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">📊</span>
            <span className="ml-3 md:block hidden">Dashboard</span>
          </Link>
          
          <Link 
            href="/appointment" 
            className={`flex items-center px-2 md:px-4 py-2 rounded-lg ${
              pathname === '/appointment' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">📅</span>
            <span className="ml-3 md:block hidden">Appointment</span>
          </Link>
          
          <Link 
            href="/profile" 
            className="flex items-center px-2 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className="text-xl">👤</span>
            <span className="ml-3 md:block hidden">Profile</span>
          </Link>
          
          <Link 
            href="/notifications" 
            className="flex items-center px-2 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className="text-xl">🔔</span>
            <span className="ml-3 md:block hidden">Notifications</span>
          </Link>
          
          <Link 
            href="/settings" 
            className="flex items-center px-2 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className="text-xl">⚙️</span>
            <span className="ml-3 md:block hidden">Settings</span>
          </Link>
        </nav>

        {/* Sign Out Button */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center px-2 md:px-4 py-2 mt-auto text-gray-600 hover:bg-gray-100 rounded-lg w-full absolute bottom-4"
        >
          <span className="text-xl">↪️</span>
          <span className="ml-3 md:block hidden">Sign Out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto ml-[64px] md:ml-0">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 mt-12 md:mt-0">
          <Input 
            type="search" 
            placeholder="Search" 
            className="max-w-md bg-gray-50"
          />
          <UserNav />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PressureTrackerComponent />
            <HealthStatsWidget />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-900 p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-white mb-4">Log Out</h2>
            <p className="text-red-200 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-red-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for small screens when sidebar is open */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}
    </div>
  )
}

export default Dashboard