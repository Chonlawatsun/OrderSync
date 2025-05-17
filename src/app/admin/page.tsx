'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/SidebarAdmin'; // เปลี่ยนตรงนี้ให้ตรง path ที่คุณใช้จริง


type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
  category?: string | null;
};

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    setLoading(true);
    const res = await fetch('/api/menu');
    if (res.ok) {
      const data = await res.json();
      setMenuItems(data);
    }
    setLoading(false);
  }

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this menu item?');
    if (!confirmed) return;

    const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    } else {
      alert('ลบเมนูไม่สำเร็จ');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* แถบด้านซ้าย */}
      <Sidebar />

      {/* เนื้อหาหลัก */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin: Manage Menu</h1>
          <Link href="/admin/new">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              ➕ Add New
            </button>
          </Link>
        </div>

        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="text-left px-4 py-2">Image</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Category</th> {/* เพิ่มหัวข้อ */}
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.price} THB</td>
                <td className="px-4 py-2">{item.category ?? '-'}</td> {/* แสดง category */}
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/admin/edit/${item.id}`}>
                    <button
                      className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      type="button"
                    >
                      ✏️ Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    🗑 Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
