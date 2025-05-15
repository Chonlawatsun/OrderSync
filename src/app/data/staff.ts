export interface StaffOrderFood {
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface StaffOrder {
  orderId: string;
  table: string;
  items: number;
  total: string;
  time: string;
  status: 'Pending' | 'Processing' | 'Ready' | 'Compleated';
  foods: StaffOrderFood[];
  staffName: string;
}

export interface StaffOrderGroup {
  date: string;
  orders: StaffOrder[];
}

// Mock data
export const staffOrderGroups: StaffOrderGroup[] = [
  {
    date: "2025-03-20",
    orders: [
      {
        orderId: "34563",
        table: "4A",
        items: 2,
        total: "100THB",
        time: "12:55",
        status: "Pending",
        staffName: "Syafiq",
        foods: [
          {
            name: "Spicy seasoned seafood noodles",
            price: 50,
            qty: 1,
            image: "/Noodles.jpg"
          },
          {
            name: "Salted Pasta with mushroom sauce",
            price: 50,
            qty: 1,
            image: "/pasta.jpg"
          }
        ]
      },
      {
        orderId: "34562",
        table: "2B",
        items: 2,
        total: "100THB",
        time: "12:50",
        status: "Processing",
        staffName: "Syafiq",
        foods: [
          {
            name: "Spicy seasoned seafood noodles",
            price: 50,
            qty: 1,
            image: "/Noodles.jpg"
          },
          {
            name: "Salted Pasta with mushroom sauce",
            price: 50,
            qty: 1,
            image: "/pasta.jpg"
          }
        ]
      },
      {
        orderId: "34561",
        table: "3A",
        items: 2,
        total: "100THB",
        time: "12:45",
        status: "Ready",
        staffName: "Syafiq",
        foods: [
          {
            name: "Spicy seasoned seafood noodles",
            price: 50,
            qty: 1,
            image: "/Noodles.jpg"
          },
          {
            name: "Salted Pasta with mushroom sauce",
            price: 50,
            qty: 1,
            image: "/pasta.jpg"
          }
        ]
      }
    ]
  },
  {
    date: "2025-03-19",
    orders: [
      {
        orderId: "34560",
        table: "5A",
        items: 4,
        total: "200THB",
        time: "16:40",
        status: "Compleated",
        staffName: "Nattapong",
        foods: [
          {
            name: "Americano",
            price: 50,
            qty: 2,
            image: "/americano.jpg"
          },
          {
            name: "Latte",
            price: 50,
            qty: 2,
            image: "/latte.jpg"
          }
        ]
      },
      {
        orderId: "345659",
        table: "6B",
        items: 6,
        total: "300THB",
        time: "16:35",
        status: "Compleated",
        staffName: "Nattapong",
        foods: [
          {
            name: "Chocolate Cake",
            price: 50,
            qty: 3,
            image: "/chocolate-cake.jpg"
          },
          {
            name: "Strawberry Cheesecake",
            price: 50,
            qty: 3,
            image: "/strawberry-cheesecake.jpg"
          }
        ]
      }
    ]
  }
];