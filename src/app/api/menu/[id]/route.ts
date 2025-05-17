// src/app/api/menu/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const formData = await req.formData();

  const name = formData.get('name')?.toString() || '';
  const price = parseFloat(formData.get('price')?.toString() || '0');
  const available = formData.get('available') === 'true';
  const category = formData.get('category')?.toString() || null;
  const description = formData.get('description')?.toString() || null;

  // ถ้ามีการอัปโหลดไฟล์ใหม่
  let image: string | undefined = undefined;
  const file = formData.get('image') as File | null;
  if (file && typeof file !== 'string') {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    await fs.promises.writeFile(filePath, buffer);
    image = `/uploads/${file.name}`;
  }

  const updatedMenu = await prisma.menuItem.update({
    where: { id },
    data: {
      name,
      price,
      available,
      category,
      description,
      ...(image ? { image } : {}),
    },
  });

  return NextResponse.json(updatedMenu);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; 

  await prisma.menuItem.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted successfully' });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; 
  const menu = await prisma.menuItem.findUnique({ where: { id } });
  if (!menu) {
    return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
  }
  return NextResponse.json(menu);
}
