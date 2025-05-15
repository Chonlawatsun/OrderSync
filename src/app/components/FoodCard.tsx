'use client';

import Image from 'next/image';
import React from 'react';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  available: boolean;
}
export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  available: boolean;
}

export default function FoodCard({
  item,
  onSelect,
}: {
  item: FoodItem;
  onSelect: (item: FoodItem) => void;
}) {
  return (
    <button
      onClick={() => onSelect(item)}
      className={`rounded-lg transition transform p-4 text-left w-full min-h-[320px] flex flex-col text-black
        ${item.available ? 'bg-white' : 'bg-gray-300'}
        ${item.available ? 'hover:scale-105' : ''}
        shadow-sm hover:shadow-md`}
    >
      <div className="relative w-full h-36 mb-3 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-700">Price: {item.price}</p>
      <p className={`text-sm mt-1 ${item.available ? 'text-green-600' : 'text-red-500'}`}>
        {item.available ? 'Available' : 'Not available'}
      </p>
    </button>
  );
}
