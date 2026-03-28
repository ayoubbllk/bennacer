'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'SPECTACLES' },
  { value: '12', label: 'PAYS' },
  { value: '200K+', label: 'SPECTATEURS' },
  { value: '98%', label: 'SATISFACTION' },
  { value: '50+', label: 'VILLES' },
  { value: '10+', label: 'ANS D\'EXPÉRIENCE' },
  { value: '∞', label: 'FOUS RIRES' },
  { value: '#1', label: 'HUMOUR' },
];

// Duplicate for seamless loop
const allStats = [...stats, ...stats];

export function StatsMarquee() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-cream/5">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-scene-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-scene-black to-transparent" />

      {/* Marquee */}
      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {allStats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 flex-shrink-0">
            <span className="font-display text-4xl md:text-5xl text-gradient">
              {stat.value}
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-cream/40">
              {stat.label}
            </span>
            {/* Separator dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-spotlight-orange/30 ml-8" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
