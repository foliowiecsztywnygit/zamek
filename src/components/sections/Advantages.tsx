import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { advantages } from '../../content/data';
import { StaggerContainer, StaggerItem } from '../ui/FadeIn';
import { Rozeta } from '../ui/Icons';

export function Advantages() {
  return (
    <Section background="default" ornament className="relative -mt-10 z-20 pt-0">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((adv) => (
          <StaggerItem key={adv.id}>
            <Card hover className="p-8 text-center flex flex-col items-center group h-full">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 text-accent-gold border border-border group-hover:bg-accent-gold group-hover:text-background transition-colors duration-300">
                <Rozeta className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl mb-3 text-foreground">{adv.title}</h3>
              <p className="text-foreground-muted">{adv.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
