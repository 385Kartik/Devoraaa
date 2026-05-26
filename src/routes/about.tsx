import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useCallback } from "react";
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
import { images } from "@/assets/images";
const nayanImg = images.nayan;
const kartikImg = images.kartik;

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

// ─── DifferentFlow — same zigzag diamond animation as ProcessFlow in index.tsx ─
function DifferentFlow() {
  // SVG viewport dimensions
  const VBW = 1200;
  const VBH = 360;

  // Diamond centre points — alternating up/down (same layout as ProcessFlow)
  const pts: { x: number; y: number }[] = [
    { x: 100,  y: 112 },  // 01 — up
    { x: 300,  y: 298 },  // 02 — down
    { x: 500,  y: 112 },  // 03 — up
    { x: 700,  y: 298 },  // 04 — down
    { x: 900,  y: 112 },  // 05 — up
    { x: 1100, y: 298 },  // 06 — down
  ];

  // Smooth cubic-bezier path through the alternating points
  let pathD = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const mx = (p.x + c.x) / 2;
    pathD += ` C ${mx} ${p.y} ${mx} ${c.y} ${c.x} ${c.y}`;
  }

  const CONTAINER_H = 437;

  return (
    <div className="mt-16">

      {/* ── DESKTOP ── */}
      <div className="hidden md:block relative" style={{ height: CONTAINER_H }}>

        {/* SVG path overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Ghost track — faint full route always visible */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={3}
            strokeDasharray="10 8"
            className="text-primary"
          />

          {/* Animated primary path — draws on scroll entry */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeDasharray="10 8"
            strokeLinecap="round"
            className="text-primary"
            style={{ strokeOpacity: 0.55 }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Glowing pulse dot that travels the path */}
          <motion.circle
            r={5}
            fill="currentColor"
            className="text-primary"
            fillOpacity={0.9}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              offsetPath: `path("${pathD}")`,
            } as React.CSSProperties}
          />
        </svg>

        {/* Diamond nodes */}
        {different.map((step, i) => {
          const pt   = pts[i];
          const isUp = i % 2 === 0;

          const leftPct = (pt.x / VBW) * 100;
          const topPct  = (pt.y / VBH) * 100;

          return (
            // Scroll-entry animation
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.18 + 0.5, type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "absolute",
                left:      `${leftPct}%`,
                top:       `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/*
               * Hover hub — broadcasts "rest" / "hovered" to children.
               * Diamond (rotate 45°) → Square (rotate 0°) on hover.
               */}
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hovered"
                style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {/* Label — nudges & scales on hover */}
                <motion.div
                  variants={{
                    rest:    { scale: 1,    opacity: 0.75, y: 0 },
                    hovered: { scale: 1.22, opacity: 1,    y: isUp ? -6 : 6 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    position:        "absolute",
                    left:            "50%",
                    transform:       "translateX(-50%)",
                    width:           "10rem",
                    textAlign:       "center",
                    transformOrigin: isUp ? "bottom center" : "top center",
                    ...(isUp
                      ? { bottom: "calc(100% + 16px)" }
                      : { top:    "calc(100% + 16px)" }),
                  }}
                  className="text-[14px] font-semibold leading-tight text-foreground tracking-wide pointer-events-none"
                >
                  {step}
                </motion.div>

                {/* Glow aura — blooms on hover */}
                <motion.div
                  variants={{
                    rest:    { opacity: 0, scale: 0.7 },
                    hovered: { opacity: 1, scale: 1.7 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 rounded-sm bg-primary/20 blur-xl pointer-events-none"
                />

                {/* Diamond body: rotate 45° → 0° on hover */}
                <motion.div
                  variants={{
                    rest:    { rotate: 45, scale: 1,    borderColor: "hsl(var(--primary) / 0.62)" },
                    hovered: { rotate: 0,  scale: 1.12, borderColor: "hsl(var(--primary) / 1.00)" },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="relative z-10 h-[62px] w-[62px] rounded-[4px] border-2 bg-card shadow-xl shadow-primary/15 flex items-center justify-center cursor-default"
                >
                  {/* Number — counter-rotates so it always reads upright */}
                  <motion.span
                    variants={{
                      rest:    { rotate: -45, scale: 1    },
                      hovered: { rotate: 0,   scale: 1.15 },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="text-[16px] font-black text-primary leading-none select-none block"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── MOBILE — curvy dotted SVG path connecting all 6 diamonds ── */}
      <div className="md:hidden mt-10 relative px-6">
        {/*
          SVG viewBox 320 × 518:
          Each row slot = 53px diamond + 40px gap = 93px.
          Diamond centre y per row: 26.5, 119.5, 212.5, 305.5, 398.5, 491.5
          Left diamond x = 26 (even rows), Right diamond x = 294 (odd rows).
          Cubic-bezier control points sit at the midpoint-y of each adjacent pair,
          pulled horizontally to the same side — creates a smooth S-curve.
        */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 518"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* faint ghost track — full route always visible */}
          <path
            d="M 26 26.5 C 26 73 294 73 294 119.5 C 294 166 26 166 26 212.5 C 26 259 294 259 294 305.5 C 294 352 26 352 26 398.5 C 26 445 294 445 294 491.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={2.5}
            strokeDasharray="8 7"
            className="text-primary"
          />

          {/* animated draw-on path */}
          <motion.path
            d="M 26 26.5 C 26 73 294 73 294 119.5 C 294 166 26 166 26 212.5 C 26 259 294 259 294 305.5 C 294 352 26 352 26 398.5 C 26 445 294 445 294 491.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeDasharray="8 7"
            strokeLinecap="round"
            className="text-primary"
            style={{ strokeOpacity: 0.6 }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* glowing pulse dot that travels the path */}
          <motion.circle
            r={4}
            fill="currentColor"
            className="text-primary"
            fillOpacity={0.9}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              offsetPath: `path("M 26 26.5 C 26 73 294 73 294 119.5 C 294 166 26 166 26 212.5 C 26 259 294 259 294 305.5 C 294 352 26 352 26 398.5 C 26 445 294 445 294 491.5")`,
            } as React.CSSProperties}
          />
        </svg>

        <div className="relative flex flex-col gap-10">
          {different.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`relative flex items-center gap-5 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Diamond → Square on hover */}
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hovered"
                  style={{ flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {/* Glow aura */}
                  <motion.div
                    variants={{
                      rest:    { opacity: 0, scale: 0.7 },
                      hovered: { opacity: 1, scale: 1.6 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-[3px] bg-primary/20 blur-lg pointer-events-none"
                  />
                  <motion.div
                    variants={{
                      rest:    { rotate: 45, scale: 1,    borderColor: "hsl(var(--primary) / 0.62)" },
                      hovered: { rotate: 0,  scale: 1.12, borderColor: "hsl(var(--primary) / 1.00)" },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="relative z-10 h-[53px] w-[53px] rounded-[3px] border-2 bg-card shadow-md shadow-primary/10 flex items-center justify-center"
                  >
                    <motion.span
                      variants={{
                        rest:    { rotate: -45, scale: 1    },
                        hovered: { rotate: 0,   scale: 1.12 },
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="text-[13px] font-black text-primary leading-none select-none block"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Label */}
                <p className={`text-[17px] font-semibold leading-snug text-foreground/80 ${isLeft ? "text-left" : "text-right"}`}>
                  {step}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── TiltCard — inline 3-D tilt + comet shimmer, no external import ──────────
function TiltCard({
  children,
  rotateDepth = 17.5,
  translateDepth = 20,
  className = "",
  style,
}: {
  children: React.ReactNode;
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX =  ((y - cy) / cy) * -rotateDepth;
        const rotY =  ((x - cx) / cx) *  rotateDepth;
        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateDepth}px)`;

        // move shimmer highlight to follow cursor
        const shimmer = shimmerRef.current;
        if (shimmer) {
          const px = (x / rect.width)  * 100;
          const py = (y / rect.height) * 100;
          shimmer.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)`;
          shimmer.style.opacity = "1";
        }
      });
    },
    [rotateDepth, translateDepth]
  );

  const onMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    const shimmer = shimmerRef.current;
    if (shimmer) shimmer.style.opacity = "0";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.35s cubic-bezier(0.03,0.98,0.52,0.99)", willChange: "transform", ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* comet shimmer overlay */}
      <div
        ref={shimmerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity 0.25s ease",
        }}
      />
      {children}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 text-center">
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
      <section className="mx-auto mt-20 max-w-[1400px] px-6 md:px-10">
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
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <p className="text-sm uppercase tracking-widest text-primary">Who We Are</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          A tech partner that turns complex ideas into simple, scalable solutions.
        </h2>

        <h3 className="mt-10 text-lg font-semibold">Industries We Serve</h3>
        <div
          className="group/marquee relative mt-4 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max gap-3 animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
            {[...industries, ...industries].map((i, idx) => (
              <span
                key={`${i}-${idx}`}
                className="shrink-0 rounded-full border border-[hsl(24_95%_53%)]/40 bg-card px-5 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-[hsl(24_95%_53%)] hover:bg-[hsl(24_95%_53%)]/10 hover:text-[hsl(24_95%_53%)] hover:shadow-[0_0_20px_-4px_hsl(24_95%_53%/0.6)]"
              >
                {i}
              </span>
            ))}
          </div>
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
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
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

      {/* WHAT MAKES DEVORA DIFFERENT — now with DifferentFlow animation */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <p className="text-sm uppercase tracking-widest text-primary">Why Devora</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">What Makes Devora Different</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Strategy, scalability, and execution — all aligned to your business goals.
        </p>
        <DifferentFlow />
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
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
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
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
          >
            <TiltCard className="relative overflow-hidden rounded-3xl bg-card">
              <img src={nayanImg} alt="Nayan Sachani — Co-founder, Devora" className="h-full w-full object-cover" />
            </TiltCard>
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
            >
              <TiltCard
                className="relative overflow-hidden rounded-3xl bg-card"
                style={{ clipPath: "inset(0 0 20% 0 round 1.5rem)" }}
              >
                <img src={kartikImg} alt="Kartik Parmar — Co-founder & CTO, Devora" className="h-full w-full object-cover object-top" />
              </TiltCard>
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