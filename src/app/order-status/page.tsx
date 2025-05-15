'use client';

import { useState } from 'react';
import { menuItems } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { FoodItem } from '../components/FoodCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [quantity, setQuantity] = useState<number>(1);

  const filteredItems = filter === 'All'
    ? menuItems
    : menuItems.filter(item => item.status === filter);

  // Reset quantity when selectedItem changes
  function handleSelect(item: FoodItem) {
    setSelectedItem(item);
    setQuantity(1);
  }

  function handleIncrease() {
    if (selectedItem?.available) setQuantity(q => q + 1);
  }

  function handleDecrease() {
    if (selectedItem?.available && quantity > 1) setQuantity(q => q - 1);
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#7e57c2]">Name Restaurant</h1>
            <p className="text-gray-500 text-sm">Your restaurant address</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-black">Customer</span>
            <div className="flex items-center space-x-2 mt-1">
              <img src="/customer-avatar.png" alt="Customer" className="w-8 h-8 rounded-full" />
              <span className="text-black">Table : 00</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none pl-10"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        {/* Filter Menu */}
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-3 py-1 rounded ${filter === 'All' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-purple-200`}
            onClick={() => setFilter('All')}
          >All</button>
          <button
            className={`px-3 py-1 rounded ${filter === 'Preparing' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
            onClick={() => setFilter('Preparing')}
          >Preparing</button>
          <button
            className={`px-3 py-1 rounded ${filter === 'Ready to serve' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
            onClick={() => setFilter('Ready to serve')}
          >Ready to serve</button>
          <button
            className={`px-3 py-1 rounded ${filter === 'Served' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
            onClick={() => setFilter('Served')}
          >Served</button>
          <button
            className={`px-3 py-1 rounded ${filter === 'Cancel' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
            onClick={() => setFilter('Cancel')}
          >Cancel</button>
        </div>

        {/* Food Menu */}
        <div className="grid grid-cols-4 gap-4 flex-1 items-start ">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} onSelect={handleSelect} />
          ))}
        </div>
      </main>

      {/* Right: Selected Item Detail */}
      <div className="w-1/3 bg-white p-6 border-l flex flex-col relative">
        <span className="absolute top-6 right-6 font-bold text-black text-xl">Table : 00</span>
        <div className="flex-1 flex flex-col justify-center items-center">
          {selectedItem ? (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-black font-bold text-center">{selectedItem.name}</h2>
              <p className="text-gray-700 mt-1 text-center">Price : {selectedItem.price}</p>
              <div className="mt-4 flex items-center justify-center space-x-6">
                <button
                  className="w-8 h-8 flex items-center justify-center border border-black rounded-full text-black disabled:opacity-30"
                  onClick={handleDecrease}
                  disabled={!selectedItem.available || quantity <= 1}
                >-</button>
                <span className="text-black text-xl">{quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center border border-black rounded-full text-black disabled:opacity-30"
                  onClick={handleIncrease}
                  disabled={!selectedItem.available}
                >+</button>
              </div>
              <input
                type="text"
                placeholder="More details"
                className="mt-6 w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-center enabled:text-black"
              />
              <button
                className="mt-4 px-6 py-2 bg-[#7e57c2] text-white rounded-full hover:bg-[#6c47b6]"
                disabled={!selectedItem.available}
              >
                Add
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Select a menu item to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}
