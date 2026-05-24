import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Devora — Custom Software Development for Web, Mobile, SaaS & AI" },
      { name: "description", content: "Devora delivers scalable web, mobile, SaaS and AI automation solutions for startups and enterprises worldwide." },
    ],
  }),
});

const services = [
  { icon: Code, title: "Web App Development", desc: "Modern web app solutions built for speed, scalability, and long-term performance." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Secure enterprise-grade mobile apps with scalable architecture and seamless UX." },
  { icon: Cloud, title: "Custom SaaS Development", desc: "From MVP launch to full-scale product growth with recurring revenue in mind." },
  { icon: Bot, title: "AI Automation & Voice Agents", desc: "AI agents and automation that reduce manual work and boost operational efficiency." },
  { icon: Gamepad2, title: "Game Development", desc: "Immersive game development with smooth performance and engaging gameplay." },
  { icon: Monitor, title: "Desktop App Development", desc: "Reliable desktop apps for productivity tools, dashboards, and enterprise systems." },
];

const projects = [
  { title: "Sov Portal", sub: "Edtech Portal For Students & Agents", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/sov_portal_c665c87259_7be99a388d.webp" },
  { title: "Wise Talk", sub: "Career Guidance Application", tag: "Mobile Application", img: "https://cms.slashifytech.in/uploads/wise_talk_9af024187b_96cc461eda.webp" },
  { title: "Connecting Soulmate", sub: "Matrimony Application", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/CS_a23bff7541_be56109500.webp" },
  { title: "Brand Monkey", sub: "Employee Management System", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/BM_Banner_968928d689.png" },
  { title: "Qrynto", sub: "Anti-Counterfeiting Platform", tag: "SaaS", img: "https://cms.slashifytech.in/uploads/Qrynto_Banner_7ee07f5b89.png" },
  { title: "360 Car Protect", sub: "Automotive & Warranty Management", tag: "Web Application", img: "https://cms.slashifytech.in/uploads/360_2ed4e74e2a_a2b6bf46bf.webp" },
];

const process = [
  "Discovery & Consultation",
  "Planning & Roadmap",
  "Design & Prototyping",
  "Development",
  "QA Testing & Launch",
  "Growth & Support",
];

const testimonials = [
  { name: "Jaskirat", company: "BrandMonkey", text: "Loved working with the team. Young, charismatic, and highly skilled. Would highly recommend Devora." },
  { name: "Karishma Punwani", company: "Connecting Soulmate", text: "An amazing team of hardworking talent. Worked on multiple projects, all delivered on time." },
  { name: "Bharathi", company: "Buzzing Bee", text: "Devora did wonderful work creating my website. Patient, thoughtful, and attention to detail." },
];

const clients = [
  "BRAND MONKEY", "SOV PORTAL", "RAAM GROUP", "EPIC", "EON", "CRICKET", "BUZZ BEE", "PIXEL",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Animated background rings */}
        <motion.div
          style={{ scale: glowScale }}
          className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.5 - i * 0.08, scale: 1 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-primary/10"
              style={{ transform: `scale(${0.4 + i * 0.15})` }}
            />
          ))}
          <div className="absolute inset-1/4 rounded-full bg-primary/10 blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="rounded-3xl border border-border/40 bg-card/40 px-6 py-16 backdrop-blur-sm md:px-12 md:py-24"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              Custom Software Development<br />for Web, Mobile, SaaS &{" "}
              <span className="relative inline-block text-primary">
                AI Automation
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 Q 150 -2 298 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
            >
              Devora delivers scalable web app solutions, high-performing mobile apps, SaaS platforms, and intelligent automation for startups and enterprises worldwide.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
              >
                <span className="relative z-10">Book a Call</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                to="/case-study"
                className="rounded-full border border-border bg-card/60 px-8 py-3.5 text-sm font-medium backdrop-blur hover:border-primary"
              >
                Why Devora?
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CLIENT MARQUEE */}
      <section className="mt-8 overflow-hidden border-y border-border/40 bg-card/30 py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Certified & Recognized
        </p>
        <div className="relative flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 gap-16 pr-16"
          >
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                className="flex h-14 min-w-[140px] items-center justify-center text-lg font-bold tracking-wider text-muted-foreground/60 transition-colors hover:text-primary"
              >
                {c}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">
            Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">
            What We Do
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            End-to-end digital solutions that launch, scale, and transform your business.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-7"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary"
              >
                <s.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Discuss for Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">
            Our Process
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">
            How We Work
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6"
        >
          {process.map((step, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-3xl font-black text-primary/60">0{i + 1}</div>
              <p className="mt-3 text-sm font-medium">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">
            Our Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">
            Real Products We've Built
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card p-5"
            >
              <div className="overflow-hidden rounded-xl">
                <motion.img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="h-56 w-full object-cover"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.sub}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-primary">{p.tag}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link
            to="/case-study"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View all Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold md:text-5xl"
        >
          Loved by teams worldwide
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border/40 bg-card p-7"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-12 text-center text-primary-foreground"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-white/20"
          />
          <h2 className="relative text-3xl font-bold md:text-5xl">
            Your vision deserves the right tech partner.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl opacity-90">
            Let's build something reliable, scalable, and future-ready together.
          </p>
          <Link
            to="/contact"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground transition-transform hover:scale-105"
          >
            Book a Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
