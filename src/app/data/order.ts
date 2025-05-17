// ดึงออเดอร์ทั้งหมด
export async function fetchOrders() {
  const res = await fetch('/api/order', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await res.json();
}

// ดึงออเดอร์ตาม id
export async function fetchOrderById(orderId: string) {
  const res = await fetch(`/api/order/${orderId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }
  return await res.json();
}

export async function submitOrder({
  orders,
  userId,
  tableNumber,
}: {
  orders: { menuItemId: string; quantity: number; price: number; note?: string }[], // เพิ่ม note
  userId: string,
  tableNumber: string | number,
}) {
  const items = orders.map(order => ({
    menuItemId: order.menuItemId,
    quantity: order.quantity,
    price: order.price,
    note: order.note || '', // ส่ง note ไปด้วย
  }));

  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      tableNumber,
      items,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to submit order');
  }
  return await res.json();
}

