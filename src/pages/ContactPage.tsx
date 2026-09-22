import { Helmet } from 'react-helmet-async';
import { ContactForm } from '../components/sections/ContactForm';
import { FadeIn } from '../components/ui/FadeIn';

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Helmet>
        <title>Kontakt | Zamek Bukowiec</title>
        <meta name="description" content="Skontaktuj się z obiektem Zamek w Bukowcu. Sprawdź dojazd, telefon i formularz kontaktowy. Zarezerwuj pokój w Bieszczadach." />
      </Helmet>

      <FadeIn className="container mt-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-heading mb-4 text-center text-foreground-heading uppercase">Kontakt</h1>
        <p className="text-center text-foreground-body font-body text-lg max-w-2xl mx-auto">
          Masz pytania? Chcesz zarezerwować pobyt? Skontaktuj się z nami telefonicznie, mailowo lub przez poniższy formularz.
        </p>
      </FadeIn>

      <ContactForm />
    </div>
  );
}
