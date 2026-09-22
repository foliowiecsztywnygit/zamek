import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rooms } from '@/content/data';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileRoomsOpen, setIsMobileRoomsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileRoomsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Pokoje', href: '/pokoje' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'py-3 bg-background/95 backdrop-blur-md border-brand-green/10' : 'py-5'
      )}
    >
      <div className="container">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="md:hidden">
            <button
              className={cn(
                'p-2 rounded-none border-2 transition-colors',
                isScrolled ? 'border-brand-green text-brand-green' : 'bg-black/30 border-white/30 text-white'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="hidden md:flex justify-center">
            <nav
              className={cn(
                'border-2 px-8 py-3 transition-colors duration-300',
                isScrolled ? 'border-brand-green/20 bg-transparent' : 'bg-black/20 border-white/20 backdrop-blur-sm'
              )}
            >
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  if (link.name !== 'Pokoje') {
                    return (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className={cn(
                            'transition-colors font-ui uppercase text-xs tracking-[0.22em] py-2 relative group',
                            isScrolled ? 'text-brand-green hover:text-brand-wood' : 'text-white/95 hover:text-white'
                          )}
                        >
                          {link.name}
                          <span className="absolute left-0 bottom-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={link.name} className="relative group">
                      <div className="flex items-center gap-1">
                        <Link
                          to={link.href}
                          className={cn(
                            'transition-colors font-ui uppercase text-xs tracking-[0.22em] py-2 relative group-hover:text-brand-wood',
                            isScrolled ? 'text-brand-green' : 'text-white/95'
                          )}
                        >
                          {link.name}
                        </Link>
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 group-hover:rotate-180", isScrolled ? "text-brand-green" : "text-white/80")} />
                      </div>
                      <div className="absolute top-full left-0 mt-3 w-[300px] bg-background border-2 border-brand-green/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                        <Link
                          to="/pokoje"
                          className="block px-5 py-4 text-brand-green font-ui uppercase tracking-[0.18em] text-xs hover:bg-brand-green/5 transition-colors border-b border-brand-green/10"
                        >
                          Wszystkie pokoje
                        </Link>
                        {rooms.map((room) => (
                          <Link
                            key={room.id}
                            to={`/pokoje#${room.id}`}
                            className="block px-5 py-3 text-foreground-body text-sm hover:text-brand-wood hover:bg-brand-green/5 transition-colors"
                          >
                            {room.name}
                          </Link>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <Link to="/" className="justify-self-end">
            <span
              className={cn(
                'font-heading uppercase tracking-[0.15em] transition-all leading-tight block text-right',
                isScrolled 
                  ? 'text-brand-green text-xl md:text-2xl' 
                  : 'text-white text-2xl md:text-3xl drop-shadow-lg'
              )}
            >
              Zameczek<br />
              <span className="text-[0.6em] tracking-[0.25em] font-ui">Bukowiec</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b-2 border-brand-green/10">
          <nav className="container py-6 flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                if (link.name !== 'Pokoje') {
                  return (
                    <li key={link.name} className="border-b border-brand-green/10 pb-4">
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-brand-green font-ui uppercase tracking-[0.18em] hover:text-brand-wood transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.name} className="border-b border-brand-green/10 pb-4">
                    <button
                      type="button"
                      onClick={() => setIsMobileRoomsOpen(v => !v)}
                      className="w-full flex items-center justify-between text-brand-green font-ui uppercase tracking-[0.18em] hover:text-brand-wood transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isMobileRoomsOpen && "rotate-180")} />
                    </button>
                    {isMobileRoomsOpen && (
                      <div className="mt-3 pl-3 border-l-2 border-brand-green/20 flex flex-col">
                        <Link
                          to="/pokoje"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="py-3 text-xs font-ui uppercase tracking-[0.22em] text-brand-green hover:text-brand-wood transition-colors border-b border-brand-green/5"
                        >
                          Wszystkie pokoje
                        </Link>
                        {rooms.map((room) => (
                          <Link
                            key={room.id}
                            to={`/pokoje#${room.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-3 text-foreground-body text-sm hover:text-brand-wood transition-colors"
                          >
                            {room.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
