import fs from 'fs';

const caseStudies = [
  {
    slug: "print-it",
    title: "PRINT-IT",
    subtitle: "Campus Printing Platform",
    category: "Web App",
    short_desc: "Campus printing platform officially adopted by Universal College of Engineering.",
    hero: "A full-stack campus printing platform that completely eliminated the chaos of physical print queues. Students upload PDFs, pay online, and collect their prints.",
    image: "/printit1.0.png",
    client: "Universal College of Engineering",
    industry: "Edtech / Services",
    platform: "Web App",
    services: "Full-Stack Development, AWS Hosting, Payment Integration",
    overview: "Built an end-to-end campus printing platform officially adopted by Universal College of Engineering, Mumbai. Reduced student queue wait time by 50%+.",
    challenges: [
      "Students wasted significant time standing in physical print queues.",
      "No digital printing solution existed on campus.",
      "Cash handling at the counter caused friction."
    ],
    tech_stack: ["React.js", "Node.js", "MongoDB", "AWS S3", "AWS EC2", "Razorpay"],
    results: [
      "Officially adopted by Universal College of Engineering.",
      "Student queue waiting time reduced by 50%+.",
      "Profitable, scalable business model with active users."
    ],
    revenue_before: "Manual cash operations",
    revenue_after: "Profitable self-sustaining model",
    impact: "The standard printing solution for the campus, drastically reducing wait times.",
    live_link: ""
  },
  {
    slug: "navrang",
    title: "NAVRANG",
    subtitle: "D2C E-Commerce Brand",
    category: "E-Commerce",
    short_desc: "A direct-to-consumer brand for Navratri collections.",
    hero: "A direct-to-consumer brand for Navratri collections. Built everything from product catalog to Razorpay payments.",
    image: "/navrang0.png",
    client: "NavRang",
    industry: "E-Commerce",
    platform: "Web Platform",
    services: "Product Design, Web Development, Razorpay Integration",
    overview: "Built NavRang — a direct-to-consumer brand for Navratri. A full-stack D2C eCommerce brand with real sales and profitability.",
    challenges: [
      "Offline Navratri sellers lack digital presence.",
      "Complex checkout systems drop sales."
    ],
    tech_stack: ["Next.js", "Tailwind CSS", "Supabase", "Razorpay"],
    results: [
      "Profitable venture with real sales.",
      "Frictionless checkout experience."
    ],
    revenue_before: "No digital presence",
    revenue_after: "Real revenue generated during Navratri season.",
    impact: "Enabled offline collections to reach a wider digital audience.",
    live_link: ""
  },
  {
    slug: "wheatflow",
    title: "WHEATFLOW",
    subtitle: "B2B Dashboard for Grain Distribution",
    category: "Dashboard",
    short_desc: "A production-grade B2B operations dashboard built for Anaj Sathi handling 2.4M+ records.",
    hero: "A production-grade B2B operations dashboard built for Anaj Sathi handling 2.4M+ records with zero UI lag.",
    image: "/wheatflow1.png",
    client: "Anaj Sathi",
    industry: "B2B Logistics",
    platform: "Web Dashboard",
    services: "Full-Stack Dashboard, React Query, Supabase",
    overview: "Built for Anaj Sathi — a grain distribution business. Handles massive data volumes, complex order grouping, driver logistics, automated financial tracking, and full fiscal-year management.",
    challenges: [
      "2.4 million+ records causing severe database bottlenecking.",
      "Manual accounting lead to errors across multiple distributors."
    ],
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "TanStack Query"],
    results: [
      "Optimized load times to under 200ms despite 2.4M rows.",
      "Saved 15+ hours a week in manual entry."
    ],
    revenue_before: "Manual ledger & slow queries",
    revenue_after: "Fully automated, instant financial tracking",
    impact: "Streamlined grain distribution tracking, resulting in zero calculation errors.",
    live_link: ""
  },
  {
    slug: "dr-doctor",
    title: "DR. DOCTOR",
    subtitle: "SaaS for Healthcare Professionals",
    category: "SaaS App",
    short_desc: "A patient management system for clinics across Mumbai.",
    hero: "A patient queue management and electronic health records system currently adopted by clinics across Mumbai.",
    image: "/drdoctor1.png",
    client: "Multiple Clinics",
    industry: "Healthcare SaaS",
    platform: "Web App",
    services: "System Architecture, Product Development, Deployment",
    overview: "Built a robust SaaS solution to manage clinic patients. Currently processing hundreds of patients daily.",
    challenges: [
      "Paper-based records get lost.",
      "Patients face long wait times at clinics."
    ],
    tech_stack: ["React.js", "Firebase", "Tailwind CSS", "Node.js"],
    results: [
      "Adopted by several prominent clinics.",
      "Reduced wait times and lost records by 90%."
    ],
    revenue_before: "Manual tracking",
    revenue_after: "Digitized records and recurring SaaS revenue",
    impact: "Modernized small clinics, making healthcare access smoother for patients.",
    live_link: ""
  }
];

const escapeStr = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
const escapeArray = (arr) => arr && arr.length > 0 ? `ARRAY[${arr.map(a => escapeStr(a)).join(', ')}]` : 'NULL';

let sql = `INSERT INTO projects (slug, title, subtitle, category, short_desc, hero, image, client, industry, platform, services, overview, challenges, tech_stack, results, revenue_before, revenue_after, impact, live_link) VALUES\n`;

const values = caseStudies.map(p => `(
  ${escapeStr(p.slug)},
  ${escapeStr(p.title)},
  ${escapeStr(p.subtitle)},
  ${escapeStr(p.category)},
  ${escapeStr(p.short_desc)},
  ${escapeStr(p.hero)},
  ${escapeStr(p.image)},
  ${escapeStr(p.client)},
  ${escapeStr(p.industry)},
  ${escapeStr(p.platform)},
  ${escapeStr(p.services)},
  ${escapeStr(p.overview)},
  ${escapeArray(p.challenges)},
  ${escapeArray(p.tech_stack)},
  ${escapeArray(p.results)},
  ${escapeStr(p.revenue_before)},
  ${escapeStr(p.revenue_after)},
  ${escapeStr(p.impact)},
  ${escapeStr(p.live_link)}
)`);

sql += values.join(',\n') + ';';

fs.writeFileSync('seed_projects.sql', sql);
console.log('SQL generated to seed_projects.sql');
