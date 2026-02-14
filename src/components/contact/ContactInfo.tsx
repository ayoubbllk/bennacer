'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📍 CONTACT INFO - Contact Details & Social
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';

const contactMethods = [
  {
    icon: '📧',
    label: 'Email',
    value: 'contact@mouaadhbennacer.com',
    href: 'mailto:contact@mouaadhbennacer.com',
  },
  {
    icon: '📱',
    label: 'Booking',
    value: '+33 6 XX XX XX XX',
    href: 'tel:+33600000000',
  },
  {
    icon: '📍',
    label: 'Ville',
    value: 'Paris, France',
    href: null,
  },
];

const socials = [
  { name: 'Instagram', url: '#', icon: 'IG' },
  { name: 'TikTok', url: '#', icon: 'TK' },
  { name: 'YouTube', url: '#', icon: 'YT' },
  { name: 'Twitter', url: '#', icon: 'X' },
];

export function ContactInfo() {
  return (
    <div className="space-y-12">
      {/* Contact methods */}
      <div>
        <h3 className="text-lg font-medium text-cream mb-6">Informations</h3>
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {method.href ? (
                <a href={method.href} className="flex items-start gap-4 hover:translate-x-2 transition-transform">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="text-cream/50 text-sm uppercase tracking-wider mb-1">
                      {method.label}
                    </div>
                    <div className="text-cream group-hover:text-orange-500 transition-colors">
                      {method.value}
                    </div>
                  </div>
                </a>
              ) : (
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="text-cream/50 text-sm uppercase tracking-wider mb-1">
                      {method.label}
                    </div>
                    <div className="text-cream">{method.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div>
        <h3 className="text-lg font-medium text-cream mb-6">Réseaux sociaux</h3>
        <div className="flex gap-4">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-xl bg-cream/5 border border-cream/20 flex items-center justify-center text-cream hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-sm">{social.icon}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Response time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20"
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="text-cream font-medium mb-1">Réponse rapide</h4>
            <p className="text-cream/60 text-sm">
              Je réponds généralement sous 24-48h. Pour les demandes urgentes, 
              privilégiez le contact téléphonique.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Management card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-cream/5 border border-cream/10"
      >
        <h4 className="text-cream font-medium mb-4">Management & Booking</h4>
        <div className="space-y-2 text-cream/60 text-sm">
          <p><span className="text-cream">Agence :</span> Production XYZ</p>
          <p><span className="text-cream">Contact :</span> booking@productionxyz.com</p>
        </div>
      </motion.div>
    </div>
  );
}
