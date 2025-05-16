import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

export async function GET() {
  try {
    const menus = await prisma.menuItem.findMany({
      orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(menus), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name')?.toString() || '';
    const price = parseFloat(formData.get('price')?.toString() || '0');
    const available = formData.get('available') === 'true';

    const file = formData.get('image') as File | null;
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    await fs.promises.writeFile(filePath, buffer);

    const newMenu = await prisma.menuItem.create({
      data: {
        name,
        price,
        available,
        image: `/uploads/${file.name}`,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Menu created', menu: newMenu }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
