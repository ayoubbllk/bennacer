'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const phases = [
  {
    number: '01',
    title: 'L\'ATTENTE',
    subtitle: 'Avant le spectacle',
    description: 'Les lumières s\'éteignent doucement. Le brouhaha du public se transforme en murmure. L\'excitation monte. L\'adrénaline est palpable.',
    emoji: '🌑',
    details: [
      'Accueil personnalisé',
      'Ambiance immersive dès l\'entrée',
      'Musique soigneusement sélectionnée',
    ],
    gradient: 'from-scene-charcoal to-scene-anthracite',
  },
  {
    number: '02',
    title: 'L\'EXPLOSION',
    subtitle: 'Pendant le spectacle',
    description: 'Le spotlight s\'allume. Mouaadh prend le micro. Et là, c\'est 90 minutes de rires, d\'émotions et de moments qui resteront gravés.',
    emoji: '💥',
    details: [
      '90 minutes de show non-stop',
      'Interaction avec le public',
      'Moments d\'improvisation uniques',
    ],
    gradient: 'from-spotlight-orange/20 to-stage-red/10',
  },
  {
    number: '03',
    title: 'L\'AFTER',
    subtitle: 'Après le spectacle',
    description: 'Le spectacle ne s\'arrête pas au salut final. Séance photos, dédicaces et échanges avec un artiste accessible et généreux.',
    emoji: '✨',
    details: [
      'Meet & Greet avec l\'artiste',
      'Photos et dédicaces',
      'Souvenirs inoubliables',
    ],
    gradient: 'from-spotlight-gold/15 to-spotlight-amber/10',
  },
];

export function ShowExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-scene-anthracite via-scene-black to-scene-anthracite" />

      {/* Vertical line through center */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-spotlight-orange/20 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-24">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            L&apos;Expérience
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            BIEN PLUS QU&apos;UN <span className="text-gradient">SPECTACLE</span>
          </h2>
          <p className="mt-6 text-lg text-cream/50 max-w-2xl mx-auto">
            Un show de Mouaadh, c&apos;est une aventure en trois actes. Chaque moment est pensé pour vous.
          </p>
        </ScrollReveal>

        {/* Phases */}
        <div className="space-y-16 lg:space-y-0">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Phase content */}
              <div className={`relative ${i % 2 !== 0 ? 'lg:order-2 lg:text-left' : 'lg:text-right'} mb-8 lg:mb-0 py-8 lg:py-16`}>
                {/* Phase number */}
                <motion.span
                  className="font-display text-8xl md:text-9xl text-spotlight-orange/10"
                  initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.3 }}
                >
                  {phase.number}
                </motion.span>

                <h3 className="font-display text-4xl md:text-5xl text-cream mt-2">
                  {phase.title}
                </h3>
                <p className="text-sm tracking-[0.2em] uppercase text-spotlight-orange mt-2">
                  {phase.subtitle}
                </p>
                <p className="mt-6 text-cream/50 leading-relaxed max-w-md inline-block">
                  {phase.description}
                </p>
              </div>

              {/* Phase visual card */}
              <div className={`${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <motion.div
                  className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${phase.gradient} border border-cream/5 p-8 md:p-10`}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255, 107, 53, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {/* Large emoji background */}
                  <div className="absolute top-4 right-4 text-7xl opacity-20">
                    {phase.emoji}
                  </div>

                  <div className="relative">
                    <ul className="space-y-4">
                      {phase.details.map((detail, j) => (
                        <motion.li
                          key={j}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + i * 0.3 + j * 0.1,
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-spotlight-orange flex-shrink-0" />
                          <span className="text-cream/70">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-spotlight-orange/20 rounded-bl-lg" />
                </motion.div>
              </div>

              {/* Center dot for timeline (desktop) */}
              <motion.div
                className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-spotlight-orange z-20"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  delay: 0.5 + i * 0.3,
                }}
              >
                <div className="absolute inset-0 rounded-full bg-spotlight-orange animate-ping opacity-20" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
