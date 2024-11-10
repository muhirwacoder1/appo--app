'use client'

import React from 'react'
import { PressureTrackerComponent } from '../pressure-tracker'
import { HealthStatsWidget } from '../health-stats-widget'
import { Input } from "@/components/ui/input"

const Dashboard = () => {
  return (
    <div className="grid gap-6">
      {/* Search Bar */}
      <div>
        <Input 
          type="search" 
          placeholder="Search" 
          className="max-w-md bg-gray-50"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PressureTrackerComponent />
        <HealthStatsWidget />
      </div>
    </div>
  )
}

export default Dashboard