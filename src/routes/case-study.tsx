import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/case-study")({
  component: CaseStudyPage,
  head: () => ({
    meta: [
      { title: "Case Studies — Devora" },
      { name: "description", content: "Stories of innovation and growth — explore Devora's case studies across web and mobile applications." },
    ],
  }),
});

type Category = "All" | "Web App" | "Mobile App";

interface CaseStudy {
  title: string;
  subtitle: string;
  image: string;
  category: Exclude<Category, "All">;
  slug: string;
}

const studies: CaseStudy[] = [
  { title: "Sov Portal", subtitle: "Edtech Portal For Students & Agents", image: "https://cms.slashifytech.in/uploads/sov_portal_c665c87259_7be99a388d.webp", category: "Web App", slug: "sov-portal" },
  { title: "Wise Talk", subtitle: "Career Guidance Mobile Application", image: "https://cms.slashifytech.in/uploads/wise_talk_9af024187b_96cc461eda.webp", category: "Mobile App", slug: "wise-talk" },
  { title: "Connecting Soulmate", subtitle: "Matrimony Application", image: "https://cms.slashifytech.in/uploads/CS_a23bff7541_be56109500.webp", category: "Web App", slug: "connecting-soulmate" },
  { title: "Brand Monkey", subtitle: "Employee Management System", image: "https://cms.slashifytech.in/uploads/BM_Banner_968928d689.png", category: "Web App", slug: "brand-monkey" },
  { title: "Connecting Soulmate", subtitle: "Matrimony Mobile Application", image: "https://cms.slashifytech.in/uploads/CS_Mob_2859d898d7_425e6496b4.webp", category: "Mobile App", slug: "connecting-soulmate-mobile" },
  { title: "MG Portal", subtitle: "Raam Group", image: "https://cms.slashifytech.in/uploads/MG_d0da169860_969f23e0a8.webp", category: "Web App", slug: "mg-portal" },
  { title: "360 Car Protect", subtitle: "Automotive & Warranty Management", image: "https://cms.slashifytech.in/uploads/360_2ed4e74e2a_a2b6bf46bf.webp", category: "Web App", slug: "360-car-protect" },
  { title: "Online Filing India", subtitle: "Legal, Compliance & Business Services", image: "https://cms.slashifytech.in/uploads/online_filing_d1135c8254_43b90bb663.jpg", category: "Web App", slug: "online-filing-india" },
  { title: "IDSSPL", subtitle: "Financial Technology & Reconciliation Systems", image: "https://cms.slashifytech.in/uploads/IDSSPL_Card_Banner_4856563ee0.png", category: "Web App", slug: "idsspl-fintech" },
  { title: "Memoria", subtitle: "Social Memory App", image: "https://cms.slashifytech.in/uploads/Memoria_Card_Banner_087ecc87ab.png", category: "Mobile App", slug: "memoria-app" },
  { title: "Qrynto", subtitle: "Anti-Counterfeiting SaaS Platform", image: "https://cms.slashifytech.in/uploads/Qrynto_Banner_7ee07f5b89.png", category: "Web App", slug: "qrynto" },
  { title: "Cricket Or Nothing", subtitle: "Real-Time Cricket Platform", image: "https://cms.slashifytech.in/uploads/CON_Banner_40e7c8bd75.jpg", category: "Web App", slug: "cricket-or-nothing" },
  { title: "Shivorix Real Estate", subtitle: "Luxury Property Advisory", image: "https://cms.slashifytech.in/uploads/Shivorix_RE_banner_b39bbaf736.png", category: "Web App", slug: "shivorix-real-estate" },
];

function CaseStudyPage() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? studies : studies.filter((s) => s.category === filter);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 text-center">
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Stories of Innovation &<br />Growth
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Each project is a story of collaboration, problem-solving, and success.
        </p>

        <div className="mt-10 inline-flex rounded-full bg-card p-1.5">
          {(["All", "Web App", "Mobile App"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                filter === c ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article key={s.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
              <div className="overflow-hidden rounded-xl bg-background">
                <img src={s.image} alt={s.title} loading="lazy" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">
                {s.title} <span className="font-normal text-muted-foreground">{s.subtitle}</span>
              </h3>
              <a href="#" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                Read Case Study <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
