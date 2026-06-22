import { Link } from "@tanstack/react-router";
import { Phone, Instagram, Linkedin, Mail, MessageCircle, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Integrations", to: "/integrations" },
  { label: "Case Studies", to: "/case-study" },
  { label: "Contact", to: "/contact" },
  { label: "Blogs", to: "/blogs" },
] as const;

const instagramLinks = [
  { label: "@devoraaa.in", url: "https://www.instagram.com/devoraaa.in?igsh=eHNubmtxMmR0eWRp" },
  { label: "@nayan._.sachani", url: "https://www.instagram.com/nayan._.sachani/" },
  { label: "@p_kartik_385", url: "https://www.instagram.com/p_kartik_385/" },
];

const linkedinLinks = [
  { label: "Kartik Parmar", url: "https://www.linkedin.com/in/parmarkartik385/" },
  {
    label: "Nayan Sachani",
    url: "https://www.linkedin.com/in/nayan-sachani-636477316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

import { CursorFollower } from "./CursorFollower";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-transparent">
      <CursorFollower />
      <div className="relative z-50 w-full border-b border-white/[0.05] bg-transparent text-white/70">

        <div className="flex w-full items-center justify-between px-4 py-2 text-sm md:px-8">
          <a href="tel:+919321633746" className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4" /> +91 93216 33746
          </a>
          <a href="tel:+919619410050" className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4" /> Devoraaa
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919321633746"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                {instagramLinks.map((l) => (
                  <DropdownMenuItem key={l.url} asChild>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                {linkedinLinks.map((l) => (
                  <DropdownMenuItem key={l.url} asChild>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="mailto:officialdevora1@gmail.com" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-4 z-40 mx-auto mt-4 w-full max-w-5xl px-4 md:px-6 transition-all">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 backdrop-blur-2xl shadow-2xl"
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-white text-black font-black transition-transform group-hover:scale-110">
              <img src="/Devora_logo.png" alt="Devoraaa Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">devoraaa</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-white/60 transition-all hover:text-white"
                activeProps={{ className: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/contact" className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 md:inline-block">
            Book a Call
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-[80%] max-w-sm border-l border-white/[0.05] bg-black/80 backdrop-blur-3xl p-8 shadow-2xl md:hidden"
            >
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-black">D</div>
                <span className="text-2xl font-black tracking-tighter text-white">Devoraaa</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-medium text-white/50 transition-colors hover:text-white"
                    activeProps={{ className: "text-2xl font-bold text-white" }}
                    activeOptions={{ exact: true }}
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-lg font-bold text-black transition-transform active:scale-95"
                >
                  Book a Call
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


      <main className="flex-1">{children}</main>

      <footer className="relative mt-24 overflow-hidden border-t border-white/[0.05] bg-black py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-black">D</div>
              <span className="text-2xl font-bold tracking-tight text-white">Devora</span>
            </div>
            <p className="mt-6 text-sm text-white/50 leading-relaxed">Let's build something that makes your competition irrelevant.</p>
            <p className="mt-4 text-sm text-white/50 font-medium"><a href="mailto:officialdevora1@gmail.com" className="hover:text-white transition-colors border-b border-primary/30 pb-1">officialdevora1@gmail.com</a></p>
            <p className="mt-4 text-sm text-white/30">Mira Bhayandar, India</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Sitemap</h4>
            <ul className="space-y-3 text-sm text-white/50 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">The Vision</Link></li>
              <li><Link to="/case-study" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Socials</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-3 text-sm text-white/50 font-medium">
                <li><a href="https://www.instagram.com/_devora._?igsh=MTl2NmRqd3JlbnA2aA==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram of Devora</a></li>
                <li><a href="https://www.linkedin.com/in/parmarkartik385/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn (Mr. Kartik Parmar)</a></li>
                <li><a href="https://github.com/385Kartik" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub (Mr. Kartik Parmar)</a></li>
              </ul>
              <ul className="space-y-3 text-sm text-white/50 font-medium">
                <li><a href="https://www.linkedin.com/in/nayan-sachani-636477316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn (Mr. Nayan Sachani)</a></li>
                <li><a href="https://github.com/sachaninayan-afk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub (Mr. Nayan Sachani)</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Legal & Trust</h4>
            <ul className="space-y-3 text-sm text-white/50 font-medium">
              <li><Link to="/legal/$slug" params={{ slug: "privacy-policy" }} className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "terms-and-conditions" }} className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "refund-policy" }} className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "cookie-policy" }} className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "community-guidelines" }} className="hover:text-white transition-colors">Guidelines</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "freelancer-code-of-conduct" }} className="hover:text-white transition-colors">Code of Conduct</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "client-protection-policy" }} className="hover:text-white transition-colors">Client Protection</Link></li>
              <li><Link to="/legal/$slug" params={{ slug: "trust-and-safety" }} className="hover:text-white transition-colors">Trust & Safety</Link></li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 mt-20 border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto text-sm font-medium text-white/30">
          <div>&copy; {new Date().getFullYear()} Devora Agency. All rights reserved.</div>
          <div className="mt-2 md:mt-0 flex gap-4">
            <Link to="/legal/$slug" params={{ slug: "privacy-policy" }} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal/$slug" params={{ slug: "terms-and-conditions" }} className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
