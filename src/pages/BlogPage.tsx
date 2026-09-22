import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { blogPosts } from '../content/blog';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/FadeIn';
import { AppImage } from '../components/ui/AppImage';

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Helmet>
        <title>Blog | Zamek Bukowiec</title>
        <meta name="description" content="Przewodnik po Bieszczadach. Poznaj najlepsze atrakcje, szlaki górskie i porady dotyczące pobytu w Bukowcu i okolicach." />
      </Helmet>

      <Section ornament>
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-heading mb-4 text-foreground-heading uppercase">Nasz Blog</h1>
          <p className="text-foreground-body font-body text-lg">
            Praktyczne porady, ciekawostki i gotowe plany wycieczek.
          </p>
        </FadeIn>

        {/* Posts Grid */}
        {blogPosts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <StaggerItem key={post.id} className="h-full">
                <Card hover className="flex flex-col h-full border-none shadow-sm">
                  <Link to={`/blog/${post.slug}`} className="flex flex-col h-full group">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <AppImage 
                        src={post.image || ""} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackSrc="/images/placeholders/landscape.svg"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading mb-3 text-foreground-heading uppercase group-hover:text-accent-yellow transition-colors">{post.title}</h3>
                      <p className="text-foreground-body font-body mb-4 flex-grow">{post.description || post.excerpt}</p>
                      <div className="text-sm text-foreground-body/70 font-body mt-auto">
                        {post.date}
                      </div>
                    </div>
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground-body font-body text-xl">
              Obecnie nie ma żadnych wpisów na blogu. Wkrótce pojawią się tu nowe artykuły!
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
