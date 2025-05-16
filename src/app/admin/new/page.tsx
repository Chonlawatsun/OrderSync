'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AddMenuPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('available', available ? 'true' : 'false');
    formData.append('image', imageFile);

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Failed to add menu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">

         {/* ปุ่มย้อนกลับ */}
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="mb-6 flex items-center text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Go back</span>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Add menu item</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">menu name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e57c2]"
              placeholder="Enter menu name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Price (THB)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e57c2]"
              placeholder="e.g., 100.00"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Upload image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
              required
              className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7e57c2] file:text-[#ffffff] hover:file:bg-[#9a86bb] transition"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
              className="h-5 w-5 text-[#7e57c2] focus:ring-[#7e57c2] border-gray-300 rounded"
            />
            <label className="text-gray-700 font-medium">Available for service</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7e57c2] hover:bg-[#9a86bb] transition text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f081a]"
          >
            Add menu
          </button>
        </form>
      </div>
    </div>
  );
}
