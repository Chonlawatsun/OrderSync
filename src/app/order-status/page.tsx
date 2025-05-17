'use client';

import { useState, useEffect } from 'react';
import { fetchOrders } from '../data/order'; // เปลี่ยนจาก fetchMenuItems เป็น fetchOrders
import FoodCard from '../components/FoodCard';
import type { FoodItem } from '../data/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { useSearchParams } from 'next/navigation';

const statusMap: Record<string, string> = {
  PENDING: 'Preparing',
  READY: 'Ready to serve',
  COMPLEATED: 'Served',
  CANCELLED: 'Cancel',
};

const filterToStatus: Record<string, string> = {
  Preparing: 'PENDING',
  'Ready to serve': 'READY',
  Served: 'COMPLEATED',
  Cancel: 'CANCELLED',
};

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [quantity, setQuantity] = useState<number>(1);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const customerName = typeof window !== 'undefined' ? localStorage.getItem('customerName') || 'ลูกค้า' : 'ลูกค้า';
  const tableNumber = typeof window !== 'undefined' ? localStorage.getItem('tableNumber') || 'ไม่ระบุ' : 'ไม่ระบุ';

  
  useEffect(() => {
    fetchOrders().then(orders => {
      const items = orders.flatMap(order =>
        order.items.map(item => ({
          ...item.menuItem,
          id: item.id, // ใช้ id ของ OrderItem ซึ่ง unique
          status: order.status, 
          quantity: item.quantity,
          price: item.price,
          note: item.note,
        }))
      );
      setMenuItems(items);
    });
  }, []);

  const filteredItems = menuItems.filter(item =>
    (filter === 'All' || item.status === filterToStatus[filter]) &&
    (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.category?.toLowerCase().includes(search.toLowerCase()) ?? false)
    )
  );

  function handleSelect(item: FoodItem) {
    setSelectedItem(item);
    setQuantity(1);
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-extrabold text-[#7e57c2]">Name Restaurant</h1>
            <p className="text-gray-500 text-sm mt-1">Your restaurant address</p>
          </div>
          <div className="flex items-center space-x-4 p-3">
            <img
              src="/customer-avatar.png"
              alt="Customer"
              width={56}
              height={56}
              className="rounded-full border-2 border-[#7e57c2]"
            />
            <div className="flex flex-col text-right">
              <span className="font-semibold text-[#5e35b1] text-lg">
                Name Customer : {customerName}
              </span>
              <span className="text-[#4527a0] font-medium mt-1">
                Table : {tableNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search..."
              value={search}
            onChange={e => setSearch(e.target.value)}
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
        <span className="absolute top-6 right-6 font-bold text-black text-xl">Table : {tableNumber}</span>
        <div className="flex-1 flex flex-col justify-center items-center">
          {selectedItem ? (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden">
                <img src={selectedItem.image ?? '/no-image.png'} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-black font-bold text-center">{selectedItem.name}</h2>
              <p className="text-gray-700 mt-1 text-center">Price : {selectedItem.price}</p>
              <p className="text-black mt-1 text-center">Amount : {quantity}</p>
              <input
                type="text"
                placeholder="Your details :"
                value={selectedItem.note || ''}
                className="mt-6 w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-left text-black bg-gray-100"
                disabled
              />
              <button
                className={`mt-8 px-10 py-2 rounded-full text-lg font-semibold
                  ${
                    selectedItem.status === 'Preparing'
                      ? 'bg-[#b3a04c] text-white'
                      : selectedItem.status === 'Ready to serve'
                      ? 'bg-blue-400 text-white'
                      : selectedItem.status === 'Served'
                      ? 'bg-green-500 text-white'
                      : selectedItem.status === 'Cancel'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                disabled
              >
                {statusMap[selectedItem.status] || selectedItem.status}
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
