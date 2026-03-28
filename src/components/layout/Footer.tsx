'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 FOOTER - Minimal Cinematic Footer
 * ═══════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/shows', label: 'Spectacles' },
  { href: '/contact', label: 'Contact' },
];

const socials = [
  { name: 'Instagram', url: '#' },
  { name: 'TikTok', url: '#' },
  { name: 'YouTube', url: '#' },
  { name: 'Twitter', url: '#' },
];

export function Footer() {
  const pathname = usePathname();

  // Don't render Footer on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-black border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                whileHover={{ x: 5 }}
              >
                <span className="text-cream">MOUAADH</span>
                <span className="text-orange-500"> BENNACER</span>
              </motion.h2>
            </Link>
            <p className="text-cream/50 max-w-md leading-relaxed">
              Stand-up comedian. Transformant le quotidien en moments d&apos;hilarité 
              depuis 2016. Le rire est ma thérapie, et vous êtes tous invités.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4 mt-8">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="text-cream/50 hover:text-orange-500 transition-colors text-sm"
                  whileHover={{ y: -3 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-cream font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      className="text-cream/50 hover:text-cream transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-cream/50">
              <li>
                <a href="mailto:contact@mouaadhbennacer.com" className="hover:text-cream transition-colors">
                  contact@mouaadhbennacer.com
                </a>
              </li>
              <li>Paris, France</li>
            </ul>
            
            {/* CTA */}
            <Link href="/shows" className="inline-block mt-6">
              <motion.button
                className="px-6 py-3 border border-orange-500 text-orange-500 font-medium rounded-full hover:bg-orange-500 hover:text-black transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Prochains shows
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-sm">
            © {new Date().getFullYear()} Mouaadh Bennacer. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-cream/30 text-sm">
            <a href="#" className="hover:text-cream transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-cream transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="relative h-32 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 text-[15vw] font-black text-cream/[0.02] leading-none whitespace-nowrap text-center"
          animate={{ x: [0, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          MOUAADH BENNACER • STAND-UP COMEDY •
        </motion.div>
      </div>
    </footer>
  );
}
