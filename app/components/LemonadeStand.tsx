'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MenuItem } from '../types'
import { generateVenmoUrl } from '../utils/venmo'

export default function LemonadeStand({ initialMenuItems }: { initialMenuItems: MenuItem[] }) {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenuItems)
  const [windowHeight, setWindowHeight] = useState<number>(0)

  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight)
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const addToTotal = (index: number) => {
    setMenu(prevMenu => prevMenu.map((item, i) => 
      i === index ? { ...item, quantity: (item.quantity || 0) + 1 } : item
    ))
  }

  const clearAll = () => {
    setMenu(prevMenu => prevMenu.map(item => ({ ...item, quantity: 0 })))
  }

  const total = menu.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0)
  
  const handleVenmoPayment = () => {
    const venmoUrl = generateVenmoUrl(total)
    window.open(venmoUrl, '_blank')
  }

  return (
    <div className="bg-palette-background flex flex-col items-center w-full" style={{ minHeight: `${windowHeight}px` }}>
      <div className="w-full max-w-4xl mx-auto p-6 flex flex-col h-full">
        <div className="flex-grow-0">
          <Image 
            src="/images/knox-lemonade-logo.png"
            alt="Knox's Lemonade Stand"
            width={300}
            height={100}
            className="mb-2 mx-auto"
            priority
          />
          <div className="w-full max-w-sm mx-auto h-1 bg-palette-text mb-4 relative">
            <Image
              src="/images/lemon.png"
              alt="Lemon divider"
              width={20}
              height={20}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        
        <div className="flex-grow w-full max-w-sm mx-auto">
          <div className="border-2 border-palette-text bg-palette-menu p-4 rounded-lg shadow-button"> 
            <h2 className="text-xl font-semibold text-palette-text mb-2 text-center">Menu</h2> 
            {menu.map((item, index) => (
              <div key={item.name} className="flex flex-col mb-2"> 
                <div className="flex justify-between items-center mb-1"> 
                  <span className="text-base font-medium text-palette-text">{item.name}</span> 
                  <span className="text-sm text-palette-text">${item.price.toFixed(2)} - Qty: {item.quantity || 0}</span>
                </div>
                <button
                  onClick={() => addToTotal(index)}
                  aria-label={`Add ${item.name} to order`}
                  className="w-full px-4 py-1 border-2 border-palette-text bg-palette-button text-base font-medium text-palette-text shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-grow-0 mt-4 text-center w-full max-w-sm mx-auto"> 
          <h2 className="text-xl font-bold text-palette-text mb-2">Total: ${total.toFixed(2)}</h2> 
          <div className="w-full max-w-sm mx-auto h-1 bg-palette-text my-4 relative">
            <Image
              src="/images/lemon.png"
              alt="Lemon divider"
              width={20}
              height={20}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2"> 
            <button
              onClick={handleVenmoPayment}
              aria-label="Pay with Venmo"
              className="w-full sm:w-auto px-4 py-1 border-2 border-palette-text bg-palette-button text-base font-medium text-palette-text shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
            >
              Pay with Venmo
            </button>
            <button
              onClick={clearAll}
              aria-label="Clear all items"
              className="w-full sm:w-auto px-4 py-1 border-2 border-palette-text bg-palette-button text-base font-medium text-palette-text shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}