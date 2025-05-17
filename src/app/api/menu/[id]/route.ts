import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT: แก้ไขเมนู
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const contentType = req.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const data = await req.json();

    // แปลง price เป็น number
    if (data.price) {
      data.price = Number(data.price);
    }

    // ไม่ให้อัปเดต id
    delete data.id;

    const updatedMenu = await prisma.menuItem.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error('Update failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Update failed', detail: message }, { status: 500 });
  }
}

// DELETE: ลบเมนู
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Delete failed', detail: message }, { status: 500 });
  }
}

// GET: ดึงข้อมูลเมนูตาม id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const menu = await prisma.menuItem.findUnique({ where: { id } });

    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Get failed', detail: message }, { status: 500 });
  }
}
