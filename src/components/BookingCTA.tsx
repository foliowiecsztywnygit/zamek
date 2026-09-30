import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingCTAProps {
  /** Compact inline version for end of sections */
  variant?: 'full' | 'compact' | 'banner';
  className?: string;
}

/**
 * Reusable booking call-to-action placed at the end of homepage sections.
 */
export function BookingCTA({ variant = 'full', className }: BookingCTAProps) {
  if (variant === 'compact') {
    return (
      <div className={cn("flex justify-center mt-12", className)}>
        <Link
          to="/rezerwacja"
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-green text-white font-ui uppercase tracking-[0.18em] text-xs hover:bg-brand-green-light transition-colors group"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Sprawdź dostępność</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={cn("bg-brand-green/5 border border-brand-green/10 py-10 px-8 text-center", className)}>
        <p className="text-foreground-body font-body text-lg mb-6 max-w-xl mx-auto">
          Zainteresowany pobytem w Bieszczadach? Sprawdź dostępność pokoi i zarezerwuj swój termin.
        </p>
        <Link
          to="/rezerwacja"
          className="inline-flex items-center gap-3 px-10 py-4 bg-brand-green text-white font-ui uppercase tracking-[0.18em] text-sm hover:bg-brand-green-light transition-colors group"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Sprawdź dostępność i zarezerwuj</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  // Full variant - replaces old ContactForm as a section
  return (
    <section className={cn("py-20 md:py-28 relative overflow-hidden bg-background-card", className)} id="rezerwacja">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-ui tracking-[0.24em] uppercase text-foreground-body/60 mb-4">
            Rezerwacja
          </div>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground-heading mb-6 leading-tight">
            Zarezerwuj swój pobyt w Bieszczadach
          </h2>
          <p className="text-foreground-body font-body text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Wybierz termin, sprawdź dostępność pokoi i wyślij zapytanie. Odpowiemy możliwie szybko z potwierdzeniem i propozycją najlepszej opcji.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/rezerwacja"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-green text-white font-ui uppercase tracking-[0.18em] text-sm hover:bg-brand-green-light transition-colors group"
            >
              <CalendarDays className="w-5 h-5" />
              <span>Sprawdź dostępność</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+48535165063"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-brand-green text-brand-green font-ui uppercase tracking-[0.18em] text-sm hover:bg-brand-green hover:text-white transition-colors"
            >
              Zadzwoń: 535 165 063
            </a>
          </div>

          <div className="border-t border-brand-brown/10 pt-8 max-w-lg mx-auto">
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
    </section>
  );
}
