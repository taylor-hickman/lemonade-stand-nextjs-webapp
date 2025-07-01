export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-palette-background">
      <div className="max-w-sm mx-auto text-center px-4">
        <div className="border-2 border-palette-text bg-palette-menu p-6 rounded-lg shadow-button">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-palette-text border-t-transparent rounded-full animate-spin"></div>
            <div className="text-lg font-semibold text-palette-text">
              Preparing your menu..
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}