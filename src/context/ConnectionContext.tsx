'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type ConnectionType = 'wifi' | 'bluetooth' | null;

interface ConnectionContextType {
  isConnected: boolean
  setIsConnected: (value: boolean) => void
  connectionType: ConnectionType
  setConnectionType: (value: ConnectionType) => void
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionType, setConnectionType] = useState<ConnectionType>(null)

  return (
    <ConnectionContext.Provider value={{ 
      isConnected, 
      setIsConnected, 
      connectionType, 
      setConnectionType 
    }}>
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnection() {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
} 