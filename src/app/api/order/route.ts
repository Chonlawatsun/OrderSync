'use server';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { userId, tableNumber, items, customerToken, note } = data;

    const order = await prisma.order.create({
      data: {
        customerToken,
        tableNumber: Number(tableNumber),
        status: 'PENDING',
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        note, // note ของ Order (รวม)
        items: {
          create: items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
            note: item.note || item.moreDetails || '', // note ของ OrderItem (แต่ละจาน)
          })),
        },
      },
      include: { items: true },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}