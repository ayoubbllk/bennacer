'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 SHOW DETAIL HERO - Dramatic single show header
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Show, statusConfig } from '@/lib/shows-types';

export function ShowDetailHero({ show }: { show: Show }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const status = statusConfig[show.status];
  const isAvailable = show.status !== 'sold-out';

  return (
    <section ref={containerRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${show.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </motion.div>

      {/* Spotlight effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-spotlight-orange/20 via-transparent to-transparent transform -rotate-6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-spotlight-orange/20 via-transparent to-transparent transform rotate-6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 lg:px-12"
        style={{ opacity, y }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-spotlight-orange transition-colors mb-8 group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm tracking-wider uppercase">Toutes les dates</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            {/* Left - Show info */}
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.color}/20 backdrop-blur-sm border border-cream/10`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${status.color} animate-pulse`} />
                  <span className="text-cream text-sm font-medium">{status.label}</span>
                </div>
              </motion.div>

              {/* Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-3"
              >
                <span className="text-spotlight-orange text-sm tracking-[0.3em] uppercase font-medium">
                  {show.date} {show.month} {show.year} — {show.time}
                </span>
              </motion.div>

              {/* Venue name */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none"
                >
                  {show.venue}
                </motion.h1>
              </div>

              {/* City */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 flex items-center gap-2 text-cream/60"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{show.city}, {show.country}</span>
              </motion.div>
            </div>

            {/* Right - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:text-right"
            >
              {isAvailable ? (
                <motion.a
                  href={show.ticketUrl}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-spotlight-orange text-black font-bold text-lg rounded-2xl hover:bg-spotlight-warm transition-colors shadow-glow-orange"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Réserver mes places
                </motion.a>
              ) : (
                <div className="inline-flex items-center gap-3 px-10 py-5 bg-cream/10 text-cream/50 font-bold text-lg rounded-2xl cursor-not-allowed">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Complet
                </div>
              )}
              <p className="mt-3 text-cream/40 text-sm">{show.price}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
