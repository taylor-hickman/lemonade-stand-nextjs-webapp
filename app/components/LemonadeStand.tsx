'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { MenuItem } from '../types'
import { generateVenmoUrl } from '../utils/venmo'
import Toast from './Toast'

export default function LemonadeStand({ initialMenuItems }: { initialMenuItems: MenuItem[] }) {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    setMenu(initialMenuItems.map(item => ({ ...item, quantity: 0 })))
    setIsClient(true)
  }, [initialMenuItems])

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message })
  }, [])

  const addToTotal = (index: number) => {
    setMenu(prevMenu => {
      const newMenu = prevMenu.map((item, i) => 
        i === index ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
      const updatedItem = newMenu[index]
      showToast(`Added ${updatedItem.name} to cart`)
      return newMenu
    })
  }

  const removeFromTotal = (index: number) => {
    setMenu(prevMenu => prevMenu.map((item, i) => {
      if (i !== index) return item
      const currentQuantity = item.quantity ?? 0
      return currentQuantity > 0 
        ? { ...item, quantity: currentQuantity - 1 } 
        : item
    }))
  }

  const clearAll = () => {
    setMenu(prevMenu => prevMenu.map(item => ({ ...item, quantity: 0 })))
  }

  const total = menu.reduce((sum, item) => sum + item.price * (item.quantity ?? 0), 0)
  const hasItems = menu.some(item => (item.quantity ?? 0) > 0)
  
  const handleVenmoPayment = () => {
    if (!hasItems) {
      showToast('Please add items to your order first')
      return
    }
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
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={() => setToast({ show: false, message: '' })} 
      />
      <div className="flex flex-col max-w-sm mx-auto w-full px-4 py-4 min-h-screen">
        {/* Header Logo */}
        <header className="flex-shrink-0 mb-4">
          <Image 
            src="/images/duke-griff-logo.png"
            alt="Duke and Griff's Lemonade Stand"
            width={300}
            height={100}
            className="mx-auto"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </header>
        
        {/* Menu Section */}
        <main className="flex-shrink-0 mb-4">
          <div className="border-2 border-palette-text bg-palette-menu p-4 rounded-lg shadow-button"> 
            <h2 className="text-xl font-semibold text-palette-text mb-4 text-center">Menu</h2>
 
            {menu.length === 0 ? (
              <p className="text-center text-palette-text py-8">Loading menu...</p>
            ) : (
              <div className="space-y-4">
                {menu.map((item, index) => {
                  const quantity = item.quantity ?? 0
                  const hasQuantity = quantity > 0
                  
                  return (
                    <div key={item.name} className="bg-white rounded-lg border-2 border-palette-text p-4 shadow-sm">
                      {/* Header with name and price */}
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-palette-text">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-palette-text">${item.price.toFixed(2)}</span>
                          {hasQuantity && (
                            <span className="bg-palette-button text-white px-2 py-1 rounded-full text-sm font-semibold">
                              {quantity}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {hasQuantity && (
                          <button
                            onClick={() => removeFromTotal(index)}
                            aria-label={`Remove one ${item.name} from order`}
                            className="w-10 h-10 flex items-center justify-center border-2 border-palette-text bg-white text-palette-text font-bold rounded-full shadow-button hover:bg-palette-menu transition-colors"
                          >
                            −
                          </button>
                        )}
                        <button
                          onClick={() => addToTotal(index)}
                          aria-label={`Add ${item.name} to order`}
                          className="flex-1 px-4 py-3 border-2 border-palette-text bg-palette-button text-lg font-semibold text-white rounded-lg shadow-button transition-all duration-200 ease-out hover:shadow-buttonHover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
                        >
                          {hasQuantity ? `Add Another (${quantity} in cart)` : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
        
        {/* Footer - Total and Payment */}
        <footer className="mt-auto pb-safe">
          <div className="border-2 border-palette-text bg-white p-4 rounded-lg shadow-button mb-3">
            <h2 className="text-2xl font-bold text-palette-text text-center">
              Total: ${total.toFixed(2)}
            </h2>
            {hasItems && (
              <p className="text-sm text-palette-text text-center mt-1">
                {menu.filter(item => (item.quantity ?? 0) > 0).length} different items
              </p>
            )}
          </div>
          {hasItems && <LemonDivider />}
          <div className="flex flex-col gap-2 mt-3"> 
            <button
              onClick={handleVenmoPayment}
              aria-label="Pay with Venmo"
              className="w-full px-4 py-3 border-2 border-palette-text bg-palette-button text-base font-medium text-white shadow-button transition-all duration-200 ease-out hover:shadow-buttonHover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Pay with Venmo
            </button>
            {hasItems && (
              <button
                onClick={clearAll}
                aria-label="Clear all items"
                className="w-full px-4 py-3 border-2 border-palette-text bg-white text-base font-medium text-palette-text shadow-button transition-all duration-200 ease-out hover:bg-palette-menu hover:shadow-buttonHover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Clear All
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
