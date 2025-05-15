'use client';
import Image from 'next/image';
import { useState } from 'react';
import { staffOrderGroups as initialGroups, StaffOrder, StaffOrderGroup } from '../data/staff';
import Sidebar from '../components/SidebarStaff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function WaitStaffPage() {
  const [selectedOrder, setSelectedOrder] = useState<StaffOrder | null>(null);
  const [orderGroups, setOrderGroups] = useState<StaffOrderGroup[]>(initialGroups);

  const statusColor = {
    Pending: 'bg-gray-300 text-black',
    Processing: 'bg-red-800 text-white',
    Ready: 'bg-yellow-500 text-black',
    Compleated: 'bg-green-800 text-white',
  };

  function handleNextStatus() {
    if (!selectedOrder) return;
    let nextStatus = '';
    if (selectedOrder.status === 'Pending') nextStatus = 'Processing';
    else if (selectedOrder.status === 'Processing') nextStatus = 'Ready';
    else if (selectedOrder.status === 'Ready') nextStatus = 'Compleated';
    else return;

    // อัปเดตใน orderGroups
    const newGroups = orderGroups.map(group => ({
      ...group,
      orders: group.orders.map(order =>
        order.orderId === selectedOrder.orderId
          ? { ...order, status: nextStatus }
          : order
      ),
    }));
    setOrderGroups(newGroups);
    setSelectedOrder({ ...selectedOrder, status: nextStatus });
  }

  return (
    <div className="flex h-screen text-black bg-gray-50">
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
              <div className="text-gray-500 text-sm">Waitstaff</div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none"
          />
        </div>

        {/* Order Groups by Date */}
        {orderGroups.map(group => (
          <div key={group.date} className="mb-8">
            <div className="bg-[#7e57c2] text-white px-4 py-2 rounded-t font-bold mb-2">{group.date}</div>
            <div className="bg-white rounded-b px-4 py-2">
              {group.orders.map(order => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div>
                    <div className="font-bold text-lg">
                      Orders #{order.orderId} <span className="font-normal text-base ml-2">{order.items} items</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Table {order.table}</span>
                      <span>Time {order.time}</span>
                      <span className={`px-3 py-1 rounded ${statusColor[order.status]}`}>{order.status}</span>
                    </div>
                  </div>
                  <div className="font-bold text-lg">{order.total}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Right: Order Detail */}
      {selectedOrder && (
        <div className="w-1/3 bg-white p-6 border-l flex flex-col relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            onClick={() => setSelectedOrder(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="font-bold text-xl mb-2 mt-5">Orders #{selectedOrder.orderId}</div>
          <span className={`inline-block px-3 py-1 rounded mb-4 ${statusColor[selectedOrder.status]}`}>{selectedOrder.status}</span>
          {selectedOrder.foods.map(food => (
            <div key={food.name} className="flex items-center mb-2">
              <img src={food.image} alt={food.name} className="w-12 h-12 rounded mr-3" />
              <div>
                <div className="font-semibold">{food.name}</div>
                <div className="text-sm">{food.price} THB x {food.qty}</div>
              </div>
            </div>
          ))}
          <div className="mt-6">
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
              <span>7 THB</span>
            </div>
            <hr className="my-2 border-dashed" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                {parseInt(selectedOrder.total) + 7} THB
              </span>
            </div>
          </div>
          <button
            className={`mt-6 w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center
              ${
                selectedOrder.status === 'Pending'
                  ? 'bg-gray-400 text-white hover:bg-green-500'
                  : selectedOrder.status === 'Processing'
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : selectedOrder.status === 'Ready'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-green-400 text-white cursor-not-allowed'
              }
            `}
            disabled={selectedOrder.status === 'Compleated'}
            onClick={selectedOrder.status !== 'Compleated' ? handleNextStatus : undefined}
          >
            {selectedOrder.status === 'Pending' && (
              <>
                Started <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </>
            )}
            {selectedOrder.status === 'Processing' && (
              <>
                Processing <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </>
            )}
            {selectedOrder.status === 'Ready' && (
              <>
                Mark as Done <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </>
            )}
            {selectedOrder.status === 'Compleated' && 'Compleated'}
          </button>
        </div>
      )}
    </div>
  );
}
