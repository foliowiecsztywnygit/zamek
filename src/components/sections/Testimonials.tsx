import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { opinions } from '../../content/data';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { Parzenica } from '../ui/Icons';

export function Testimonials() {
  return (
    <Section background="default" ornament>
      <FadeIn className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Głosy Naszych Gości</h2>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background-card border border-border mt-2">
          <div className="flex text-accent-gold">
            {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
          </div>
          <span className="font-semibold text-foreground">8,9/10</span>
          <span className="text-foreground-muted text-sm">(18 opinii)</span>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {opinions.map((opinion) => (
          <StaggerItem key={opinion.id}>
            <Card hover className="p-8 relative h-full flex flex-col justify-between">
              <Parzenica className="absolute top-6 right-6 text-border w-12 h-12" />
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-gold/10 text-accent-gold font-semibold text-sm">
                    {opinion.rating}
                  </span>
                  <span className="text-foreground-muted text-xs">/10</span>
                </div>
                <p className="text-lg font-body italic text-foreground mb-8 leading-relaxed">
                  "{opinion.quote}"
                </p>
              </div>
              <p className="font-semibold text-accent-gold tracking-wide uppercase text-sm">
                — {opinion.author}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
