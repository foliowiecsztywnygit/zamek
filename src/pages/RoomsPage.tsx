import { Helmet } from 'react-helmet-async';
import { Rooms } from '../components/sections/Rooms';

export default function DomkiPage() {
  return (
    <div className="pt-24">
      <Helmet>
        <title>Nasze Pokoje | Zamek Bukowiec</title>
        <meta name="description" content="Poznaj pokoje w obiekcie Zamek w Bukowcu. Pokoje dwuosobowe Deluxe, jednoosobowe i willa z widokiem na rzekę i góry. Prywatna łazienka, Wi-Fi, wspólna kuchnia." />
      </Helmet>
      <Rooms />
    </div>
  );
}
