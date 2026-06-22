import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Devora" },
      { name: "description", content: "End-to-end software development services: web, mobile, SaaS, AI automation, desktop and games." },
    ],
  }),
});

const services = [
  { icon: Code, title: "Web App Development", desc: "Modern web applications built for speed, scalability, and long-term performance.", features: ["React, Next.js, TanStack", "TypeScript & GraphQL", "Cloud-native hosting"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform mobile apps with enterprise-grade architecture.", features: ["React Native & Flutter", "iOS & Android", "Offline-first design"] },
  { icon: Cloud, title: "Custom SaaS Development", desc: "From MVP to full-scale product growth, built for recurring revenue.", features: ["Multi-tenant architecture", "Stripe & billing", "RBAC & SSO"] },
  { icon: Bot, title: "AI Automation & Voice Agents", desc: "AI agents and workflow automation that boost operational efficiency.", features: ["LLM agents", "Chat bots", "CRM automation"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <p className="relative z-10 text-sm uppercase tracking-widest text-primary">Services</p>
        <h1 className="relative z-10 mt-3 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-6xl pb-2">What We Do</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">End-to-end digital solutions that launch, scale, and transform your business.</p>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="grid gap-6 md:grid-cols-2 relative z-10">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-[0_0_40px_-10px_rgba(255,85,0,0.15)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {f}</li>
                ))}
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Discuss your project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-5xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-4xl">Not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Talk to our team — we'll help you scope, plan, and budget your next product.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground">
            Book a Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
