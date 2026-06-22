import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { Vortex } from "@/components/ui/vortex";
import { caseStudies, getCaseStudyImage } from "@/data/caseStudies";

export const Route = createFileRoute("/case-study/")({
  loader: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    
    const dbProjects = (data || []).map((p: any) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      industry: p.industry,
      platform: p.platform,
      overview: p.overview,
      image: p.image,
    }));
    
    const hardcoded = caseStudies.map(s => ({
      ...s,
      image: getCaseStudyImage(s)
    }));

    return { projects: [...dbProjects, ...hardcoded] };
  },
  component: CaseStudyPage,
  head: () => ({
    meta: [
      { title: "Case Studies — devoraaa" },
      { name: "description", content: "Stories of innovation and growth — explore devoraaa's case studies across web and mobile applications." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function CaseStudyPage() {
  const { projects } = Route.useLoaderData();
  const [filter, setFilter] = useState<string>("All");
  
  const categories = ["All", "Web Platform", "iOS & Android", "Edtech", "Automobile"];
  
  const filtered = filter === "All" 
    ? projects 
    : projects.filter((s: any) => s.platform.includes(filter) || s.industry.includes(filter));

  return (
    <SiteLayout>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Vortex backgroundColor="transparent" className="w-full h-full" />
      </div>
      <div className="relative z-10">
      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-32 pb-20 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Our Portfolio
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-7xl lg:text-8xl pb-2">
            Stories of<br />Innovation
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-xl">
            Explore how we've helped ambitious brands transform their digital presence and scale their operations.
          </motion.p>

          {/* Filters */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  filter === c 
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-105" 
                    : "bg-white/[0.03] border border-white/[0.05] text-muted-foreground hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32 relative">
        <motion.div 
          layout
          className="grid gap-8 grid-cols-1 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s: any) => {
              const image = s.image;
              return (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  key={s.slug} 
                  className="group relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-muted shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(234,88,12,0.2)]"
                >
                  {/* Background Image */}
                  <img 
                    src={image} 
                    alt={s.title} 
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110 group-hover:brightness-[0.3]"
                  />
                  
                  {/* Gradients */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                    <div className="flex gap-2 opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xl">
                        {s.industry}
                      </span>
                      <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
                        {s.platform}
                      </span>
                    </div>
                  </div>

                  {/* Default State Content (Visible initially, fades out on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-8">
                    <h3 className="text-4xl font-black text-white mb-2">{s.title}</h3>
                    <p className="text-primary font-bold tracking-widest uppercase text-sm">{s.subtitle}</p>
                  </div>

                  {/* Hover State Content (Appears on hover) */}
                  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[101%] p-10 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0">
                    <h3 className="text-4xl font-black text-white mb-4">{s.title}</h3>
                    <p className="text-white/80 mb-8 text-base leading-relaxed line-clamp-3">{s.overview}</p>
                    
                    <Link 
                      to="/case-study/$slug" 
                      params={{ slug: s.slug }} 
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-orange-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                    >
                      Read Full Case Study <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
      </div>
    </SiteLayout>
  );
}
