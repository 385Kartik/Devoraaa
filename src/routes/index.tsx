import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, Check, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Devora — Custom Software Development for Web, Mobile, SaaS & AI" },
      { name: "description", content: "Devora delivers scalable web, mobile, SaaS and AI automation solutions for startups and enterprises worldwide." },
    ],
  }),
});

const services = [
  { icon: Code, title: "Web App Development", desc: "Modern web app solutions built for speed, scalability, and long-term performance." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Secure enterprise-grade mobile apps with scalable architecture and seamless UX." },
  { icon: Cloud, title: "Custom SaaS Development", desc: "From MVP launch to full-scale product growth with recurring revenue in mind." },
  { icon: Bot, title: "AI Automation & Voice Agents", desc: "AI agents and automation that reduce manual work and boost operational efficiency." },
  { icon: Gamepad2, title: "Game Development", desc: "Immersive game development with smooth performance and engaging gameplay." },
  { icon: Monitor, title: "Desktop App Development", desc: "Reliable desktop apps for productivity tools, dashboards, and enterprise systems." },
];

const projects = [
  { title: "Sov Portal", sub: "Edtech Portal For Students & Agents", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/sov_portal_c665c87259_7be99a388d.webp" },
  { title: "Wise Talk", sub: "Career Guidance Application", tag: "Mobile Application", img: "https://cms.slashifytech.in/uploads/wise_talk_9af024187b_96cc461eda.webp" },
  { title: "Connecting Soulmate", sub: "Matrimony Application", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/CS_a23bff7541_be56109500.webp" },
  { title: "Brand Monkey", sub: "Employee Management System", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/BM_Banner_968928d689.png" },
  { title: "Qrynto", sub: "Anti-Counterfeiting Platform", tag: "SaaS", img: "https://cms.slashifytech.in/uploads/Qrynto_Banner_7ee07f5b89.png" },
  { title: "360 Car Protect", sub: "Automotive & Warranty Management", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/360_2ed4e74e2a_a2b6bf46bf.webp" },
];

const process = [
  "Discovery & Consultation",
  "Planning & Roadmap",
  "Design & Prototyping",
  "Development",
  "QA Testing & Launch",
  "Growth & Support",
];

const testimonials = [
  { name: "Jaskirat", company: "BrandMonkey", text: "Loved working with the team. Young, charismatic, and highly skilled. Would highly recommend Devora." },
  { name: "Karishma Punwani", company: "Connecting Soulmate", text: "An amazing team of hardworking talent. Worked on multiple projects, all delivered on time." },
  { name: "Bharathi", company: "Buzzing Bee", text: "Devora did wonderful work creating my website. Patient, thoughtful, and attention to detail." },
];

function HomePage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 text-center">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          Custom Software Development<br />for Web, Mobile, SaaS &{" "}
          <span className="text-primary underline decoration-primary/40 underline-offset-8">AI Automation</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground md:text-lg">
          Devora delivers scalable web app solutions, high-performing mobile apps, SaaS platforms, and intelligent automation for startups and enterprises worldwide.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">
            Book a Call
          </Link>
          <Link to="/case-study" className="rounded-full border border-border bg-card px-7 py-3 text-sm font-medium hover:border-primary">
            Why Devora?
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-center text-sm uppercase tracking-widest text-primary">Services</p>
        <h2 className="mt-2 text-center text-4xl font-bold md:text-5xl">What We Do</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">End-to-end digital solutions that launch, scale, and transform your business.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Discuss for Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-center text-sm uppercase tracking-widest text-primary">Our Process</p>
        <h2 className="mt-2 text-center text-4xl font-bold md:text-5xl">How We Work</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">A clear step-by-step process from idea to launch — no confusion.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {process.map((step, i) => (
            <div key={step} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-3xl font-black text-primary/60">0{i + 1}</div>
              <p className="mt-3 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-center text-sm uppercase tracking-widest text-primary">Our Work</p>
        <h2 className="mt-2 text-center text-4xl font-bold md:text-5xl">Real Products We've Built</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-2xl bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
              <div className="overflow-hidden rounded-xl">
                <img src={p.img} alt={p.title} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.sub}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-primary">{p.tag}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/case-study" className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground">
            View all Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold md:text-5xl">Loved by teams worldwide</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card p-7">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-5xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-5xl">Your vision deserves the right tech partner.</h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">Let's build something reliable, scalable, and future-ready together.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground">
            Book a Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
