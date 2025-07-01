import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getMenuItems } from './utils/menuItems'

const DynamicLemonadeStand = dynamic(() => import('./components/LemonadeStand'), {
  loading: () => <p>Loading...</p>,
})

export const metadata: Metadata = {
  title: "Duke and Griff's Lemonade Stand",
  description: 'A refreshing lemonade stand by Duke and Griff',
}

export default async function Home() {
  const menuItems = await getMenuItems()

  return (
    <div className="min-h-screen bg-white">
      <DynamicLemonadeStand initialMenuItems={menuItems} />
    </div>
  )
}

export const revalidate = 3600 // revalidate every hour