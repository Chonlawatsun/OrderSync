'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddMenuPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('available', available ? 'true' : 'false');
    formData.append('image', imageFile);

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: formData, // ส่งเป็น multipart/form-data
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('เพิ่มเมนูไม่สำเร็จ');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">เพิ่มเมนูอาหาร</h1>
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
          <label>อัพโหลดรูปภาพ</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          เพิ่มเมนู
        </button>
      </form>
    </div>
  );
}
