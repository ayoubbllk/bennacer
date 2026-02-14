'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📧 NEWSLETTER - Email Capture Section
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-black to-orange-900/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl mb-6"
        >
          🔔
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4"
        >
          Ne manquez aucune <span className="text-orange-500">date</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-cream/60 text-lg mb-10 max-w-2xl mx-auto"
        >
          Inscrivez-vous pour recevoir en avant-première les nouvelles dates 
          et des offres exclusives.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="flex-1 px-6 py-4 bg-black/50 border border-cream/20 rounded-xl text-cream placeholder-cream/40 focus:border-orange-500 focus:outline-none transition-colors backdrop-blur-sm"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Envoi...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Inscrit !
              </span>
            ) : (
              "S'inscrire"
            )}
          </motion.button>
        </motion.form>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-cream/40 text-sm mt-6"
        >
          Pas de spam, promis ! Désabonnement en un clic.
        </motion.p>
      </div>
    </section>
  );
}
