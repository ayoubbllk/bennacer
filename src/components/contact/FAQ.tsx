'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ScrollReveal } from '@/components/motion/MotionWrapper';

const faqs = [
  {
    question: 'Comment réserver des places pour un spectacle ?',
    answer: 'Vous pouvez réserver directement via la page Spectacles de ce site, ou via les plateformes de billetterie partenaires (Fnac, Ticketmaster). Pour les réservations de groupe (10+), contactez-nous directement.',
  },
  {
    question: 'Est-il possible de privatiser un spectacle ?',
    answer: 'Absolument ! Mouaadh se produit régulièrement pour des événements privés : soirées d\'entreprise, mariages, galas. Contactez notre équipe booking pour un devis personnalisé.',
  },
  {
    question: 'Quelle est la durée d\'un spectacle ?',
    answer: 'Un spectacle dure en moyenne 1h30, parfois plus si l\'énergie du public le permet. Il n\'y a généralement pas d\'entracte, pour garder l\'énergie au maximum.',
  },
  {
    question: 'Y a-t-il une limite d\'âge ?',
    answer: 'Le spectacle est conseillé à partir de 14 ans. L\'humour de Mouaadh est accessible mais certains sujets sont destinés à un public adulte. Les enfants de moins de 14 ans doivent être accompagnés.',
  },
  {
    question: 'Comment contacter l\'équipe pour la presse ?',
    answer: 'Pour toute demande presse, interview ou partenariat média, envoyez un email à notre service communication via le formulaire de contact en sélectionnant "Presse & Médias".',
  },
  {
    question: 'Mouaadh est-il disponible pour des podcasts ou émissions ?',
    answer: 'Oui ! Mouaadh adore les formats conversationnels. Podcasts, émissions radio ou TV, n\'hésitez pas à faire votre demande. Le calendrier est serré mais on trouve toujours un créneau.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-scene-anthracite/30">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-spotlight-orange/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-spotlight-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-spotlight-orange border border-spotlight-orange/30 rounded-full">
            FAQ
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-cream tracking-tight">
            QUESTIONS <span className="text-gradient">FRÉQUENTES</span>
          </h2>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} variant="fadeInUp" delay={0.05 * i}>
              <motion.div
                className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
                  openIndex === i
                    ? 'border-spotlight-orange/30 bg-scene-anthracite/50'
                    : 'border-cream/5 bg-scene-anthracite/20 hover:border-cream/10'
                }`}
              >
                {/* Question button */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-4">
                    <span className={`font-display text-lg transition-colors duration-300 ${
                      openIndex === i ? 'text-spotlight-orange' : 'text-cream/30'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-base md:text-lg transition-colors duration-300 ${
                      openIndex === i ? 'text-cream' : 'text-cream/70'
                    }`}>
                      {faq.question}
                    </span>
                  </span>

                  {/* Toggle icon */}
                  <motion.div
                    className="flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center"
                    animate={{
                      rotate: openIndex === i ? 45 : 0,
                      borderColor: openIndex === i ? 'rgba(255, 107, 53, 0.4)' : 'rgba(245, 245, 240, 0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={openIndex === i ? 'text-spotlight-orange' : 'text-cream/40'}
                      />
                      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={openIndex === i ? 'text-spotlight-orange' : 'text-cream/40'}
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pl-[4.5rem]">
                        <p className="text-sm md:text-base text-cream/50 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
