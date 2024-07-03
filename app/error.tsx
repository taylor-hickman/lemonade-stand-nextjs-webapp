'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-palette-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-palette-text mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-palette-button text-palette-text font-medium rounded shadow-button hover:shadow-buttonHover transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
}