import { MenuItem } from '../types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return [
    { name: 'Classic Lemonade', price: 2 },
    { name: 'Fresh Cucumber', price: 1 },
    { name: 'Fresh Herb Bag', price: 3 }
  ]
}