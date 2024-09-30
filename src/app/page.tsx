import ClientOnly from '@/components/ClientOnly'
import { DashboardComponent } from '@/components/dashboard'

export default function Home() {
  return (
    <ClientOnly>
      <DashboardComponent />
    </ClientOnly>
  )
}
