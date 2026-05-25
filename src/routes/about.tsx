import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Star,
  Zap,
  Target,
  Flag,
  Globe,
  Package,
  Users,
  Building2,
  Linkedin,
} from "lucide-react";
import nayanImg from "@/assets/nayan.png";
import kartikImg from "@/assets/kartik.png";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About : Devora — Your Global Tech Partner" },
      {
        name: "description",
        content:
          "Devora is a custom software development company building scalable web, mobile, SaaS and AI solutions for startups and enterprises worldwide.",
      },
      { property: "og:title", content: "About : Devora" },
      {
        property: "og:description",
        content:
          "Meet the minds behind Devora — engineers and strategists turning complex ideas into reliable, scalable digital products.",
      },
    ],
  }),
});

const stats = [
  { icon: Package, value: "20+", label: "Products Delivered" },
  { icon: Users, value: "3+", label: "Years of Experience" },
  { icon: Building2, value: "15+", label: "Industries Served" },
  { icon: Globe, value: "Global", label: "Delivery" },
  { icon: Star, value: "98%", label: "Retention Rate" },
];

const industries = [
  "Edtech", "Real Estate", "Startup", "SaaS", "E-commerce", "MVP",
  "EMS", "CRM", "B2B Portal", "Automobile", "Career", "Consulting",
  "Fin-tech", "Automation", "IOT Platforms", "Social Media",
];

const whyChoose = [
  { icon: TrendingUp, text: "We are not just developers — we are long-term product partners. As a custom web and mobile development studio with deep expertise in SaaS and AI, we help businesses build secure and scalable products across industries." },
  { icon: TrendingUp, text: "Real experience building multi-industry solutions" },
  { icon: Star, text: "Clear delivery process and full accountability" },
  { icon: Zap, text: "Trusted communication across global time zones" },
  { icon: Target, text: "Strong focus on performance, security, and scalability" },
  { icon: Flag, text: "Reliable engineering both startups and enterprises can count on" },
];

const different = [
  "Product-first mindset",
  "Strong system architecture & scalability focus",
  "Transparent pricing & clear timelines",
  "Founder-led involvement",
  "Experience across startups & enterprises",
  "Long-term partnership approach",
];

const mission = [
  { icon: TrendingUp, text: "Build scalable, secure, and reliable digital products" },
  { icon: Star, text: "Help businesses grow through technology" },
  { icon: Zap, text: "Deliver clarity, speed, and long-term value" },
  { icon: Target, text: "Simplify complex problems with smart engineering" },
  { icon: Flag, text: "Partner with clients as an extension of their team" },
];

const vision = [
  { icon: TrendingUp, text: "Become a trusted global tech partner" },
  { icon: Star, text: "Empower businesses with future-ready solutions" },
  { icon: Zap, text: "Create products that people love to use" },
  { icon: Target, text: "Enable founders to move from idea to impact faster" },
  { icon: Flag, text: "Set benchmarks for quality, reliability, and execution" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
} as const;

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-20 text-center">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-4xl font-bold leading-tight md:text-6xl"
        >
          Your Global Technology Partner for{" "}
          <span className="text-primary">AI Automation</span> & Custom Software Development
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
        >
          Devora is a trusted web app development agency and custom mobile app development studio
          helping startups and enterprises build reliable digital solutions worldwide. We deliver
          premium mobile app development services businesses rely on, along with scalable web
          development services teams trust for long-term growth.
        </motion.p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            Let's Build Together
          </Link>
          <Link to="/case-study" className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary">
            Why Devora?
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <div className="grid gap-4 rounded-3xl bg-card p-8 sm:grid-cols-2 md:grid-cols-5">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-3 text-2xl font-black text-primary">{s.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm uppercase tracking-widest text-primary">Who We Are</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          A tech partner that turns complex ideas into simple, scalable solutions.
        </h2>

        <h3 className="mt-10 text-lg font-semibold">Industries We Serve</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {industries.map((i) => (
            <span key={i} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm">
              {i}
            </span>
          ))}
        </div>

        <div className="mt-10 space-y-4 text-muted-foreground">
          <p>
            Devora is a product-focused technology company founded by engineers and strategists
            who believe technology should solve real problems — not just look good on the surface.
          </p>
          <p>
            We work as an extended tech team for our clients, helping them go from idea to MVP,
            and from MVP to scale.
          </p>
        </div>
        <Link to="/contact" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
          Book a Discovery Call
        </Link>
      </section>

      {/* WHY CLIENTS CHOOSE */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm uppercase tracking-widest text-primary">Why Choose Us</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Why Clients Choose Devora</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {whyChoose.map((w, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl bg-card p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT MAKES DEVORA DIFFERENT */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm uppercase tracking-widest text-primary">Why Devora</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">What Makes Devora Different</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Strategy, scalability, and execution — all aligned to your business goals.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {different.map((d, i) => (
            <motion.div
              key={d}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="text-3xl font-black text-primary/30">0{i + 1}</div>
              <h3 className="mt-3 text-lg font-semibold">{d}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm uppercase tracking-widest text-primary">Purpose</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Mission & Vision</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          To help businesses worldwide transform ideas into powerful digital products with clarity,
          speed, and trust.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-card p-8">
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <ul className="mt-6 space-y-4">
              {mission.map((m, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <m.icon className="h-5 w-5 shrink-0 text-primary" />
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-card p-8">
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <ul className="mt-6 space-y-4">
              {vision.map((v, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <v.icon className="h-5 w-5 shrink-0 text-primary" />
                  {v.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm uppercase tracking-widest text-primary">Team</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">The Minds Behind Devora</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          The vision, experience, and engineering discipline shaping how we build technology.
        </p>

        {/* Nayan */}
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-3xl bg-card"
          >
            <img src={nayanImg} alt="Nayan Sachani — Co-founder, Devora" className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">Nayan Sachani <span className="text-primary">(Co-founder & Head of Client Experience)</span></h3>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                Nayan Sachani is a product strategist and design-led co-founder whose journey began
                during college, driven by a deep curiosity for how thoughtful interfaces shape
                real business outcomes. He co-founded Devora with a single belief: software should
                feel as good as it performs.
              </p>
              <p>
                As the face of client experience at Devora, Nayan leads UI/UX design, brand
                direction, and end-to-end client management — turning ambiguous briefs into clear
                product roadmaps. His expertise spans interaction design, design systems, user
                research, and conversion-focused interfaces across web apps, mobile apps, SaaS
                platforms, and AI products.
              </p>
              <p>
                Beyond design, Nayan is the trusted voice for every client at Devora — aligning
                expectations, managing delivery cycles, and ensuring every engagement ends in
                measurable value. His strength lies in transforming complex requirements into
                elegant, scalable user experiences that customers genuinely love.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/nayan-sachani-636477316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Linkedin className="h-4 w-4" /> Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Kartik */}
        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="overflow-hidden rounded-3xl bg-card"
            >
              <img src={kartikImg} alt="Kartik Parmar — Co-founder & CTO, Devora" className="h-full w-full object-cover" />
            </motion.div>
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-bold">Kartik Parmar <span className="text-primary">(Co-founder & Chief Technology Officer)</span></h3>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                Kartik Parmar is a backend systems architect and engineering leader with a sharp
                focus on building distributed, fault-tolerant, and high-throughput platforms. With
                deep hands-on expertise in microservice orchestration, API design, event-driven
                architectures, and database engineering, he specializes in translating ambitious
                product visions into production-grade infrastructure that scales.
              </p>
              <p>
                As CTO at Devora, Kartik leads technical strategy, system design, and engineering
                execution across web apps, mobile applications, SaaS platforms, and AI-driven
                solutions. His stack expertise spans Node.js, Python, Go, PostgreSQL, Redis,
                Kafka, Docker, Kubernetes, and cloud-native deployments on AWS and GCP — all
                wired with CI/CD pipelines, observability, and zero-downtime release patterns.
              </p>
              <p>
                He champions clean architecture, domain-driven design, secure-by-default
                engineering, and long-term scalability over short-term shortcuts. From schema
                modeling and query optimization to authentication, payments, and real-time
                pipelines, Kartik builds the technical foundations that quietly power every
                product Devora ships.
              </p>
              <p>
                Beyond code, he partners closely with founders and product teams to shape
                technical roadmaps, optimize developer workflows, and ensure every architectural
                decision compounds into business growth. His strength lies in bringing engineering
                clarity to complex problems and building systems that scale with the company's
                vision.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/parmarkartik385/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Linkedin className="h-4 w-4" /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Your vision deserves the right tech partner.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Let's build something reliable, scalable, and future-ready — together.
        </p>
        <Link to="/contact" className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground">
          Book a Discovery Call
        </Link>
      </section>
    </SiteLayout>
  );
}
