export function generateVenmoUrl(total: number): string {
  const venmoUsername = process.env.NEXT_PUBLIC_VENMO_USERNAME
  const paymentDescription = process.env.NEXT_PUBLIC_PAYMENT_DESCRIPTION || "Duke and Griff's Lemonade Stand Payment"
  const amount = total.toFixed(2)

  if (!venmoUsername) {
    console.error('NEXT_PUBLIC_VENMO_USERNAME environment variable is not set')
    return '#'
  }

  let venmoUrl = `https://venmo.com/${venmoUsername}?txn=pay&amount=${amount}&note=${encodeURIComponent(paymentDescription)}`

  if (typeof window !== 'undefined' && 'navigator' in window) {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOS = /ipad|iphone|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)

    if (isIOS) {
      venmoUrl = `venmo://paycharge?txn=pay&recipients=${venmoUsername}&amount=${amount}&note=${encodeURIComponent(paymentDescription)}`
    } else if (isAndroid) {
      venmoUrl = `intent://paycharge?txn=pay&recipients=${venmoUsername}&amount=${amount}&note=${encodeURIComponent(paymentDescription)}#Intent;package=com.venmo;scheme=venmo;end`
    }
  }

  return venmoUrl
}