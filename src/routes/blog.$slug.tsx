import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteLayout } from '@/components/SiteLayout'
import { supabase } from '@/lib/supabase'
import { Calendar, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      throw new Error('Blog not found')
    }
    return { post: data }
  },
  head: ({ loaderData }) => {
    if (!loaderData || !loaderData.post) return {}
    const { post } = loaderData
    const metaTitle = post.meta_title ? `${post.meta_title} | Devoraaa` : `${post.title} | Devoraaa`
    const metaDesc = post.meta_description || post.excerpt
    
    return {
      meta: [
        { title: metaTitle },
        { name: 'description', content: metaDesc },
        { property: 'og:title', content: metaTitle },
        { property: 'og:description', content: metaDesc },
        { property: 'og:image', content: post.image_url },
        { property: 'og:image:alt', content: post.image_alt || post.title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: metaTitle },
        { name: 'twitter:description', content: metaDesc },
        { name: 'twitter:image', content: post.image_url },
      ],
    }
  },
  errorComponent: () => (
    <SiteLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for doesn't exist or has been removed.</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    </SiteLayout>
  ),
})

function BlogPost() {
  const { post } = Route.useLoaderData()

  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        <header className="mb-14">
          <div className="flex items-center gap-3 text-sm mb-6">
            <span className="rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">{post.category}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" /> 
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {post.image_url && (
          <div className="mb-14 rounded-2xl overflow-hidden border border-white/10 aspect-[21/9]">
            <img src={post.image_url} alt={post.image_alt || post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </SiteLayout>
  )
}
