'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams();
  const menuId = params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!menuId) return;

    const fetchMenu = async () => {
      const res = await fetch(`/api/menu/${menuId}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setPrice(data.price.toString());
        setCategory(data.category);
        setAvailable(data.available);
        setPreviewImage(data.imageUrl); // หรือ data.image ขึ้นกับ API
      } else {
        alert('Failed to load menu item');
      }
    };

    fetchMenu();
  }, [menuId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available ? 'true' : 'false');
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await fetch(`/api/menu/${menuId}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Failed to update menu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="mb-6 flex items-center text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Go back</span>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Edit menu item</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Menu name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select category</option>
              <option value="Coffee">Coffee</option>
              <option value="Non-Coffee">Non-Coffee</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Current image</label>
            {previewImage && (
              <img src={previewImage} alt="Menu preview" className="mb-3 w-32 h-32 object-cover rounded-md" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
              className="h-5 w-5 text-[#7e57c2]"
            />
            <label className="text-gray-700 font-medium">Available for service</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7e57c2] hover:bg-[#9a86bb] transition text-white font-semibold py-3 px-6 rounded-lg"
          >
            Update menu
          </button>
        </form>
      </div>
    </div>
  );
}
