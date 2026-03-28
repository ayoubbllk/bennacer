/**
 * ═══════════════════════════════════════════════════════════════
 * 📞 CONTACT PAGE - Get in touch
 * ═══════════════════════════════════════════════════════════════
 */

import { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { FAQ } from '@/components/contact/FAQ';
import { CollabCTA } from '@/components/contact/CollabCTA';

export const metadata: Metadata = {
  title: 'Contact | Mouaadh Bennacer',
  description: 'Contactez Mouaadh Bennacer pour vos demandes de booking, presse ou collaboration. Réponse garantie sous 48h.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContactHero />
      <div id="contact-form" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <FAQ />
      <CollabCTA />
    </main>
  );
}
