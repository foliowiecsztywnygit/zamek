import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { FadeIn } from '../ui/FadeIn';

export function Location() {
  return (
    <Section background="default" id="lokalizacja" className="py-24">
      <div className="container">
        <Card className="flex flex-col lg:flex-row overflow-hidden shadow-card">
          <div className="lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-heading text-foreground-heading mb-6">
                Doskonała Lokalizacja
              </h2>
              <div className="prose prose-lg text-foreground-body font-body leading-relaxed max-w-none">
                <p className="mb-6">
                  Zamek w Bukowcu to gwarancja spokoju w sercu Bieszczadów. Zaledwie 300 m od centrum, nad samą rzeką,
                  z widokiem na góry i zalesione wzgórza. Idealna baza wypadowa do Bieszczadzkiego Parku Narodowego (8 km) i Zapora Wodna w Solinie (15 km).
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 min-h-[400px] lg:min-h-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.0!2d22.2!3d49.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBukowiec!5e0!3m2!1spl!2spl"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa: Zamek Bukowiec"
            />
          </div>
        </Card>
      </div>
    </Section>
  );
}
