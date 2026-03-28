import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { saveUploadedImage, deleteUploadedImage } from '@/lib/upload';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const show = db.prepare('SELECT * FROM shows WHERE id = ?').get(id);
  if (!show) {
    return NextResponse.json({ error: 'Spectacle introuvable' }, { status: 404 });
  }
  return NextResponse.json(show);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await verifyAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;
  const existing = db.prepare('SELECT * FROM shows WHERE id = ?').get(id) as
    | { image: string }
    | undefined;

  if (!existing) {
    return NextResponse.json({ error: 'Spectacle introuvable' }, { status: 404 });
  }

  try {
    const formData = await request.formData();

    // Handle image
    let imagePath = existing.image;
    const imageFile = formData.get('imageFile') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (imageFile && imageFile.size > 0) {
      // Upload new image and delete old local one
      imagePath = await saveUploadedImage(imageFile);
      deleteUploadedImage(existing.image);
    } else if (imageUrl && imageUrl !== existing.image) {
      // New non-empty URL provided, delete old local image
      deleteUploadedImage(existing.image);
      imagePath = imageUrl;
    }

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
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    if (!['available', 'few-left', 'sold-out'].includes(show.status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    db.prepare(`
      UPDATE shows SET
        date = @date, month = @month, year = @year, venue = @venue,
        city = @city, country = @country, image = @image, status = @status,
        ticketUrl = @ticketUrl, time = @time, address = @address,
        description = @description, duration = @duration, price = @price,
        updated_at = datetime('now')
      WHERE id = @id
    `).run(show);

    return NextResponse.json(show);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await verifyAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;
  const existing = db.prepare('SELECT * FROM shows WHERE id = ?').get(id) as
    | { image: string }
    | undefined;

  if (!existing) {
    return NextResponse.json({ error: 'Spectacle introuvable' }, { status: 404 });
  }

  // Delete local image file if exists
  deleteUploadedImage(existing.image);

  db.prepare('DELETE FROM shows WHERE id = ?').run(id);

  return NextResponse.json({ success: true });
}
