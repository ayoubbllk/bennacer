'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 SHOWS HERO - Dramatic Dates Header
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ShowsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/shows-hero.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Spotlight effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-orange-500/30 via-transparent to-transparent transform -rotate-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-orange-500/30 via-transparent to-transparent transform rotate-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
        style={{ opacity, y }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Tournée 2024-2025
          </span>
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream"
          >
            Spectacles &
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-orange-500"
          >
            Dates
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-lg md:text-xl text-cream/60 max-w-xl"
        >
          Retrouvez toutes les dates de ma tournée et réservez vos places 
          pour une soirée de rires garantis.
        </motion.p>
      </motion.div>
    </section>
  );
}
