import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import Hyperspeed from "@/components/Hyperspeed";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — devoraaa" },
      { name: "description", content: "Get in touch with devoraaa to discuss your next web, mobile, SaaS or AI project." },
    ],
  }),
});

import { SEO } from "@/components/SEO";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `Project: ${data.project}\nType: ${data.projectType}\n\nDetails:\n${data.message}`
        })
      });
      if (res.ok) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <SEO 
        title="Contact devoraaa | Hire Kartik Parmar's Agency"
        description="Get in touch with devoraaa. Let's discuss your next big project in software development, web, mobile, or AI automation."
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>
      <div className="relative z-10 pb-20">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <p className="relative z-10 text-sm uppercase tracking-widest text-primary">Contact</p>
        <h1 className="relative z-10 mt-3 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 md:text-6xl pb-2">Let's build something great</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Tell us about your project and we'll get back to you within one business day.</p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-2 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="space-y-6 relative z-10">
          {[
            { icon: Phone, label: "Phone", value: "+91 9321633746", href: "tel:+919321633746" },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/919321633746" },
            { icon: Mail, label: "Email", value: "officialdevora1@gmail.com", href: "mailto:officialdevora1@gmail.com" },
            { icon: MapPin, label: "Office", value: "Mumbai, India" },
          ].map((c) => {
            const Wrapper: any = c.href ? "a" : "div";
            const wrapperProps = c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {};
            return (
              <Wrapper key={c.label} {...wrapperProps} className="flex items-start gap-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 transition-colors hover:bg-white/[0.04] hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary"><c.icon className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="mt-1 text-lg font-semibold">{c.value}</p>
                </div>
              </Wrapper>
            );
          })}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
            <p className="text-sm opacity-90">Office hours</p>
            <p className="mt-1 text-lg font-semibold">Mon — Fri · 10:00 – 19:00 IST</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl shadow-2xl p-8 relative z-10"
        >
          {sent ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"><Send className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl font-bold">Thanks for reaching out</h3>
              <p className="mt-2 text-muted-foreground">We'll be in touch within one business day.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="name" label="Your name" placeholder="Jane Doe" />
                <Field name="email" label="Email" type="email" placeholder="jane@company.com" />
              </div>
              <Field name="project" label="Project" placeholder="project name" className="mt-4" />
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Project type</label>
                <select name="projectType" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none">
                  <option>Web App</option><option>Mobile App</option><option>SaaS</option><option>AI Automation</option><option>Other</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Tell us about your project</label>
                <textarea name="message" rows={5} required placeholder="Goals, timeline, budget..." className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
              </div>
              <button disabled={loading} type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50">
                {loading ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </section>
      </div>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", placeholder, className = "" }: { label: string; name?: string; type?: string; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input name={name} required type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
    </div>
  );
}
