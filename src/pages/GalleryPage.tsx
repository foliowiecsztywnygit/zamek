import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '../components/ui/Section';
import { optimizedPhotos } from '../content/optimizedPhotos';
import { X } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/FadeIn';
import { AppImage } from '../components/ui/AppImage';

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'pokoje', label: 'Pokoje' },
    { id: 'wnetrza', label: 'Wnętrza' },
    { id: 'okolica', label: 'Okolica' },
  ];

  const filteredPhotos = filter === 'all' 
    ? optimizedPhotos 
    : optimizedPhotos.filter(p => p.category === filter);

  return (
    <div className="pt-24 min-h-screen">
      <Helmet>
        <title>Galeria | Zamek Bukowiec</title>
        <meta name="description" content="Zobacz zdjęcia obiektu Zamek w Bukowcu. Pokoje z widokiem na rzekę i góry, ogród, taras i okolica Bieszczadów." />
      </Helmet>

      <Section ornament>
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-heading mb-4 text-foreground-heading uppercase">Galeria Zdjęć</h1>
          <p className="text-foreground-body font-body text-lg">
            Obejrzyj nasze wnętrza i poczuj klimat, jaki panuje w obiekcie Zamek.
          </p>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-6 py-2.5 rounded-pill font-ui uppercase text-sm tracking-widest transition-all duration-300 border ${
                filter === c.id 
                  ? 'bg-brand-brown border-brand-brown text-white shadow-md' 
                  : 'bg-background-card border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </FadeIn>

        {/* Masonry/Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <StaggerItem key={photo.id}>
              <div 
                className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group border-none shadow-sm"
                onClick={() => setLightboxIndex(optimizedPhotos.findIndex(p => p.id === photo.id))}
              >
                <AppImage 
                  src={photo.src} 
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackSrc="/images/placeholders/landscape.svg"
                />
                <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-ui tracking-widest uppercase text-sm border border-white/30 px-6 py-2 rounded-pill backdrop-blur-sm">
                    Powiększ
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>
          <AppImage 
            src={optimizedPhotos[lightboxIndex].src} 
            alt={optimizedPhotos[lightboxIndex].alt}
            className="max-w-full max-h-screen object-contain p-4 rounded-lg"
            fallbackSrc="/images/placeholders/landscape.svg"
          />
        </div>
      )}
    </div>
  );
}
