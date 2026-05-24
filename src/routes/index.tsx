import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
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
  { name: "Kirtan karkar", company: "Knish", text: "Loved working with the team. Young, charismatic, and highly skilled. Would highly recommend Devora." },
  { name: "Yogesh Kalathiya", company: "Wheatflow", text: "An amazing team of hardworking talent. Worked on multiple projects, all delivered on time." },
  { name: "Shubh Raval", company: "Shree gopal agency", text: "Devora did wonderful work creating my website. Patient, thoughtful, and attention to detail." },
];

const clients = [
  "KNISH", "WHEATFLOW", "GET TUTORIALS", "VIBETIX", "NAVRANG", "SHREE GOPAL AGENCY", "GET TASK", "COLLEGE PREDICTOR", "SWAPORA", "RND FOODS", "EZTRIP", "PRINT-IT",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── Inline Sparkles Canvas (no external dependency) ────────────────────────
// ─── Drop-in replacement for HeroSparkles ────────────────────────────────────
// Place this anywhere in your file, replacing the old HeroSparkles function.

// ─── HeroSparkles — exact match to video reference ───────────────────────────
// Stars: crisp solid white circles, slow independent random drift, sine twinkle
// No blur. No glow. No corners. No pointed shapes. Just clean round dots.

// ─── HeroSparkles — exact match to video reference ───────────────────────────
// Stars: crisp solid white circles, slow independent random drift, sine twinkle
// No blur. No glow. No corners. No pointed shapes. Just clean round dots.

function HeroSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -999;
    let mouseY = -999;
    let prevMX = mouseX;
    let prevMY = mouseY;

    // ── Types ─────────────────────────────────────────────────────────────────
    type Star = {
      x: number;
      y: number;
      r: number;           // radius in px — 0.5 to 2.5
      // independent drift vector (very slow, like video)
      vx: number;
      vy: number;
      // twinkle
      phase: number;
      twinkleSpeed: number;
      // base brightness (0.35 – 1.0), controls peak opacity
      baseBright: number;
      // occasional flicker — countdown frames
      flickerTimer: number;
      flickerAlpha: number;
    };

    type ShootingStar = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;        // 1 → 0
      decay: number;
      trailLen: number;
      width: number;
    };

    type CursorDot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      r: number;
    };

    // ── State ─────────────────────────────────────────────────────────────────
    let stars: Star[] = [];
    let shooters: ShootingStar[] = [];
    let cursorDots: CursorDot[] = [];
    let frame = 0;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    // ── Spawn helpers ─────────────────────────────────────────────────────────
    // Star count proportional to canvas area — video had ~50 in 940×292
    function starCount() {
      return Math.round((canvas!.width * canvas!.height) / (940 * 292) * 200);
    }

    function spawnStar(existingX?: number, existingY?: number): Star {
      // radius distribution matching video blobs (1–13px area → 0.5–2px radius)
      const r = 0.4 + Math.random() * Math.random() * 2.2; // skew toward small
      return {
        x: existingX ?? Math.random() * canvas!.width,
        y: existingY ?? Math.random() * canvas!.height,
        r,
        // very slow drift — video shows ~0.2–0.4px per frame at 30fps
        // at 60fps we halve it
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.004 + Math.random() * 0.025,
        baseBright: 0.65 + Math.random() * 0.35,
        flickerTimer: 0,
        flickerAlpha: 1,
      };
    }

    function spawnShooter(): ShootingStar {
      // shoots left-to-right diagonally downward
      const angle = Math.PI / 8 + Math.random() * (Math.PI / 5);
      const speed = 9 + Math.random() * 12;
      return {
        x: Math.random() * canvas!.width * 0.6,
        y: Math.random() * canvas!.height * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        trailLen: 60 + Math.random() * 120,
        width: 0.8 + Math.random() * 1.2,
      };
    }

    function spawnCursorDot(x: number, y: number) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 3;
      cursorDots.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6,   // slight upward float
        life: 1,
        decay: 0.03 + Math.random() * 0.035,
        r: 0.6 + Math.random() * 1.8,
      });
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    function init() {
      resize();
      const n = starCount();
      stars = Array.from({ length: n }, () => spawnStar());
    }

    // ── Main draw loop ────────────────────────────────────────────────────────
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // ── 1. Background stars — crisp solid dots ─────────────────────────────
      for (const s of stars) {
        // Drift
        s.x += s.vx;
        s.y += s.vy;

        // Wrap at edges (seamless)
        if (s.x < -5)              s.x = canvas.width + 5;
        if (s.x > canvas.width+5)  s.x = -5;
        if (s.y < -5)              s.y = canvas.height + 5;
        if (s.y > canvas.height+5) s.y = -5;

        // Very occasional random direction nudge (organic feel)
        if (Math.random() < 0.0008) {
          s.vx = (Math.random() - 0.5) * 0.35;
          s.vy = (Math.random() - 0.5) * 0.35;
        }

        // Twinkle — smooth sine wave on opacity
        s.phase += s.twinkleSpeed;
        const sine = 0.5 + 0.5 * Math.sin(s.phase);
        let alpha = s.baseBright * (0.55 + 0.45 * sine);

        // Occasional hard flicker (brief near-off then snap bright)
        if (s.flickerTimer > 0) {
          s.flickerTimer--;
          alpha *= s.flickerAlpha;
        } else if (Math.random() < 0.0005) {
          s.flickerTimer = 3 + Math.floor(Math.random() * 6);
          s.flickerAlpha = Math.random() < 0.5 ? 0.05 : 1.5; // dim or super-bright
        }

        alpha = Math.max(0, Math.min(1, alpha));

        // ── Draw: plain filled circle — NO blur, NO gradient ──────────────
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        // For the slightly larger stars (r > 1.4): add a single 1px white
        // centre pixel for extra crispness — matches the video's "hot core"
        if (s.r > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha * 1.4)})`;
          ctx.fill();
        }
      }

      // ── 2. Shooting stars — thin crisp line, no blur ───────────────────────
      if (frame % 110 === 0 || (frame % 40 === 0 && Math.random() < 0.18)) {
        shooters.push(spawnShooter());
      }

      shooters = shooters.filter(ss => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;
        if (ss.life <= 0) return false;
        if (ss.x > canvas.width + 100 || ss.y > canvas.height + 100) return false;

        const norm = Math.hypot(ss.vx, ss.vy);
        const tailX = ss.x - (ss.vx / norm) * ss.trailLen * ss.life;
        const tailY = ss.y - (ss.vy / norm) * ss.trailLen * ss.life;

        // Simple linear gradient line — crisp, no blur, just fading alpha
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0,   `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(255,255,255,${ss.life * 0.5})`);
        grad.addColorStop(1,   `rgba(255,255,255,${ss.life})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head: one tiny crisp dot (no blur)
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
        ctx.fill();

        return true;
      });

      // ── 3. Cursor sparkle dots — crisp tiny circles ────────────────────────
      const dx = mouseX - prevMX;
      const dy = mouseY - prevMY;
      const spd = Math.hypot(dx, dy);
      if (spd > 2 && mouseX > 0) {
        const n = Math.min(6, Math.floor(spd * 0.52));
        for (let i = 0; i < n; i++) spawnCursorDot(mouseX, mouseY);
      }
      prevMX = mouseX;
      prevMY = mouseY;

      cursorDots = cursorDots.filter(cd => {
        cd.x += cd.vx;
        cd.y += cd.vy;
        cd.vy -= 0.06;    // float upward
        cd.vx *= 0.96;
        cd.life -= cd.decay;
        if (cd.life <= 0) return false;

        // Crisp solid dot — no blur
        ctx.beginPath();
        ctx.arc(cd.x, cd.y, cd.r * cd.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${cd.life * cd.life})`;
        ctx.fill();
        return true;
      });

      animId = requestAnimationFrame(draw);
    }

    // ── Mouse / touch tracking ─────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <>
      {/* Canvas — no CSS blur, just the raw canvas rendering */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      {/* Radial vignette — keeps hero text readable without touching the stars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, var(--background) 100%)",
        }}
      />
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

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

        {/* ── Sparkles + vignette — hero viewport only ── */}
        <HeroSparkles />

        {/* Animated background rings */}
        <motion.div
          style={{ scale: glowScale }}
          className="pointer-events-none absolute left-1/2 top-32 z-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
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

        {/* Hero content — z-10 so it sits above canvas and rings */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 text-center"
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
              Devora delivers scalable web app solutions, high-performing mobile apps, SaaS platforms,
              and intelligent automation for startups and enterprises worldwide.
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
      <section className="mx-auto mt-28 max-w-5xl px-6 pb-28">
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