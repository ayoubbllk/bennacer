import db from './db';
import { hashSync } from 'bcryptjs';
import { ensureUploadDir } from './upload';

const ADMIN_USERNAME = 'mou';
const ADMIN_PASSWORD = 'alder@:31';

const showsData = [
  {
    id: '1',
    date: '15',
    month: 'Mars',
    year: '2025',
    venue: 'Théâtre du Rond-Point',
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800',
    status: 'available',
    ticketUrl: '#',
    time: '20h30',
    address: '2bis Av. Franklin Delano Roosevelt, 75008 Paris',
    description: "Mouaadh Bennacer débarque au Théâtre du Rond-Point pour une soirée exceptionnelle de stand-up. Un one-man-show intense, drôle et émouvant qui vous fera traverser toute la palette des émotions. De l'humour observationnel aux anecdotes personnelles, Mouaadh livre un spectacle authentique et généreux.",
    duration: '1h30',
    price: 'À partir de 25€',
  },
  {
    id: '2',
    date: '22',
    month: 'Mars',
    year: '2025',
    venue: 'Le Comedy Club',
    city: 'Lyon',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',
    status: 'few-left',
    ticketUrl: '#',
    time: '21h00',
    address: "15 Rue du Bât-d'Argent, 69001 Lyon",
    description: "Le Comedy Club de Lyon accueille Mouaadh pour une date très attendue. Dans une ambiance intimiste et chaleureuse, venez découvrir ou redécouvrir un artiste au sommet de son art. Places limitées pour une expérience au plus près de l'artiste.",
    duration: '1h30',
    price: 'À partir de 22€',
  },
  {
    id: '3',
    date: '05',
    month: 'Avril',
    year: '2025',
    venue: 'Zénith Sud',
    city: 'Montpellier',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800',
    status: 'available',
    ticketUrl: '#',
    time: '20h00',
    address: 'Domaine de Grammont, Avenue Albert Einstein, 34000 Montpellier',
    description: "Première date dans le sud de la France ! Le Zénith de Montpellier sera le théâtre d'un spectacle grandiose. Mouaadh relève le défi d'une grande salle avec un show pensé pour faire rire et vibrer chaque spectateur, du premier au dernier rang.",
    duration: '1h30',
    price: 'À partir de 28€',
  },
  {
    id: '4',
    date: '18',
    month: 'Avril',
    year: '2025',
    venue: 'Le Krakatoa',
    city: 'Bordeaux',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800',
    status: 'sold-out',
    ticketUrl: '#',
    time: '20h30',
    address: '3 Avenue Victor Hugo, 33700 Mérignac',
    description: "Le Krakatoa de Bordeaux vibre au rythme du stand-up ! Cette date affiche complet, preuve de l'engouement croissant pour l'humour de Mouaadh. Un spectacle qui mêle énergie brute et finesse d'écriture.",
    duration: '1h30',
    price: 'Complet',
  },
  {
    id: '5',
    date: '25',
    month: 'Avril',
    year: '2025',
    venue: "L'Olympia",
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    status: 'few-left',
    ticketUrl: '#',
    time: '20h00',
    address: '28 Boulevard des Capucines, 75009 Paris',
    description: "L'Olympia. La salle mythique. Mouaadh Bennacer foule les planches de cette scène légendaire pour un spectacle d'exception. Un moment historique dans sa carrière, partagé avec un public venu de toute la France. Les dernières places partent vite.",
    duration: '1h30',
    price: 'À partir de 35€',
  },
  {
    id: '6',
    date: '10',
    month: 'Mai',
    year: '2025',
    venue: 'Théâtre Sébastopol',
    city: 'Lille',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800',
    status: 'available',
    ticketUrl: '#',
    time: '20h30',
    address: 'Place Sébastopol, 59000 Lille',
    description: "Direction le nord ! Le Théâtre Sébastopol, joyau architectural lillois, accueille Mouaadh pour une soirée de stand-up mémorable. Un cadre prestigieux pour un spectacle qui promet rires et émotions.",
    duration: '1h30',
    price: 'À partir de 24€',
  },
];

function seed() {
  console.log('🌱 Seeding database...');

  // Ensure uploads directory exists
  ensureUploadDir();

  // Seed admin user
  const existingAdmin = db.prepare('SELECT id FROM admin WHERE username = ?').get(ADMIN_USERNAME);
  if (!existingAdmin) {
    const hash = hashSync(ADMIN_PASSWORD, 10);
    db.prepare('INSERT INTO admin (username, password_hash) VALUES (?, ?)').run(ADMIN_USERNAME, hash);
    console.log(`✅ Admin user created (username: ${ADMIN_USERNAME}, password: ${ADMIN_PASSWORD})`);
  } else {
    console.log('ℹ️  Admin user already exists, skipping.');
  }

  // Seed shows
  const insertShow = db.prepare(`
    INSERT OR IGNORE INTO shows (id, date, month, year, venue, city, country, image, status, ticketUrl, time, address, description, duration, price)
    VALUES (@id, @date, @month, @year, @venue, @city, @country, @image, @status, @ticketUrl, @time, @address, @description, @duration, @price)
  `);

  const insertMany = db.transaction((shows: typeof showsData) => {
    let inserted = 0;
    for (const show of shows) {
      const result = insertShow.run(show);
      if (result.changes > 0) inserted++;
    }
    return inserted;
  });

  const count = insertMany(showsData);
  console.log(`✅ ${count} shows inserted (${showsData.length - count} already existed)`);

  console.log('🎉 Seed complete!');
}

seed();
