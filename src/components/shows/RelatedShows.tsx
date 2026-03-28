'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 RELATED SHOWS - Other upcoming dates section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/MotionWrapper';
import { Show, statusConfig } from '@/lib/shows-types';

export function RelatedShows({ currentShowId, shows }: { currentShowId: string; shows: Show[] }) {
  const otherShows = shows.filter((s) => s.id !== currentShowId).slice(0, 3);

  if (otherShows.length === 0) return null;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-scene-anthracite to-scene-black" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-spotlight-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Prochaines dates
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream tracking-tight">
            AUTRES <span className="text-gradient">SPECTACLES</span>
          </h2>
        </ScrollReveal>

        {/* Shows grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherShows.map((show, index) => (
            <RelatedShowCard key={show.id} show={show} index={index} />
          ))}
        </div>

        {/* See all link */}
        <ScrollReveal variant="fadeInUp" className="text-center mt-12">
          <Link
            href="/shows"
            className="inline-flex items-center gap-2 text-spotlight-orange hover:text-spotlight-warm transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase font-medium">Voir toutes les dates</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

function RelatedShowCard({ show, index }: { show: Show; index: number }) {
  const status = statusConfig[show.status];
  const isAvailable = show.status !== 'sold-out';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/shows/${show.id}`} className="block group">
        <article className="relative rounded-2xl overflow-hidden bg-cream/5 hover:bg-cream/10 transition-colors">
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
              <div className="text-spotlight-orange text-sm uppercase tracking-wider">{show.month}</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-cream mb-2 group-hover:text-spotlight-orange transition-colors">
              {show.venue}
            </h3>
            <p className="text-cream/60 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {show.city}, {show.country}
            </p>

            {/* Arrow indicator */}
            <div className="mt-4 flex items-center gap-2 text-spotlight-orange opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">Voir le spectacle</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
