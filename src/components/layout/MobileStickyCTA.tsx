import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Hide on booking and admin pages
  const isBookingPage = location.pathname === '/rezerwacja';
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isBookingPage || isAdminPage) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-brand-green/10 p-3 pb-safe">
      <Link 
        to="/rezerwacja" 
        className="flex items-center justify-center gap-2 w-full bg-brand-green hover:bg-brand-green-light text-white text-center font-ui uppercase tracking-[0.18em] text-sm py-4 transition-colors"
      >
        <CalendarDays className="w-4 h-4" />
        Sprawdź dostępność
      </Link>
    </div>
  );
}
