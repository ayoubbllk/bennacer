'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 👤 ABOUT HERO - Full-Screen Cinematic Introduction
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 lg:px-12"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-orange-500 text-sm tracking-[0.3em] uppercase">
              L&apos;histoire
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight"
            >
              Derrière
              <br />
              <span className="text-orange-500">le micro</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xl md:text-2xl text-cream/70 max-w-xl"
          >
            De Marseille aux plus grandes scènes de France, 
            découvrez le parcours d&apos;un humoriste passionné.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
