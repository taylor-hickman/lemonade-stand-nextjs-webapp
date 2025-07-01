import { MenuItem } from '../types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return [
    { name: 'Classic Lemonade', price: 1 },
    { name: 'Item 2', price: 1.25 },
    { name: 'Item 3', price: 0.75 }
  ]
}