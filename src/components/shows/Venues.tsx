'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const venues = [
  { name: 'Olympia', city: 'Paris', emoji: '🏛️' },
  { name: 'Zénith', city: 'Paris', emoji: '🎪' },
  { name: 'Théâtre Sébastopol', city: 'Lille', emoji: '🎭' },
  { name: 'Le Dôme', city: 'Marseille', emoji: '🌊' },
  { name: 'Palais des Congrès', city: 'Lyon', emoji: '🦁' },
  { name: 'Casino Barrière', city: 'Toulouse', emoji: '🌹' },
  { name: 'Opéra de Tunis', city: 'Tunis', emoji: '🕌' },
  { name: 'Mohammed V', city: 'Rabat', emoji: '🏰' },
  { name: 'Centre Culturel', city: 'Bruxelles', emoji: '🍫' },
  { name: 'Salle Pleyel', city: 'Paris', emoji: '🎼' },
];

// Duplicate for seamless loop
const allVenues = [...venues, ...venues];

export function Venues() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-scene-anthracite/30">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-spotlight-orange/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-20 px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            Les salles
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight">
            ILS NOUS ONT <span className="text-gradient">ACCUEILLIS</span>
          </h2>
        </ScrollReveal>

        {/* Venue marquee - Row 1 (left to right) */}
        <div className="relative mb-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-scene-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-scene-black to-transparent" />

          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ x: { duration: 40, repeat: Infinity, ease: 'linear' } }}
          >
            {allVenues.map((venue, i) => (
              <motion.div
                key={`row1-${i}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4 px-8 py-5 rounded-xl bg-scene-anthracite/50 border border-cream/5 hover:border-spotlight-orange/20 transition-colors duration-300 backdrop-blur-sm">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {venue.emoji}
                  </span>
                  <div>
                    <p className="font-display text-xl text-cream group-hover:text-spotlight-orange transition-colors duration-300">
                      {venue.name}
                    </p>
                    <p className="text-xs tracking-[0.15em] uppercase text-cream/30">
                      {venue.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Venue marquee - Row 2 (right to left) */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-scene-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-scene-black to-transparent" />

          <motion.div
            className="flex gap-4"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ x: { duration: 45, repeat: Infinity, ease: 'linear' } }}
          >
            {[...allVenues].reverse().map((venue, i) => (
              <motion.div
                key={`row2-${i}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4 px-8 py-5 rounded-xl bg-scene-anthracite/50 border border-cream/5 hover:border-spotlight-orange/20 transition-colors duration-300 backdrop-blur-sm">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {venue.emoji}
                  </span>
                  <div>
                    <p className="font-display text-xl text-cream group-hover:text-spotlight-orange transition-colors duration-300">
                      {venue.name}
                    </p>
                    <p className="text-xs tracking-[0.15em] uppercase text-cream/30">
                      {venue.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats below */}
        <ScrollReveal variant="fadeInUp" className="mt-16 px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: '50+', label: 'Salles prestigieuses' },
              { value: '12', label: 'Pays visités' },
              { value: '200K+', label: 'Spectateurs cumulés' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-gradient">{stat.value}</div>
                <div className="text-xs tracking-[0.2em] uppercase text-cream/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
