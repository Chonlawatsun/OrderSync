// src/app/data/menu.ts

export type FoodItem = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  image: string;
  category: string;
  status: string;
  paystatus: string;
};

export const menuItems: FoodItem[] = [
  {
    id: 1,
    name: 'Spicy seasoned seafood noodles',
    price: 200,
    available: true,
    image: '/Noodles.jpg',
    category: 'Appetizer',
    status: 'Preparing',
    paystatus: 'payable', 
  },
  {
    id: 2,
    name: 'Salted Pasta with mushroom sauce',
    price: 200,
    available: false,
    image: '/pasta.jpg',
    category: 'Non-Coffee',
    status: 'Cancel',
    paystatus: 'cancel', // Cancel = cancel
  },
  {
    id: 3,
    name: 'Beef dumpling in hot and sour soup',
    price: 200,
    available: true,
    image: '/beef.jpg',
    category: 'Appetizer',
    status: 'Ready to serve',
    paystatus: 'payable', // Ready to serve = payable
  },
  {
    id: 4,
    name: 'Americano',
    price: 80,
    available: true,
    image: '/americano.jpg',
    category: 'Coffee',
    status: 'Served',
    paystatus: 'payable',
  },
  {
    id: 5,
    name: 'Latte',
    price: 90,
    available: true,
    image: '/latte.jpg',
    category: 'Coffee',
    status: 'Preparing',
    paystatus: 'payable',
  },
  {
    id: 6,
    name: 'Iced Lemon Tea',
    price: 70,
    available: true,
    image: '/lemontea.jpg',
    category: 'Non-Coffee',
    status: 'Ready to serve',
    paystatus: 'payable',
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    price: 120,
    available: true,
    image: '/chocolate-cake.jpg',
    category: 'Dessert',
    status: 'Served',
    paystatus: 'paid',
  },
  {
    id: 8,
    name: 'Strawberry Cheesecake',
    price: 130,
    available: false,
    image: '/strawberry-cheesecake.jpg',
    category: 'Dessert',
    status: 'Cancel',
    paystatus: 'cancel',
  },
  {
    id: 9,
    name: 'Cheesecake',
    price: 130,
    available: false,
    image: '/strawberry-cheesecake.jpg',
    category: 'Dessert',
    status: 'Preparing',
    paystatus: 'cancel',
  },
];
