'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal, HoverCard } from '@/components/motion/MotionWrapper';

const moments = [
  {
    id: 1,
    title: 'Avant le show',
    description: 'Les rituels d\'avant-scène',
    gradient: 'from-spotlight-orange/20 to-stage-red/20',
    emoji: '🎭',
    span: 'col-span-2 row-span-2',
    height: 'h-80 md:h-96',
  },
  {
    id: 2,
    title: 'En tournée',
    description: 'De ville en ville',
    gradient: 'from-spotlight-amber/20 to-spotlight-orange/10',
    emoji: '🚐',
    span: 'col-span-1 row-span-1',
    height: 'h-44 md:h-48',
  },
  {
    id: 3,
    title: 'Écriture',
    description: 'Là où tout commence',
    gradient: 'from-scene-charcoal to-spotlight-gold/10',
    emoji: '✍️',
    span: 'col-span-1 row-span-1',
    height: 'h-44 md:h-48',
  },
  {
    id: 4,
    title: 'Le public',
    description: 'L\'énergie qui donne tout',
    gradient: 'from-spotlight-gold/15 to-spotlight-amber/10',
    emoji: '👏',
    span: 'col-span-1 row-span-2',
    height: 'h-80 md:h-96',
  },
  {
    id: 5,
    title: 'Backstage',
    description: 'Les moments de vérité',
    gradient: 'from-stage-curtain/30 to-scene-anthracite',
    emoji: '🎬',
    span: 'col-span-1 row-span-1',
    height: 'h-44 md:h-48',
  },
  {
    id: 6,
    title: 'Répétitions',
    description: 'Le travail invisible',
    gradient: 'from-scene-charcoal to-scene-gray/30',
    emoji: '🔁',
    span: 'col-span-2 row-span-1',
    height: 'h-44 md:h-48',
  },
];

export function BehindTheScenes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-spotlight-orange/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Behind the scenes
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            DANS LES <span className="text-gradient">COULISSES</span>
          </h2>
          <p className="mt-6 text-lg text-cream/50 max-w-2xl mx-auto">
            Le spectacle ne commence pas sur scène. Découvrez les moments qui construisent chaque représentation.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.id}
              className={`${moment.span} ${moment.height}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HoverCard
                className="h-full"
                hoverEffect="lift"
              >
                <div className={`relative h-full rounded-2xl overflow-hidden bg-gradient-to-br ${moment.gradient} border border-cream/5 group cursor-pointer`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(245,245,240,0.3) 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    {/* Large emoji */}
                    <motion.span
                      className="text-5xl md:text-6xl mb-4 block"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {moment.emoji}
                    </motion.span>

                    <h3 className="font-display text-2xl md:text-3xl text-cream group-hover:text-spotlight-orange transition-colors duration-300">
                      {moment.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/40 group-hover:text-cream/60 transition-colors duration-300">
                      {moment.description}
                    </p>

                    {/* Hover arrow */}
                    <motion.div
                      className="absolute top-6 right-6 w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 13L13 1M13 1H1M13 1V13" stroke="currentColor" strokeWidth="1.5" className="text-cream/60" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Spotlight overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-scene-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
