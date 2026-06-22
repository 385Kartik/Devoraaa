import { images, type ImageKey } from "@/assets/images";

export interface CaseStudyDetail {
  slug: string;
  title: string;
  subtitle: string;
  hero: string;
  image: ImageKey | string;
  client: string;
  industry: string;
  platform: string;
  services: string;
  overview: string;
  challenges: string[];
  approach: { title: string; body: string }[];
  results: string[];
  revenue: { before: string; after: string };
  impact: string;
  gallery?: string[];
}

export const caseStudies: CaseStudyDetail[] = [
  {
    slug: "print-it",
    title: "PRINT-IT",
    subtitle: "Campus Printing Platform",
    hero: "A full-stack campus printing platform that completely eliminated the chaos of physical print queues. Students upload PDFs, pay online, and collect their prints.",
    image: "/printit1.0.png",
    gallery: [
      "/printit1.0.png",
      "/printit2.0.png",
      "/printit3.0.png",
      "/printit4.0.png",
      "/printit5.0.png",
      "/printit6.png"
    ],
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
    approach: [
      { title: "Direct Uploads", body: "PDF Uploads directly to Amazon S3 with signed URLs." },
      { title: "Razorpay Payments", body: "UPI, Card, and Net Banking support." },
      { title: "OTP Authentication", body: "Passwordless login via OTP." },
      { title: "AWS EC2 High Availability", body: "Production deployment ensuring platform stays live during peak hours." }
    ],
    results: [
      "Officially adopted by Universal College of Engineering.",
      "Student queue waiting time reduced by 50%+.",
      "Profitable, scalable business model with active users."
    ],
    revenue: { before: "Manual cash operations", after: "Profitable self-sustaining model" },
    impact: "The standard printing solution for the campus, drastically reducing wait times."
  },
  {
    slug: "navrang",
    title: "NAVRANG",
    subtitle: "D2C E-Commerce Brand",
    hero: "A direct-to-consumer brand for Navratri collections. Built everything from product catalog to Razorpay payments.",
    image: "/navrang0.png",
    gallery: ["/navrang1.png", "/navrang2.png", "/navrang3.png", "/navrang4.png", "/navrang5.png"],
    client: "NavRang",
    industry: "E-Commerce",
    platform: "Web Platform",
    services: "Product Design, Web Development, Razorpay Integration",
    overview: "Built NavRang — a direct-to-consumer brand for Navratri. A full-stack D2C eCommerce brand with real sales and profitability.",
    challenges: [
      "Offline Navratri sellers lack digital presence.",
      "Complex checkout systems drop sales."
    ],
    approach: [
      { title: "Product Catalog", body: "Rich media display via AWS S3." },
      { title: "Fast Checkout", body: "OTP-based login for zero friction." }
    ],
    results: [
      "Profitable venture with real sales.",
      "Frictionless checkout experience."
    ],
    revenue: { before: "No digital presence", after: "Real revenue generated during Navratri season." },
    impact: "Enabled offline collections to reach a wider digital audience."
  },
  {
    slug: "wheatflow",
    title: "WHEATFLOW",
    subtitle: "B2B Dashboard for Grain Distribution",
    hero: "A production-grade B2B operations dashboard built for Anaj Sathi handling 2.4M+ records with zero UI lag.",
    image: "/wheatflow1.png",
    gallery: ["/wheatflow1.png", "/wheatflow2.png", "/wheatflow3.png", "/wheatflow4.0.png", "/wheatflow5.png"],
    client: "Anaj Sathi",
    industry: "B2B Logistics",
    platform: "Web Dashboard",
    services: "Full-Stack Dashboard, React Query, Supabase",
    overview: "Built for Anaj Sathi — a grain distribution business. Handles massive data volumes, complex order grouping, driver logistics, automated financial tracking, and full fiscal-year management.",
    challenges: [
      "Managed thousands of daily grain orders across multiple customers manually in spreadsheets.",
      "Needed a dashboard that could handle millions of records without freezing.",
      "Complex grouping and financial automation required."
    ],
    approach: [
      { title: "High-Performance Rendering", body: "Zero UI lag using debouncing, useMemo, and React Query." },
      { title: "Multi-axis Order Grouping", body: "Orders grouped by customer, location, and product simultaneously." },
      { title: "Logistics Module", body: "Full driver assignment and dispatch tracking." },
      { title: "Financial Tracking", body: "Automated pending payment alerts and financial summaries." }
    ],
    results: [
      "Moved entirely off spreadsheets.",
      "Handles 2.4M+ records with zero UI lag.",
      "Automated financial alerts reduced missed payments."
    ],
    revenue: { before: "Manual spreadsheet management", after: "Automated tracking preventing missed payments." },
    impact: "Streamlined daily dispatch operations and complex order grouping."
  },
  {
    slug: "waves-and-wires",
    title: "WAVES & WIRES",
    subtitle: "Custom E-Commerce Platform",
    hero: "Architected a complete e-commerce platform from scratch — production-grade, atomic, and secured for an electric appliance company.",
    image: "/ww1.png",
    client: "Waves & Wires Technologies LLP",
    industry: "E-Commerce",
    platform: "Web Platform",
    services: "Atomic Transactions, CSP Security, Custom Admin Dashboard",
    overview: "A fully custom platform with a customer-facing store and a powerful admin dashboard, deployed with CSP + HSTS security headers and atomic PostgreSQL logic to prevent overselling.",
    challenges: [
      "Zero online presence.",
      "Needed a custom e-commerce platform with real inventory management.",
      "Required automatic refunds and an admin dashboard built for their operations workflow."
    ],
    approach: [
      { title: "Atomic Order Placement", body: "PostgreSQL RPC ensures stock is locked and decremented atomically." },
      { title: "Customer Store", body: "Product catalog with filtering, Razorpay checkout, and OTP login." },
      { title: "Real-time Order Tracking", body: "Live status timeline and automatic refunds on cancellation." },
      { title: "Admin Revenue Dashboard", body: "Recharts-powered analytics for revenue, orders, and low-stock alerts." }
    ],
    results: [
      "Eliminated overselling risk entirely with atomic transactions.",
      "Admin dashboard gave the team real-time revenue and inventory visibility.",
      "Zero unauthorized data access due to strict RLS and OTP auth."
    ],
    revenue: { before: "No online sales channel", after: "Scalable e-commerce store driving new revenue." },
    impact: "Launched a complete online store with a system far beyond what any off-the-shelf solution could offer."
  },
  {
    slug: "gopal-stationery",
    title: "GOPAL STATIONERY",
    subtitle: "Local E-Commerce Platform",
    hero: "Complete e-commerce platform for Gopal Stationery — built from scratch with a full admin dashboard.",
    image: "/gopal1.png",
    gallery: ["/gopal1.png", "/gopal2.png", "/gopal3.png", "/gopal4.png", "/gopal5.png"],
    client: "Gopal Stationery",
    industry: "E-Commerce",
    platform: "Web Platform",
    services: "E-Commerce Workflow, Supabase, Automated Emails",
    overview: "Directly approached to architect their entire e-commerce system from zero. Customer-facing store with advanced checkout flows, and a powerful admin dashboard.",
    challenges: [
      "A local stationery business needed to digitize and scale their sales online efficiently."
    ],
    approach: [
      { title: "Full eCommerce Workflow", body: "Complete cart and checkout experience tailored for local delivery." },
      { title: "Automated Notifications", body: "Nodemailer integration for real-time order updates." }
    ],
    results: [
      "Successfully enabled the local business to scale their sales online."
    ],
    revenue: { before: "Offline local sales only", after: "Expanded reach via digital orders." },
    impact: "Digitized a traditional stationery business into a modern online storefront."
  },
  {
    slug: "college-predictor",
    title: "COLLEGE PREDICTOR",
    subtitle: "MHT-CET Score Mapping Tool",
    hero: "Score-to-college mapping tool that guided 50%+ of Mira Road students through engineering admissions.",
    image: "/cp1.png",
    client: "Get Analyticx",
    industry: "Edtech",
    platform: "Web Tool",
    services: "Frontend Engineering, Algorithm Logic",
    overview: "A web tool that helps engineering aspirants predict their likely college admissions based on MHT-CET scores. Handled complex CAP-round cutoff logic.",
    challenges: [
      "Engineering admissions are highly competitive and confusing.",
      "Students often make poor choices because they don't know realistic cutoff options."
    ],
    approach: [
      { title: "Score-to-College Mapping", body: "Instant mapping based on historical cutoff data." },
      { title: "Category & Branch Filters", body: "Filter by category, branch, and university quota in real time." }
    ],
    results: [
      "Used by over 50% of engineering aspirants in the Mira Road region.",
      "Significantly reduced student anxiety during admissions."
    ],
    revenue: { before: "Manual counseling", after: "Massive scale via a digital tool." },
    impact: "Became the go-to tool for students in the region before admissions."
  },
  {
    slug: "vibetix",
    title: "VIBETIX",
    subtitle: "Dynamic Event Ticketing Platform",
    hero: "Event ticketing platform with dynamic pricing and QR-based check-ins. Won Hackathonix by cutting ticket processing time by 30%.",
    image: "/vibetix1.png",
    gallery: ["/vibetix1.png", "/vibetix2.png", "/vibetix3.png", "/vibetix4.png", "/vibetix5.png"],
    client: "Hackathonix Winner",
    industry: "Events / Ticketing",
    platform: "Web Platform",
    services: "Dynamic Pricing Algorithm, QR Integration",
    overview: "A complete event ticketing system built and delivered within a hackathon. Dynamic pricing based on demand, QR code entry for instant check-ins, and split payment support.",
    challenges: [
      "Event organizers waste massive time on manual ticketing.",
      "Slow entry queues and no real-time data on attendance."
    ],
    approach: [
      { title: "Dynamic Pricing Engine", body: "Prices adjust automatically based on demand and time to event." },
      { title: "QR-Based Check-in", body: "Scan on entry for instant verification without paper lists." },
      { title: "Split Payments", body: "Groups can split ticket costs across multiple payers seamlessly." }
    ],
    results: [
      "Won the Hackathonix competition.",
      "Reduced ticket processing time by 30% vs manual methods."
    ],
    revenue: { before: "Static ticket sales", after: "Maximized revenue via demand-based pricing." },
    impact: "Proved a highly efficient, automated alternative to traditional manual event ticketing."
  }
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const getCaseStudyImage = (c: CaseStudyDetail) => {
  if (typeof c.image === "string" && c.image.startsWith("/")) {
    return c.image;
  }
  return images[c.image as ImageKey];
};
