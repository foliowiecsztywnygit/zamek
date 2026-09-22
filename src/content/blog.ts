import frontMatter from 'front-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;
  date: string;
  content: string;
  image?: string;
}

const markdownFiles = import.meta.glob('./blog/*.md', { eager: true, query: '?raw', import: 'default' });

const posts: BlogPost[] = [];

for (const path in markdownFiles) {
  const rawContent = markdownFiles[path] as string;
  const { attributes, body } = frontMatter<any>(rawContent);
  
  posts.push({
    id: attributes.slug || path.replace('./blog/', '').replace('.md', ''),
    slug: attributes.slug || path.replace('./blog/', '').replace('.md', ''),
    title: attributes.title || 'Bez tytułu',
    description: attributes.description || '',
    excerpt: attributes.description || '', // fallback
    date: attributes.date || '',
    content: body,
    image: attributes.image || '', // fallback
  });
}

export const blogPosts = posts.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export const blogCategories: any[] = [];
