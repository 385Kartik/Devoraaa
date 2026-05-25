import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Smartphone, Cloud, Bot, Gamepad2, Monitor, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  { icon: Code,       title: "Web App Development",        desc: "Modern web app solutions built for speed, scalability, and long-term performance." },
  { icon: Smartphone, title: "Mobile App Development",     desc: "Secure enterprise-grade mobile apps with scalable architecture and seamless UX." },
  { icon: Cloud,      title: "Custom SaaS Development",    desc: "From MVP launch to full-scale product growth with recurring revenue in mind." },
  { icon: Bot,        title: "AI Automation & Voice Agents", desc: "AI agents and automation that reduce manual work and boost operational efficiency." },
  { icon: Gamepad2,   title: "Game Development",           desc: "Immersive game development with smooth performance and engaging gameplay." },
  { icon: Monitor,    title: "Desktop App Development",    desc: "Reliable desktop apps for productivity tools, dashboards, and enterprise systems." },
];

const projects = [
  { title: "PRINT-IT",        sub: "print docs from home",  tag: "Web Application", img: "https://cms.slashifytech.in/uploads/sov_portal_c665c87259_7be99a388d.webp" },
  { title: "Knish",         sub: "Clothing brand",           tag: "Web Application", img: "https://cms.slashifytech.in/uploads/wise_talk_9af024187b_96cc461eda.webp" },
  { title: "Wheatflow", sub: "wheat business",              tag: "Database management", img: "https://cms.slashifytech.in/uploads/CS_a23bff7541_be56109500.webp" },
  { title: "Navrang",      sub: "navratri accessories",            tag: "Web Application", img: "https://cms.slashifytech.in/uploads/BM_Banner_968928d689.png" },
  { title: "Get tutorials",            sub: "tutorials for engineering",          tag: "Web Application",            img: "https://cms.slashifytech.in/uploads/Qrynto_Banner_7ee07f5b89.png" },
  { title: "College predictor",   sub: "help to select the college",      tag: "Web Application", img: "https://cms.slashifytech.in/uploads/360_2ed4e74e2a_a2b6bf46bf.webp" },
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
  { name: "Kirtan karkar",    company: "Knish",              text: "Loved working with the team. Young, charismatic, and highly skilled. Would highly recommend Devora." },
  { name: "Yogesh Kalathiya", company: "Wheatflow",          text: "An amazing team of hardworking talent. Worked on multiple projects, all delivered on time." },
  { name: "Shubh Raval",      company: "Shree gopal agency", text: "Devora did wonderful work creating my website. Patient, thoughtful, and attention to detail." },
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
    let mouseX = -999, mouseY = -999, prevMX = -999, prevMY = -999;

    type Star = {
      x: number; y: number; r: number; vx: number; vy: number;
      phase: number; twinkleSpeed: number; baseBright: number;
      flickerTimer: number; flickerAlpha: number;
    };
    type ShootingStar = { x: number; y: number; vx: number; vy: number; life: number; decay: number; trailLen: number; width: number; };
    type CursorDot  = { x: number; y: number; vx: number; vy: number; life: number; decay: number; r: number; };

    let stars: Star[] = [], shooters: ShootingStar[] = [], cursorDots: CursorDot[] = [], frame = 0;

    const resize = () => { canvas!.width = canvas!.offsetWidth; canvas!.height = canvas!.offsetHeight; };

    const spawnStar = (ex?: number, ey?: number): Star => {
      const r = 0.4 + Math.random() * Math.random() * 2.2;
      return { x: ex ?? Math.random()*canvas!.width, y: ey ?? Math.random()*canvas!.height, r,
        vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
        phase: Math.random()*Math.PI*2, twinkleSpeed: 0.004+Math.random()*0.025,
        baseBright: 0.65+Math.random()*0.35, flickerTimer: 0, flickerAlpha: 1 };
    };

    const spawnShooter = (): ShootingStar => {
      const angle = Math.PI/8 + Math.random()*(Math.PI/5);
      const speed = 9 + Math.random()*12;
      return { x: Math.random()*canvas!.width*0.6, y: Math.random()*canvas!.height*0.5,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        life: 1, decay: 0.012+Math.random()*0.012, trailLen: 60+Math.random()*120, width: 0.8+Math.random()*1.2 };
    };

    const spawnCursorDot = (x: number, y: number) => {
      const angle = Math.random()*Math.PI*2, speed = 0.8+Math.random()*3;
      cursorDots.push({ x: x+(Math.random()-0.5)*8, y: y+(Math.random()-0.5)*8,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed-0.6,
        life: 1, decay: 0.03+Math.random()*0.035, r: 0.6+Math.random()*1.8 });
    };

    const init = () => { resize(); stars = Array.from({ length: Math.round((canvas!.width*canvas!.height)/(940*292)*200) }, () => spawnStar()); };

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -5) s.x = canvas.width+5; if (s.x > canvas.width+5) s.x = -5;
        if (s.y < -5) s.y = canvas.height+5; if (s.y > canvas.height+5) s.y = -5;
        if (Math.random() < 0.0008) { s.vx=(Math.random()-0.5)*0.35; s.vy=(Math.random()-0.5)*0.35; }
        s.phase += s.twinkleSpeed;
        let alpha = s.baseBright * (0.55 + 0.45*Math.sin(s.phase));
        if (s.flickerTimer > 0) { s.flickerTimer--; alpha *= s.flickerAlpha; }
        else if (Math.random() < 0.0005) { s.flickerTimer=3+Math.floor(Math.random()*6); s.flickerAlpha=Math.random()<0.5?0.05:1.5; }
        alpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${alpha})`; ctx.fill();
        if (s.r > 1.4) { ctx.beginPath(); ctx.arc(s.x, s.y, 0.5, 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${Math.min(1,alpha*1.4)})`; ctx.fill(); }
      }

      if (frame%110===0||(frame%40===0&&Math.random()<0.18)) shooters.push(spawnShooter());
      shooters = shooters.filter(ss => {
        ss.x+=ss.vx; ss.y+=ss.vy; ss.life-=ss.decay;
        if (ss.life<=0||ss.x>canvas.width+100||ss.y>canvas.height+100) return false;
        const norm=Math.hypot(ss.vx,ss.vy);
        const tx=ss.x-(ss.vx/norm)*ss.trailLen*ss.life, ty=ss.y-(ss.vy/norm)*ss.trailLen*ss.life;
        const g=ctx.createLinearGradient(tx,ty,ss.x,ss.y);
        g.addColorStop(0,`rgba(255,255,255,0)`); g.addColorStop(0.7,`rgba(255,255,255,${ss.life*0.5})`); g.addColorStop(1,`rgba(255,255,255,${ss.life})`);
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(ss.x,ss.y); ctx.strokeStyle=g; ctx.lineWidth=ss.width; ctx.lineCap="round"; ctx.stroke();
        ctx.beginPath(); ctx.arc(ss.x,ss.y,ss.width*1.2,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${ss.life})`; ctx.fill();
        return true;
      });

      const dx=mouseX-prevMX, dy=mouseY-prevMY, spd=Math.hypot(dx,dy);
      if (spd>2&&mouseX>0) { const n=Math.min(6,Math.floor(spd*0.52)); for (let i=0;i<n;i++) spawnCursorDot(mouseX,mouseY); }
      prevMX=mouseX; prevMY=mouseY;

      cursorDots = cursorDots.filter(cd => {
        cd.x+=cd.vx; cd.y+=cd.vy; cd.vy-=0.06; cd.vx*=0.96; cd.life-=cd.decay;
        if (cd.life<=0) return false;
        ctx.beginPath(); ctx.arc(cd.x,cd.y,cd.r*cd.life,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${cd.life*cd.life})`; ctx.fill();
        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    const onMove  = (e: MouseEvent) => { const r=canvas!.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; };
    const onTouch = (e: TouchEvent) => { const r=canvas!.getBoundingClientRect(); mouseX=e.touches[0].clientX-r.left; mouseY=e.touches[0].clientY-r.top; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    init(); draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); window.removeEventListener("mousemove",onMove); window.removeEventListener("touchmove",onTouch); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, var(--background) 100%)" }} />
    </>
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
      <div className="hidden md:block relative" style={{ height: CONTAINER_H }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
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

        {process.map((step, i) => {
          const pt   = pts[i];
          const isUp = i % 2 === 0;
          const leftPct = (pt.x / VBW) * 100;
          const topPct  = (pt.y / VBH) * 100;

          return (
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
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hovered"
                style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
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
                    width:           "9rem",
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

                <motion.div
                  variants={{
                    rest:    { opacity: 0, scale: 0.7 },
                    hovered: { opacity: 1, scale: 1.7 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 rounded-sm bg-primary/20 blur-xl pointer-events-none"
                />

                <motion.div
                  variants={{
                    rest:    { rotate: 45, scale: 1,    borderColor: "hsl(var(--primary) / 0.62)" },
                    hovered: { rotate: 0,  scale: 1.12, borderColor: "hsl(var(--primary) / 1.00)" },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="relative z-10 h-[62px] w-[62px] rounded-[4px] border-2 bg-card shadow-xl shadow-primary/15 flex items-center justify-center cursor-default"
                >
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

      {/* ── MOBILE ── */}
      <div className="md:hidden mt-10 relative px-4">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2"
          style={{
            background:
              "repeating-linear-gradient(to bottom, hsl(var(--primary)/0.4) 0px, hsl(var(--primary)/0.4) 6px, transparent 6px, transparent 14px)",
          }}
        />

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
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hovered"
                  style={{ flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
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

// ─── TestimonialMarquee ───────────────────────────────────────────────────────
function TestimonialMarquee() {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const repeated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <style>{`
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>

      <div
        className="mt-16 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredIndex(null);
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            animation: "testimonial-scroll 22s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {repeated.map((t, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                opacity:
                  hoveredIndex === null
                    ? 1
                    : hoveredIndex === i
                    ? 1
                    : 0.22,
                scale: hoveredIndex === i ? 1.04 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                minWidth: "clamp(280px, 40vw, 500px)",
                flexShrink: 0,
                boxShadow:
                  hoveredIndex === i
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
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const glowScale   = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <SiteLayout>
      {/* HERO — full bleed, no max-width cap */}
      <section ref={heroRef} className="relative overflow-hidden">
        <HeroSparkles />
        <motion.div style={{ scale: glowScale }}
          className="pointer-events-none absolute left-1/2 top-32 z-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full">
          {[0,1,2,3,4].map((i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.5 - i*0.08, scale: 1 }}
              transition={{ duration: 1.2, delay: i*0.1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-primary/10"
              style={{ transform: `scale(${0.4 + i*0.15})` }} />
          ))}
          <div className="absolute inset-1/4 rounded-full bg-primary/10 blur-3xl" />
        </motion.div>

        {/* ↓ removed mx-auto max-w-7xl; hero card now stretches with edge padding only */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}
            className="rounded-3xl bg-card/40 px-6 py-16 backdrop-blur-sm md:px-12 md:py-24">
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
              Devora delivers scalable web app solutions, high-performing mobile apps, SaaS platforms,
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
                Why Devora?
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CLIENT MARQUEE — already full-bleed, unchanged */}
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

      {/* SERVICES — full width with only edge padding */}
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
            <motion.div key={s.title} variants={fadeUp} whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-7">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div whileHover={{ rotate: 8, scale: 1.1 }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Discuss for Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROCESS — full width with only edge padding */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">Our Process</motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">How We Work</motion.h2>
        </motion.div>
        <ProcessFlow />
      </section>

      {/* PROJECTS — full width with only edge padding */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm uppercase tracking-widest text-primary">Our Work</motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-center text-4xl font-bold md:text-5xl">Real Products We've Built</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.article key={p.title} variants={fadeUp} whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card p-5">
              <div className="overflow-hidden rounded-xl">
                <motion.img src={p.img} alt={p.title} loading="lazy"
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }}
                  className="h-56 w-full object-cover" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.sub}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-primary">{p.tag}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link to="/case-study"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            View all Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS — full width with only edge padding */}
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
          className="relative mx-auto -mb-16 h-[480px] w-full md:h-[580px]"
          style={{ overflow: "visible" }}
        >
          <p className="absolute left-1/2 top-6 z-20 -translate-x-1/2 select-none text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/50">
            Serving clients across the globe
          </p>
          <div className="absolute inset-0">
            <GlobeCanvas />
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

      {/* CTA — full width with only edge padding */}
      <section className="mt-28 w-full px-4 sm:px-6 lg:px-10 pb-28">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-12 text-center text-primary-foreground">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/20" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-white/20" />
          <h2 className="relative text-3xl font-bold md:text-5xl">
            Your vision deserves the right tech partner.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl opacity-90">
            Let's build something reliable, scalable, and future-ready together.
          </p>
          <Link to="/contact"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground transition-transform hover:scale-105">
            Book a Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
