'use client'

import Image from 'next/image'

export function FootprintWidgetComponent() {
  return (
    <div className="relative w-full max-w-[300px] h-auto bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between mb-2">
        <span className="text-xl font-bold text-gray-800">L</span>
        <span className="text-xl font-bold text-gray-800">R</span>
      </div>
      <Image
        src="/footprint-diagram.png"
        alt="Footprint diagram"
        width={250}
        height={250}
        className="mx-auto"
        quality={100}
      />
      <div className="mt-2 flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs font-medium text-black">Heel</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-xs font-medium text-black">Middle</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-black">Toe</span>
        </div>
      </div>
    </div>
  )
}