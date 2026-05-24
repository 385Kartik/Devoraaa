import { Link } from "@tanstack/react-router";
import { Phone, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
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
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <a href="tel:+919321633746" className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4" /> +91 9321633746
          </a>
          <div className="flex items-center gap-4">
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

      <header className="mx-auto mt-6 w-full max-w-7xl px-6">
        <div className="flex items-center justify-between rounded-2xl bg-card/60 px-6 py-4 backdrop-blur">
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
        </div>
      </header>

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
