'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MenuItem } from '../types'
import { generateVenmoUrl } from '../utils/venmo'

export default function LemonadeStand({ initialMenuItems }: { initialMenuItems: MenuItem[] }) {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setMenu(initialMenuItems.map(item => ({ ...item, quantity: 0 })))
    setIsClient(true)
  }, [initialMenuItems])

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

  const LemonDivider = () => (
    <div className="w-full flex items-center justify-center my-2">
      <div className="flex-grow h-px bg-palette-text"></div>
      <Image
        src="/images/lemonade-icon.png"
        alt="Lemon divider"
        width={30}
        height={30}
        className="mx-2"
      />
      <div className="flex-grow h-px bg-palette-text"></div>
    </div>
  )

  if (!isClient) {
    return (
      <div className="bg-palette-background min-h-screen flex items-center justify-center">
        <div className="max-w-sm mx-auto text-center px-4">
          <div className="border-2 border-palette-text bg-palette-menu p-6 rounded-lg shadow-button">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-palette-text border-t-transparent rounded-full animate-spin"></div>
              <div className="text-lg font-semibold text-palette-text">
                Preparing your lemonade stand...
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-palette-background min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-between max-w-sm mx-auto w-full px-4 py-4">
        <div>
          <Image 
            src="/images/duke-griff-lemonade-logo.png"
            alt="Duke and Griff's Lemonade Stand"
            width={300}
            height={100}
            className="mb-2 mx-auto"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <LemonDivider />
        </div>
        
        <div className="flex-grow flex flex-col justify-center my-4">
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
        
        <div>
          <h2 className="text-xl font-bold text-palette-text mb-2 text-center">Total: ${total.toFixed(2)}</h2> 
          <LemonDivider />
          <div className="flex flex-col gap-2"> 
            <button
              onClick={handleVenmoPayment}
              aria-label="Pay with Venmo"
              className="w-full px-4 py-2 border-2 border-palette-text bg-palette-button text-base font-medium text-palette-text shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
            >
              Pay with Venmo
            </button>
            <button
              onClick={clearAll}
              aria-label="Clear all items"
              className="w-full px-4 py-2 border-2 border-palette-text bg-palette-button text-base font-medium text-palette-text shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
