export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string | null;
  available: boolean;
  image: string | null;
  description: string | null;
}

// แปลง response ให้เป็น FoodItem
function mapToFoodItem(item: any): FoodItem {
  return {
    id: String(item.id),
    name: item.name,
    price: Number(item.price),
    category: item.category ?? null,
    available: Boolean(item.available),
    image: item.image ?? null,
    description: item.description ?? null,
  };
}

// ตัวอย่างการใช้งานกับ fetchMenuById
async function fetchMenuById(id: string): Promise<FoodItem | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/menu/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return mapToFoodItem(data);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return null;
  }
}

// ตัวอย่างการใช้งานกับ fetchMenuItems (array)
export async function fetchMenuItems(): Promise<FoodItem[]> {
  try {
    const response = await fetch('http://localhost:3000/api/menu');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(mapToFoodItem);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

