import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'shows');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const TYPE_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function saveUploadedImage(file: File): Promise<string> {
  ensureUploadDir();

  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Type de fichier non autorisé: ${file.type}. Formats acceptés: JPEG, PNG, WebP`);
  }

  // Validate size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 5MB`);
  }

  const ext = TYPE_TO_EXT[file.type];
  const filename = `${uuidv4()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return `/uploads/shows/${filename}`;
}

export function deleteUploadedImage(imagePath: string) {
  // Only delete local uploads, not external URLs
  if (!imagePath.startsWith('/uploads/shows/')) return;

  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
