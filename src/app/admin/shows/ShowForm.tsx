'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Show } from '@/lib/shows-types';

interface ShowFormProps {
  show?: Show;
  mode: 'create' | 'edit';
}

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export function ShowForm({ show, mode }: ShowFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'url'>(
    show?.image?.startsWith('http') ? 'url' : 'upload'
  );
  const [previewUrl, setPreviewUrl] = useState(show?.image || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    date: show?.date || '',
    month: show?.month || '',
    year: show?.year || new Date().getFullYear().toString(),
    venue: show?.venue || '',
    city: show?.city || '',
    country: show?.country || 'France',
    status: show?.status || 'available',
    ticketUrl: show?.ticketUrl || '#',
    time: show?.time || '',
    address: show?.address || '',
    description: show?.description || '',
    duration: show?.duration || '1h30',
    price: show?.price || '',
    imageUrl: show?.image?.startsWith('http') ? show.image : '',
  });

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setError('Format non supporté. Utilisez JPEG, PNG ou WebP.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Fichier trop volumineux. Maximum 5MB.');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();

      // Add all fields
      formData.append('date', form.date);
      formData.append('month', form.month);
      formData.append('year', form.year);
      formData.append('venue', form.venue);
      formData.append('city', form.city);
      formData.append('country', form.country);
      formData.append('status', form.status);
      formData.append('ticketUrl', form.ticketUrl);
      formData.append('time', form.time);
      formData.append('address', form.address);
      formData.append('description', form.description);
      formData.append('duration', form.duration);
      formData.append('price', form.price);

      // Add image
      if (imageMode === 'upload' && selectedFile) {
        formData.append('imageFile', selectedFile);
      } else if (imageMode === 'url') {
        formData.append('imageUrl', form.imageUrl);
      }

      const url = mode === 'create' ? '/api/shows' : `/api/shows/${show!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, { method, body: formData, credentials: 'include' });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur lors de la sauvegarde');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Image Section */}
      <Section title="Image">
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setImageMode('upload')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              imageMode === 'upload' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Uploader une image
          </button>
          <button
            type="button"
            onClick={() => setImageMode('url')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              imageMode === 'url' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            URL externe
          </button>
        </div>

        {imageMode === 'upload' ? (
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-gray-600 transition-colors"
            >
              {previewUrl && !previewUrl.startsWith('http') ? (
                <div className="space-y-4">
                  <div
                    className="w-full h-48 rounded-lg bg-cover bg-center mx-auto"
                    style={{ backgroundImage: `url('${previewUrl}')` }}
                  />
                  <p className="text-sm text-gray-400">Cliquez pour changer l&apos;image</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 mb-2">Cliquez ou glissez une image ici</p>
                  <p className="text-xs text-gray-600">JPEG, PNG ou WebP — Max 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => {
                updateField('imageUrl', e.target.value);
                setPreviewUrl(e.target.value);
              }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {/* Preview for URL mode */}
        {imageMode === 'url' && previewUrl && previewUrl.startsWith('http') && (
          <div className="mt-4">
            <div
              className="w-full h-48 rounded-lg bg-cover bg-center bg-gray-800"
              style={{ backgroundImage: `url('${previewUrl}')` }}
            />
          </div>
        )}

        {/* Preview for existing local image in edit mode */}
        {mode === 'edit' && show?.image && !selectedFile && !previewUrl.startsWith('http') && show.image.startsWith('/uploads') && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Image actuelle :</p>
            <div
              className="w-full h-48 rounded-lg bg-cover bg-center bg-gray-800"
              style={{ backgroundImage: `url('${show.image}')` }}
            />
          </div>
        )}
      </Section>

      {/* Date & Time */}
      <Section title="Date & Heure">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Jour" value={form.date} onChange={v => updateField('date', v)} placeholder="15" required />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mois *</label>
            <select
              value={form.month}
              onChange={e => updateField('month', e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Sélectionner</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <Field label="Année" value={form.year} onChange={v => updateField('year', v)} placeholder="2025" required />
          <Field label="Heure" value={form.time} onChange={v => updateField('time', v)} placeholder="20h30" />
        </div>
      </Section>

      {/* Venue */}
      <Section title="Lieu">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Salle" value={form.venue} onChange={v => updateField('venue', v)} placeholder="Théâtre du Rond-Point" required />
          <Field label="Ville" value={form.city} onChange={v => updateField('city', v)} placeholder="Paris" required />
          <Field label="Pays" value={form.country} onChange={v => updateField('country', v)} placeholder="France" required />
          <Field label="Adresse complète" value={form.address} onChange={v => updateField('address', v)} placeholder="2bis Av. Franklin D. Roosevelt, 75008 Paris" />
        </div>
      </Section>

      {/* Status & Price */}
      <Section title="Statut & Tarif">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Statut *</label>
            <select
              value={form.status}
              onChange={e => updateField('status', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="available">Disponible</option>
              <option value="few-left">Dernières places</option>
              <option value="sold-out">Complet</option>
            </select>
          </div>
          <Field label="Prix" value={form.price} onChange={v => updateField('price', v)} placeholder="À partir de 25€" />
          <Field label="Durée" value={form.duration} onChange={v => updateField('duration', v)} placeholder="1h30" />
        </div>
        <div className="mt-4">
          <Field label="Lien billetterie" value={form.ticketUrl} onChange={v => updateField('ticketUrl', v)} placeholder="https://..." />
        </div>
      </Section>

      {/* Description */}
      <Section title="Description">
        <label className="block text-sm font-medium text-gray-300 mb-2">Description du spectacle</label>
        <textarea
          value={form.description}
          onChange={e => updateField('description', e.target.value)}
          rows={5}
          placeholder="Décrivez le spectacle..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
        />
      </Section>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-lg transition-colors"
        >
          {loading ? 'Enregistrement...' : mode === 'create' ? 'Créer le spectacle' : 'Enregistrer les modifications'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, required = false
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}{required && ' *'}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}
