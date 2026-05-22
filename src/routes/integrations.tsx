import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/integrations")({
  component: IntegrationsPage,
  head: () => ({
    meta: [
      { title: "Integrations — Devora" },
      { name: "description", content: "Devora integrates with 42+ leading platforms across payments, AI, communication, analytics, and CRM." },
    ],
  }),
});

const categories: { name: string; items: { name: string; logo: string }[] }[] = [
  {
    name: "Payments",
    items: [
      { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe" },
      { name: "Razorpay", logo: "https://cdn.simpleicons.org/razorpay" },
      { name: "PayPal", logo: "https://cdn.simpleicons.org/paypal" },
      { name: "Shiprocket", logo: "https://cdn.simpleicons.org/shopify" },
    ],
  },
  {
    name: "AI & Automation",
    items: [
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/ffffff" },
      { name: "Gemini", logo: "https://cdn.simpleicons.org/googlegemini" },
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/ffffff" },
      { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot" },
    ],
  },
  {
    name: "Communication",
    items: [
      { name: "WhatsApp API", logo: "https://cdn.simpleicons.org/whatsapp" },
      { name: "Twilio", logo: "https://cdn.simpleicons.org/twilio" },
      { name: "Zoom", logo: "https://cdn.simpleicons.org/zoom" },
      { name: "Meta", logo: "https://cdn.simpleicons.org/meta" },
    ],
  },
  {
    name: "Cloud & Infra",
    items: [
      { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase" },
      { name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare" },
      { name: "Google Maps", logo: "https://cdn.simpleicons.org/googlemaps" },
      { name: "Strapi", logo: "https://cdn.simpleicons.org/strapi" },
    ],
  },
  {
    name: "Analytics & Monitoring",
    items: [
      { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics" },
      { name: "Sentry", logo: "https://cdn.simpleicons.org/sentry" },
      { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce" },
      { name: "Apple App Store", logo: "https://cdn.simpleicons.org/appstore/ffffff" },
    ],
  },
];

function IntegrationsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pt-20 text-center">
        <p className="text-sm uppercase tracking-widest text-primary">Integrations</p>
        <h1 className="mt-3 text-5xl font-bold md:text-6xl">Plug into the tools you already use</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We integrate with 42+ leading platforms across payments, AI, communication, analytics, CRM, and more.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl space-y-12 px-6 pb-12">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h2 className="text-2xl font-semibold">{cat.name}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cat.items.map((it) => (
                <div key={it.name} className="flex items-center gap-4 rounded-2xl bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <img src={it.logo} alt={it.name} className="h-9 w-9" loading="lazy" />
                  <span className="font-medium">{it.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
