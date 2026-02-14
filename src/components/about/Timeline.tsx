'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📅 TIMELINE - Horizontal Scroll Journey
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const events: TimelineEvent[] = [
  {
    year: '2016',
    title: 'Premier Open Mic',
    description: 'Première montée sur scène à Marseille. Le trac, les bafouillements, mais surtout les premiers rires.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
  },
  {
    year: '2018',
    title: 'Café-Théâtre à Paris',
    description: 'L\'aventure parisienne commence. Rodage intensif dans les petites salles de la capitale.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=500',
  },
  {
    year: '2020',
    title: 'Premier One-Man Show',
    description: '"Rire Confiné" - Un spectacle né pendant la pandémie qui fait le buzz sur les réseaux.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=500',
  },
  {
    year: '2022',
    title: 'Tournée Nationale',
    description: '50 dates à travers la France. Zéniths, Olympia, et des milliers de spectateurs.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=500',
  },
  {
    year: '2024',
    title: 'Nouveau Spectacle',
    description: '"À Cœur Ouvert" - Le spectacle le plus personnel et abouti de ma carrière.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500',
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-60%']);

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Parcours
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Une histoire de
            <br />
            <span className="text-orange-500">passion</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll timeline */}
      <motion.div 
        className="flex gap-12 px-6 lg:px-12"
        style={{ x }}
      >
        {events.map((event, index) => (
          <TimelineCard key={event.year} event={event} index={index} />
        ))}
      </motion.div>

      {/* Progress line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
        <div className="relative h-1 bg-cream/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="flex-shrink-0 w-[400px] md:w-[500px] group"
    >
      {/* Year */}
      <div className="mb-6">
        <span className="text-6xl md:text-7xl font-bold text-orange-500/30 group-hover:text-orange-500/60 transition-colors">
          {event.year}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${event.image}')` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-cream group-hover:text-orange-500 transition-colors">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-cream/60 leading-relaxed">
        {event.description}
      </p>
    </motion.article>
  );
}
