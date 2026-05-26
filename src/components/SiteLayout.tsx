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

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">

        <div className="flex w-full items-center justify-between px-4 py-2 text-sm md:px-8">
          <a href="tel:+919321633746" className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4" /> +91 9321633746
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

      <header className="sticky top-[40px] z-40 mx-auto mt-6 w-full max-w-7xl px-6">
        <div className="flex items-center justify-between rounded-2xl bg-card/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground">D</div>
            <span className="text-xl font-semibold tracking-tight">Devora</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-sm text-primary" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/contact" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground md:inline-block">
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
        </div>
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
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-2/3 max-w-xs border-l border-border bg-card p-6 shadow-2xl md:hidden"
            >
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground">D</div>
                <span className="text-lg font-semibold">Devora</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="text-base text-foreground/80 transition-colors hover:text-primary"
                    activeProps={{ className: "text-base text-primary" }}
                    activeOptions={{ exact: true }}
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex w-fit rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                >
                  Book a Call
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border/50 bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground">D</div>
              <span className="text-xl font-semibold">Devora</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Your search for all tech solutions ends here.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/case-study" className="hover:text-primary">Case Studies</Link></li>
              <li><Link to="/blogs" className="hover:text-primary">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary">Web App</Link></li>
              <li><Link to="/services" className="hover:text-primary">Mobile App</Link></li>
              <li><Link to="/integrations" className="hover:text-primary">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Get in touch</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>+91 9321633746</li>
              <li>officialdevora1.com</li>
              <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Devora. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
