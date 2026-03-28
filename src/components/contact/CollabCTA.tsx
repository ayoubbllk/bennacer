'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const collabTypes = [
  { emoji: '🏢', title: 'Événement d\'entreprise', description: 'Team buildings, galas, séminaires' },
  { emoji: '🎬', title: 'Média & TV', description: 'Émissions, podcasts, interviews' },
  { emoji: '🤝', title: 'Partenariat de marque', description: 'Campagnes, ambassadeur, contenu' },
  { emoji: '🎭', title: 'Spectacle privé', description: 'Mariages, anniversaires, soirées VIP' },
];

export function CollabCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-scene-black via-scene-anthracite to-scene-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(255,107,53,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Floating spotlight orbs */}
      <motion.div
        className="absolute top-20 left-[15%] w-32 h-32 rounded-full bg-spotlight-orange/10 blur-[80px]"
        animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-[20%] w-48 h-48 rounded-full bg-spotlight-gold/8 blur-[100px]"
        animate={{ y: [20, -20, 20], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Main CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-6xl mb-8"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🚀
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight leading-[1.05]">
            CRÉONS QUELQUE CHOSE{' '}
            <span className="text-gradient">D&apos;INCROYABLE</span>{' '}
            ENSEMBLE
          </h2>

          <p className="mt-8 text-lg md:text-xl text-cream/50 max-w-2xl mx-auto">
            Vous avez un projet, un événement, une idée folle ? Parlons-en. 
            Chaque collaboration est une nouvelle aventure.
          </p>
        </motion.div>

        {/* Collab types grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {collabTypes.map((collab, i) => (
            <motion.div
              key={collab.title}
              className="group relative p-6 rounded-2xl bg-scene-anthracite/30 border border-cream/5 hover:border-spotlight-orange/20 backdrop-blur-sm transition-colors duration-300 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.span
                className="text-4xl block mb-4"
                whileHover={{ scale: 1.2 }}
              >
                {collab.emoji}
              </motion.span>
              <h3 className="font-display text-lg text-cream group-hover:text-spotlight-orange transition-colors duration-300">
                {collab.title}
              </h3>
              <p className="mt-2 text-xs text-cream/40">{collab.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-10 py-5 bg-spotlight-orange text-scene-black font-bold text-lg rounded-full hover:bg-spotlight-amber transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Discutons de votre projet
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <p className="mt-6 text-sm text-cream/30">
            Réponse garantie sous 48h
          </p>
        </motion.div>
      </div>
    </section>
  );
}
