import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { attractions } from '../../content/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { Separator } from '../ui/Icons';
import { AppImage } from '../ui/AppImage';

export function AttractionsPreview() {
  const topAttractions = attractions.slice(0, 3);

  return (
    <Section background="card">
      <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Odkrywaj Bieszczady</h2>
          <Separator className="mx-0 max-w-[150px] mb-6" />
          <p className="text-foreground-body font-body text-lg">
            Bukowiec to doskonała baza wypadowa. Odkryj najpiękniejsze miejsca w Bieszczadach i zaplanuj swój idealny urlop w otoczeniu natury.
          </p>
        </div>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 font-semibold text-accent-gold hover:text-accent-ochre app-transition"
        >
          Więcej inspiracji <ArrowRight size={20} />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topAttractions.map((attr) => (
          <StaggerItem key={attr.id} className="h-full">
            <Card hover className="flex flex-col h-full bg-background border-border">
              <Link to={attr.link} className="flex flex-col h-full group">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <AppImage 
                    src={attr.image} 
                    alt={attr.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackSrc="/images/placeholders/landscape.svg"
                  />
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading mb-3 text-foreground group-hover:text-accent-gold transition-colors">{attr.title}</h3>
                  <p className="text-foreground-muted mb-6 flex-grow">{attr.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold mt-auto">
                    Czytaj dalej <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
