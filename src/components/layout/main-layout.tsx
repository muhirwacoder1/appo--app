'use client'

import { useState } from 'react'
import { UserNav } from '../user-nav'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: '📊', label: 'Dashboard', href: '/' },
  { icon: '📅', label: 'Appointments', href: '/appointment' },
  { icon: '👤', label: 'Profile', href: '/profile' },
  { icon: '🔔', label: 'Notifications', href: '/notifications' },
  { icon: '⚙️', label: 'Settings', href: '/settings' }
]

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-transform bg-card border-r border-border",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <span className={cn(
            "font-bold transition-all",
            isSidebarCollapsed ? "text-xl" : "text-2xl"
          )}>
            {isSidebarCollapsed ? "A" : "Appo"}
          </span>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-accent"
          >
            {isSidebarCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg transition-colors",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent",
                  isSidebarCollapsed && "justify-center"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={cn(
                "w-full flex items-center justify-center gap-2 hover:bg-accent",
                isSidebarCollapsed ? "h-10 w-10" : "h-10"
              )}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              {!isSidebarCollapsed && (
                <span className="ml-2">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              )}
            </Button>

            {/* Sign Out Button */}
            <Button
              variant="ghost"
              onClick={() => setShowLogoutConfirm(true)}
              className={cn(
                "w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-100/10",
                isSidebarCollapsed ? "h-10 w-10" : "h-10"
              )}
            >
              <span className="text-xl">↪️</span>
              {!isSidebarCollapsed && (
                <span className="ml-2">Sign Out</span>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="space-y-4">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={cn(
                "w-full flex items-center justify-center gap-2 hover:bg-accent",
                isSidebarCollapsed ? "h-10 w-10" : "h-10"
              )}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              {!isSidebarCollapsed && (
                <span className="ml-2">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              )}
            </Button>

            {/* Sign Out Button */}
            <Button
              variant="ghost"
              onClick={() => setShowLogoutConfirm(true)}
              className={cn(
                "w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-100/10",
                isSidebarCollapsed ? "h-10 w-10" : "h-10"
              )}
            >
              <span className="text-xl">↪️</span>
              {!isSidebarCollapsed && (
                <span className="ml-2">Sign Out</span>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        isSidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {sidebarItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <UserNav />
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-destructive p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-destructive-foreground mb-4">Sign Out</h2>
            <p className="text-destructive-foreground/90 mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 