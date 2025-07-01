'use client'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className="bg-white border-2 border-palette-text px-4 py-2 rounded-lg shadow-button">
        <p className="text-palette-text font-medium">{message}</p>
      </div>
    </div>
  )
}