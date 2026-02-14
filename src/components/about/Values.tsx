'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 💎 VALUES - Cinematic Grid Section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';

const values = [
  {
    icon: '🎭',
    title: 'Authenticité',
    description: 'Être vrai sur scène, c\'est la clé. Pas de masque, juste moi et mes histoires.',
  },
  {
    icon: '❤️',
    title: 'Connexion',
    description: 'Chaque spectacle est un moment de partage unique avec le public.',
  },
  {
    icon: '💪',
    title: 'Travail',
    description: 'Derrière chaque blague, des heures de travail et de perfectionnement.',
  },
  {
    icon: '✨',
    title: 'Innovation',
    description: 'Repousser les limites du stand-up pour surprendre encore et toujours.',
  },
];

export function Values() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Philosophie
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Ce qui me <span className="text-orange-500">guide</span>
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 lg:p-12 rounded-3xl border border-cream/10 bg-cream/[0.02] hover:bg-cream/[0.05] hover:border-orange-500/30 transition-all duration-500"
            >
              {/* Icon */}
              <motion.div
                className="text-5xl mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {value.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-cream mb-4 group-hover:text-orange-500 transition-colors">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-cream/60 text-lg leading-relaxed">
                {value.description}
              </p>

              {/* Hover accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
