import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Check, Target, Users, Zap, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About : Devora" },
      { name: "description", content: "Devora is a custom software development company building scalable web, mobile, SaaS and AI solutions." },
    ],
  }),
});

const values = [
  { icon: Target, title: "Product-focused engineering", desc: "We build for outcomes, not just features. Every line of code serves the product." },
  { icon: Zap, title: "Reliable delivery", desc: "On-time delivery with no excuses, backed by transparent communication." },
  { icon: Users, title: "Long-term partnerships", desc: "We treat every project like our own, with ownership at every step." },
  { icon: Award, title: "Cross-stack expertise", desc: "SaaS, AI, web, mobile, desktop and game development — all in-house." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pt-20 text-center">
        <p className="text-sm uppercase tracking-widest text-primary">About Us</p>
        <h1 className="mt-3 text-5xl font-bold leading-tight md:text-6xl">
          Building technology that <span className="text-primary">scales globally</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Devora is a custom software development company helping startups and enterprises ship reliable, future-ready products.
        </p>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-12 px-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Team collaborating" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>
          <p className="mt-5 text-muted-foreground">
            Founded by engineers tired of complex, opaque software shops, Devora was built on clarity, ownership, and outcomes. We've grown into a trusted partner for businesses across SaaS, fintech, edtech, automotive, and matrimony.
          </p>
          <p className="mt-4 text-muted-foreground">
            From MVPs to enterprise platforms, we combine deep technical talent with product thinking to deliver software that customers love.
          </p>
          <ul className="mt-6 space-y-2">
            {["Truted", "relaible", "fast delivery"].map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold md:text-5xl">Why teams trust Devora</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary"><v.icon className="h-6 w-6" /></div>
              <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <div className="grid gap-8 rounded-3xl bg-card p-12 md:grid-cols-4">
          {[["50+", "Projects Delivered"], ["30+", "Happy Clients"], ["12+", "Countries Served"], ["6+", "Years of Experience"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-5xl font-black text-primary">{n}</div>
              <p className="mt-2 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
