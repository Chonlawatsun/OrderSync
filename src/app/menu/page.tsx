'use client';
import { useState, useEffect } from 'react';
import { fetchMenuItems } from '../data/menu'; // เปลี่ยนจาก menuItems เป็น fetchMenuItems
import type { FoodItem } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [quantity, setQuantity] = useState<number>(1);
  const [moreDetails, setMoreDetails] = useState<string>('');
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const ordersPerPage = 5;
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage);
  const searchParams = useSearchParams()
  const customerName = searchParams.get('name') || 'ลูกค้า'
  const tableNumber = searchParams.get('table') || 'ไม่ระบุ'
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetchMenuItems().then(setMenuItems);
  }, []);

  useEffect(() => {
    if (page > 1 && (page - 1) * ordersPerPage >= orders.length) {
      setPage(page - 1);
    }
  }, [orders, page, ordersPerPage]);

  const filteredItems = filter === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === filter);

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

  function handleAdd() {
    if (!selectedItem) return;
    const newOrder = {
      name: selectedItem.name,
      price: selectedItem.price,
      quantity,
      moreDetails,
      status: 'Preparing',
    };
    setOrders([...orders, newOrder]);
    setMoreDetails('');
  }

  function handleOrderNow() {
    if (orders.length === 0) {
      toast.error('Please add at least one order.');
      return;
    }
    console.log('Order submitted:', orders);
    toast.success('Order submitted!');
    setOrders([]);
    setPage(1);
  }

  return (
    <>
      <Toaster />
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
      <span className="font-semibold text-[#5e35b1] text-lg">Name Customer : {customerName}</span>
      <span className="text-[#4527a0] font-medium mt-1">Table : {tableNumber}</span>
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
              className={`px-3 py-1 rounded ${filter === 'Coffee' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('Coffee')}
            >Coffee</button>
            <button
              className={`px-3 py-1 rounded ${filter === 'Non-Coffee' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('Non-Coffee')}
            >Non-Coffee</button>
            <button
              className={`px-3 py-1 rounded ${filter === 'Appetizer' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('Appetizer')}
            >Appetizer</button>
            <button
              className={`px-3 py-1 rounded ${filter === 'Dessert' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('Dessert')}
            >Dessert</button>
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
                  value={moreDetails}
                  onChange={e => setMoreDetails(e.target.value)}
                  className="mt-6 w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-center enabled:text-black"
                />
                <button
                  className="mt-4 px-6 py-2 bg-[#7e57c2] text-white rounded-full hover:bg-[#6c47b6]"
                  disabled={!selectedItem?.available}
                  onClick={handleAdd}
                >
                  Add
                </button>

                <hr className="my-6" />

                {/* Your Orders */}
                <div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-xl text-black" />
                    <span className="font-bold text-lg text-black">Your Orders</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {orders.length === 0 ? (
                      <div className="text-gray-400 text-center">No orders yet</div>
                    ) : (
                      paginatedOrders.map((order, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col bg-gray-200 rounded px-4 py-2 text-black"
                        >
                          <div className="flex justify-between items-center">
                            <span className="flex-1 truncate">{(page - 1) * ordersPerPage + idx + 1}. {order.name}</span>
                            <span className="mx-4">Amount : {order.quantity}</span>
                            <button
                              className="ml-2 text-red-500 hover:text-red-700 font-bold"
                              onClick={() => {
                                const newOrders = [...orders];
                                newOrders.splice((page - 1) * ordersPerPage + idx, 1);
                                setOrders(newOrders);
                              }}
                              aria-label="Delete order"
                            >
                              &times;
                            </button>
                          </div>
                          {order.moreDetails && (
                            <div className="text-sm text-gray-600 mt-1 ml-6 truncate">{order.moreDetails}</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center space-x-2 mt-2">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="text-black px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
                      >Prev</button>
                      <span className="font-bold text-black">{page} / {totalPages}</span>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="text-black px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
                      >Next</button>
                    </div>
                  )}
                  <button
                    className="w-full py-2 bg-[#7e57c2] text-white rounded-lg font-bold text-lg hover:bg-[#6c47b6] mt-6"
                    onClick={handleOrderNow}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center">Select a menu item to see details</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
