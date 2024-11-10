'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ConnectionContextType {
  isConnected: boolean;
  connectionType: string | null;
  setIsConnected: (connected: boolean) => void;
  setConnectionType: (type: string | null) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionType, setConnectionType] = useState<string | null>('bluetooth')

  return (
    <ConnectionContext.Provider value={{ 
      isConnected, 
      connectionType,
      setIsConnected, 
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