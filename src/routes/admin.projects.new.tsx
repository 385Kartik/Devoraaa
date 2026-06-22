import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/projects/new')({
  component: NewProject,
})

function NewProject() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Basic Info
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [liveLink, setLiveLink] = useState('')

  // Case Study Details
  const [subtitle, setSubtitle] = useState('')
  const [hero, setHero] = useState('')
  const [client, setClient] = useState('')
  const [industry, setIndustry] = useState('')
  const [platform, setPlatform] = useState('')
  const [services, setServices] = useState('')
  const [overview, setOverview] = useState('')

  // Arrays & JSON (stored as comma separated for simple input)
  const [techStack, setTechStack] = useState('')
  const [challenges, setChallenges] = useState('')
  const [results, setResults] = useState('')

  // Revenue & Impact
  const [revenueBefore, setRevenueBefore] = useState('')
  const [revenueAfter, setRevenueAfter] = useState('')
  const [impact, setImpact] = useState('')

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
      .from('project-images')
      .upload(fileName, file)

    if (uploadError) {
      alert('Error uploading image')
      setLoading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName)

    setImageUrl(publicUrl)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Process comma separated strings into arrays
    const processArray = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean)

    const { error: insertError } = await supabase.from('projects').insert({
      title,
      slug,
      category,
      short_desc: shortDesc,
      subtitle,
      hero,
      client,
      industry,
      platform,
      services,
      overview,
      image: imageUrl,
      tech_stack: processArray(techStack),
      challenges: processArray(challenges),
      results: processArray(results),
      revenue_before: revenueBefore,
      revenue_after: revenueAfter,
      impact,
      live_link: liveLink,
      approach: [], // Empty for now, can be expanded later
      gallery: [],
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin/projects' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Add New Project</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm">{error}</div>
        )}

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Basic Info (Home Page Card)</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (!slug) handleSlugify(e.target.value)
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <input
                type="text"
                required
                value={category}
                placeholder="e.g. Web App"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <input
                type="text"
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Live Link (Optional)</label>
              <input
                type="url"
                value={liveLink}
                placeholder="https://"
                onChange={(e) => setLiveLink(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Main Image</label>
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <img src={imageUrl} alt="Preview" className="h-20 w-32 object-cover rounded-lg border border-white/10" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Case Study Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Client</label>
              <input type="text" value={client} onChange={e => setClient(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <input type="text" value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Services (comma separated)</label>
              <input type="text" value={services} onChange={e => setServices(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Hero Description</label>
              <textarea value={hero} onChange={e => setHero(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Project Overview</label>
              <textarea value={overview} onChange={e => setOverview(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Tech & Lists (Comma Separated)</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tech Stack (e.g. React, Node.js, AWS)</label>
              <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Challenges (e.g. Scaling issues, Slow performance)</label>
              <textarea value={challenges} onChange={e => setChallenges(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Key Results (e.g. 50% faster, 10k users)</label>
              <textarea value={results} onChange={e => setResults(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Revenue & Impact (Optional)</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Revenue Before</label>
              <input type="text" value={revenueBefore} onChange={e => setRevenueBefore(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Revenue After</label>
              <input type="text" value={revenueAfter} onChange={e => setRevenueAfter(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Impact Statement</label>
              <input type="text" value={impact} onChange={e => setImpact(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Project
          </button>
        </div>
      </form>
    </div>
  )
}
