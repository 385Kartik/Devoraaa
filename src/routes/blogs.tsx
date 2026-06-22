import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  loader: async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return { posts: [] };
    }
    return { posts: data || [] };
  },
  head: () => ({
    meta: [
      { title: "Blogs — Devora" },
      { name: "description", content: "Insights on web, mobile, SaaS, AI automation, and modern software engineering from the Devora team." },
    ],
  }),
});

function BlogsPage() {
  const { posts } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <p className="relative z-10 text-sm uppercase tracking-widest text-primary">Blogs</p>
        <h1 className="relative z-10 mt-3 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-6xl pb-2">Insights from the Devora team</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Engineering deep-dives, product lessons, and stories from the projects we ship.</p>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10 relative pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        {posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground relative z-10">
            <p>No blogs published yet. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {posts.map((p: any) => (
              <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-[0_0_40px_-10px_rgba(255,85,0,0.15)]">
                <div className="overflow-hidden bg-black aspect-[16/9]">
                  <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">{p.category}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                  <Link to={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
