import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-[96%] mx-auto bg-brand-green border-t-4 border-brand-wood pt-16 pb-12 mt-12 px-6 md:px-12 mb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        
        {/* Column 1 */}
        <div>
          <h3 className="font-heading text-2xl text-white mb-6">NASZE ATUTY</h3>
          <ul className="space-y-4">
            {['Widok na rzekę i góry', 'Bezpłatny parking i Wi-Fi', 'Ogród z tarasem i grillem', 'Cisza i spokój'].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/90 font-body">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent-gold shrink-0 mt-1.5">
                  <path d="M12 2L22 20H2L12 2Z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="text-3xl font-heading text-white tracking-widest mb-6 hover:text-accent-gold transition-colors">
            ZAMEK
          </Link>
          <div className="font-ui text-white/80 space-y-2 text-sm uppercase tracking-wide">
            <p>Polska 11 J</p>
            <p>Bukowiec (Podkarpackie)</p>
            <a href="tel:[TELEFON]" className="block mt-4 hover:text-accent-gold transition-colors text-lg text-white">[TELEFON]</a>
            <p className="text-xs mt-1 text-white/60">Czynne całą dobę</p>
            <a href="mailto:[EMAIL]" className="block hover:text-accent-gold transition-colors mt-2">[EMAIL]</a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="md:text-right">
          <h3 className="font-heading text-2xl text-white mb-6">NA SKRÓTY</h3>
          <ul className="space-y-3 font-ui uppercase text-sm tracking-widest">
            <li><Link to="/pokoje" className="text-white/80 hover:text-accent-gold transition-colors">Pokoje</Link></li>
            <li><Link to="/galeria" className="text-white/80 hover:text-accent-gold transition-colors">Galeria</Link></li>
            <li><Link to="/blog" className="text-white/80 hover:text-accent-gold transition-colors">Blog</Link></li>
            <li><Link to="/faq" className="text-white/80 hover:text-accent-gold transition-colors">FAQ</Link></li>
            <li><Link to="/kontakt" className="text-white/80 hover:text-accent-gold transition-colors">Kontakt</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center font-ui text-white/50 text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} ZAMEK BUKOWIEC. WSZELKIE PRAWA ZASTRZEŻONE.</p>
        <p className="mt-2">
          Projekt i Realizacja: <a href="https://brosystems.pl" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Krzysztof Żebrowski</a>
        </p>
      </div>
    </footer>
  );
}
