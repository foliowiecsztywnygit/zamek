import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileStickyCTA } from './MobileStickyCTA';
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />
      <FloatingWhatsApp />
    </div>
  );
}
