import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { RoomsSection } from '../components/sections/RoomsSection';
import { PromoCards } from '../components/sections/PromoCards';
import { Location } from '../components/sections/Location';
import { ContactForm } from '../components/sections/ContactForm';
import { Faq } from '../components/sections/Faq';
import { GoralskiDivider } from '../components/ui/Icons';
import { SearchBar } from '../components/SearchBar';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Zamek Bukowiec – Pokoje z widokiem na Bieszczady</title>
        <meta 
          name="description" 
          content="Obiekt Zamek w Bukowcu (Podkarpackie). Pokoje z widokiem na rzekę i góry, ogród, bezpłatny parking, Wi-Fi. 300 m od centrum, 8 km od Bieszczadzkiego Parku Narodowego." 
        />
        <link rel="canonical" href="https://[DOMENA]/" />
        {/* JSON-LD for Local Business */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Zamek Bukowiec",
              "description": "Obiekt Zamek w Bukowcu. Pokoje z widokiem na rzekę i góry, ogród, parking, Wi-Fi.",
              "image": "https://[DOMENA]/images/hero/hero-zameczek-lato.jpeg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bukowiec 11M",
                "addressLocality": "Polańczyk",
                "postalCode": "38-610",
                "addressRegion": "Podkarpackie",
                "addressCountry": "PL"
              },
              "telephone": "[TELEFON]",
              "priceRange": "$$"
            }
          `}
        </script>
      </Helmet>

      <Hero />
      
      <div className="container relative z-20 -mt-16 md:-mt-24 mb-16">
        <SearchBar />
      </div>

      <About />
      <GoralskiDivider />
      <RoomsSection />
      <GoralskiDivider />
      <PromoCards />
      <GoralskiDivider />
      <Location />
      <GoralskiDivider />
      <ContactForm />
      <Faq />
    </>
  );
}
