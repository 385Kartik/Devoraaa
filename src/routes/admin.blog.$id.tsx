import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Editor } from '@/components/Editor'
import { Loader2, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/admin/blog/$id')({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) throw new Error('Blog not found')
    return { blog: data }
  },
  component: EditBlog,
})

function EditBlog() {
  const { blog } = Route.useLoaderData()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(blog.title)
  const [slug, setSlug] = useState(blog.slug)
  const [excerpt, setExcerpt] = useState(blog.excerpt)
  const [category, setCategory] = useState(blog.category)
  const [imageUrl, setImageUrl] = useState(blog.image_url)
  const [content, setContent] = useState(blog.content)
  const [published, setPublished] = useState(blog.published)

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState(blog.meta_title || blog.title)
  const [metaDescription, setMetaDescription] = useState(blog.meta_description || blog.excerpt)
  const [imageAlt, setImageAlt] = useState(blog.image_alt || blog.title)

  const handleSlugify = (text: string) => {
    setSlug(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file)

    if (uploadError) {
      alert('Error uploading main image')
      setLoading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    setImageUrl(publicUrl)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase
      .from('blogs')
      .update({
        title,
        slug,
        excerpt,
        category,
        image_url: imageUrl,
        content,
        published,
        meta_title: metaTitle,
        meta_description: metaDescription,
        image_alt: imageAlt,
      })
      .eq('id', blog.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Edit Blog</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm">{error}</div>
        )}

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Basic Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  handleSlugify(e.target.value)
                }}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <input 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea 
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <input 
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Main Image</label>
              <div className="flex gap-2">
                <input 
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                />
                <label className="flex items-center justify-center h-10 px-4 bg-white/10 hover:bg-white/20 rounded-md cursor-pointer transition-colors text-sm font-medium shrink-0">
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              {imageUrl && <img src={imageUrl} alt="Preview" className="h-20 rounded-md object-cover mt-2" />}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">SEO Details (Devoraaa Branding)</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Title</label>
              <input 
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Alt Text</label>
              <input 
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Description</label>
            <textarea 
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground text-right">{metaDescription.length}/160</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Editor content={content} onChange={setContent} />
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="published" 
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium cursor-pointer">Published</label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Update Blog Post
          </button>
        </div>
      </form>
    </div>
  )
}
