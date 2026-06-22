import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/integrations")({
  component: IntegrationsPage,
  head: () => ({
    meta: [
      { title: "Integrations — Devora" },
      {
        name: "description",
        content:
          "Devora integrates with modern platforms across cloud, backend, AI, and payments.",
      },
    ],
  }),
});

type Item = { name: string; logo?: string; letter?: string; desc: string };
type Category = { id: string; name: string; subtitle: string; items: Item[] };

const cdn = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend & UI Libraries",
    subtitle: "Modern libraries for building beautiful interfaces.",
    items: [
      { name: "React", logo: cdn("react"), desc: "Component-based library for building interactive user interfaces." },
      { name: "Tailwind CSS", logo: cdn("tailwindcss"), desc: "Utility-first CSS framework for rapid UI development." },
      { name: "Framer Motion", logo: cdn("framer"), desc: "Production-ready motion library for React." },
      { name: "Shadcn UI", logo: cdn("shadcnui", "ffffff"), desc: "Beautifully designed components that you can copy and paste." },
      { name: "Aceternity UI", logo: "https://ui.aceternity.com/logo-dark.png", desc: "Copy paste the most trending components and use them in your websites." },
      { name: "React Bits", logo: cdn("react"), desc: "A curated collection of React components and snippets." },
    ],
  },
  {
    id: "backend",
    name: "Backend, Databases & Frameworks",
    subtitle: "Scalable data storage and real-time infrastructure.",
    items: [
      { name: "PostgreSQL", logo: cdn("postgresql"), desc: "Powerful, open source object-relational database system." },
      { name: "MySQL", logo: cdn("mysql"), desc: "World's most popular open source relational database." },
      { name: "Supabase", logo: cdn("supabase"), desc: "Open-source Firebase alternative with Postgres, Auth, and Edge Functions." },
      { name: "Firebase", logo: cdn("firebase"), desc: "Realtime database, authentication, cloud functions, and hosting." },
      { name: "MongoDB", logo: cdn("mongodb"), desc: "Flexible NoSQL database for modern web applications." },
      { name: "SQLite", logo: cdn("sqlite"), desc: "Lightweight, file-based relational database." },
      { name: "Node.js", logo: cdn("nodedotjs"), desc: "Fast, scalable, and efficient server-side runtime." },
      { name: "Next.js", logo: cdn("nextdotjs", "ffffff"), desc: "React framework for production with SSR and static generation." },
    ],
  },
  {
    id: "payments",
    name: "Payments & Billing",
    subtitle: "Secure payment gateways and subscriptions.",
    items: [
      { name: "Razorpay", logo: cdn("razorpay"), desc: "Indian payment gateway with UPI, cards, netbanking, and subscriptions." },
      { name: "Stripe", logo: cdn("stripe"), desc: "Global payments, subscriptions, and financial infrastructure." },
      { name: "PhonePe", logo: cdn("phonepe"), desc: "UPI-first payments and merchant collections in India." },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    subtitle: "Reliable hosting, storage, and edge computing.",
    items: [
      { name: "AWS", logo: cdn("amazonaws"), desc: "Scalable cloud infrastructure (EC2, S3, RDS, Lambda)." },
      { name: "Vercel", logo: cdn("vercel", "ffffff"), desc: "Frontend cloud and edge network for Next.js and React." },
      { name: "Cloudflare", logo: cdn("cloudflare"), desc: "CDN, DNS, and edge security globally." },
      { name: "Render", logo: cdn("render", "ffffff"), desc: "Unified cloud to build and run all your apps and websites." },
      { name: "Railway", logo: cdn("railway", "ffffff"), desc: "Infrastructure platform for fast development and deployment." },
    ],
  },
  {
    id: "ai",
    name: "AI & LLMs",
    subtitle: "Generative AI and intelligent automation.",
    items: [
      { name: "OpenAI", letter: "O", desc: "GPT models for text generation, embeddings, and intelligent agents." },
      { name: "Google Gemini", logo: cdn("googlegemini"), desc: "Multimodal AI models for text, vision, and reasoning tasks." },
      { name: "Groq", letter: "G", desc: "Fast AI inference engine for running open-source LLMs at lightning speed." },
    ],
  },
  {
    id: "communication",
    name: "Communication & APIs",
    subtitle: "Transactional email, SMS, and WhatsApp integrations.",
    items: [
      { name: "WhatsApp API", logo: cdn("whatsapp"), desc: "Automated business messaging and customer support." },
      { name: "Gallabox", letter: "G", desc: "WhatsApp Business API platform for conversational commerce." },
      { name: "Twilio", logo: cdn("twilio"), desc: "SMS, voice, and OTP verification pipelines." },
      { name: "SendGrid", logo: cdn("maildotru"), desc: "High-deliverability transactional email service." },
      { name: "Nodemailer", letter: "N", desc: "Module for Node.js apps to allow easy as cake email sending." },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Monitoring",
    subtitle: "Product analytics and error tracking.",
    items: [
      { name: "Google Analytics", logo: cdn("googleanalytics"), desc: "Web and app analytics for user behavior insights." },
      { name: "Microsoft Clarity", logo: cdn("microsoft"), desc: "Free user behavior analytics with heatmaps and session recordings." },
      { name: "Sentry", logo: cdn("sentry"), desc: "Real-time error tracking and performance monitoring." },
    ],
  },
  {
    id: "mobile",
    name: "App Distribution",
    subtitle: "Mobile app submission and release pipelines.",
    items: [
      { name: "Apple App Store", logo: cdn("appstore", "ffffff"), desc: "iOS app submission and App Store Connect." },
      { name: "Google Play Store", logo: cdn("googleplay"), desc: "Android publishing and Play Console." },
    ],
  }
];

/* ── Logo badge ─────────────────────────────────────────────────────────── */
function LogoBadge({ item }: { item: Item }) {
  if (item.logo) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background">
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          className="h-7 w-7"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-lg font-bold text-primary">
      {item.letter ?? item.name.charAt(0)}
    </div>
  );
}

/* ── Animated card ───────────────────────────────────────────────────────── */
function AnimatedCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group flex items-start gap-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-[0_0_40px_-10px_rgba(255,85,0,0.15)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px)"
          : "translateY(22px)",
        transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s ease ${index * 60}ms, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      <LogoBadge item={item} />
      <div className="min-w-0">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Category section ────────────────────────────────────────────────────── */
function CategorySection({ cat }: { cat: Category }) {
  const ref = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} id={cat.id} className="scroll-mt-24">
      <div
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-4xl pb-1">
          {cat.name}
        </h2>
        <p className="mt-2 text-muted-foreground">{cat.subtitle}</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {cat.items.map((it, i) => (
          <AnimatedCard key={it.name} item={it} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */
function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  // Track which section is in view → highlight sidebar
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(cat.id);
        },
        // fires when section enters the middle band of the viewport
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleSidebarClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveCategory(id);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-6 max-w-[1400px] px-6 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl px-6 py-20 text-center md:py-28 relative z-10 shadow-2xl">
          <span className="inline-block rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground/90">
            40+ Integrations
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-7xl pb-2">
            Third-party integrations we{" "}
            <span className="text-primary">ship every day</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            From payments and AI to logistics and analytics — we plug your
            product into the platforms your business already runs on.
            Battle-tested, production-ready, and built to scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Discuss your integration
            </Link>
            <a
              href="#frontend"
              onClick={(e) => handleSidebarClick(e, "frontend")}
              className="rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
            >
              Explore by category
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6">
            {[
              { k: "40+", v: "Platforms integrated" },
              { k: "8", v: "Domains covered" },
              { k: "15+", v: "Production deployments" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-4xl font-bold text-primary md:text-5xl">
                  {s.k}
                </div>
                <div className="mt-2 text-xs text-muted-foreground md:text-sm">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky sidebar + scrolling content ───────────────────────────── */}
      <section id="categories" className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="flex items-start gap-10">

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-32 self-start">
            <nav className="space-y-0.5">
              <p className="mb-3 px-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                Categories
              </p>
              {categories.map((c) => {
                const isActive = activeCategory === c.id;
                return (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    onClick={(e) => handleSidebarClick(e, c.id)}
                    className="group flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isActive
                        ? "rgba(255, 255, 255, 0.05)"
                        : "transparent",
                      color: isActive
                        ? "white"
                        : "rgba(255, 255, 255, 0.4)",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {/* Active indicator bar */}
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full transition-all duration-300"
                      style={{
                        background: isActive ? "#f97316" : "transparent",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    <span className="relative z-10">{c.name}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Scrollable content */}
          <div className="min-w-0 flex-1 space-y-20">
            {categories.map((cat) => (
              <CategorySection key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-10 text-center md:p-16 relative z-10 hover:border-primary/20 transition-all">
          <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 md:text-5xl pb-1">
            Don't see your stack?
            <br />
            <span className="text-primary">We'll integrate it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Custom APIs, webhooks, internal tools — if it has an SDK or an
            endpoint, we've probably wired it up before. Tell us what you need.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
          >
            Talk to an engineer
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}