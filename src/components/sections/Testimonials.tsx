'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 💬 TESTIMONIALS - Immersive Video-Style Section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Un talent rare qui sait toucher le public avec une authenticité désarmante. Mouaadh, c'est le futur du stand-up français.",
    author: "Marie-Claire Dupont",
    role: "Directrice artistique, Le Comedy Club",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  },
  {
    id: 2,
    quote: "J'ai mal aux côtes ! Un spectacle qu'on n'oublie pas. Ça faisait longtemps que je n'avais pas autant ri.",
    author: "Jean-Pierre Martin",
    role: "Spectateur fidèle",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    id: 3,
    quote: "Une énergie sur scène qui te transporte. Mouaadh a cette capacité unique de rendre le quotidien hilarant.",
    author: "Sophie Laurent",
    role: "Journaliste Culture",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </motion.div>

      {/* Large quote mark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] text-orange-500/5 font-serif leading-none select-none pointer-events-none">
        &rdquo;
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-orange-500 text-sm tracking-[0.3em] uppercase font-medium">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mt-4">
            Ce qu&apos;ils en <span className="text-orange-500">disent</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              {/* Quote */}
              <p className="text-2xl md:text-3xl lg:text-4xl text-cream font-light leading-relaxed mb-10 max-w-4xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                />
                <div className="text-left">
                  <div className="text-cream font-semibold">
                    {testimonials[current].author}
                  </div>
                  <div className="text-cream/50 text-sm">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="group relative"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current 
                  ? 'bg-orange-500 scale-100' 
                  : 'bg-cream/30 scale-75 hover:bg-cream/50'
              }`} />
              {index === current && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-orange-500"
                  layoutId="testimonial-indicator"
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
