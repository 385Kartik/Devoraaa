import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, Star } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Globe } from "@/components/Globe";
import { projectsData } from "@/data/projectsData";
import Galaxy from "@/components/Galaxy";
import { Vortex } from "@/components/ui/vortex";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    
    const dbProjects = (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      shortDesc: p.short_desc,
      image: p.image,
      slug: p.slug,
      techStack: p.tech_stack || [],
    }));

    const merged = [...dbProjects, ...projectsData].slice(0, 6);
    return { projects: merged };
  },
  component: HomePage,
  head: () => ({
    meta: [
      { title: "devoraaa — Custom Software Development for Web, Mobile, SaaS & AI" },
      { name: "description", content: "devoraaa delivers scalable web, mobile, SaaS and AI automation solutions for startups and enterprises worldwide." },
    ],
  }),
});

const services = [
  { icon: Code,       title: "Web App Development",        desc: "Modern web app solutions built for speed, scalability, and long-term performance." },
  { icon: Smartphone, title: "Mobile App Development",     desc: "Secure enterprise-grade mobile apps with scalable architecture and seamless UX." },
  { icon: Cloud,      title: "Custom SaaS Development",    desc: "From MVP launch to full-scale product growth with recurring revenue in mind." },
  { icon: Bot,        title: "AI Automation and Chat bots", desc: "AI agents and automation that reduce manual work and boost operational efficiency." },
];

import { images } from "@/assets/images";

const projects = [
  { title: "PRINT-IT",          sub: "print docs from home",          tag: "Web Application",     img: images.sovPortal },
  { title: "Knish",             sub: "Clothing brand",                 tag: "Web Application",     img: images.wiseTalk },
  { title: "Wheatflow",         sub: "wheat business",                 tag: "Database management", img: images.csWeb },
  { title: "Navrang",           sub: "navratri accessories",           tag: "Web Application",     img: images.brandMonkey },
  { title: "Get tutorials",     sub: "tutorials for engineering",      tag: "Web Application",     img: images.qrynto },
  { title: "College predictor", sub: "help to select the college",     tag: "Web Application",     img: images.car360 },
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
  { name: "Kirtan karkar",    company: "Knish",              text: "Loved working with the team. Young, charismatic, and highly skilled. Would highly recommend devoraaa." },
  { name: "Yogesh Kalathiya", company: "Wheatflow",          text: "An amazing team of hardworking talent. Worked on multiple projects, all delivered on time." },
  { name: "Shubh Raval",      company: "Shree gopal agency", text: "devoraaa did wonderful work creating my website. Patient, thoughtful, and attention to detail." },
];

const clients = [
  "KNISH", "WHEATFLOW", "GET TUTORIALS", "VIBETIX", "NAVRANG",
  "SHREE GOPAL AGENCY", "GET TASK", "COLLEGE PREDICTOR", "SWAPORA",
  "RND FOODS", "EZTRIP", "PRINT-IT",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

// ─── HeroSparkles ──────────────────────────────────────────────────────────────
function HeroSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mx = -1000;
    let my = -1000;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; baseAlpha: number };
    let particles: Particle[] = [];
    
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const init = () => {
      resize();
      const count = Math.min(150, Math.round((canvas.width * canvas.height) / 10000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.5 + Math.random() * 1.5,
        baseAlpha: 0.1 + Math.random() * 0.4
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const maxDist = 150;
      const mouseRepelRadius = 150;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Mouse interact: subtle repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouseRepelRadius) {
          const force = (mouseRepelRadius - dist) / mouseRepelRadius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw star/particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();

        // Draw professional constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dpX = p.x - p2.x;
          const dpY = p.y - p2.y;
          const dpDist = Math.sqrt(dpX*dpX + dpY*dpY);
          
          if (dpDist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dpDist/maxDist) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mx = -1000; my = -1000; };

    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}

// ─── GlobeCanvas ─────────────────────────────────────────────────────────────
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    let autoYaw   = 1.2;
    let tiltX     = 0;
    let tiltYExtra= 0;
    let targetTiltX     = 0;
    let targetTiltYExtra= 0;

    const ARC_COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];

    const arcPairs = [
      { from: [28.6,  77.2],   to: [3.1,   101.7],  alt: 0.2 },
      { from: [51.5,  -0.1],   to: [3.1,   101.7],  alt: 0.3 },
      { from: [1.35,  103.8],  to: [35.7,  139.7],  alt: 0.2 },
      { from: [-33.9, 151.2],  to: [22.3,  114.2],  alt: 0.3 },
      { from: [40.7,  -74.0],  to: [51.5,  -0.1],   alt: 0.2 },
      { from: [22.3,  114.2],  to: [51.5,  -0.1],   alt: 0.3 },
      { from: [34.0,  -118.2], to: [48.9,  2.4],    alt: 0.2 },
      { from: [52.5,  13.4],   to: [34.0,  -118.2], alt: 0.2 },
      { from: [-22.9, -43.2],  to: [28.6,  77.2],   alt: 0.7 },
      { from: [1.35,  103.8],  to: [40.7,  -74.0],  alt: 0.5 },
      { from: [21.3,  -157.9], to: [40.7,  -74.0],  alt: 0.3 },
      { from: [-6.2,  106.8],  to: [51.5,  -0.1],   alt: 0.3 },
      { from: [11.99, 8.57],   to: [35.7,  139.7],  alt: 0.3 },
      { from: [41.9,  12.5],   to: [34.0,  -118.2], alt: 0.2 },
    ] as { from: [number,number]; to: [number,number]; alt: number }[];

    type GlobeDot = { lat: number; lng: number; r: number };
    const dots: GlobeDot[] = [];
    for (let lat = -80; lat <= 80; lat += 5) {
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const lngCount = Math.max(6, Math.round(72 * cosLat));
      for (let i = 0; i < lngCount; i++) {
        if (Math.random() > 0.26) {
          dots.push({ lat, lng: -180 + (360/lngCount)*i, r: 0.55 + Math.random()*0.9 });
        }
      }
    }

    const arcStates = arcPairs.map((_, i) => ({
      progress: (i / arcPairs.length) * 1.2 - 0.15,
      speed:    0.004 + Math.random() * 0.003,
      color:    ARC_COLORS[i % ARC_COLORS.length],
    }));

    type V3 = { x: number; y: number; z: number };

    const toVec3 = (lat: number, lng: number): V3 => {
      const phi   = ((90 - lat) * Math.PI) / 180;
      const theta = (lng * Math.PI) / 180;
      return { x: Math.sin(phi)*Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi)*Math.sin(theta) };
    };

    const rotX = (v: V3, a: number): V3 => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: v.x, y: v.y*c - v.z*s, z: v.y*s + v.z*c };
    };

    const rotY = (v: V3, a: number): V3 => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: v.x*c + v.z*s, y: v.y, z: -v.x*s + v.z*c };
    };

    const applyRot = (v: V3): V3 => rotY(rotX(v, tiltX), autoYaw + tiltYExtra);

    const slerp = (a: V3, b: V3, t: number): V3 => {
      let d = a.x*b.x + a.y*b.y + a.z*b.z;
      d = Math.min(1, Math.max(-1, d));
      const theta = Math.acos(d);
      if (theta < 1e-4) return { ...a };
      const st = Math.sin(theta);
      const s1 = Math.sin((1-t)*theta)/st, s2 = Math.sin(t*theta)/st;
      return { x: s1*a.x+s2*b.x, y: s1*a.y+s2*b.y, z: s1*a.z+s2*b.z };
    };

    const resize = () => { canvas!.width = canvas!.offsetWidth; canvas!.height = canvas!.offsetHeight; };

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const r  = Math.min(cx, cy) * 0.78;

      const LERP = 0.045;
      tiltX      += (targetTiltX      - tiltX)      * LERP;
      tiltYExtra += (targetTiltYExtra - tiltYExtra)  * LERP;

      autoYaw += 0.003;

      const atmo = ctx.createRadialGradient(cx, cy, r*0.86, cx, cy, r*1.25);
      atmo.addColorStop(0,   "rgba(56,189,248,0.14)");
      atmo.addColorStop(0.55,"rgba(56,189,248,0.04)");
      atmo.addColorStop(1,   "rgba(56,189,248,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r*1.25, 0, Math.PI*2); ctx.fillStyle = atmo; ctx.fill();

      const rim = ctx.createRadialGradient(cx, cy, r*0.98, cx, cy, r*1.08);
      rim.addColorStop(0, "rgba(255,255,255,0.06)");
      rim.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r*1.08, 0, Math.PI*2); ctx.fillStyle = rim; ctx.fill();

      const body = ctx.createRadialGradient(cx - r*0.22, cy - r*0.22, 0, cx, cy, r);
      body.addColorStop(0,   "#0e2f82");
      body.addColorStop(0.5, "#062056");
      body.addColorStop(1,   "#020c2a");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = body; ctx.fill();

      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r - 0.5, 0, Math.PI*2); ctx.clip();
      for (const d of dots) {
        const v = applyRot(toVec3(d.lat, d.lng));
        if (v.z <= 0) continue;
        const alpha = Math.min(0.7, 0.15 + v.z*0.6);
        ctx.beginPath();
        ctx.arc(cx + v.x*r, cy - v.y*r, d.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      ctx.restore();

      for (let i = 0; i < arcPairs.length; i++) {
        const { from, to, alt } = arcPairs[i];
        const state = arcStates[i];
        state.progress += state.speed;
        if (state.progress > 1.45) state.progress = -0.2;

        const head = Math.min(1, Math.max(0, state.progress));
        const tail = Math.max(0, head - 0.32);
        if (head <= 0.005 || tail >= 1) continue;

        const v1 = toVec3(from[0], from[1]);
        const v2 = toVec3(to[0],   to[1]);
        const SEGS = 60;

        ctx.beginPath();
        let penDown = false;
        for (let j = 0; j <= SEGS; j++) {
          const t = tail + (head - tail) * (j / SEGS);
          if (t < 0 || t > 1) continue;
          const base  = slerp(v1, v2, t);
          const scale = 1 + alt * Math.sin(t * Math.PI);
          const pt = applyRot({ x: base.x*scale, y: base.y*scale, z: base.z*scale });
          if (pt.z < -0.05) { penDown = false; continue; }
          const px = cx + pt.x*r, py = cy - pt.y*r;
          if (!penDown) { ctx.moveTo(px, py); penDown = true; } else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = state.color; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.78; ctx.stroke(); ctx.globalAlpha = 1;

        const hb = slerp(v1, v2, head);
        const hs = 1 + alt * Math.sin(head * Math.PI);
        const hp = applyRot({ x: hb.x*hs, y: hb.y*hs, z: hb.z*hs });
        if (hp.z > 0) {
          const hx = cx + hp.x*r, hy = cy - hp.y*r;
          const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 9);
          const col = state.color;
          halo.addColorStop(0, col + "80");
          halo.addColorStop(1, col + "00");
          ctx.beginPath(); ctx.arc(hx, hy, 9, 0, Math.PI*2); ctx.fillStyle = halo; ctx.fill();
          ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, Math.PI*2); ctx.fillStyle = "#ffffff"; ctx.globalAlpha = 0.95; ctx.fill(); ctx.globalAlpha = 1;
        }
      }

      const edge = ctx.createRadialGradient(cx, cy, r*0.62, cx, cy, r);
      edge.addColorStop(0, "rgba(2,12,42,0)");
      edge.addColorStop(1, "rgba(2,12,42,0.6)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = edge; ctx.fill();

      const sx = cx - r*(0.3 + tiltYExtra*0.4);
      const sy = cy - r*(0.3 - tiltX*0.5);
      const spec = ctx.createRadialGradient(sx, sy, 0, sx, sy, r*0.55);
      spec.addColorStop(0, "rgba(255,255,255,0.10)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = spec; ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const ny = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      const inside = Math.abs(nx) <= 1.6 && Math.abs(ny) <= 1.6;
      if (inside) {
        targetTiltX      = Math.max(-0.55, Math.min(0.55, ny * 0.55));
        targetTiltYExtra = Math.max(-0.22, Math.min(0.22, nx * 0.18));
      } else {
        targetTiltX      = 0;
        targetTiltYExtra = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const rect  = canvas!.getBoundingClientRect();
      const touch = e.touches[0];
      const nx = (touch.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const ny = (touch.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      targetTiltX      = Math.max(-0.55, Math.min(0.55, ny * 0.55));
      targetTiltYExtra = Math.max(-0.22, Math.min(0.22, nx * 0.18));
    };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
}

// ─── ProcessFlow ──────────────────────────────────────────────────────────────
function ProcessFlow() {
  const VBW = 1200;
  const VBH = 360;

  const pts: { x: number; y: number }[] = [
    { x: 100,  y: 112 },
    { x: 300,  y: 298 },
    { x: 500,  y: 112 },
    { x: 700,  y: 298 },
    { x: 900,  y: 112 },
    { x: 1100, y: 298 },
  ];

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
      <div className="hidden md:block relative px-20 lg:px-28" style={{ height: CONTAINER_H }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glowProcess">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={3}
            strokeDasharray="10 8"
            className="text-primary"
          />
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#processGradient)"
            strokeWidth={4}
            strokeLinecap="round"
            filter="url(#glowProcess)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {process.map((step, i) => {
          const pt      = pts[i];
          const leftPct = (pt.x / VBW) * 100;
          const topPct  = (pt.y / VBH) * 100;

          return (
            <div
              key={step}
              className="absolute group z-10"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Glow Behind Node */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="relative flex flex-col items-center justify-center cursor-default"
              >
                {/* Number Circle */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background/90 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:border-primary group-hover:scale-110 group-hover:bg-primary/10">
                  <span className="text-lg font-bold text-primary transition-colors">
                    0{i + 1}
                  </span>
                </div>

                {/* Label */}
                <div className="absolute top-[120%] w-[160px] text-center pointer-events-none">
                  <h3 className="text-[14px] font-semibold text-foreground/80 transition-colors group-hover:text-primary">
                    {step}
                  </h3>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden mt-10 relative px-6">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 518"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 26 26.5 C 26 73 294 73 294 119.5 C 294 166 26 166 26 212.5 C 26 259 294 259 294 305.5 C 294 352 26 352 26 398.5 C 26 445 294 445 294 491.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={2.5}
            strokeDasharray="8 7"
            className="text-primary"
          />
          <motion.path
            d="M 26 26.5 C 26 73 294 73 294 119.5 C 294 166 26 166 26 212.5 C 26 259 294 259 294 305.5 C 294 352 26 352 26 398.5 C 26 445 294 445 294 491.5"
            fill="none"
            stroke="url(#processGradient)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <div className="relative flex flex-col gap-10">
          {process.map((step, i) => {
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
                <div className="group relative flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background/90 backdrop-blur-md shadow-md transition-all duration-300 group-hover:border-primary group-hover:scale-110">
                    <span className="text-[14px] font-bold text-primary">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                <p className={`text-[16px] font-medium leading-snug text-foreground/80 ${isLeft ? "text-left" : "text-right"}`}>
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

// ─── TestimonialMarquee ───────────────────────────────────────────────────────
function TestimonialMarquee() {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const repeated1 = [...testimonials, ...testimonials, ...testimonials];
  const repeated2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <>
      <style>{`
        @keyframes testimonial-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes testimonial-scroll-right {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        className="mt-16 overflow-hidden flex flex-col gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredIndex(null);
        }}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            animation: "testimonial-scroll-left 25s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {repeated1.map((t, i) => {
            const id = `row1-${i}`;
            return (
            <motion.div
              key={id}
              onMouseEnter={() => setHoveredIndex(id)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                opacity: hoveredIndex === null || hoveredIndex === id ? 1 : 0.22,
                scale: hoveredIndex === id ? 1.04 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                minWidth: "clamp(280px, 40vw, 400px)",
                flexShrink: 0,
                boxShadow:
                  hoveredIndex === id
                    ? "0 0 0 1.5px hsl(var(--primary)), 0 16px 48px hsl(var(--primary) / 0.20)"
                    : "none",
                transition: "box-shadow 0.3s ease",
              }}
              className="rounded-2xl border border-border/40 bg-card p-7 cursor-default select-none"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          )})}
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            animation: "testimonial-scroll-right 30s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {repeated2.map((t, i) => {
            const id = `row2-${i}`;
            return (
            <motion.div
              key={id}
              onMouseEnter={() => setHoveredIndex(id)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                opacity: hoveredIndex === null || hoveredIndex === id ? 1 : 0.22,
                scale: hoveredIndex === id ? 1.04 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                minWidth: "clamp(280px, 40vw, 400px)",
                flexShrink: 0,
                boxShadow:
                  hoveredIndex === id
                    ? "0 0 0 1.5px hsl(var(--primary)), 0 16px 48px hsl(var(--primary) / 0.20)"
                    : "none",
                transition: "box-shadow 0.3s ease",
              }}
              className="rounded-2xl border border-border/40 bg-card p-7 cursor-default select-none"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({ s }: { s: any }) {
  return (
    <motion.div 
      variants={fadeUp} 
      className="group relative overflow-hidden rounded-[20px] bg-card p-[1px] shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Spinning Gradient Border */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[300%] w-[300%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_75%,hsl(var(--primary))_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Content Wrapper */}
      <div className="relative z-10 flex h-full w-full flex-col items-start gap-4 rounded-[19px] bg-background/95 backdrop-blur-2xl p-8 transition-colors group-hover:bg-background/80">
        
        {/* Ambient Icon Glow */}
        <div className="absolute top-8 left-8 h-12 w-12 rounded-full bg-primary/30 blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]">
          <s.icon className="h-6 w-6" />
        </div>
        
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {s.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-90">
          {s.desc}
        </p>

        {/* Learn More link */}
        <div className="mt-auto pt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link to="/contact" className="text-sm font-semibold text-primary hover:underline flex items-center gap-2">
            Discuss for Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ p }: { p: any }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,88,12,0.15)]"
    >
      {/* Background Image */}
      <img 
        src={p.image} 
        alt={p.title} 
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110 group-hover:brightness-[0.3]"
      />
      
      {/* Default Subtle Gradient (Always visible at bottom) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

      {/* Default State Title (Visible initially, fades out on hover) */}
      <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 group-hover:opacity-0">
        <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
        <p className="text-primary font-medium tracking-wide uppercase text-[10px]">{p.category}</p>
      </div>

      {/* Floating Category Badge (Appears on hover) */}
      <div className="absolute top-4 right-4 z-20 opacity-0 translate-y-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xl">
          {p.category}
        </span>
      </div>

      {/* Content Slide Up */}
      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[101%] flex flex-col justify-end p-6 h-full bg-black/40 backdrop-blur-[4px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0">
        <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
        <p className="line-clamp-2 text-white/80 mb-5 text-sm leading-relaxed">{p.shortDesc}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6 opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
          {p.techStack.slice(0, 3).map((tech: string) => (
            <span key={tech} className="rounded-md bg-white/10 backdrop-blur-md px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-white border border-white/20">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a 
          href={`/case-study/${p.slug}`} 
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform hover:bg-orange-500 hover:scale-[1.02]"
        >
          View Case Study <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomePage() {
  const { projects } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const glowScale   = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleGlobalMove);
    return () => window.removeEventListener("mousemove", handleGlobalMove);
  }, [mouseX, mouseY]);

  return (
    <SiteLayout>
      {/* FIXED INTERACTIVE BACKGROUND SPOTLIGHT */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] opacity-60"
        style={{
          background: useMotionTemplate`radial-gradient(900px circle at calc(50% + ${useTransform(mouseX, [-0.5, 0.5], [-450, 450])}px) calc(50% + ${useTransform(mouseY, [-0.5, 0.5], [-450, 450])}px), rgba(234,88,12,0.12), transparent 70%)`,
        }}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden w-full border-b border-white/5 bg-black">
        <div className="absolute inset-0 z-0">
            <Galaxy 
            mouseInteraction={false}
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.15}
            speed={0.5}
          />
        </div>
        {/* GIANT DEVORAAA POSITIONED AT THE TOP GAP */}
        <div className="absolute inset-x-0 top-12 md:top-16 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.04, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[14vw] md:text-[10vw] font-black tracking-tighter text-white whitespace-nowrap"
          >
            devoraaa
          </motion.h1>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, perspective: 1200 }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="py-16 md:py-24 relative">
            <motion.div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
            <motion.h1 variants={fadeUp}
              className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Custom Software Development<br />for Web, Mobile, SaaS &{" "}
              <span className="relative inline-block text-primary">
                AI Automation
                <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
                  viewBox="0 0 300 12" className="absolute -bottom-2 left-0 h-3 w-full" preserveAspectRatio="none">
                  <motion.path d="M2 8 Q 150 -2 298 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              devoraaa delivers scalable web app solutions, high-performing mobile apps, SaaS platforms,
              and intelligent automation for startups and enterprises worldwide.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/contact"
                className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <span className="relative z-10">Book a Call</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link to="/case-study"
                className="rounded-full border border-border bg-card/60 px-8 py-3.5 text-sm font-medium backdrop-blur hover:border-primary">
                Why devoraaa?
              </Link>
            </motion.div>
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
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 gap-16 pr-16">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex h-14 min-w-[140px] items-center justify-center text-lg font-bold tracking-wider text-muted-foreground/60 transition-colors hover:text-primary">
                {c}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">Services</motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">What We Do</motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            End-to-end digital solutions that launch, scale, and transform your business.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </motion.div>
      </section>

      {/* PROCESS */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">Our Process</motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">How We Work</motion.h2>
        </motion.div>
        <ProcessFlow />
      </section>

      {/* PROJECTS */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">Our Work</motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">Real Products We've Built</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20px" }} variants={stagger}
          className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link to="/case-study"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            View all Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold md:text-5xl"
        >
          Loved by teams worldwide
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative mx-auto mb-10 h-[480px] w-full md:h-[580px]"
          style={{ overflow: "visible" }}
        >
          <p className="absolute left-1/2 top-6 z-20 -translate-x-1/2 select-none text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/50">
            Serving clients across the globe
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse 68% 72% at 50% 50%, transparent 38%, var(--background) 74%)",
            }}
          />
        </motion.div>

        <div className="relative z-20 mt-0">
          <TestimonialMarquee />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10 pb-28">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-card p-12 text-center border border-white/10"
        >
          {/* Hypnotic Gradient Mesh Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <motion.div
              animate={{ x: ["0%", "20%", "-20%", "0%"], y: ["0%", "-20%", "20%", "0%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -left-[10%] w-[80%] h-[150%] rounded-full bg-primary/40 blur-[120px]"
            />
            <motion.div
              animate={{ x: ["0%", "-30%", "20%", "0%"], y: ["0%", "20%", "-10%", "0%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] -right-[20%] w-[70%] h-[120%] rounded-full bg-blue-500/30 blur-[100px]"
            />
            <motion.div
              animate={{ x: ["0%", "30%", "-10%", "0%"], y: ["0%", "30%", "-30%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[40%] left-[20%] w-[90%] h-[100%] rounded-full bg-purple-500/30 blur-[120px]"
            />
            <motion.div
              style={{
                background: useMotionTemplate`radial-gradient(600px circle at calc(50% + ${useTransform(mouseX, [-0.5, 0.5], [-300, 300])}px) calc(50% + ${useTransform(mouseY, [-0.5, 0.5], [-300, 300])}px), rgba(255,255,255,0.15), transparent 60%)`
              }}
              className="absolute inset-0"
            />
          </div>
          <div className="absolute inset-0 bg-background/40 backdrop-blur-3xl z-10" />

          <div className="relative z-20 py-10">
            <h2 className="text-3xl font-bold md:text-5xl">
              Your vision deserves the right tech partner.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">
              Let's build something reliable, scalable, and future-ready together.
            </p>
            <Link to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)]">
              Book a Discovery Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}