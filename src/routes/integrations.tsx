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
          "Devora integrates with 42+ leading platforms across payments, AI, communication, analytics, CRM, and more.",
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
    id: "payments",
    name: "Payments & Billing",
    subtitle: "Subscriptions, one-time payments, UPI, wallets, and global payouts.",
    items: [
      { name: "Stripe", logo: cdn("stripe"), desc: "Subscriptions, one-time payments, payouts, and Connect." },
      { name: "Razorpay", logo: cdn("razorpay"), desc: "Indian payment gateway with UPI, cards, netbanking, and subscriptions." },
      { name: "PayPal", logo: cdn("paypal"), desc: "Global checkout and recurring billing across 200+ markets." },
      { name: "Paytm", logo: cdn("paytm"), desc: "Payment gateway, wallet, and UPI for Indian customers." },
      { name: "PhonePe", logo: cdn("phonepe"), desc: "UPI-first payments and merchant collections in India." },
    ],
  },
  {
    id: "communication",
    name: "Communication & Messaging",
    subtitle: "Transactional email, SMS, voice, OTP, and WhatsApp at scale.",
    items: [
      { name: "WhatsApp API", logo: cdn("whatsapp"), desc: "Cloud API for templated messages, support, and commerce flows." },
      { name: "Twilio", logo: cdn("twilio"), desc: "SMS, voice, OTP verification, and WhatsApp Business messaging." },
      { name: "AiSensy", letter: "A", desc: "Official WhatsApp BSP for broadcast, chatbots, and CRM." },
      { name: "Brevo", logo: cdn("brevo"), desc: "Transactional + marketing email, SMS, and automation." },
      { name: "SendGrid", logo: cdn("maildotru"), desc: "High-deliverability transactional email at scale." },
      { name: "Mailgun", logo: cdn("mailgun"), desc: "Email APIs for sending, receiving, and tracking." },
    ],
  },
  {
    id: "ai",
    name: "AI & LLMs",
    subtitle: "Generative AI, voice agents, and intelligent automation.",
    items: [
      { name: "OpenAI", letter: "O", desc: "GPT models for chat, agents, embeddings, and assistants." },
      { name: "Gemini", logo: cdn("googlegemini"), desc: "Google Gemini multimodal models for text, vision, and reasoning." },
      { name: "Vapi", letter: "V", desc: "Real-time voice AI agents for sales and support calls." },
    ],
  },
  {
    id: "engagement",
    name: "Notifications & Engagement",
    subtitle: "Push, in-app, lifecycle messaging, and customer engagement.",
    items: [
      { name: "OneSignal", letter: "O", desc: "Push notifications across web, mobile, and email." },
      { name: "Firebase", logo: cdn("firebase"), desc: "Auth, realtime DB, FCM, Crashlytics, and remote config." },
      { name: "MoEngage", letter: "M", desc: "Cross-channel customer engagement and journey orchestration." },
      { name: "Engage", letter: "E", desc: "Customer marketing automation across email, SMS, and WhatsApp." },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Monitoring",
    subtitle: "Product analytics, error tracking, and behavior insights.",
    items: [
      { name: "Google Analytics", logo: cdn("googleanalytics"), desc: "Web and app analytics with GA4 events and conversions." },
      { name: "Mixpanel", logo: cdn("mixpanel"), desc: "Product analytics, funnels, retention, and cohorts." },
      { name: "Hotjar", logo: cdn("hotjar"), desc: "Heatmaps, session recordings, and user feedback." },
      { name: "Sentry", logo: cdn("sentry"), desc: "Error tracking and performance monitoring across stacks." },
    ],
  },
  {
    id: "crm",
    name: "CRM & Customer Support",
    subtitle: "Sales pipelines, marketing automation, and helpdesk.",
    items: [
      { name: "HubSpot", logo: cdn("hubspot"), desc: "CRM, marketing automation, and sales workflows." },
      { name: "Salesforce", letter: "S", desc: "Enterprise CRM, Service Cloud, and Marketing Cloud." },
      { name: "Zoho", logo: cdn("zoho"), desc: "CRM, mail, books, and end-to-end business automation." },
      { name: "Zendesk", logo: cdn("zendesk"), desc: "Helpdesk, ticketing, and omnichannel support." },
    ],
  },
  {
    id: "infra",
    name: "Cloud & Infrastructure",
    subtitle: "CDN, security, DNS, hosting, and media delivery.",
    items: [
      { name: "Cloudflare", logo: cdn("cloudflare"), desc: "CDN, WAF, DNS, and edge security globally." },
      { name: "Digital Ocean", logo: cdn("digitalocean"), desc: "Droplets, managed databases, and app platform hosting." },
      { name: "Cloudinary", logo: cdn("cloudinary"), desc: "Image and video upload, transformation, and delivery." },
    ],
  },
  {
    id: "maps",
    name: "Maps & Location",
    subtitle: "Geocoding, distance APIs, and interactive maps.",
    items: [
      { name: "Google Maps Platform", logo: cdn("googlemaps"), desc: "Maps, places, geocoding, and distance matrix APIs." },
      { name: "Mapbox", logo: cdn("mapbox", "ffffff"), desc: "Custom maps, navigation, and location SDKs." },
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Fulfillment",
    subtitle: "Shipping orchestration and tracking for ecommerce.",
    items: [
      { name: "Shiprocket", letter: "S", desc: "Multi-courier shipping, tracking, and returns for India." },
    ],
  },
  {
    id: "stores",
    name: "App Distribution",
    subtitle: "Mobile app submission, review, and release pipelines.",
    items: [
      { name: "Apple App Store", logo: cdn("appstore", "ffffff"), desc: "iOS app submission, TestFlight, and App Store Connect." },
      { name: "Google Play Store", logo: cdn("googleplay"), desc: "Android publishing, internal tracks, and Play Console." },
    ],
  },
  {
    id: "automation",
    name: "Automation & Workflows",
    subtitle: "No-code and low-code orchestration across tools.",
    items: [
      { name: "n8n", logo: cdn("n8n", "ffffff"), desc: "Self-hosted workflow automation across 400+ apps." },
      { name: "Make", logo: cdn("make", "ffffff"), desc: "Visual scenario builder for cross-app automation." },
    ],
  },
  {
    id: "scheduling",
    name: "Scheduling & Meetings",
    subtitle: "Calendar booking and video conferencing.",
    items: [
      { name: "Calendly", logo: cdn("calendly"), desc: "Automated meeting scheduling with calendar sync." },
      { name: "Zoom", logo: cdn("zoom"), desc: "Video meetings, webinars, and SDK embeds." },
      { name: "Google Meet", logo: cdn("googlemeet"), desc: "Video conferencing tied into Google Workspace." },
    ],
  },
  {
    id: "cms",
    name: "Headless CMS",
    subtitle: "Structured content APIs for web and apps.",
    items: [
      { name: "Strapi", logo: cdn("strapi"), desc: "Open-source headless CMS with flexible content APIs." },
    ],
  },
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
      className="group flex items-start gap-4 rounded-2xl bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
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
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
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
      <section className="mx-auto mt-6 max-w-7xl px-6">
        <div className="rounded-3xl bg-card/60 px-6 py-20 text-center md:py-28">
          <span className="inline-block rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground/90">
            42+ Integrations
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
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
              href="#payments"
              onClick={(e) => handleSidebarClick(e, "payments")}
              className="rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
            >
              Explore by category
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6">
            {[
              { k: "42+", v: "Platforms integrated" },
              { k: "14", v: "Domains covered" },
              { k: "50+", v: "Production deployments" },
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
      <section id="categories" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-10">

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="sticky top-24 space-y-0.5">
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
                    className="group flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm transition-all duration-200"
                    style={{
                      background: isActive
                        ? "rgba(249, 115, 22, 0.12)"
                        : "transparent",
                      color: isActive
                        ? "#f97316"
                        : "hsl(var(--muted-foreground))",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {/* Active indicator bar */}
                    <span
                      className="h-4 w-0.5 rounded-full transition-all duration-200"
                      style={{
                        background: isActive ? "#f97316" : "transparent",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    {c.name}
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
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold md:text-5xl">
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