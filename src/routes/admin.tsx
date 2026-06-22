import { createFileRoute, redirect, Outlet, useLocation, Link } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'
import { SiteLayout } from '@/components/SiteLayout'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session && location.pathname !== '/admin/login') {
      throw redirect({
        to: '/admin/login',
      })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const location = useLocation()
  const isLogin = location.pathname === '/admin/login'

  if (isLogin) {
    return <Outlet />
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/admin" 
                activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
                inactiveProps={{ className: "text-muted-foreground hover:bg-white/5" }}
                className="px-4 py-2 rounded-lg transition-colors"
                activeOptions={{ exact: true }}
              >
                Blogs
              </Link>
              <Link 
                to="/admin/projects" 
                activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
                inactiveProps={{ className: "text-muted-foreground hover:bg-white/5" }}
                className="px-4 py-2 rounded-lg transition-colors"
              >
                Projects
              </Link>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/admin/login';
                }}
                className="px-4 py-2 rounded-lg text-left text-muted-foreground hover:bg-white/5 transition-colors"
              >
                Sign out
              </button>
            </nav>
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SiteLayout>
  )
}
