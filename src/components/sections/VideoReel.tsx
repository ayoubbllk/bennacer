'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const highlights = [
  { emoji: '🎬', label: 'Extraits de spectacles' },
  { emoji: '😂', label: 'Best-of moments' },
  { emoji: '🎤', label: 'Lives inédits' },
  { emoji: '🌟', label: 'Coulisses exclusives' },
];

export function VideoReel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-scene-anthracite">
      {/* Grain overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-scene-black via-transparent to-scene-black opacity-60 z-10" />

      {/* Floating film strip decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-spotlight-orange/10 rounded-sm"
            style={{
              top: `${15 + i * 15}%`,
              left: `${5 + i * 16}%`,
            }}
            animate={isInView ? {
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.1, 0.3, 0.1],
            } : {}}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Showreel
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            L&apos;ÉNERGIE SUR <span className="text-gradient">SCÈNE</span>
          </h2>
        </ScrollReveal>

        {/* Cinematic video container */}
        <ScrollReveal variant="scaleUp" className="relative max-w-5xl mx-auto">
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Video placeholder background */}
            <div className="absolute inset-0 bg-gradient-to-br from-scene-charcoal via-scene-anthracite to-scene-black" />

            {/* Film grain effect */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Film strip borders */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-scene-black flex items-center gap-3 px-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-4 h-3 rounded-sm bg-scene-charcoal flex-shrink-0" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-scene-black flex items-center gap-3 px-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-4 h-3 rounded-sm bg-scene-charcoal flex-shrink-0" />
              ))}
            </div>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Spotlight glow behind play button */}
              <motion.div
                className="absolute w-64 h-64 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                  opacity: isHovered ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Play button */}
              <motion.div
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-cream/30 flex items-center justify-center backdrop-blur-sm"
                animate={{
                  borderColor: isHovered ? 'rgba(255, 107, 53, 0.8)' : 'rgba(245, 245, 240, 0.3)',
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-0 h-0 ml-2"
                  style={{
                    borderTop: '18px solid transparent',
                    borderBottom: '18px solid transparent',
                    borderLeft: '30px solid #f5f5f0',
                  }}
                  animate={{
                    borderLeftColor: isHovered ? '#ff6b35' : '#f5f5f0',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Text below */}
              <motion.p
                className="relative z-10 mt-6 text-sm md:text-base tracking-[0.2em] uppercase text-cream/60"
                animate={{ opacity: isHovered ? 1 : 0.6 }}
              >
                Regarder le showreel
              </motion.p>
            </div>

            {/* Scan lines effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              }}
            />
          </motion.div>

          {/* Bottom reflection */}
          <div className="h-20 mt-1 rounded-2xl overflow-hidden opacity-20 scale-y-[-1] blur-sm"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 107, 53, 0.2) 0%, transparent 100%)',
            }}
          />
        </ScrollReveal>

        {/* Highlights chips */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.label} variant="fadeInUp" delay={0.1 * i}>
              <motion.div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-scene-charcoal/50 border border-cream/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 107, 53, 0.3)' }}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm text-cream/70">{item.label}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
