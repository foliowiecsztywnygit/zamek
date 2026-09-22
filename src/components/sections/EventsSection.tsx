import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';
import { RotatingRozeta } from '../ui/Icons';
import { AppImage } from '../ui/AppImage';
import { Link } from 'react-router-dom';

export function EventsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <RotatingRozeta className="w-[800px] h-[800px] -right-[400px] top-1/2 -translate-y-1/2" />
      
      <div className="container relative z-10">
        <div className="bg-background-card rounded-lg shadow-card overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <FadeIn>
              <h3 className="text-3xl md:text-5xl font-heading text-foreground-heading mb-6 leading-tight uppercase">
                Twój event. Nasze miejsce.
              </h3>
              <div className="prose prose-lg text-foreground-body font-body leading-relaxed max-w-none mb-10">
                <p>
                  Planujesz wyjazd firmowy, integrację, czy spędzenie czasu z rodziną? Zamek w Bukowcu oferuje przestronny ogród, taras, miejsce na piknik i grill nad rzeką — idealne warunki na wydarzenie w otoczeniu bieszczadzkiej przyrody.
                </p>
              </div>
              <Link to="/oferty">
                <Button variant="primary" size="lg">Poznaj ofertę</Button>
              </Link>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 min-h-[400px] relative">
            <AppImage 
              src="/images/events/offer.jpg" 
              alt="Oferta przyjęcia" 
              fallbackSrc="/images/placeholders/square.svg"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
