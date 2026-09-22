import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { rooms } from '../../content/data';
import { Users, Check, Flame, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { AppImage } from '../ui/AppImage';

export function Rooms() {
  return (
    <Section background="default" id="pokoje">
      <FadeIn className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-heading text-brand-green mb-6 uppercase">Nasze Pokoje</h2>
        <div className="w-24 h-px bg-accent-gold mx-auto mb-6" />
        <p className="text-foreground-body font-body text-lg">
          Komfortowe pokoje z prywatną łazienką, widokiem na rzekę i góry.
          Każdy pokój wyposażony w szafę, pościel i patio.
        </p>
      </FadeIn>

      <div className="flex flex-col gap-24">
        {rooms.map((room, index) => (
          <FadeIn key={room.id}>
            <div id={room.id} className="scroll-mt-32">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Images Grid */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative">
                  <div className="absolute inset-0 -m-4 border border-brand-green/10 pointer-events-none hidden md:block" />
                  <AppImage 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="w-full h-64 object-cover col-span-2 border border-brand-green/20"
                    loading="lazy"
                    fallbackSrc="/images/placeholders/landscape.svg"
                  />
                  <AppImage 
                    src={room.images[1]} 
                    alt={`${room.name} wnętrze`} 
                    className="w-full h-48 object-cover border border-brand-green/20"
                    loading="lazy"
                    fallbackSrc="/images/placeholders/landscape.svg"
                  />
                  <AppImage 
                    src={room.images[2]} 
                    alt={`${room.name} sypialnia`} 
                    className="w-full h-48 object-cover border border-brand-green/20"
                    loading="lazy"
                    fallbackSrc="/images/placeholders/landscape.svg"
                  />
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-3xl lg:text-4xl font-heading text-brand-green uppercase">{room.name}</h3>
                    <div className="bg-background-card border border-brand-green/20 px-3 py-1.5 text-xs font-ui uppercase tracking-widest flex items-center gap-1.5 text-brand-green">
                      <Users size={16} />
                      <span>{room.capacity}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground-body font-body mb-8 text-lg">{room.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                      <h4 className="font-heading text-brand-green uppercase text-sm tracking-widest mb-3 border-b border-brand-green/10 pb-2">Sypialnie</h4>
                      <ul className="space-y-2">
                        {room.details.bedrooms.map((bed, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-body font-body">
                            <LayoutTemplate size={16} className="text-accent-gold shrink-0 mt-0.5" />
                            <span>{bed}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-heading text-brand-green uppercase text-sm tracking-widest mb-3 border-b border-brand-green/10 pb-2">Wnętrze & Wyposażenie</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground-body font-body">
                          <Flame size={16} className="text-accent-gold shrink-0 mt-0.5" />
                          <span><strong>Salon:</strong> {room.details.livingRoom}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground-body font-body">
                          <Check size={16} className="text-accent-gold shrink-0 mt-0.5" />
                          <span><strong>Kuchnia:</strong> {room.details.kitchen}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground-body font-body">
                          <Check size={16} className="text-accent-gold shrink-0 mt-0.5" />
                          <span><strong>Łazienki:</strong> {room.details.bathrooms}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link 
                    to="/#zapytanie"
                    className="inline-flex items-center justify-center font-ui uppercase tracking-widest transition-colors h-14 px-8 text-sm border-2 border-brand-green bg-brand-green text-white hover:bg-transparent hover:text-brand-green w-full md:w-auto group"
                  >
                    Zapytaj o termin
                    <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
