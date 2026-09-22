// Regional Icons - Neo-Góral style

export function Rozeta({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img 
      src="/rozeta.png" 
      alt="Rozeta" 
      className={`object-contain ${className}`} 
    />
  );
}

export function Parzenica({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img 
      src="/parzenica.png" 
      alt="Parzenica" 
      className={`object-contain ${className}`} 
    />
  );
}

export function RotatingRozeta({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute opacity-5 pointer-events-none ${className}`}>
      <img
        src="/rozeta.png"
        alt=""
        className="w-full h-full object-contain animate-spin-slow [transform-origin:center]"
      />
    </div>
  );
}

export function GoralskiDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-8 opacity-40 ${className}`}>
      <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12h80" stroke="var(--color-brand-brown)" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M120 12h80" stroke="var(--color-brand-brown)" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M90 12l10-10 10 10-10 10z" fill="var(--color-accent-yellow)" />
        <path d="M100 2l10 10-10 10-10-10z" stroke="var(--color-brand-brown)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function Separator({ className = "w-full max-w-xs mx-auto text-brand-brown" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 opacity-70 ${className}`}>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-current" />
      <img src="/rozeta.png" alt="Rozeta" className="w-4 h-4 shrink-0 opacity-40" />
      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}
