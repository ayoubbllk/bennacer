'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📰 PRESS - Media Coverage Marquee
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';

const pressItems = [
  { name: 'LE MONDE', quote: '"Une révélation du stand-up français"' },
  { name: 'TÉLÉRAMA', quote: '"L\'humour intelligent qui fait du bien"' },
  { name: 'LIBÉRATION', quote: '"Un talent brut et rafraîchissant"' },
  { name: 'FRANCE INTER', quote: '"Le nouveau visage de l\'humour"' },
  { name: 'PARIS MATCH', quote: '"L\'artiste qui monte"' },
];

export function Press() {
  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-cream/10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Presse
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-4">
            Ils parlent de <span className="text-orange-500">moi</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling content */}
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...pressItems, ...pressItems].map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center gap-8"
            >
              <span className="text-cream/30 text-2xl font-bold tracking-wider whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-cream/60 text-lg italic whitespace-nowrap">
                {item.quote}
              </span>
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 lg:px-12 mt-20 text-center"
      >
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-orange-500/20 font-serif">
            &ldquo;
          </div>
          <blockquote className="text-2xl md:text-3xl text-cream/80 font-light italic leading-relaxed">
            Mouaadh Bennacer incarne une nouvelle génération d&apos;humoristes 
            qui n&apos;a pas peur de l&apos;authenticité.
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-orange-500" />
            <span className="text-orange-500 font-medium">Le Figaro</span>
            <div className="w-12 h-px bg-orange-500" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
