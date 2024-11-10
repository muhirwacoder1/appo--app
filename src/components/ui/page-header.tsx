'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center mb-6 space-x-4">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-gray-600"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </Button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
} 