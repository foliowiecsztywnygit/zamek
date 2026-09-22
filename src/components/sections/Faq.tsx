import { useState } from 'react';
import { faqData } from '../../content/data';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { ChevronDown } from 'lucide-react';
import { Section } from '../ui/Section';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" background="default">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-12">
          <div className="text-xs font-ui tracking-[0.24em] uppercase text-foreground-body/60 mb-6">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground-heading mb-4">
            Najczęstsze pytania gości
          </h2>
          <p className="text-foreground-body">
            Krótko i konkretnie – tak, abyś mógł/mogła zaplanować pobyt bez niespodzianek.
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={index}>
                <div className={isOpen ? "rounded-2xl border border-brand-brown/20 bg-background-card shadow-card" : "rounded-2xl border border-brand-brown/15 bg-background-card"}>
                  <button
                    className="w-full flex items-center justify-between gap-6 p-6 md:p-7 text-left focus:outline-none rounded-2xl"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-foreground-heading font-ui font-medium tracking-wide">
                      {faq.question}
                    </span>
                    <ChevronDown className={isOpen ? "w-5 h-5 text-foreground-body/70 rotate-180 transition-transform duration-200" : "w-5 h-5 text-foreground-body/70 transition-transform duration-200"} />
                  </button>
                  <div className={isOpen ? "overflow-hidden transition-all duration-300 max-h-96 opacity-100" : "overflow-hidden transition-all duration-300 max-h-0 opacity-0"}>
                    <div className="px-6 md:px-7 pb-6 md:pb-7 text-foreground-body leading-relaxed border-t border-brand-brown/10">
                      <div className="pt-5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </Section>
  );
}
