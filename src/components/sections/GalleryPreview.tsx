import { Section } from '../ui/Section';
import { optimizedPhotos } from '../../content/optimizedPhotos';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { AppImage } from '../ui/AppImage';

export function GalleryPreview() {
  const photos = optimizedPhotos.slice(0, 6);

  return (
    <Section background="default" ornament>
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Galeria</h2>
        <p className="text-foreground-muted text-lg">
          Zobacz nasze wnętrza i poczuj klimat Bieszczad w komfortowym wydaniu.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
        {photos.map((photo) => (
          <StaggerItem key={photo.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-border">
            <AppImage 
              src={photo.src} 
              alt={photo.alt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              fallbackSrc="/images/placeholders/landscape.svg"
            />
            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-background font-semibold tracking-wider uppercase text-sm border border-background/30 px-4 py-2 rounded-full backdrop-blur-sm">
                Zobacz
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.4} className="text-center">
        <Link 
          to="/galeria"
          className="inline-flex items-center justify-center rounded-2xl font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre h-14 px-10 text-lg border border-border bg-background-card/50 backdrop-blur-sm hover:bg-background-card text-foreground tap-target"
        >
          Przeglądaj pełną galerię
        </Link>
      </FadeIn>
    </Section>
  );
}
