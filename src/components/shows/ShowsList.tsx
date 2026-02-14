'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📋 SHOWS LIST - Immersive Shows Grid
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Show {
  id: string;
  date: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  status: 'available' | 'few-left' | 'sold-out';
  ticketUrl: string;
}

const shows: Show[] = [
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
  },
  {
    id: '5',
    date: '25',
    month: 'Avril',
    year: '2025',
    venue: 'L\'Olympia',
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    status: 'few-left',
    ticketUrl: '#',
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
  },
];

const statusConfig = {
  'available': { label: 'Disponible', color: 'bg-green-500', textColor: 'text-green-400' },
  'few-left': { label: 'Dernières places', color: 'bg-orange-500', textColor: 'text-orange-400' },
  'sold-out': { label: 'Complet', color: 'bg-red-500', textColor: 'text-red-400' },
};

type FilterType = 'all' | 'available' | 'sold-out';

export function ShowsList() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredShows = shows.filter(show => {
    if (filter === 'all') return true;
    if (filter === 'available') return show.status !== 'sold-out';
    return show.status === 'sold-out';
  });

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {[
            { value: 'all', label: 'Toutes les dates' },
            { value: 'available', label: 'Places disponibles' },
            { value: 'sold-out', label: 'Complets' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as FilterType)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === option.value
                  ? 'bg-orange-500 text-black'
                  : 'bg-cream/10 text-cream hover:bg-cream/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* Shows grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredShows.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredShows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-cream/60 text-xl">Aucune date correspondante</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ShowCard({ show, index }: { show: Show; index: number }) {
  const status = statusConfig[show.status];
  const isAvailable = show.status !== 'sold-out';

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-cream/5 hover:bg-cream/10 transition-colors"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${show.image}')` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.color}/20 backdrop-blur-sm`}>
            <span className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-cream text-xs font-medium">{status.label}</span>
          </div>
        </div>

        {/* Date overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="text-4xl font-bold text-cream leading-none">{show.date}</div>
          <div className="text-orange-500 text-sm uppercase tracking-wider">{show.month}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Venue */}
        <h3 className="text-xl font-bold text-cream mb-2 group-hover:text-orange-500 transition-colors">
          {show.venue}
        </h3>

        {/* Location */}
        <p className="text-cream/60 flex items-center gap-2 mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {show.city}, {show.country}
        </p>

        {/* CTA */}
        {isAvailable ? (
          <motion.a
            href={show.ticketUrl}
            className="block w-full py-3 px-6 bg-orange-500 text-black font-bold text-center rounded-xl hover:bg-orange-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Réserver
          </motion.a>
        ) : (
          <div className="block w-full py-3 px-6 bg-cream/10 text-cream/50 font-medium text-center rounded-xl cursor-not-allowed">
            Complet
          </div>
        )}
      </div>
    </motion.article>
  );
}
