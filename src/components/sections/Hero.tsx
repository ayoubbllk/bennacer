'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 HERO SECTION - Full-Screen Photo + Animated SVG Overlays
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Animated SVG: Rotating ring ── */
function SpinRing({ className, size = 200, delay = 0 }: { className?: string; size?: number; delay?: number }) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{ opacity: { duration: 1, delay }, scale: { duration: 1, delay }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
    >
      <circle cx="100" cy="100" r="90" stroke="rgba(255,107,53,0.12)" strokeWidth="1" strokeDasharray="8 12" />
      <circle cx="100" cy="100" r="70" stroke="rgba(255,170,0,0.08)" strokeWidth="0.5" strokeDasharray="4 16" />
    </motion.svg>
  );
}

/* ── Animated SVG: Sound waves ── */
function SoundWaves({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="60" viewBox="0 0 120 60" fill="none">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.rect
          key={i}
          x={i * 17 + 2}
          width="8"
          rx="4"
          fill="url(#waveGrad)"
          animate={{
            height: [12, 30 + Math.random() * 28, 8, 40 + Math.random() * 18, 12],
            y: [24, 30 - (30 + Math.random() * 28) / 2, 26, 30 - (40 + Math.random() * 18) / 2, 24],
          }}
          transition={{ duration: 1.2 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
        />
      ))}
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Animated SVG: Star / Sparkle ── */
function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="rgba(255,170,0,0.6)" />
    </motion.svg>
  );
}

/* ── Animated SVG: Floating curved line ── */
function FloatingCurve({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      className={className}
      width="300"
      height="200"
      viewBox="0 0 300 200"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      <motion.path
        d="M0 100 Q75 20 150 100 T300 100"
        stroke="rgba(255,107,53,0.15)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      />
      <motion.path
        d="M0 130 Q75 50 150 130 T300 130"
        stroke="rgba(255,170,0,0.08)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: delay + 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      />
    </motion.svg>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  const photoY = useTransform(smooth, [0, 1], ['0%', '20%']);
  const photoScale = useTransform(smooth, [0, 0.5], [1.02, 1.15]);
  const contentY = useTransform(smooth, [0, 1], ['0%', '60%']);
  const fadeOut = useTransform(smooth, [0, 0.45], [1, 0]);

  useEffect(() => {
    const target = 150;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + step >= target) { clearInterval(interval); return target; }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[170vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ══════════ FULL-SCREEN PHOTO ══════════ */}
        <motion.div className="absolute inset-0 z-0" style={{ y: photoY, scale: photoScale }}>
          <Image
            src="/hero.jpeg"
            alt="Mouaadh Bennacer sur scène"
            fill
            priority
            quality={90}
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
          {/* Subtle overlays — NOT heavy black */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/20" />
          {/* Warm tone */}
          <div className="absolute inset-0 mix-blend-soft-light bg-linear-to-br from-orange-700/20 via-transparent to-amber-900/10" />
        </motion.div>

        {/* ══════════ ANIMATED SVG DECORATIONS ══════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

          {/* Large rotating ring — top right */}
          <SpinRing className="absolute -top-16 -right-16 md:top-10 md:right-10 opacity-60" size={280} delay={0.5} />

          {/* Smaller ring — bottom left */}
          <SpinRing className="absolute -bottom-10 -left-10 opacity-40" size={180} delay={1} />

          {/* Sound wave EQ — bottom center */}
          <motion.div
            className="absolute bottom-28 left-1/2 -translate-x-1/2 md:bottom-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <SoundWaves />
          </motion.div>

          {/* Sparkles scattered */}
          <Sparkle className="absolute top-[18%] left-[12%]" delay={0} />
          <Sparkle className="absolute top-[30%] right-[8%]" delay={1.2} />
          <Sparkle className="absolute bottom-[35%] left-[25%]" delay={2} />
          <Sparkle className="absolute top-[15%] right-[30%]" delay={0.7} />
          <Sparkle className="absolute bottom-[20%] right-[18%]" delay={1.8} />

          {/* Floating curved lines */}
          <FloatingCurve className="absolute top-[10%] -left-10 opacity-70" delay={0.4} />
          <FloatingCurve className="absolute bottom-[15%] -right-10 rotate-180 opacity-50" delay={1} />

          {/* Decorative dots grid */}
          <motion.div
            className="absolute top-20 right-20 hidden lg:grid grid-cols-5 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 1.5 }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </motion.div>

          {/* Diagonal accent lines */}
          <motion.div
            className="absolute top-0 right-[20%] w-px h-[40vh] bg-linear-to-b from-orange-500/30 via-orange-500/10 to-transparent origin-top rotate-15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          />
          <motion.div
            className="absolute top-0 right-[22%] w-px h-[35vh] bg-linear-to-b from-amber-500/15 via-transparent to-transparent origin-top rotate-15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] as const }}
          />

          {/* Horizontal scan line effect */}
          <motion.div
            className="absolute left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* ══════════ CENTERED CONTENT ══════════ */}
        <motion.div
          className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
          style={{ opacity: fadeOut }}
        >
          <motion.div style={{ y: contentY }}>

            {/* Tag badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cream/10 bg-white/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs tracking-[0.25em] uppercase text-cream/70 font-medium">
                  Tournée 2025 — 2026
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.88] tracking-[-0.04em] text-cream"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 }}
              >
                MOUAADH
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.h1
                className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.88] tracking-[-0.04em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.65 }}
              >
                <span className="bg-linear-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  BENNACER
                </span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-6 md:mt-8 text-base md:text-xl text-cream/60 font-light max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Quand le rire devient{' '}
              <span className="text-orange-400 font-semibold">un art</span>,
              <br className="hidden md:block" /> la scène devient magique.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Link href="/shows">
                <motion.button
                  className="group relative px-10 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,107,53,0.25)]"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,107,53,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Voir les dates
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  className="px-10 py-4 border border-cream/20 text-cream/80 font-medium text-sm uppercase tracking-widest rounded-full hover:border-orange-500/40 hover:text-cream backdrop-blur-sm transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Découvrir l&apos;artiste
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-14 flex justify-center gap-8 md:gap-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              {[
                { value: `${count}+`, label: 'Shows' },
                { value: '50K+', label: 'Spectateurs' },
                { value: '12', label: 'Villes' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="text-2xl md:text-3xl font-black tabular-nums text-orange-500">{stat.value}</span>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/30 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ══════════ SCROLL INDICATOR ══════════ */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: fadeOut }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-cream/30 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <motion.div className="w-5 h-8 rounded-full border border-cream/15 flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-1.5 rounded-full bg-orange-500"
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
