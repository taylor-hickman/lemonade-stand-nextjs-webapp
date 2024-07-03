import { MenuItem } from '../types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return [
    { name: 'Classic Lemonade', price: 1, quantity: 0 },
    { name: 'Airheads', price: 0.50, quantity: 0 },
  ]
}