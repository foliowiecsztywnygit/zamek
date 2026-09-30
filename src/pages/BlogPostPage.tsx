import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Section } from '../components/ui/Section';
import { blogPosts } from '../content/blog';
import { FadeIn } from '../components/ui/FadeIn';
import { AppImage } from '../components/ui/AppImage';
import { BookingCTA } from '../components/BookingCTA';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-24 min-h-screen">
      <Helmet>
        <title>{post.title} | Zamek Bukowiec</title>
        <meta name="description" content={post.description || post.excerpt || ''} />
        {/* Article Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "image": "${post.image || ''}",
              "datePublished": "${post.date}",
              "dateModified": "${post.date}",
              "author": {
                "@type": "Organization",
                "name": "Zamek Bukowiec"
              }
            }
          `}
        </script>
      </Helmet>

      <Section>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-sm text-foreground-body/70 font-ui tracking-widest uppercase mb-8 flex items-center gap-2">
            <Link to="/blog" className="hover:text-brand-brown transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brand-brown truncate">{post.title}</span>
          </nav>

          <FadeIn className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading mb-6 leading-tight text-foreground-heading uppercase">{post.title}</h1>
            <div className="text-foreground-body/70 font-body text-sm">{post.date}</div>
          </FadeIn>

          <FadeIn delay={0.2} className="aspect-[16/9] rounded-lg overflow-hidden mb-12 shadow-sm">
            <AppImage src={post.image || ""} alt={post.title} className="w-full h-full object-cover" fallbackSrc="/images/placeholders/landscape.svg" />
          </FadeIn>

          <FadeIn delay={0.3}
            className="prose prose-lg max-w-none text-foreground-body font-body prose-headings:font-heading prose-headings:font-normal prose-headings:text-foreground-heading prose-headings:uppercase prose-a:text-brand-brown hover:prose-a:text-accent-yellow mb-16"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </FadeIn>

          {/* Booking CTA at bottom of blog post */}
          <BookingCTA variant="banner" className="mb-12" />
        </div>
      </Section>
    </div>
  );
}
