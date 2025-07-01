import { MenuItem } from '../types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return [
    { name: 'Classic Lemonade', price: 1, quantity: 0 },
    { name: 'Item 2', price: 1.25, quantity: 0 },
    { name: 'Item 3', price: 0.75, quantity: 0 }
  ]
}