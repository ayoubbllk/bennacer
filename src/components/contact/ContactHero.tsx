'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📬 CONTACT HERO - Minimalist Contact Header
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';

export function ContactHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-black to-black" />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Parlons ensemble
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
            Contact
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-cream/60 max-w-xl mx-auto"
        >
          Une question, une proposition, ou juste envie de dire bonjour ? 
          N&apos;hésitez pas à me contacter.
        </motion.p>
      </div>
    </section>
  );
}
