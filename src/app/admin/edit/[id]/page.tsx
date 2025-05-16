'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      const res = await fetch(`/api/menu/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setPrice(data.price.toString());
        setImage(data.image);
        setAvailable(data.available);
      }
      setLoading(false);
    }
    fetchMenu();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        image,
        available,
      }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('แก้ไขเมนูไม่สำเร็จ');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">แก้ไขเมนูอาหาร</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label>ชื่อเมนู</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>ราคา (THB)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>URL รูปภาพ</label>
          <input
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
            />{' '}
            พร้อมให้บริการ
          </label>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}
