import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, parseISO, areIntervalsOverlapping, addDays, isBefore } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Calendar } from '../components/Calendar';
import { Section } from '../components/ui/Section';
import { FadeIn } from '../components/ui/FadeIn';
import { API_BASE } from '../lib/api';
import { cn } from '../lib/utils';
import { CalendarDays, Users, MessageSquare, ArrowRight, Check, Phone } from 'lucide-react';

interface Cabin {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
}

interface AvailabilityBlock {
  cabinId: string;
  startDate: string;
  endDate: string;
}

const OWNER_PHONE = '+48535165063';

export default function BookingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const startParam = searchParams.get('start');
  const endParam = searchParams.get('end');

  const [allCabins, setAllCabins] = useState<Cabin[]>([]);
  const [availability, setAvailability] = useState<AvailabilityBlock[]>([]);
  const [availableCabins, setAvailableCabins] = useState<Cabin[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Calendar state
  const [startDate, setStartDate] = useState<Date>(
    startParam ? parseISO(startParam) : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    endParam ? parseISO(endParam) : addDays(new Date(), 1)
  );
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Form
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', adults: '2', children: '0', message: ''
  });

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch data
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/cabins`).then(res => res.json()),
      fetch(`${API_BASE}/api/availability`).then(res => res.json())
    ]).then(([cabinsData, availabilityData]) => {
      setAllCabins(cabinsData);
      setAvailability(availabilityData);
      setDataLoaded(true);
    }).catch(err => console.error('Failed to fetch data', err));
  }, []);

  // Filter available cabins when dates or data change
  useEffect(() => {
    if (!dataLoaded || allCabins.length === 0) return;

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
  }, [startParam, endParam, allCabins, availability, dataLoaded]);

  const handleDateChange = (date: Date) => {
    if (showCalendar === 'start') {
      setStartDate(date);
      if (isBefore(endDate, date) || endDate.getTime() === date.getTime()) {
        setEndDate(addDays(date, 1));
      }
      setShowCalendar('end');
    } else if (showCalendar === 'end') {
      if (isBefore(date, startDate) || date.getTime() === startDate.getTime()) {
        setStartDate(date);
        setEndDate(addDays(date, 1));
      } else {
        setEndDate(date);
      }
      setShowCalendar(null);
    }
  };

  const handleSearch = () => {
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');
    setSearchParams({ start: startStr, end: endStr });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const msg = `Witam, chciałbym zapytać o rezerwację: ${cabin?.name} w terminie od ${startParam || format(startDate, 'dd.MM.yyyy')} do ${endParam || format(endDate, 'dd.MM.yyyy')}, ${formData.adults} dorosłych${Number(formData.children) > 0 ? `, ${formData.children} dzieci` : ''}.`;
    return `sms:${OWNER_PHONE}?body=${encodeURIComponent(msg)}`;
  };

  const datesSelected = startParam && endParam;

  return (
    <Section background="default" className="pt-28 pb-24 min-h-[80vh]">
      <div className="container">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-heading text-brand-green mb-2 text-center uppercase">Rezerwacja</h1>
          <p className="text-center text-foreground-body/70 font-ui uppercase tracking-widest text-xs mb-10">
            Wybierz termin · Sprawdź dostępność · Zarezerwuj
          </p>
          
          {/* ── Date Picker ─────────────────────────── */}
          <div className="relative max-w-4xl mx-auto mb-16" ref={calendarRef}>
            <div className="flex flex-col md:flex-row shadow-lg bg-white border border-brand-green/10">
              
              {/* Start date */}
              <button
                type="button"
                onClick={() => setShowCalendar(showCalendar === 'start' ? null : 'start')}
                className={cn(
                  "flex items-center gap-4 py-5 px-6 md:px-10 transition-colors flex-1 text-left",
                  showCalendar === 'start' ? 'bg-brand-green/5' : 'hover:bg-gray-50'
                )}
              >
                <CalendarDays className="w-5 h-5 text-brand-green shrink-0" />
                <div>
                  <div className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 mb-1">Przyjazd</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl md:text-4xl font-hane text-foreground-heading">{format(startDate, 'd')}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-heading font-medium text-foreground-heading capitalize">
                        {format(startDate, 'MMM', { locale: pl })}
                      </span>
                      <span className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50">
                        {format(startDate, 'EEEE', { locale: pl })}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <div className="hidden md:flex items-center justify-center px-2 text-gray-300">
                <ArrowRight className="w-5 h-5" strokeWidth={1} />
              </div>

              {/* End date */}
              <button
                type="button"
                onClick={() => setShowCalendar(showCalendar === 'end' ? null : 'end')}
                className={cn(
                  "flex items-center gap-4 py-5 px-6 md:px-10 transition-colors flex-1 text-left border-t md:border-t-0 md:border-l border-gray-100",
                  showCalendar === 'end' ? 'bg-brand-green/5' : 'hover:bg-gray-50'
                )}
              >
                <CalendarDays className="w-5 h-5 text-brand-green shrink-0" />
                <div>
                  <div className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 mb-1">Wyjazd</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl md:text-4xl font-hane text-foreground-heading">{format(endDate, 'd')}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-heading font-medium text-foreground-heading capitalize">
                        {format(endDate, 'MMM', { locale: pl })}
                      </span>
                      <span className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50">
                        {format(endDate, 'EEEE', { locale: pl })}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Search button */}
              <button 
                onClick={handleSearch} 
                className="flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold/90 text-white font-ui uppercase tracking-[0.2em] text-sm font-semibold px-10 py-5 transition-colors w-full md:w-auto"
              >
                Szukaj
              </button>
            </div>

            {/* Calendar dropdown */}
            {showCalendar && (
              <div className="absolute top-[100%] z-50 mt-2 left-1/2 -translate-x-1/2 shadow-2xl rounded-xl overflow-hidden">
                <Calendar 
                  selectedDates={[startDate, endDate]} 
                  onChange={handleDateChange} 
                />
              </div>
            )}
          </div>

          {/* ── Results ─────────────────────────── */}
          {!dataLoaded ? (
            <div className="text-center py-12 text-foreground-body/50 font-ui uppercase tracking-widest text-sm">
              Ładowanie pokoi...
            </div>
          ) : !datesSelected ? (
            <div className="text-center py-12">
              <p className="text-foreground-body/60 font-ui uppercase tracking-widest text-sm mb-6">
                Wybierz daty powyżej i kliknij „Szukaj", aby sprawdzić dostępność
              </p>
              {/* Show all rooms as preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {allCabins.map(cabin => (
                  <div key={cabin.id} className="bg-background-card border border-brand-green/10 overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img src={cabin.image} alt={cabin.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg text-brand-green uppercase tracking-wide">{cabin.name}</h3>
                      <p className="text-xs font-ui tracking-widest text-brand-wood mt-1 uppercase">{cabin.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 relative">
              {/* Left column - rooms */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-brand-green/10 pb-4">
                  <h2 className="text-xl font-heading text-brand-green uppercase tracking-wide">
                    {availableCabins.length > 0 
                      ? `Dostępne pokoje (${availableCabins.length})` 
                      : 'Brak wolnych pokoi'}
                  </h2>
                  <span className="text-xs font-ui text-foreground-body/60 uppercase tracking-widest">
                    {format(parseISO(startParam!), 'dd.MM')} – {format(parseISO(endParam!), 'dd.MM.yyyy')}
                  </span>
                </div>
                
                {availableCabins.length === 0 ? (
                  <div className="py-8 text-center bg-background-card border border-brand-green/10">
                    <p className="text-foreground-body mb-4">Przepraszamy, brak wolnych pokoi w tym terminie.</p>
                    <p className="text-sm text-foreground-body/60">Spróbuj zmienić daty powyżej.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {availableCabins.map(cabin => (
                      <div 
                        key={cabin.id}
                        onClick={() => setSelectedCabin(cabin.id)}
                        className={cn(
                          "flex flex-col sm:flex-row bg-background-card border cursor-pointer transition-all group",
                          selectedCabin === cabin.id 
                            ? 'border-brand-green ring-1 ring-brand-green bg-brand-green/5' 
                            : 'border-brand-green/10 hover:border-brand-green/30'
                        )}
                      >
                        <div className="w-full sm:w-2/5 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                          <img src={cabin.image} alt={cabin.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          {selectedCabin === cabin.id && (
                            <div className="absolute top-3 right-3 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
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

              {/* Right column - form/SMS */}
              <div className="lg:sticky lg:top-24 h-fit">
                <h2 className="text-xl font-heading text-brand-green uppercase tracking-wide border-b border-brand-green/10 pb-4 mb-6">
                  Zapytaj o termin
                </h2>
                
                {isSuccess ? (
                  <div className="bg-brand-green/5 border border-brand-green/20 p-8 text-center text-brand-green">
                    <p className="font-heading text-2xl uppercase mb-2">Sukces!</p>
                    <p className="font-body text-foreground-body">Dziękujemy za wysłanie zapytania. Odpowiemy najszybciej jak to możliwe z potwierdzeniem dostępności.</p>
                  </div>
                ) : (
                  <>
                    {/* Guests selector - always visible */}
                    <div className="bg-background-card p-6 border border-brand-green/10 shadow-card mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="w-4 h-4 text-brand-green" />
                        <span className="text-xs font-ui uppercase tracking-widest text-foreground-body/70">Liczba gości</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 mb-1">Dorośli</label>
                          <select 
                            name="adults" 
                            value={formData.adults} 
                            onChange={handleInputChange}
                            className="w-full p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors"
                          >
                            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 mb-1">Dzieci</label>
                          <select 
                            name="children" 
                            value={formData.children} 
                            onChange={handleInputChange}
                            className="w-full p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors"
                          >
                            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Form */}
                    <form onSubmit={handleSubmit} className="hidden md:flex flex-col gap-4 bg-background-card p-6 border border-brand-green/10 shadow-card">
                      <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Imię i nazwisko" disabled={!selectedCabin} className="p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                      <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="Adres e-mail" disabled={!selectedCabin} className="p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                      <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" placeholder="Numer telefonu" disabled={!selectedCabin} className="p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors" />
                      <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Wiadomość / Uwagi (opcjonalne)" rows={3} disabled={!selectedCabin} className="p-3 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors resize-none" />
                      
                      <button 
                        type="submit" 
                        disabled={!selectedCabin || isSubmitting} 
                        className={cn(
                          "w-full h-14 font-ui uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2",
                          selectedCabin 
                            ? 'bg-brand-green text-white hover:bg-brand-green-light cursor-pointer' 
                            : 'bg-background border border-brand-green/20 text-foreground-body/40 cursor-not-allowed'
                        )}
                      >
                        <MessageSquare className="w-4 h-4" />
                        {isSubmitting ? 'WYSYŁANIE...' : 'WYŚLIJ ZAPYTANIE'}
                      </button>
                      {!selectedCabin && (
                        <p className="text-xs text-brand-wood text-center font-ui uppercase tracking-widest">Wybierz pokój z listy, aby kontynuować</p>
                      )}
                    </form>

                    {/* Mobile SMS button */}
                    <div className="block md:hidden bg-background-card p-6 border border-brand-green/10 shadow-card">
                      <p className="text-sm text-foreground-body mb-4 text-center leading-relaxed">
                        Wybierz pokój i wyślij SMS z zapytaniem o rezerwację.
                      </p>
                      <a 
                        href={getSmsHref()}
                        className={cn(
                          "flex items-center justify-center gap-2 w-full h-14 font-ui uppercase tracking-widest text-sm transition-colors",
                          selectedCabin 
                            ? 'bg-brand-green text-white hover:bg-brand-green/90' 
                            : 'bg-background border border-brand-green/20 text-foreground-body/40 pointer-events-none'
                        )}
                      >
                        <Phone className="w-4 h-4" />
                        WYŚLIJ SMS Z ZAPYTANIEM
                      </a>
                      {!selectedCabin && (
                        <p className="text-xs text-brand-wood text-center mt-4 font-ui uppercase tracking-widest">Wybierz pokój z listy</p>
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
