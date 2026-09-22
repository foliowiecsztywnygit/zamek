import { Helmet } from 'react-helmet-async';
import { Faq } from '../components/sections/Faq';

export default function FaqPage() {
  return (
    <div className="pt-24">
      <Helmet>
        <title>FAQ | Zamek Bukowiec</title>
        <meta name="description" content="FAQ: parking, zameldowanie, wymeldowanie, zwierzęta, cisza nocna, kuchnia wspólna. Sprawdź odpowiedzi przed rezerwacją w obiekcie Zamek w Bukowcu." />
      </Helmet>
      <Faq />
    </div>
  );
}

