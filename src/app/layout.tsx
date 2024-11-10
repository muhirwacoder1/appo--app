import type { Metadata } from "next";
import { ConnectionProvider } from '@/context/ConnectionContext'
import { MainLayout } from "@/components/layout/main-layout"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

export const metadata: Metadata = {
  title: "Appo - Smart Health Monitoring",
  description: "Monitor your health with smart insoles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConnectionProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
