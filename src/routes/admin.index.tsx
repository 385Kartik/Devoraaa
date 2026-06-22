import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setBlogs(data)
    setLoading(false)
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    await supabase.from('blogs').delete().eq('id', id);
    fetchBlogs();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">All Blogs</h2>
        <Link 
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Write New Blog
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-20 bg-white/5 rounded-xl w-full"></div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border border-white/10 border-dashed rounded-xl">
          <p>No blogs yet. Start writing your first post!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <div>
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span className={blog.published ? 'text-green-500' : 'text-yellow-500'}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to="/admin/blog/$id" params={{ id: blog.id }} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Edit2 className="h-4 w-4" />
                </Link>
                <button 
                  onClick={() => deleteBlog(blog.id)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
