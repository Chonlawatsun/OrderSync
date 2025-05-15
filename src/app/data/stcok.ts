export type StockStatus = 'Normal' | 'Low Stock' | 'Out of Stock';

export interface StockItem {
  name: string;
  status: StockStatus;
  quantity: number;
  unit: string;
  lastRestock: string;
  expiry: string;
}

export const initialStock: StockItem[] = [
  { name: 'Flour', status: 'Normal', quantity: 10, unit: 'kg', lastRestock: '2025-03-28', expiry: '2025-09-30' },
  { name: 'Sugar', status: 'Normal', quantity: 5, unit: 'kg', lastRestock: '2025-03-20', expiry: '2026-02-15' },
  { name: 'Fresh Milk', status: 'Low Stock', quantity: 2, unit: 'L', lastRestock: '2025-03-30', expiry: '2025-04-10' },
  { name: 'Eggs', status: 'Normal', quantity: 30, unit: 'pcs', lastRestock: '2025-03-25', expiry: '2025-04-20' },
  { name: 'Chicken', status: 'Low Stock', quantity: 3, unit: 'kg', lastRestock: '2025-03-29', expiry: '2025-04-05' },
  { name: 'Lettuce', status: 'Out of Stock', quantity: 1, unit: 'kg', lastRestock: '2025-03-27', expiry: '2025-04-03' },
];