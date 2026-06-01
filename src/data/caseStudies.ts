import { images, type ImageKey } from "@/assets/images";

export interface CaseStudyDetail {
  slug: string;
  title: string;
  subtitle: string;
  hero: string;
  image: ImageKey;
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
}

export const caseStudies: CaseStudyDetail[] = [
  {
    slug: "sov-portal",
    title: "SOV Portal",
    subtitle: "Edtech Portal For Students & Agents",
    hero: "Studying abroad is a life-changing journey — we built a platform that manages every step with clarity, speed and precision.",
    image: "sovPortal",
    client: "SOV Portal",
    industry: "Edtech",
    platform: "Web Platform",
    services: "Product Strategy, UI/UX, Web & App Development, Admin Dashboard, QA & Testing",
    overview:
      "The client approached Devora with a vision to create an all-in-one digital platform to simplify the study-abroad process — connecting students, agents, universities and partners under one ecosystem for seamless management of applications, admissions and visa processes.",
    challenges: [
      "No centralized system to manage students, agents and partner universities.",
      "Manual handling of applications, leading to delays and data loss.",
      "Lack of visibility and coordination among stakeholders.",
      "Difficulty tracking visa lodgements, offer letters and student progress.",
      "No digital platform to explore universities and programs across countries.",
      "Inability to scale operations without automation and reporting tools.",
    ],
    approach: [
      { title: "Role-Based Access System", body: "Dedicated dashboards for Students, Agents, Super Admins, Employees and Partner Admins." },
      { title: "Offer Letter & Visa Management", body: "Apply, upload documents and track status in real time." },
      { title: "Global Database Integration", body: "5,000+ colleges across 35+ countries with advanced filters." },
      { title: "IELTS, Flight & Tourist Visa Modules", body: "A one-stop solution for global education services." },
      { title: "Automated Notifications", body: "Real-time status updates throughout the journey." },
      { title: "Modern & Scalable Architecture", body: "High performance, secure data handling, responsive UI." },
    ],
    results: [
      "400% improvement in operational efficiency with automated workflows.",
      "70% reduction in manual processing time for applications and visa tracking.",
      "85% higher engagement among agents and partner institutions.",
      "Thousands of student profiles onboarded within the first months.",
      "Real-time collaboration between agents and universities.",
    ],
    revenue: {
      before: "Client operated manually with limited capacity to monetize processes.",
      after: "Digital operations, premium agent access and partner collaborations led to a 3x revenue increase within six months.",
    },
    impact:
      "SOV Portal revolutionized the study-abroad process — a connected, transparent and scalable ecosystem now powering thousands of student journeys across 35+ countries.",
  },
  {
    slug: "wise-talk",
    title: "Wise Talk",
    subtitle: "Career Guidance Mobile Application",
    hero: "An AI-assisted career mentor in your pocket — pairing students with the right counsellors at the right moment.",
    image: "wiseTalk",
    client: "Wise Talk",
    industry: "Edtech / Career",
    platform: "iOS & Android",
    services: "Mobile App Development, UX, Real-time Chat, Payments",
    overview:
      "Wise Talk needed a mobile-first platform to connect career aspirants with verified mentors through chat, calls and scheduled sessions.",
    challenges: [
      "Fragmented mentor discovery and trust signals.",
      "No reliable real-time chat or call infrastructure.",
      "Manual scheduling and payment reconciliation.",
      "Low retention without personalized recommendations.",
    ],
    approach: [
      { title: "Verified Mentor Marketplace", body: "Profile verification, ratings and category filtering." },
      { title: "Realtime Chat & Calls", body: "Low-latency messaging and voice with session billing." },
      { title: "Smart Scheduling", body: "Calendar sync, time-zone aware bookings and reminders." },
      { title: "Wallet & Payouts", body: "Integrated wallet, secure payments and automated payouts." },
    ],
    results: [
      "60% faster mentor-to-student matching.",
      "3x increase in session bookings within 4 months.",
      "Sub-second chat latency across regions.",
    ],
    revenue: {
      before: "Manual bookings with limited monetization options.",
      after: "Recurring subscriptions and per-minute billing unlocked 2.5x revenue growth.",
    },
    impact: "Wise Talk became the go-to career-guidance app for thousands of students seeking trusted mentorship.",
  },
  {
    slug: "connecting-soulmate",
    title: "Connecting Soulmate",
    subtitle: "Matrimony Web Application",
    hero: "A modern matrimony platform that combines privacy, trust and meaningful matchmaking.",
    image: "csWeb",
    client: "Connecting Soulmate",
    industry: "Matrimony / Social",
    platform: "Web Platform",
    services: "Product Design, Web Development, Matchmaking Engine, Admin Panel",
    overview:
      "We re-imagined the matrimony experience with a privacy-first profile system, intelligent match suggestions and a powerful admin dashboard.",
    challenges: [
      "Profile spam and unverified users on legacy systems.",
      "Limited match accuracy with rule-based filters.",
      "Poor mobile experience leading to drop-offs.",
    ],
    approach: [
      { title: "Verified Profiles", body: "KYC-based verification, photo privacy and report flows." },
      { title: "Smart Matching", body: "Preference + behavior weighted recommendations." },
      { title: "Premium Plans", body: "Tiered membership with priority messaging and visibility." },
    ],
    results: [
      "5x increase in verified profiles within 90 days.",
      "40% lift in successful match conversations.",
      "Drop-off reduced by 35% on mobile flows.",
    ],
    revenue: {
      before: "Flat one-time membership with limited upsell.",
      after: "Tiered subscriptions and boosts grew ARPU by 2.2x.",
    },
    impact: "A trusted matchmaking platform that successfully connects families across communities.",
  },
  {
    slug: "brand-monkey",
    title: "Brand Monkey",
    subtitle: "Employee Management System",
    hero: "An end-to-end EMS that brings attendance, payroll and performance into one delightful dashboard.",
    image: "brandMonkey",
    client: "Brand Monkey",
    industry: "Marketing Agency",
    platform: "Web Platform",
    services: "Custom EMS, Payroll, Attendance, Reporting",
    overview:
      "Brand Monkey needed a single source of truth for HR, attendance and payroll — replacing spreadsheets with a modern web app.",
    challenges: [
      "Disconnected tools for attendance, leaves and payroll.",
      "Manual salary computations causing errors.",
      "No central visibility into team performance.",
    ],
    approach: [
      { title: "Unified Dashboard", body: "Attendance, leaves, payroll and performance in one view." },
      { title: "Automated Payroll", body: "Salary, tax and reimbursement calculations on autopilot." },
      { title: "Role-based Access", body: "Granular permissions for HR, managers and employees." },
    ],
    results: [
      "90% reduction in payroll processing time.",
      "Zero salary calculation errors after rollout.",
      "100% adoption across departments in 3 weeks.",
    ],
    revenue: {
      before: "Operations bottlenecked by manual HR work.",
      after: "Reclaimed bandwidth enabled the team to take on 2x more client projects.",
    },
    impact: "An EMS that pays for itself — saving hours every week and powering a growing agency.",
  },
  {
    slug: "connecting-soulmate-mobile",
    title: "Connecting Soulmate",
    subtitle: "Matrimony Mobile Application",
    hero: "The full matrimony experience — natively crafted for iOS and Android.",
    image: "csMobile",
    client: "Connecting Soulmate",
    industry: "Matrimony / Social",
    platform: "iOS & Android",
    services: "Mobile App, Push Notifications, In-App Purchases",
    overview:
      "We extended the Connecting Soulmate web product to mobile with a native-feeling experience, push-driven engagement and seamless payments.",
    challenges: [
      "Need for parity with web while staying mobile-first.",
      "Engagement loops without being intrusive.",
      "Cross-platform payment compliance.",
    ],
    approach: [
      { title: "Native UX", body: "Smooth gestures, offline support and skeleton states." },
      { title: "Smart Notifications", body: "Personalized nudges that drive meaningful re-engagement." },
      { title: "Compliant Payments", body: "In-app purchases configured for both stores." },
    ],
    results: [
      "4.7★ average rating across stores.",
      "2.5x DAU within first quarter.",
      "30% lower uninstall rate vs industry benchmarks.",
    ],
    revenue: { before: "Web-only revenue with limited reach.", after: "Mobile added 60% incremental subscription revenue." },
    impact: "A polished mobile experience that became the primary surface for users.",
  },
  {
    slug: "mg-portal",
    title: "MG Portal",
    subtitle: "Raam Group — Automobile CRM",
    hero: "A purpose-built CRM that powers showroom operations across an automobile dealer network.",
    image: "mgPortal",
    client: "Raam Group",
    industry: "Automobile",
    platform: "Web Platform",
    services: "Custom CRM, Inventory, Reporting, Integrations",
    overview:
      "MG Portal centralizes leads, inventory and sales operations for a multi-location dealership group.",
    challenges: [
      "Leads scattered across calls, walk-ins and digital channels.",
      "Limited visibility into showroom performance.",
      "Manual stock and test-drive scheduling.",
    ],
    approach: [
      { title: "Unified Lead Inbox", body: "Every inquiry captured, assigned and tracked to closure." },
      { title: "Inventory & Test Drives", body: "Realtime stock, bookings and scheduling." },
      { title: "Sales Analytics", body: "Showroom, team and model-level dashboards." },
    ],
    results: [
      "35% faster lead response time.",
      "20% lift in test-drive to booking conversions.",
      "Single dashboard adopted across all dealerships.",
    ],
    revenue: { before: "Missed leads and slow follow-ups.", after: "Higher conversion drove a measurable lift in monthly bookings." },
    impact: "A modern CRM tailored to the rhythm of automobile retail.",
  },
  {
    slug: "360-car-protect",
    title: "360 Car Protect",
    subtitle: "Automotive Warranty Management",
    hero: "A digital backbone for vehicle warranty, claims and service tracking.",
    image: "car360",
    client: "360 Car Protect",
    industry: "Automobile",
    platform: "Web Platform",
    services: "Warranty Platform, Claims, Partner Network",
    overview:
      "We built a platform that digitizes the full lifecycle of automotive warranty — from policy issuance to claim settlement.",
    challenges: [
      "Paper-based policies and claim documents.",
      "Slow claim approvals across partner garages.",
      "No real-time view of policy or claim status.",
    ],
    approach: [
      { title: "Digital Policies", body: "Issue, renew and manage policies online." },
      { title: "Claim Workflow", body: "Document upload, multi-step approvals and audit trail." },
      { title: "Partner Garage Portal", body: "Streamlined intake and settlement for partner workshops." },
    ],
    results: [
      "70% faster claim turnaround.",
      "100% digital policy issuance.",
      "Significant reduction in disputes due to clear audit trails.",
    ],
    revenue: { before: "Manual ops capping policy volume.", after: "Digital workflows enabled 3x policy volume without team growth." },
    impact: "An industry-grade warranty platform that builds trust with customers and partners.",
  },
  {
    slug: "online-filing-india",
    title: "Online Filing India",
    subtitle: "Legal, Compliance & Business Services",
    hero: "Legal and compliance services made simple — incorporation, tax filing and more, end-to-end online.",
    image: "onlineFiling",
    client: "Online Filing India",
    industry: "Legal / Compliance",
    platform: "Web Platform",
    services: "Service Marketplace, Document Workflow, Payments",
    overview:
      "A digital storefront for compliance services with guided document flows and transparent pricing.",
    challenges: [
      "Complex services that confused first-time buyers.",
      "Document collection sprawled across email and WhatsApp.",
      "No clear status visibility after purchase.",
    ],
    approach: [
      { title: "Guided Buying", body: "Plain-language flows that match service to need." },
      { title: "Document Vault", body: "Secure uploads, checklists and version history." },
      { title: "Status Tracking", body: "Live progress for every filing." },
    ],
    results: [
      "2x conversion uplift on service pages.",
      "Support tickets reduced by 40%.",
      "Repeat purchases up significantly QoQ.",
    ],
    revenue: { before: "High drop-off due to manual processes.", after: "Streamlined flows drove sustained revenue growth." },
    impact: "Made compliance approachable for thousands of small businesses.",
  },
  {
    slug: "idsspl-fintech",
    title: "IDSSPL",
    subtitle: "Financial Technology & Reconciliation",
    hero: "Reconciliation, reporting and financial workflows built for scale and accuracy.",
    image: "idsspl",
    client: "IDSSPL",
    industry: "Fin-tech",
    platform: "Web Platform",
    services: "Reconciliation Engine, Reporting, Integrations",
    overview:
      "A robust fintech platform handling high-volume reconciliation with audit-ready reporting.",
    challenges: [
      "Manual reconciliation of millions of transactions.",
      "Error-prone reporting cycles.",
      "Integration with multiple banking partners.",
    ],
    approach: [
      { title: "Rules Engine", body: "Configurable matching rules across data sources." },
      { title: "Audit-Ready Reports", body: "Versioned reports with full traceability." },
      { title: "Bank Integrations", body: "Secure, automated data ingestion." },
    ],
    results: [
      "95% auto-match rate on transactions.",
      "Reporting cycles cut from days to minutes.",
      "Audit prep effort reduced by 80%.",
    ],
    revenue: { before: "Operations team stretched thin.", after: "Automation enabled scaling without proportional headcount growth." },
    impact: "A reconciliation backbone trusted with mission-critical financial data.",
  },
  {
    slug: "memoria-app",
    title: "Memoria",
    subtitle: "Social Memory App",
    hero: "Capture the moments that matter — a beautiful, private space for shared memories.",
    image: "memoria",
    client: "Memoria",
    industry: "Social",
    platform: "iOS & Android",
    services: "Mobile App, Media Pipeline, Social Graph",
    overview:
      "We crafted Memoria to feel like a warm, private diary shared with the people you love.",
    challenges: [
      "Smooth media uploads on flaky networks.",
      "Privacy-first sharing without complex settings.",
      "Performant feed with rich media.",
    ],
    approach: [
      { title: "Resilient Media Pipeline", body: "Chunked uploads with background retry." },
      { title: "Simple Privacy", body: "Defaults that protect, controls when you want them." },
      { title: "Buttery Feed", body: "Optimized rendering for video and photo memories." },
    ],
    results: [
      "Sub-2s feed load on 3G.",
      "Upload success rate above 99%.",
      "High organic invite rate from delighted users.",
    ],
    revenue: { before: "Pre-launch product idea.", after: "Strong early traction unlocked a follow-on funding round." },
    impact: "A heartfelt app that became a daily ritual for early users.",
  },
  {
    slug: "qrynto",
    title: "Qrynto",
    subtitle: "Anti-Counterfeiting SaaS Platform",
    hero: "QR-powered authenticity at scale — protecting brands and customers from counterfeits.",
    image: "qrynto",
    client: "Qrynto",
    industry: "SaaS / Brand Protection",
    platform: "Web + Mobile",
    services: "SaaS Platform, QR Engine, Brand Dashboards",
    overview:
      "A SaaS platform that generates secure QR codes, validates scans and provides brands with actionable analytics.",
    challenges: [
      "Counterfeit detection at packaging scale.",
      "Realtime scan analytics across geographies.",
      "Brand-specific landing experiences per scan.",
    ],
    approach: [
      { title: "Secure QR Engine", body: "Tamper-evident codes with cryptographic verification." },
      { title: "Brand Studio", body: "Custom post-scan experiences without code." },
      { title: "Realtime Analytics", body: "Geo, device and behavior intelligence per scan." },
    ],
    results: [
      "Millions of codes generated.",
      "Realtime scan dashboards adopted by every brand customer.",
      "Counterfeit incidents detected and resolved within hours.",
    ],
    revenue: { before: "Brands lacked tools to fight counterfeits.", after: "Subscription model scaled with enterprise adoption." },
    impact: "A SaaS used by leading brands to protect revenue and customer trust.",
  },
  {
    slug: "cricket-or-nothing",
    title: "Cricket Or Nothing",
    subtitle: "Real-Time Cricket Platform",
    hero: "Live scores, deep stats and a fan community — built for people who breathe cricket.",
    image: "cricketOrNothing",
    client: "Cricket Or Nothing",
    industry: "Sports / Media",
    platform: "Web + Mobile",
    services: "Realtime Platform, Data Pipelines, Community",
    overview:
      "A realtime cricket platform delivering live scores, fantasy stats and a vibrant fan community.",
    challenges: [
      "Sub-second score updates at scale.",
      "Reliable data during peak match traffic.",
      "Engaging community features without toxicity.",
    ],
    approach: [
      { title: "Realtime Pipelines", body: "Low-latency match data fanned out globally." },
      { title: "Scalable Infrastructure", body: "Auto-scaling for match-day traffic spikes." },
      { title: "Community Tools", body: "Moderation, reactions and topic-based threads." },
    ],
    results: [
      "Handled match-day spikes without downtime.",
      "Sub-second score updates across devices.",
      "Active daily community of cricket fans.",
    ],
    revenue: { before: "Project from scratch.", after: "Sponsorships and premium features built a durable revenue base." },
    impact: "A fan-first cricket destination that performs at the speed of the game.",
  },
  {
    slug: "shivorix-real-estate",
    title: "Shivorix Real Estate",
    subtitle: "Luxury Property Advisory",
    hero: "An immersive digital presence for a premium real-estate advisory.",
    image: "shivorix",
    client: "Shivorix",
    industry: "Real Estate",
    platform: "Web Platform",
    services: "Brand Site, Listings, Lead Capture, CMS",
    overview:
      "We built a polished web experience that mirrors the brand's premium positioning, with rich listings and lead-capture optimized for high-intent buyers.",
    challenges: [
      "Outdated presence that didn't reflect brand prestige.",
      "Listings hard to discover and filter.",
      "Leaky lead capture flows.",
    ],
    approach: [
      { title: "Editorial Design", body: "Confident typography, cinematic imagery and refined motion." },
      { title: "Smart Listings", body: "Powerful filtering, map view and curated collections." },
      { title: "High-Intent Lead Flows", body: "Friction-free inquiry forms with CRM sync." },
    ],
    results: [
      "Lead volume up 3x in the first quarter post-launch.",
      "Average session duration nearly doubled.",
      "Premium brand perception reflected in inbound enquiries.",
    ],
    revenue: { before: "Reliant on offline networks.", after: "Digital channel became a meaningful revenue contributor." },
    impact: "A digital home that matches the prestige of the properties it represents.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const getCaseStudyImage = (c: CaseStudyDetail) => images[c.image];
