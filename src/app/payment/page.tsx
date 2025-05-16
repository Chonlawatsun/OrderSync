'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { menuItems } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { FoodItem } from '../components/FoodCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [filter, setFilter] = useState<string>('payable');
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  // filter เมนูด้วย paystatus
  const filteredItems = filter === 'All'
    ? menuItems
    : menuItems.filter(item => item.paystatus === filter);

  // subtotal จาก paystatus ที่เลือก
  const subtotal = menuItems
    .filter(item => item.paystatus === filter)
    .reduce((sum, item) => sum + item.price, 0);

  const paymentMethods = [
    { label: 'QR Payment', img: '/promtpay.png' },
    { label: 'SCB', img: '/scb.png' },
    { label: 'K Bank', img: '/kbank.jpg' },
    { label: 'Cash', img: '/cash.png' },
  ];

  // Reset quantity when selectedItem changes
  function handleSelect(item: FoodItem) {
    setSelectedItem(item);
  }

  function handleCloseDetail() {
    setSelectedItem(null);
  }

  function handleCheckout() {
    if (!selectedPayment) {
      toast.error('Please select a payment method.');
      return;
    }
    toast.success('Checkout successful!');
    // ...logic อื่นๆ เช่น reset state หรือ redirect...
  }

  return (
    <>
      <Toaster />
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        {/* Main content */}
        <main className={`p-6 overflow-auto flex flex-col transition-all duration-300 ${selectedItem ? 'flex-1' : 'w-full'}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#7e57c2]">Name Restaurant</h1>
              <p className="text-gray-500 text-sm">Your restaurant address</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-black">Customer</span>
              <div className="flex items-top space-x-2 mt-1">
                <img src="/customer-avatar.png" 
                alt="Customer" 
                width={56}
                height={56}
                className="-mt-6 rounded-full" />
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
              className={`px-3 py-1 rounded ${filter === 'payable' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('payable')}
            >Payable</button>
            <button
              className={`px-3 py-1 rounded ${filter === 'paid' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('paid')}
            >Paid</button>
            <button
              className={`px-3 py-1 rounded ${filter === 'cancel' ? 'bg-purple-100 text-[#7e57c2]' : 'bg-gray-200 text-black'} hover:bg-gray-300`}
              onClick={() => setFilter('cancel')}
            >Cancel</button>
          </div>

          {/* Food Menu */}
          <div className={`grid gap-4 flex-1 items-start ${selectedItem ? 'grid-cols-4' : 'grid-cols-6'}`}>
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} onSelect={handleSelect} />
            ))}
          </div>
        </main>

        {/* Right: Payment Detail */}
        {selectedItem && (
          <div className="w-1/3 bg-white p-6 border-l flex flex-col relative text-black">
            <button
            className="absolute top-4 left-4 text-gray-400 hover:text-black text-2xl"
            onClick={handleCloseDetail}
            aria-label="Close"
          >
            &times;
          </button>
            {/* Table & Order Number */}
            <div className="absolute top-6 right-6 text-right">
              <div className="font-bold text-black text-xl">Table : 00</div>
              <div className="font-bold text-gray-700 text-lg">Orders #34562</div>
            </div>

            <div className="flex-1 flex flex-col justify-start pt-20">
              {/* Summary */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span>Subtotal</span>
                  <span>{subtotal}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Discount</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Service Charge</span>
                  <span>0 Baht</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Vat</span>
                  <span>0%</span>
                </div>
                <hr className="my-2 border-dashed" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>0 Baht</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <div className="font-bold text-lg mb-4">Select Payment Method</div>
                <div className="space-y-2">
                  {paymentMethods.map(method => (
                    <button
                      key={method.label}
                      type="button"
                      onClick={() => setSelectedPayment(method.label)}
                      className={`flex items-center w-full rounded-lg px-4 py-3
                        ${selectedPayment === method.label ? 'bg-gray-100 border-2 border-[#7e57c2]' : 'hover:bg-gray-100 border-2 border-transparent'}
                        focus:outline-none`}
                    >
                      <img src={method.img} alt={method.label} className="w-10 h-10 mr-4" />
                      <span className="font-semibold text-black">{method.label}</span>
                      {selectedPayment === method.label && (
                        <span className="ml-auto text-[#7e57c2] font-bold">&#10003;</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="mt-auto w-full py-3 bg-[#7e57c2] text-white text-lg rounded-lg font-bold hover:bg-[#6c47b6]"
                onClick={handleCheckout}
                disabled={!selectedPayment}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
