import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2, FolderGit2 } from 'lucide-react'

export const Route = createFileRoute('/admin/projects/')({
  component: AdminProjectsDashboard,
})

function AdminProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setProjects(data)
    setLoading(false)
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FolderGit2 className="h-6 w-6 text-primary" /> All Projects
        </h2>
        <Link 
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add New Project
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 bg-white/5 rounded-xl w-full"></div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-white/10 border-dashed rounded-xl">
          <p className="text-lg mb-2">No projects yet.</p>
          <p className="text-sm opacity-70">Start adding your portfolio projects to showcase them to the world!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-4">
                {project.image ? (
                  <div className="h-16 w-24 rounded-md overflow-hidden bg-white/5 shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-16 w-24 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                    <FolderGit2 className="h-6 w-6 text-white/20" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="text-primary/80 uppercase text-[10px] tracking-wider font-bold">{project.platform}</span>
                    <span>•</span>
                    <span>{project.industry}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/projects/${project.id}`}
                  className="p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 rounded-md hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
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
