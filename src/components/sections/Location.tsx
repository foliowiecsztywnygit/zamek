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
              src="https://maps.google.com/maps?q=Bukowiec+11M,+38-610+Pola%C5%84czyk&t=&z=14&ie=UTF8&iwloc=&output=embed"
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
