'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-palette-background flex items-center justify-center px-4">
          <div className="max-w-sm w-full text-center">
            <div className="border-2 border-palette-text bg-palette-menu p-6 rounded-lg shadow-button">
              <h2 className="text-xl font-semibold text-palette-text mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-palette-text mb-4">
                Our lemonade stand encountered a problem. Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 border-2 border-palette-text bg-palette-button text-base font-medium text-white shadow-button transition-all duration-300 ease-out hover:shadow-buttonHover"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary