'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

export function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-scene-black via-scene-anthracite to-scene-black" />
        {/* Large quote mark decoration */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[40rem] leading-none text-cream/[0.02] select-none pointer-events-none"
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          &ldquo;
        </motion.div>
      </div>

      {/* Spotlight from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-spotlight-orange/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <ScrollReveal variant="fadeInUp" className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Philosophie
          </span>
        </ScrollReveal>

        {/* Main quote */}
        <div className="relative">
          <motion.blockquote
            className="text-center"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-cream leading-[1.1] tracking-tight">
              Le rire est la{' '}
              <span className="text-gradient">plus courte distance</span>{' '}
              entre deux{' '}
              <span className="relative inline-block">
                personnes
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-spotlight-orange rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </p>
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="h-px w-12 bg-spotlight-orange/40" />
            <span className="text-sm tracking-[0.2em] uppercase text-cream/50">
              Mouaadh Bennacer
            </span>
            <div className="h-px w-12 bg-spotlight-orange/40" />
          </motion.div>
        </div>

        {/* Philosophy pillars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            {
              number: '01',
              title: 'Vérité',
              text: 'L\'humour naît de la vérité. Chaque blague est un miroir tendu au monde.',
            },
            {
              number: '02',
              title: 'Connexion',
              text: 'La scène est un dialogue. Le public n\'est pas spectateur, il est partenaire.',
            },
            {
              number: '03',
              title: 'Évolution',
              text: 'Ne jamais se répéter. Chaque spectacle doit surprendre, même son créateur.',
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className="group relative p-8 rounded-2xl border border-cream/5 hover:border-spotlight-orange/20 transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.15 }}
            >
              <span className="font-display text-6xl text-spotlight-orange/10 group-hover:text-spotlight-orange/30 transition-colors duration-500">
                {pillar.number}
              </span>
              <h3 className="mt-2 font-display text-2xl text-cream">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-cream/40 leading-relaxed">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
