'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 CALL TO ACTION - Full-Bleed Immersive CTA
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center"
        style={{ scale, opacity, y }}
      >
        {/* Emoji accent */}
        <motion.div
          className="text-6xl md:text-8xl mb-8"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🎭
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-8"
        >
          Prêt à passer une
          <br />
          <span className="text-orange-500">soirée inoubliable</span> ?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto mb-12"
        >
          Rejoignez-moi sur scène pour un moment de pure hilarité. 
          Le rire est le meilleur remède, et j&apos;ai votre prescription.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/shows">
            <motion.button
              className="group relative px-12 py-6 bg-orange-500 text-black font-bold text-xl rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Réserver mes places
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="px-12 py-6 border-2 border-cream/30 text-cream font-semibold text-xl rounded-full backdrop-blur-sm hover:bg-cream/10 hover:border-orange-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </motion.button>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-cream/60"
        >
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl font-bold">100K+</span>
            <span>spectateurs satisfaits</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl font-bold">4.9/5</span>
            <span>note moyenne</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl font-bold">500+</span>
            <span>spectacles</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative spotlight beams */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-orange-500/20 via-transparent to-transparent transform -rotate-12" />
      <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-orange-500/20 via-transparent to-transparent transform rotate-12" />
    </section>
  );
}
