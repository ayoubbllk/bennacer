'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 👤 ABOUT PREVIEW - Cinematic Editorial Section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const stats = [
    { number: '10+', label: 'Années de Scène' },
    { number: '500+', label: 'Spectacles' },
    { number: '100K+', label: 'Spectateurs' },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069')`,
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div style={{ y: textY, opacity: textOpacity }}>
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
                  L&apos;Artiste
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-8"
              >
                Du premier
                <br />
                <span className="text-orange-500">open mic</span>
                <br />
                aux grandes scènes
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-cream/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              >
                Chaque spectacle est une nouvelle aventure. Entre observations du quotidien 
                et récits personnels décalés, Mouaadh transforme l&apos;ordinaire en moments 
                d&apos;hilarité collective.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-12 mb-12"
              >
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-cream/40 text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link href="/about">
                  <motion.button
                    className="group flex items-center gap-4 text-cream hover:text-orange-500 transition-colors"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-lg font-medium">Découvrir mon parcours</span>
                    <span className="w-12 h-px bg-current transition-all group-hover:w-20" />
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Decorative element / Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Large quote mark */}
                <div className="absolute -top-10 -left-10 text-[200px] text-orange-500/10 font-serif leading-none select-none">
                  &ldquo;
                </div>
                
                {/* Quote */}
                <blockquote className="relative z-10 text-2xl md:text-3xl text-cream/80 font-light italic leading-relaxed">
                  Le stand-up, c&apos;est transformer ses galères en fous rires.
                  C&apos;est ma thérapie, et vous êtes tous invités à la séance.
                </blockquote>
                
                {/* Signature */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-16 h-px bg-orange-500" />
                  <span className="text-orange-500 font-medium">Mouaadh B.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
