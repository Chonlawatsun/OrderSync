'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { fetchOrders } from '../data/order'; // ดึง orders เหมือน order-status
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  const [filter, setFilter] = useState<string>('payable');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [customerName, setCustomerName] = useState('ลูกค้า');
  const [tableNumber, setTableNumber] = useState('ไม่ระบุ');
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  useEffect(() => {
    setCustomerName(localStorage.getItem('customerName') || 'ลูกค้า');
    setTableNumber(localStorage.getItem('tableNumber') || 'ไม่ระบุ');
  }, []);

  const payStatusMap: Record<string, string> = {
    UNPAID: 'payable',
    PAID: 'paid',
    CANCELLED: 'cancel',
  };

  // filter orders ตามปุ่มที่เลือก
  const filteredOrders = orders.filter(order => payStatusMap[order.payStatus] === filter);

  const paymentMethods = [
    { label: 'QR Payment', img: '/promtpay.png' },
    { label: 'SCB', img: '/scb.png' },
    { label: 'K Bank', img: '/kbank.jpg' },
    { label: 'Cash', img: '/cash.png' },
  ];

  function handleSelect(order: any) {
    setSelectedOrder(order);
  }

  function handleCloseDetail() {
    setSelectedOrder(null);
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
        <main className={`p-6 overflow-auto flex flex-col transition-all duration-300 ${selectedOrder ? 'flex-1' : 'w-full'}`}>
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

          {/* Order Card List */}
          <div className={`grid gap-4 flex-1 items-start ${selectedOrder ? 'grid-cols-4' : 'grid-cols-6'}`}>
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-purple-50"
                onClick={() => handleSelect(order)}
              >
                {/* ถ้ามีรูปใน order หรือ order.items[0].menuItem.image */}
                <img
                  src={order.items?.[0]?.menuItem?.image ?? '/no-image.png'}
                  alt={order.items?.[0]?.menuItem?.name ?? 'No image'}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="font-bold text-lg mb-1">
                  {order.items?.[0]?.menuItem?.name ?? 'Order'}
                </div>
                <div>Price: {order.total}</div>
                <div className="mt-1" style={{ color: order.payStatus === 'UNPAID' ? 'green' : order.payStatus === 'PAID' ? 'blue' : 'red' }}>
                  {payStatusMap[order.payStatus]}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right: Payment Detail */}
        {selectedOrder && (
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
              <div className="font-bold text-black text-xl">Table : {selectedOrder.tableNumber}</div>
              <div className="font-bold text-gray-700 text-lg">Orders #{selectedOrder.id.slice(0, 6)}</div>
            </div>

            <div className="flex-1 flex flex-col justify-start pt-20">
              {/* Summary */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span>Subtotal</span>
                  <span>{selectedOrder.total}</span>
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
                  <span>{selectedOrder.total} Baht</span>
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
