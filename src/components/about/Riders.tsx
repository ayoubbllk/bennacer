'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const riderItems = [
  {
    category: 'Sur scène',
    emoji: '🎤',
    items: [
      { icon: '🎙️', text: 'Un micro Shure SM58 (le classique)' },
      { icon: '💡', text: 'Un spotlight chaud, jamais froid' },
      { icon: '🪑', text: 'Un tabouret haut (au cas où)' },
      { icon: '💧', text: 'Une bouteille d\'eau (plate, jamais gazeuse)' },
    ],
  },
  {
    category: 'Backstage',
    emoji: '🎭',
    items: [
      { icon: '☕', text: 'Un café serré (double espresso)' },
      { icon: '🪞', text: 'Un miroir pour les grimaces d\'échauffement' },
      { icon: '🔇', text: '15 minutes de silence avant le show' },
      { icon: '🎵', text: 'Une playlist motivante (Stromae obligatoire)' },
    ],
  },
  {
    category: 'Superstitions',
    emoji: '🍀',
    items: [
      { icon: '👟', text: 'Toujours les mêmes baskets sur scène' },
      { icon: '🤝', text: 'Serrer la main du technicien son' },
      { icon: '📱', text: 'Ne jamais lire les critiques avant' },
      { icon: '🫶', text: 'Un message à maman avant chaque show' },
    ],
  },
];

export function Riders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Diagonal background split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-scene-black" />
        <div
          className="absolute inset-0 bg-scene-anthracite"
          style={{ clipPath: 'polygon(0 10%, 100% 0%, 100% 100%, 0% 90%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Le rider
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            LES <span className="text-gradient">RITUELS</span>
          </h2>
          <p className="mt-6 text-lg text-cream/50 max-w-xl mx-auto">
            Chaque artiste a ses petites manies. Voici celles de Mouaadh — en toute transparence.
          </p>
        </ScrollReveal>

        {/* Rider cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {riderItems.map((category, catIndex) => (
            <motion.div
              key={category.category}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 * catIndex,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full bg-scene-black/50 backdrop-blur-sm border border-cream/5 rounded-2xl p-8 hover:border-spotlight-orange/20 transition-colors duration-500 overflow-hidden">
                {/* Background emoji */}
                <div className="absolute -top-4 -right-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {category.emoji}
                </div>

                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{category.emoji}</span>
                  <h3 className="font-display text-2xl text-cream">{category.category}</h3>
                </div>

                {/* Items */}
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-start gap-3 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + catIndex * 0.2 + itemIndex * 0.1,
                      }}
                    >
                      <span className="text-xl flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm text-cream/60 group-hover/item:text-cream/80 transition-colors duration-300 leading-relaxed">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom line decoration */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-spotlight-orange/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + catIndex * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
