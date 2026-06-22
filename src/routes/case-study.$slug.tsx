import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, TrendingUp, Target, Lightbulb, Rocket } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { caseStudies, getCaseStudy, getCaseStudyImage } from "@/data/caseStudies";

export const Route = createFileRoute("/case-study/$slug")({
  component: CaseStudyDetailPage,
  loader: async ({ params }) => {
    let study: any = null;
    
    const { data: dbStudy, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", params.slug)
      .single();
      
    if (!error && dbStudy) {
      study = {
        ...dbStudy,
        revenue_before: dbStudy.revenue_before,
        revenue_after: dbStudy.revenue_after
      };
    } else {
      const hardcoded = getCaseStudy(params.slug);
      if (hardcoded) {
        study = {
          ...hardcoded,
          image: getCaseStudyImage(hardcoded),
          revenue_before: hardcoded.revenue.before,
          revenue_after: hardcoded.revenue.after
        };
      }
    }
      
    if (!study) throw notFound();
    
    // Fetch next project for the "Next Case Study" section
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("slug, title, image, subtitle")
      .order("created_at", { ascending: false });
      
    const hardcodedProjects = caseStudies.map(s => ({
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle,
      image: getCaseStudyImage(s)
    }));

    const allProjects = [...(dbProjects || []), ...hardcodedProjects];
      
    let nextStudy = null;
    if (allProjects.length > 1) {
      const currentIdx = allProjects.findIndex(p => p.slug === study.slug);
      const nextIdx = (currentIdx + 1) % allProjects.length;
      nextStudy = allProjects[nextIdx];
    }

    return { study, nextStudy };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.study.title} — Case Study | Devora` },
          { name: "description", content: loaderData.study.hero },
          { property: "og:title", content: `${loaderData.study.title} — Devora` },
          { property: "og:description", content: loaderData.study.hero },
        ]
      : [{ title: "Case Study — Devora" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">Case study not found</h1>
        <Link to="/case-study" className="mt-6 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to all case studies
        </Link>
      </div>
    </SiteLayout>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function CaseStudyDetailPage() {
  const { study, nextStudy } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const image = study.image;
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const overviewItems = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Platform", value: study.platform },
    { label: "Services", value: study.services },
  ];

  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ y: heroY }}
        >
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-40 -right-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl" />
        </motion.div>

        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/case-study" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 grid items-end gap-10 lg:grid-cols-12"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {study.industry}
              </motion.div>
              <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-6xl lg:text-7xl pb-2">
                {study.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-3 text-lg font-medium text-primary md:text-xl">
                {study.subtitle}
              </motion.p>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
                {study.hero}
              </motion.p>
              {study.live_link && (
                <motion.div variants={fadeUp} className="mt-8">
                  <a href={study.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:bg-orange-500 hover:scale-[1.02]">
                    Visit Website <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              )}
            </div>

            <motion.div
              variants={fadeUp}
              className="lg:col-span-5 grid grid-cols-2 gap-3"
            >
              {[
                { icon: Target, label: "Focus", value: study.platform },
                { icon: Lightbulb, label: "Approach", value: `${study.approach.length} pillars` },
                { icon: TrendingUp, label: "Outcomes", value: `${study.results.length} wins` },
                { icon: Rocket, label: "Status", value: "Live" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 backdrop-blur-xl">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="mt-1 text-sm font-semibold">{value}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-col gap-6"
          >
            {(() => {
              const gallery = (study.gallery && study.gallery.length > 0) 
                ? study.gallery 
                : [image, image, image]; // Fallback if no specific gallery is defined

              return (
                <div className="flex flex-col gap-4">
                  {/* Main Large Image */}
                  <motion.div 
                    layoutId={`main-image-${selectedIndex}`}
                    className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10 relative"
                  >
                    <img 
                      src={gallery[selectedIndex]} 
                      alt={`${study.title} screen ${selectedIndex + 1}`} 
                      className="w-full aspect-[16/9] object-cover transition-all duration-500"
                      key={selectedIndex}
                    />
                  </motion.div>
                  
                  {/* Thumbnails */}
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`relative shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                          selectedIndex === idx 
                            ? 'border-primary ring-2 ring-primary/30 shadow-[0_0_15px_rgba(234,88,12,0.5)]' 
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-primary/50'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="h-24 w-40 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW STRIP */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <motion.div
          className="grid gap-px overflow-hidden rounded-3xl bg-white/[0.05] md:grid-cols-4 relative z-10 border border-white/[0.05]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {overviewItems.map((it) => (
            <motion.div key={it.label} variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
              <div className="mt-2 text-base font-semibold leading-snug">{it.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 max-w-4xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {study.overview}
        </motion.p>
      </section>

      {/* CHALLENGES */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold md:text-5xl">The Challenges</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">What stood in the way before we got involved.</p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {study.challenges.map((c: string, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-primary/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{c}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* APPROACH */}
      <section className="bg-white/[0.01] border-y border-white/[0.05] py-24 relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold md:text-5xl">Our Approach & Solution</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">The pillars we built the product on.</p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {study.approach.map((a: { title: string; body: string }, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-6 hover:bg-white/[0.04] hover:border-primary/20"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/30" />
                <div className="text-5xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> Results & Impact
          </div>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Numbers that moved the needle</h2>
        </motion.div>

        <motion.ul
          className="mt-10 space-y-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {study.results.map((r: string, i: number) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-5"
            >
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <span className="text-base font-medium md:text-lg">{r}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* REVENUE */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { tag: "Before", body: study.revenue_before, tone: "muted" },
            { tag: "After", body: study.revenue_after, tone: "primary" },
          ].map((b, i) => (
            <motion.div
              key={b.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-3xl border p-8 ${
                b.tone === "primary"
                  ? "border-primary/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
                  : "border-white/[0.05] bg-white/[0.02] backdrop-blur-xl"
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">{b.tag}</div>
              <p className="mt-4 text-lg leading-relaxed md:text-xl">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT SUMMARY */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl shadow-2xl p-10 md:p-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,_color-mix(in_oklab,_var(--color-primary)_20%,_transparent),_transparent_60%)]" />
          <h2 className="text-3xl font-bold md:text-4xl">Impact Summary</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{study.impact}</p>
        </motion.div>
      </section>

      {/* NEXT CASE STUDY */}
      {nextStudy && (
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <Link
          to="/case-study/$slug"
          params={{ slug: nextStudy.slug }}
          className="group block overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/[0.04] hover:border-primary/30"
        >
          <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_auto_240px] md:p-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Next Case Study</div>
              <div className="mt-2 text-2xl font-bold md:text-3xl">{nextStudy.title}</div>
              <div className="text-sm text-muted-foreground">{nextStudy.subtitle || 'View Project'}</div>
            </div>
            <div className="flex items-center gap-2 text-primary transition-transform group-hover:translate-x-1">
              Read <ArrowRight className="h-5 w-5" />
            </div>
            <div className="hidden overflow-hidden rounded-2xl md:block">
              <img src={nextStudy.image} alt={nextStudy.title} className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </section>
      )}
    </SiteLayout>
  );
}
