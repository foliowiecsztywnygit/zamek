import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO, areIntervalsOverlapping } from 'date-fns';
import { SearchBar } from '../components/SearchBar';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/FadeIn';
import { API_BASE } from '../lib/api';

interface Cabin {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
}

interface Booking {
  cabinId: string;
  startDate: string;
  endDate: string;
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const startParam = searchParams.get('start');
  const endParam = searchParams.get('end');

  const [allCabins, setAllCabins] = useState<Cabin[]>([]);
  const [availability, setAvailability] = useState<Booking[]>([]);
  const [availableCabins, setAvailableCabins] = useState<Cabin[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', adults: '2', children: '0', message: ''
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/cabins`).then(res => res.json()),
      fetch(`${API_BASE}/api/availability`).then(res => res.json())
    ]).then(([cabinsData, availabilityData]) => {
      setAllCabins(cabinsData);
      setAvailability(availabilityData);
    }).catch(err => console.error('Failed to fetch data', err));
  }, []);

  useEffect(() => {
    if (!startParam || !endParam) {
      setAvailableCabins(allCabins);
      return;
    }
    
    const start = parseISO(startParam);
    const end = parseISO(endParam);

    const available = allCabins.filter(cabin => {
      const cabinBookings = availability.filter(b => b.cabinId === cabin.id);
      
      const hasConflict = cabinBookings.some(booking => {
        const bStart = parseISO(booking.startDate);
        const bEnd = parseISO(booking.endDate);
        
        return areIntervalsOverlapping(
          { start, end },
          { start: bStart, end: bEnd }
        );
      });
      
      return !hasConflict;
    });

    setAvailableCabins(available);
    setSelectedCabin(null);
  }, [startParam, endParam, allCabins, availability]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cabinId: selectedCabin,
          startDate: startParam,
          endDate: endParam
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Wystąpił błąd podczas wysyłania zapytania.');
      }
    } catch (err) {
      console.error(err);
      alert('Nie udało się połączyć z serwerem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSmsHref = () => {
    if (!selectedCabin) return '#';
    const cabin = allCabins.find(c => c.id === selectedCabin);
    const msg = `Witam, chciałbym zapytać o rezerwację: ${cabin?.name} w terminie od ${startParam || '?'} do ${endParam || '?'}.`;
    return `sms:+48535165063?body=${encodeURIComponent(msg)}`;
  };

  return (
    <Section background="default" className="pt-32 pb-24 min-h-[80vh]">
      <div className="container">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-heading text-brand-green mb-6 text-center uppercase">Rezerwacja</h1>
          
          <SearchBar />

          {(!startParam || !endParam) && (
            <div className="text-center mt-12 text-foreground-body/80 font-ui uppercase tracking-widest text-sm">
              Wybierz daty powyżej, aby sprawdzić dostępność
            </div>
          )}

          {startParam && endParam && (
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 relative">
              {/* Kolumna lewa - pokoje */}
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-heading text-brand-green uppercase tracking-wide border-b border-brand-green/10 pb-4">Wybierz pokój</h2>
                
                {availableCabins.length === 0 ? (
                  <p className="text-foreground-body py-8 text-center bg-background-card border border-brand-green/10">
                    Przepraszamy, brak wolnych pokoi w tym terminie. Spróbuj zmienić daty.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {availableCabins.map(cabin => (
                      <div 
                        key={cabin.id}
                        onClick={() => setSelectedCabin(cabin.id)}
                        className={`flex flex-col sm:flex-row bg-background-card border cursor-pointer transition-all ${selectedCabin === cabin.id ? 'border-brand-green ring-1 ring-brand-green bg-brand-green/5' : 'border-brand-green/10 hover:border-brand-green/30'}`}
                      >
                        <div className="w-full sm:w-2/5 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                          <img src={cabin.image} alt={cabin.name} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-center flex-1">
                          <h3 className="font-heading text-xl text-brand-green uppercase tracking-wide">{cabin.name}</h3>
                          <p className="text-sm text-foreground-body/80 mt-2 line-clamp-2 leading-relaxed">{cabin.description}</p>
                          <div className="text-xs font-ui tracking-widest text-brand-wood mt-4 uppercase border-t border-brand-green/10 pt-4">
                            {cabin.capacity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Kolumna prawa - formularz */}
              <div className="lg:sticky lg:top-24 h-fit">
                <h2 className="text-xl font-heading text-brand-green uppercase tracking-wide border-b border-brand-green/10 pb-4 mb-6">Twoje Dane</h2>
                
                {isSuccess ? (
                  <div className="bg-brand-green/5 border border-brand-green/20 p-8 text-center text-brand-green">
                    <p className="font-heading text-2xl uppercase mb-2">Sukces!</p>
                    <p className="font-body text-foreground-body">Dziękujemy za wysłanie zapytania. Odpowiemy najszybciej jak to możliwe z potwierdzeniem dostępności.</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop Form */}
                    <form onSubmit={handleSubmit} className="hidden md:flex flex-col gap-4 bg-background-card p-8 border border-brand-green/10 shadow-card">
                      <div className="grid grid-cols-1 gap-4">
                        <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Imię i nazwisko" disabled={!selectedCabin} className="p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                        <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="Adres e-mail" disabled={!selectedCabin} className="p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                        <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" placeholder="Numer telefonu" disabled={!selectedCabin} className="p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                        
                        <div className="flex gap-4">
                          <input name="adults" value={formData.adults} onChange={handleInputChange} required type="number" min="1" placeholder="Dorośli" disabled={!selectedCabin} className="w-full p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                          <input name="children" value={formData.children} onChange={handleInputChange} type="number" min="0" placeholder="Dzieci" disabled={!selectedCabin} className="w-full p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                        </div>
                        
                        <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Wiadomość / Uwagi" rows={4} disabled={!selectedCabin} className="p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors resize-none"></textarea>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="primary" type="submit" disabled={!selectedCabin || isSubmitting} className="w-full h-14">
                          {isSubmitting ? 'WYSYŁANIE...' : 'WYŚLIJ ZAPYTANIE'}
                        </Button>
                        {!selectedCabin && (
                          <p className="text-xs text-brand-wood text-center mt-4 font-ui uppercase tracking-widest">Wybierz pokój z listy, aby kontynuować</p>
                        )}
                      </div>
                    </form>

                    {/* Mobile SMS button */}
                    <div className="block md:hidden bg-background-card p-6 border border-brand-green/10 shadow-card">
                      <p className="text-sm text-foreground-body mb-6 text-center leading-relaxed">
                        Wybierz pokój i wyślij SMS do właściciela, aby zapytać o rezerwację w wybranym terminie.
                      </p>
                      <a 
                        href={getSmsHref()}
                        className={`flex items-center justify-center w-full h-14 font-ui uppercase tracking-widest text-sm transition-colors ${selectedCabin ? 'bg-brand-green text-white hover:bg-brand-green/90' : 'bg-background border border-brand-green/20 text-foreground-body/40 pointer-events-none'}`}
                      >
                        WYŚLIJ SMS Z ZAPYTANIEM
                      </a>
                      {!selectedCabin && (
                        <p className="text-xs text-brand-wood text-center mt-4 font-ui uppercase tracking-widest">Wybierz pokój z listy obok</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </Section>
  );
}
