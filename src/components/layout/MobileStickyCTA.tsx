import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-border p-4 pb-safe">
      <Link 
        to="/#zapytanie" 
        className="block w-full bg-primary hover:bg-primary-hover text-white text-center font-semibold py-4 rounded-xl shadow-lg transition-colors"
      >
        Zapytaj o nocleg
      </Link>
    </div>
  );
}
