'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📋 SHOW INFO - Detailed show information section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/motion/MotionWrapper';
import { Show, statusConfig } from '@/lib/shows-types';

export function ShowInfo({ show }: { show: Show }) {
  const status = statusConfig[show.status];
  const isAvailable = show.status !== 'sold-out';

  const details = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Date',
      value: `${show.date} ${show.month} ${show.year}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Heure',
      value: show.time,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Durée',
      value: show.duration,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Adresse',
      value: show.address,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      label: 'Tarif',
      value: show.price,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-scene-black via-scene-anthracite to-scene-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Description */}
          <div className="lg:col-span-3">
            <ScrollReveal variant="fadeInUp">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
                Le spectacle
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight mb-8">
                À PROPOS DE <span className="text-gradient">CETTE DATE</span>
              </h2>
              <p className="text-cream/60 text-lg leading-relaxed mb-8">
                {show.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                {[
                  { emoji: '🎤', title: 'One-Man-Show', desc: 'Seul en scène' },
                  { emoji: '😂', title: 'Humour garanti', desc: '1h30 de rires' },
                  { emoji: '📸', title: 'Meet & Greet', desc: 'Après le spectacle' },
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-4 p-5 rounded-xl bg-cream/5 border border-cream/5 hover:border-spotlight-orange/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-3xl">{feature.emoji}</span>
                    <div>
                      <p className="font-bold text-cream">{feature.title}</p>
                      <p className="text-sm text-cream/40">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Info card */}
          <div className="lg:col-span-2">
            <ScrollReveal variant="fadeInUp" delay={0.2}>
              <div className="sticky top-32 rounded-2xl bg-scene-anthracite/80 border border-cream/10 overflow-hidden backdrop-blur-sm">
                {/* Card header */}
                <div className="p-6 bg-gradient-to-r from-spotlight-orange/10 to-transparent border-b border-cream/10">
                  <h3 className="font-display text-2xl text-cream">Informations</h3>
                </div>

                {/* Details list */}
                <div className="p-6 space-y-6">
                  {details.map((detail, i) => (
                    <motion.div
                      key={detail.label}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-spotlight-orange/10 text-spotlight-orange">
                        {detail.icon}
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-cream/40">{detail.label}</p>
                        <p className="text-cream mt-0.5">{detail.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Status & CTA */}
                <div className="p-6 border-t border-cream/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className={`text-sm font-medium ${status.textColor}`}>{status.label}</span>
                  </div>

                  {isAvailable ? (
                    <motion.a
                      href={show.ticketUrl}
                      className="block w-full py-4 px-6 bg-spotlight-orange text-black font-bold text-center rounded-xl hover:bg-spotlight-warm transition-colors text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Réserver
                    </motion.a>
                  ) : (
                    <div className="block w-full py-4 px-6 bg-cream/10 text-cream/50 font-medium text-center rounded-xl cursor-not-allowed text-lg">
                      Complet
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
