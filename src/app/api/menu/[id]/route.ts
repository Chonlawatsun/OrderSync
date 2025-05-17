import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// PUT: แก้ไขเมนู
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const contentType = req.headers.get('content-type') || '';

    // ถ้า Content-Type เป็น multipart/form-data (มีไฟล์)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      const name = formData.get('name')?.toString() || '';
      const price = parseFloat(formData.get('price')?.toString() || '0');
      const available = formData.get('available') === 'true';
      const category = formData.get('category')?.toString() || null;
      const description = formData.get('description')?.toString() || null;

      // อัปโหลดไฟล์ถ้ามี
      let image: string | undefined = undefined;
      const file = formData.get('image') as File | null;
      if (file && typeof file !== 'string') {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`; // ตั้งชื่อไฟล์ใหม่ไม่ให้ซ้ำ
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, buffer);
        image = `/uploads/${fileName}`;
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
    
    // ถ้า Content-Type เป็น application/json (ไม่มีไฟล์)
    else if (contentType.includes('application/json')) {
      const data = await req.json();

      // แปลง price เป็น number ถ้ามี
      if (data.price) {
        data.price = Number(data.price);
      }

      // หลีกเลี่ยงการแก้ไข id
      delete data.id;

      const updatedMenu = await prisma.menuItem.update({
        where: { id },
        data,
      });

      return NextResponse.json(updatedMenu);
    }

    // Content-Type ไม่ถูกต้อง
    else {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }
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
