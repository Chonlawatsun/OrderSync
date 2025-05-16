'use client';

import { useState } from 'react';
import Sidebar from '../../components/SidebarStaff';
import { initialStock, StockItem, StockStatus } from '../../data/stcok';

const statusColor: Record<StockStatus, string> = {
  Normal: 'border border-green-300 text-green-600 bg-green-50',
  'Low Stock': 'border border-yellow-300 text-yellow-700 bg-yellow-50',
  'Out of Stock': 'border border-red-300 text-red-600 bg-red-50',
};

export default function StockPage() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [search, setSearch] = useState('');

  const handleChange = (idx: number, delta: number) => {
    setStock(prev =>
      prev.map((item, i) =>
        i === idx
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + delta),
              status:
                item.quantity + delta <= 0
                  ? 'Out of Stock'
                  : item.quantity + delta <= 3
                  ? 'Low Stock'
                  : 'Normal',
            }
          : item
      )
    );
  };

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 text-black">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#7e57c2]">Name Restaurant</h1>
            <p className="text-gray-500 text-sm">Your restaurant address</p>
          </div>
          <div className="flex items-center space-x-3">
            <img src="/waiter.png" alt="Waitstaff" width={56} height={56} className="rounded-full" />
            <div>
              <div className="font-bold text-black">Syafiq</div>
              <div className="text-gray-500 text-sm">Kitchen Staff</div>
            </div>
          </div>
        </div>
        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className='py-2'>Ingredient</th>
                <th>Status</th>
                <th>Stock Quantity</th>
                <th>Unit</th>
                <th>Last Restock Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item, idx) => (
                <tr key={item.name} className="border-b border-gray-200 text-black">
                  <td className="py-3">{item.name}</td>
                  <td>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex">
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l bg-gray-100 hover:bg-gray-300 text-xl font-bold transition"
                        onClick={() => handleChange(idx, -1)}
                        disabled={item.quantity <= 0}
                        aria-label="Decrease"
                      >−</button>
                      <input
                        type="number"
                        min={0}
                        className="w-16 text-center border-t border-b border-gray-300 text-lg font-medium outline-none pl-3"
                        value={item.quantity}
                        onChange={e => {
                          const val = Math.max(0, Number(e.target.value));
                          setStock(prev =>
                            prev.map((it, i) =>
                              i === idx
                                ? {
                                    ...it,
                                    quantity: val,
                                    status:
                                      val <= 0
                                        ? 'Out of Stock'
                                        : val <= 3
                                        ? 'Low Stock'
                                        : 'Normal',
                                  }
                                : it
                            )
                          );
                        }}
                      />
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r bg-gray-100 hover:bg-gray-300 text-xl font-bold transition"
                        onClick={() => handleChange(idx, 1)}
                        aria-label="Increase"
                      >+</button>
                    </div>
                  </td>
                  <td className="pr-9 ">{item.unit}</td>
                  <td className="pl-8">{item.lastRestock}</td>
                  <td>{item.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
