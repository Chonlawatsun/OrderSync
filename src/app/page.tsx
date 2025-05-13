'use client';

import { useState } from 'react';
import { menuItems } from './data/menu';
import FoodCard from './components/FoodCard';
import { FoodItem } from './components/FoodCard'; // ใช้เส้นทางที่ถูกต้อง


export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#7e57c2] text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">OrderSync</h1>
          <nav className="space-y-4">
            <button className="block w-full text-left hover:bg-[#7e57c2] px-3 py-2 rounded">📋 Menu</button>
            <button className="block w-full text-left hover:bg-[#7e57c2] px-3 py-2 rounded">🛒 Order Status</button>
            <button className="block w-full text-left hover:bg-[#7e57c2] px-3 py-2 rounded">💳 Payment</button>
          </nav>
        </div>
        <p className="text-sm text-purple-200">© 2025 OrderSync</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto flex">
        {/* Left: Food Menu */}
        <div className="w-2/3 pr-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Menu</h2>
            <div className="space-x-2 ">
              <button className="px-3 py-1 rounded bg-purple-100 text-[#7e57c2] hover:bg-purple-200">All</button>
              <button className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300">Coffee</button>
              <button className="px-3 py-1 rounded bg-gray-200 text-black *:hover:bg-gray-300">Non-Coffee</button>
              <button className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300">Appetizer</button>
              <button className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300">Dessert</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {menuItems.map(item => (
              <FoodCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </div>
        </div>

        {/* Right: Selected Item Detail */}
        <div className="w-1/3 bg-white p-6 border-l">
          {selectedItem ? (
            <>
              <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold">{selectedItem.name}</h2>
              <p className="text-gray-700 mt-2">Price: {selectedItem.price}</p>
              <p className={`mt-1 ${selectedItem.available ? 'text-green-600' : 'text-red-500'}`}>
                {selectedItem.available ? 'Available' : 'Not available'}
              </p>

              <div className="mt-6 flex items-center space-x-3">
                <button className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>0</span>
                <button className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>

              <button className="mt-4 px-4 py-2 bg-[#7e57c2] text-white rounded hover:bg-[#7e57c2]">
                Add to Order
              </button>
            </>
          ) : (
            <p className="text-gray-400">Select a menu item to see details</p>
          )}
        </div>
      </main>
    </div>
  );
}
