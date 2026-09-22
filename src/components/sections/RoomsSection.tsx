import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';
import { RotatingRozeta } from '../ui/Icons';
import { AppImage } from '../ui/AppImage';
import { Link } from 'react-router-dom';

export function RoomsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <RotatingRozeta className="w-[600px] h-[600px] -left-[300px] top-1/2 -translate-y-1/2 text-brand-green/5" />
      
      <div className="container relative z-10">
        <div className="bg-background-card rounded-none border border-brand-green/20 overflow-hidden flex flex-col lg:flex-row-reverse relative">
          {/* Subtle frame outline for inner border */}
          <div className="absolute inset-2 border border-brand-green/10 pointer-events-none hidden lg:block" />

          <div className="lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <FadeIn>
              <h3 className="text-3xl md:text-5xl font-heading text-brand-green mb-6 leading-tight">
                TWÓJ AZYL.<br/>NAD RZEKĄ.
              </h3>
              <div className="prose prose-lg text-foreground-body font-body leading-relaxed max-w-none mb-10">
                <p>
                  Oferujemy komfortowe pokoje z prywatną łazienką i patio z widokiem na rzekę. Do dyspozycji gości wspólna kuchnia, ogród z miejscem na piknik i grill. Zrelaksuj się nad rzeką w otoczeniu bieszczadzkiej przyrody.
                </p>
              </div>
              <Link to="/pokoje">
                <Button variant="primary" size="lg" className="rounded-none border border-brand-green bg-brand-green text-white hover:bg-transparent hover:text-brand-green transition-colors">
                  Zobacz nasze pokoje
                </Button>
              </Link>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 min-h-[400px] relative border-b lg:border-b-0 lg:border-r border-brand-green/20">
            <AppImage 
              src="/images/rooms/salon-kanapa-widok1.jpeg" 
              alt="Zamek Bukowiec – pokoje" 
              fallbackSrc="/images/placeholders/square.svg"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
