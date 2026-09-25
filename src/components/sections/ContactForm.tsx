import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';
import { Parzenica } from '../ui/Icons';
import { Mail, Phone } from 'lucide-react';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  message: string;
}

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<ContactFormData>();

  const buildEmailBody = (data: ContactFormData) => {
    return (
      `Imię i nazwisko: ${data.name}\n` +
      `Telefon: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Data przyjazdu: ${data.arrivalDate}\n` +
      `Data wyjazdu: ${data.departureDate}\n` +
      `Liczba osób: ${data.guests}\n\n` +
      `Wiadomość:\n${data.message || ''}`
    );
  };

  const onSubmit = (data: ContactFormData) => {
    try {
      const subject = encodeURIComponent(`Zapytanie o nocleg: ${data.name}`);
      const body = encodeURIComponent(buildEmailBody(data));
      
      window.location.href = `mailto:tabernus@o2.pl?subject=${subject}&body=${body}`;
      
      toast.success('Dziękujemy za zapytanie! Otwieramy program pocztowy.', {
        style: {
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
        }
      });
      reset();
    } catch {
      toast.error('Wystąpił błąd. Spróbuj ponownie później.');
    }
  };

  return (
    <Section background="card" id="zapytanie">
      <FadeIn className="max-w-6xl mx-auto rounded-3xl border border-brand-brown/10 bg-background shadow-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Info Side */}
          <div className="lg:col-span-2 p-10 lg:p-14 relative overflow-hidden border-r border-brand-brown/10 bg-background-card">
            <div className="relative z-10 h-full flex flex-col">
              <div className="text-xs font-ui tracking-[0.24em] uppercase text-foreground-body/60 mb-6">
                Rezerwacja
              </div>
              <h3 className="text-4xl md:text-5xl font-heading leading-[1.05] text-foreground-heading mb-6">
                Zarezerwuj swój pobyt
                <br />
                w Bieszczadach - Wyślij
                <br />
                zapytanie
              </h3>
              <p className="text-foreground-body font-body mb-12 leading-relaxed">
                Odpowiemy możliwie szybko z potwierdzeniem dostępności i propozycją najlepszej opcji pobytu.
              </p>
              
              <div className="space-y-4 mt-auto">
                <a
                  href="tel:+48535165063"
                  className="flex items-center gap-3 rounded-2xl border border-brand-brown/10 bg-background hover:bg-brand-brown/[0.03] transition-colors px-5 py-4"
                >
                  <div className="w-10 h-10 rounded-full bg-background-card border border-brand-brown/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-brown" />
                  </div>
                  <div>
                    <div className="text-lg font-ui tracking-wide text-foreground-heading">535 165 063</div>
                    <div className="text-xs text-foreground-body/70">Agnieszka Witkowska</div>
                  </div>
                </a>

                <a
                  href="mailto:tabernus@o2.pl"
                  className="flex items-start gap-4 p-4 rounded-xl border border-brand-green/10 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="text-sm font-ui tracking-wide text-foreground-heading">tabernus@o2.pl</div>
                    <div className="text-xs text-foreground-body/70">Możesz też wysłać wiadomość bez formularza</div>
                  </div>
                </a>

                <div className="mt-8 pt-6 border-t border-brand-brown/10">
                  <div className="text-sm font-ui tracking-wide text-foreground-heading mb-2">Dane do wpłaty zadatku</div>
                  <div className="text-xs text-foreground-body/80 leading-relaxed space-y-1">
                    <p className="text-brand-wood font-medium">Rezerwacja następuje po wpłaceniu zadatku</p>
                    <p className="font-semibold text-foreground-heading mt-3">Gwalbert Witkowski</p>
                    <p>PKO BP oddział 1 Sanok</p>
                    <p className="font-mono mt-1 text-foreground-heading font-medium tracking-wider">10 1020 2980 0000 2102 0107 9342</p>
                    <p>SWIFT: BPKOPLPW</p>
                    <p className="mt-2 text-brand-green font-medium">Na miejscu możliwa płatność gotówką oraz BLIKiem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 p-10 lg:p-14 relative overflow-hidden bg-background">
            <Parzenica className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] lg:w-[760px] lg:h-[760px] opacity-10 pointer-events-none select-none z-0" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Imię i nazwisko</label>
                  <input
                    id="name"
                    {...register('name', { required: 'To pole jest wymagane' })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body placeholder:text-foreground-body/40 focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Numer telefonu</label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="___ ___ ___"
                    {...register('phone', { 
                      required: 'To pole jest wymagane',
                      validate: (value) => value.replace(/\D/g, '').length === 9 || 'Wpisz 9 cyfr',
                      onChange: (e) => {
                        const digits = String(e.target.value ?? '').replace(/\D/g, '').slice(0, 9);
                        const next = (digits.match(/.{1,3}/g) ?? []).join(' ');
                        setValue('phone', next, { shouldValidate: true });
                      }
                    })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body placeholder:text-foreground-body/40 focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  />
                  {errors.phone && <span className="text-red-500 text-sm mt-1 block">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Adres e-mail</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nazwa@domena.pl"
                    {...register('email', { 
                      required: 'To pole jest wymagane',
                      pattern: { value: /^\S+@\S+\.\S+$/i, message: 'Nieprawidłowy adres email' }
                    })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body placeholder:text-foreground-body/40 focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
                </div>
                <div>
                  <label htmlFor="guests" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Liczba gości</label>
                  <select
                    id="guests"
                    {...register('guests', { required: 'Wymagane', min: 1 })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  >
                    {Array.from({ length: 10 }).map((_, i) => {
                      const value = i + 1;
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                  <div className="text-xs text-foreground-body/70 mt-2">
                    Możesz doprecyzować w wiadomości.
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="arrivalDate" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Data przyjazdu</label>
                  <input
                    id="arrivalDate"
                    type="date"
                    {...register('arrivalDate', { required: 'Wymagane' })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  />
                  {errors.arrivalDate && <span className="text-red-500 text-sm mt-1 block">{errors.arrivalDate.message}</span>}
                </div>

                <div>
                  <label htmlFor="departureDate" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Data wyjazdu</label>
                  <input
                    id="departureDate"
                    type="date"
                    {...register('departureDate', { required: 'Wymagane' })}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all"
                  />
                  {errors.departureDate && <span className="text-red-500 text-sm mt-1 block">{errors.departureDate.message}</span>}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">Wiadomość / Uwagi dodatkowe</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full px-5 py-4 rounded-2xl border border-brand-brown/15 bg-background-card text-foreground-body placeholder:text-foreground-body/40 focus:outline-none focus:ring-1 focus:ring-brand-brown/30 focus:border-brand-brown/30 transition-all resize-none"
                ></textarea>
              </div>

              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-xs text-foreground-body/70 leading-relaxed">
                  Klikając „Sprawdź dostępność” otworzysz wiadomość e-mail do gospodarza.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const values = getValues();
                        const text = buildEmailBody(values);
                        await navigator.clipboard.writeText(text);
                        toast.success('Skopiowano treść wiadomości.');
                      } catch {
                        toast.error('Nie udało się skopiować treści.');
                      }
                    }}
                    className="h-12 px-5 rounded-pill border border-brand-brown/15 bg-background-card hover:bg-brand-brown/[0.03] transition-colors text-foreground-heading font-ui uppercase tracking-widest text-xs"
                  >
                    Kopiuj treść
                  </button>
                  <Button type="submit" size="md" variant="primary" withArrow={false} className="h-12 px-6">
                    Sprawdź dostępność
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
