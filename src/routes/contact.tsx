import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Devora" },
      { name: "description", content: "Get in touch with Devora to discuss your next web, mobile, SaaS or AI project." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pt-20 text-center">
        <p className="text-sm uppercase tracking-widest text-primary">Contact</p>
        <h1 className="mt-3 text-5xl font-bold md:text-6xl">Let's build something great</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Tell us about your project and we'll get back to you within one business day.</p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: Phone, label: "Phone", value: "+91 9619410050" },
            { icon: Phone, label: "Phone", value: "+91 9321633746" },
            { icon: Mail, label: "Email", value: "hello@devora.com" },
            { icon: MapPin, label: "Office", value: "Bengaluru, India" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-2xl bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary"><c.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-lg font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
            <p className="text-sm opacity-90">Office hours</p>
            <p className="mt-1 text-lg font-semibold">Mon — Fri · 10:00 – 19:00 IST</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl bg-card p-8"
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
                <Field label="Your name" placeholder="Jane Doe" />
                <Field label="Email" type="email" placeholder="jane@company.com" />
              </div>
              <Field label="Company" placeholder="Acme Inc." className="mt-4" />
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Project type</label>
                <select className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none">
                  <option>Web App</option><option>Mobile App</option><option>SaaS</option><option>AI Automation</option><option>Other</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Tell us about your project</label>
                <textarea rows={5} required placeholder="Goals, timeline, budget..." className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
              </div>
              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                Send message <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", placeholder, className = "" }: { label: string; type?: string; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input required type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
    </div>
  );
}
