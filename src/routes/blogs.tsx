import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  head: () => ({
    meta: [
      { title: "Blogs — Devora" },
      { name: "description", content: "Insights on web, mobile, SaaS, AI automation, and modern software engineering from the Devora team." },
    ],
  }),
});

const posts = [
  { title: "How to Choose the Right Tech Stack for Your SaaS in 2026", excerpt: "A pragmatic guide to picking a stack that scales without slowing your team down.", date: "May 18, 2026", category: "SaaS", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80" },
  { title: "AI Voice Agents: The New Customer Support Backbone", excerpt: "What we learned shipping voice-first AI agents to production environments.", date: "May 10, 2026", category: "AI", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80" },
  { title: "React Native vs Flutter: A 2026 Honest Comparison", excerpt: "Performance, DX, ecosystem — what actually matters when you ship.", date: "Apr 28, 2026", category: "Mobile", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80" },
  { title: "Designing Multi-Tenant SaaS Databases That Don't Break", excerpt: "Row-level security, sharding, and the trade-offs you should know upfront.", date: "Apr 14, 2026", category: "Engineering", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&q=80" },
  { title: "From MVP to Series A: What Founders Get Wrong About Tech Debt", excerpt: "Three patterns we've seen across 30+ startups — and how to avoid them.", date: "Apr 02, 2026", category: "Product", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80" },
  { title: "Stripe + Razorpay + PayPal: A Unified Billing Architecture", excerpt: "A reference architecture for accepting global payments without chaos.", date: "Mar 22, 2026", category: "Payments", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80" },
];

function BlogsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pt-20 text-center">
        <p className="text-sm uppercase tracking-widest text-primary">Blogs</p>
        <h1 className="mt-3 text-5xl font-bold md:text-6xl">Insights from the Devora team</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Engineering deep-dives, product lessons, and stories from the projects we ship.</p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-2xl bg-card transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">{p.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {p.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
