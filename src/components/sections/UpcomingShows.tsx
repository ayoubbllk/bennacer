'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 UPCOMING SHOWS - Horizontal Scroll Gallery
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface Show {
  id: string;
  date: string;
  month: string;
  venue: string;
  city: string;
  image: string;
  status: 'available' | 'few-left' | 'sold-out';
}

const shows: Show[] = [
  {
    id: '1',
    date: '15',
    month: 'MAR',
    venue: 'Théâtre du Rond-Point',
    city: 'Paris',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070',
    status: 'available',
  },
  {
    id: '2',
    date: '22',
    month: 'MAR',
    venue: 'Le Comedy Club',
    city: 'Lyon',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
    status: 'few-left',
  },
  {
    id: '3',
    date: '05',
    month: 'AVR',
    venue: 'Zénith Sud',
    city: 'Montpellier',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070',
    status: 'available',
  },
  {
    id: '4',
    date: '18',
    month: 'AVR',
    venue: 'Le Krakatoa',
    city: 'Bordeaux',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070',
    status: 'sold-out',
  },
];

const statusConfig = {
  'available': { label: 'Places disponibles', color: 'bg-green-500' },
  'few-left': { label: 'Dernières places', color: 'bg-orange-500' },
  'sold-out': { label: 'Complet', color: 'bg-red-500' },
};

export function UpcomingShows() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
              Agenda
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
              Prochaines
              <br />
              <span className="text-orange-500">Dates</span>
            </h2>
          </div>
          
          <Link href="/shows">
            <motion.button
              className="group flex items-center gap-4 text-cream hover:text-orange-500 transition-colors"
              whileHover={{ x: 10 }}
            >
              <span className="text-lg">Voir tout l&apos;agenda</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Shows Horizontal Scroll */}
      <motion.div 
        className="flex gap-8 px-6 lg:px-12"
        style={{ x }}
      >
        {shows.map((show, index) => (
          <ShowCard key={show.id} show={show} index={index} />
        ))}
      </motion.div>

      {/* Bottom line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          style={{ transformOrigin: 'left' }}
        />
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
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-[350px] md:w-[400px] group cursor-pointer"
    >
      {/* Image container */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${show.image}')` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* Date badge */}
        <div className="absolute top-6 left-6 text-center">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-cream/10">
            <div className="text-4xl font-bold text-cream">{show.date}</div>
            <div className="text-orange-500 text-sm tracking-wider">{show.month}</div>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-6 right-6">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.color}/20 backdrop-blur-sm`}>
            <span className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-cream text-xs">{status.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-cream mb-2 group-hover:text-orange-500 transition-colors">
            {show.venue}
          </h3>
          <p className="text-cream/60 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {show.city}
          </p>
        </div>

        {/* Hover overlay with CTA */}
        <motion.div
          className="absolute inset-0 bg-orange-500/90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: isAvailable ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isAvailable && (
            <motion.button
              className="px-8 py-4 bg-black text-cream font-bold rounded-full"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
            >
              Réserver ma place
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
