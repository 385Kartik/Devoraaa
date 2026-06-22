import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Editor } from '@/components/Editor'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/blog/new')({
  component: NewBlog,
})

function NewBlog() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  
  // SEO Fields
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const handleSlugify = (text: string) => {
    setSlug(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`

    const { error: uploadError, data } = await supabase.storage
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

    const { error: insertError } = await supabase.from('blogs').insert({
      title,
      slug,
      excerpt,
      category,
      image_url: imageUrl,
      content,
      published,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt,
      image_alt: imageAlt || title,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Write New Blog</h2>
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
                  if (!metaTitle) setMetaTitle(e.target.value)
                  if (!imageAlt) setImageAlt(e.target.value)
                }}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="Post title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <input 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="post-url-slug"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Excerpt (Short description)</label>
            <textarea 
              required
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value)
                if (!metaDescription) setMetaDescription(e.target.value)
              }}
              className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              placeholder="Brief summary of the article..."
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
                placeholder="e.g. Engineering, AI, Design"
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
                  placeholder="https://... or upload ->"
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
                placeholder="SEO Title (e.g., Guide to AI - Devoraaa)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Alt Text</label>
              <input 
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="Descriptive alt text for the main image"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Description</label>
            <textarea 
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              placeholder="SEO Meta Description (max 160 chars)"
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
          <label htmlFor="published" className="text-sm font-medium cursor-pointer">Publish immediately</label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Blog Post
          </button>
        </div>
      </form>
    </div>
  )
}
