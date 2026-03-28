'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const images = [
  { id: 1, title: 'Sur scène à Paris', color: 'from-spotlight-orange/30 to-stage-red/20', size: 'col-span-2 row-span-2', emoji: '🎤' },
  { id: 2, title: 'Festival d\'Avignon', color: 'from-spotlight-amber/20 to-spotlight-gold/10', size: 'col-span-1 row-span-1', emoji: '🌞' },
  { id: 3, title: 'Interview TV', color: 'from-scene-charcoal to-spotlight-orange/10', size: 'col-span-1 row-span-1', emoji: '📺' },
  { id: 4, title: 'Backstage Olympia', color: 'from-stage-curtain/40 to-scene-anthracite', size: 'col-span-1 row-span-2', emoji: '🎭' },
  { id: 5, title: 'Écriture nocturne', color: 'from-scene-anthracite to-spotlight-gold/10', size: 'col-span-1 row-span-1', emoji: '✏️' },
  { id: 6, title: 'Standing ovation', color: 'from-spotlight-gold/20 to-spotlight-amber/10', size: 'col-span-2 row-span-1', emoji: '👏' },
  { id: 7, title: 'Tournée Maghreb', color: 'from-spotlight-warm/20 to-stage-red/10', size: 'col-span-1 row-span-1', emoji: '✈️' },
  { id: 8, title: 'Plateau Comedy Club', color: 'from-scene-charcoal to-scene-gray/40', size: 'col-span-1 row-span-1', emoji: '🌙' },
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-scene-anthracite/50">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-spotlight-orange/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Galerie
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            MOMENTS <span className="text-gradient">CAPTURÉS</span>
          </h2>
        </ScrollReveal>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={`${img.size} relative group cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className={`relative h-full min-h-[180px] md:min-h-[220px] rounded-xl overflow-hidden bg-gradient-to-br ${img.color} border border-cream/5`}
                whileHover={{
                  rotateY: 5,
                  rotateX: -3,
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
              >
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,245,240,0.4) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }} />

                {/* Large emoji */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
                  {img.emoji}
                </div>

                {/* Bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-scene-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-display text-lg md:text-xl text-cream">{img.title}</p>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-cream/10 group-hover:border-spotlight-orange/40 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-cream/10 group-hover:border-spotlight-orange/40 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
