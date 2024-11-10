import ClientOnly from '@/components/ClientOnly'
import Dashboard from '@/components/dashboard/index'
import { ConnectionProvider } from '@/context/ConnectionContext'

export default function Home() {
  return (
    <ClientOnly>
      <ConnectionProvider>
        <Dashboard />
      </ConnectionProvider>
    </ClientOnly>
  )
}
