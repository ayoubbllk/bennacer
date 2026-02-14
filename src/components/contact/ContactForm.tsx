'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📝 CONTACT FORM - Clean Animated Form
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          🎉
        </motion.div>
        <h3 className="text-2xl lg:text-3xl font-bold text-cream mb-4">
          Message envoyé !
        </h3>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
        </p>
        <motion.button
          onClick={resetForm}
          className="px-6 py-3 border border-cream/30 text-cream rounded-xl hover:bg-cream/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Envoyer un autre message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name & Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nom complet"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
          isFocused={focusedField === 'name'}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          required
          isFocused={focusedField === 'email'}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-cream/80 text-sm font-medium mb-2">
          Sujet
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 bg-cream/5 border border-cream/20 rounded-xl text-cream focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f5f5f0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
        >
          <option value="" className="bg-black">Choisir un sujet</option>
          <option value="booking" className="bg-black">Réservation spectacle</option>
          <option value="press" className="bg-black">Presse / Interview</option>
          <option value="collaboration" className="bg-black">Collaboration</option>
          <option value="other" className="bg-black">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-cream/80 text-sm font-medium mb-2">
          Message
        </label>
        <motion.textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message..."
          required
          rows={6}
          className="w-full px-5 py-4 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/40 focus:border-orange-500 focus:outline-none transition-colors resize-none"
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          whileFocus={{ scale: 1.01 }}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-5 bg-orange-500 text-black font-bold text-lg rounded-xl hover:bg-orange-400 transition-colors disabled:opacity-50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          'Envoyer le message'
        )}
      </motion.button>
    </motion.form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function FormField({ label, name, type, value, onChange, placeholder, required, isFocused, onFocus, onBlur }: FormFieldProps) {
  return (
    <div>
      <label className="block text-cream/80 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-5 py-4 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/40 focus:border-orange-500 focus:outline-none transition-colors"
          onFocus={onFocus}
          onBlur={onBlur}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0, borderRadius: '0 0 12px 12px' }}
        />
      </div>
    </div>
  );
}
