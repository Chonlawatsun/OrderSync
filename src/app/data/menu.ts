// src/app/data/menu.ts

export type FoodItem = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  image: string;
};

export const menuItems: FoodItem[] = [
  {
    id: 1,
    name: 'Spicy seasoned seafood noodles',
    price: 200,
    available: true,
    image: '/Noodles.jpg',
  },
  {
    id: 2,
    name: 'Salted Pasta with mushroom sauce',
    price: 200,
    available: false,
    image: '/pasta.jpg',
  },
  {
    id: 3,
    name: 'Beef dumpling in hot and sour soup',
    price: 200,
    available: true,
    image: '/beef.jpg',
  },
];
