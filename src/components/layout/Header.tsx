'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 HEADER - Minimal Cinematic Navigation
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/shows', label: 'Spectacles' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']
  );
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Don't render Header on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          backgroundColor,
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="font-bold text-xl tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-cream">MOUAADH</span>
                <span className="text-orange-500">.</span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`relative text-sm font-medium tracking-wide transition-colors ${
                      pathname === link.href 
                        ? 'text-orange-500' 
                        : 'text-cream/70 hover:text-cream'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link href="/shows">
                <motion.button
                  className="px-6 py-2.5 bg-orange-500 text-black font-semibold text-sm rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Réserver
                </motion.button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <motion.span
                  className="absolute left-0 top-0 w-full h-0.5 bg-cream rounded-full"
                  animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-cream rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-cream rounded-full"
                  animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <span className={`text-3xl font-bold ${
                      pathname === link.href ? 'text-orange-500' : 'text-cream'
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Link href="/shows">
                  <button className="px-8 py-4 bg-orange-500 text-black font-bold text-lg rounded-full">
                    Réserver mes places
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
