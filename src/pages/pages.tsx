'use client'

import { ConnectionProvider } from '@/context/ConnectionContext'
import Dashboard from '@/components/dashboard/index'

export default function Pages() {
  return (
    <ConnectionProvider>
      <Dashboard />
    </ConnectionProvider>
  )
}