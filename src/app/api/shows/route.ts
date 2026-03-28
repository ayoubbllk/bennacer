import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { saveUploadedImage } from '@/lib/upload';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const shows = db.prepare('SELECT * FROM shows ORDER BY year, month, date').all();
  return NextResponse.json(shows);
}

export async function POST(request: Request) {
  const session = await verifyAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Handle image
    let imagePath = '';
    const imageFile = formData.get('imageFile') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (imageFile && imageFile.size > 0) {
      imagePath = await saveUploadedImage(imageFile);
    } else if (imageUrl) {
      imagePath = imageUrl;
    }

    const id = formData.get('id') as string || uuidv4();
    const show = {
      id,
      date: formData.get('date') as string || '',
      month: formData.get('month') as string || '',
      year: formData.get('year') as string || '',
      venue: formData.get('venue') as string || '',
      city: formData.get('city') as string || '',
      country: formData.get('country') as string || '',
      image: imagePath,
      status: formData.get('status') as string || 'available',
      ticketUrl: formData.get('ticketUrl') as string || '#',
      time: formData.get('time') as string || '',
      address: formData.get('address') as string || '',
      description: formData.get('description') as string || '',
      duration: formData.get('duration') as string || '',
      price: formData.get('price') as string || '',
    };

    // Validate required fields
    if (!show.date || !show.month || !show.year || !show.venue || !show.city || !show.country) {
      return NextResponse.json({ error: 'Champs obligatoires manquants (date, mois, année, salle, ville, pays)' }, { status: 400 });
    }

    // Validate status
    if (!['available', 'few-left', 'sold-out'].includes(show.status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    db.prepare(`
      INSERT INTO shows (id, date, month, year, venue, city, country, image, status, ticketUrl, time, address, description, duration, price)
      VALUES (@id, @date, @month, @year, @venue, @city, @country, @image, @status, @ticketUrl, @time, @address, @description, @duration, @price)
    `).run(show);

    return NextResponse.json(show, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
