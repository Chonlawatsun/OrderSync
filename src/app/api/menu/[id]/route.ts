// src/app/api/menu/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();

  const updatedMenu = await prisma.menuItem.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedMenu);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  await prisma.menuItem.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted successfully' });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const menu = await prisma.menuItem.findUnique({ where: { id } });
  if (!menu) {
    return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
  }
  return NextResponse.json(menu);
}
