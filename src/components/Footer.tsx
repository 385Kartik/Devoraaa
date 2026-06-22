import { Link } from "@tanstack/react-router";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050505] py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 tracking-widest">
            <span className="text-primary">d</span>evoraaa<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Elevating digital experiences with premium design, modern web technologies, and AI automation systems. Let's build the future together.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="/#projects" className="hover:text-primary transition-colors">Projects</a></li>
            <li><a href="/#about" className="hover:text-primary transition-colors">About</a></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://www.instagram.com/devoraaa.in?igsh=eHNubmtxMmR0eWRp" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="https://github.com/KARTIKPARMAR" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
            <li><a href="https://linkedin.com/in/kartik-parmar" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
            <li><a href="mailto:officialdevora1@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Legal & Trust</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link to="/legal/$slug" params={{ slug: "privacy-policy" }} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "terms-and-conditions" }} className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "refund-policy" }} className="hover:text-primary transition-colors">Refund Policy</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "cookie-policy" }} className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "community-guidelines" }} className="hover:text-primary transition-colors">Community Guidelines</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "freelancer-code-of-conduct" }} className="hover:text-primary transition-colors">Code of Conduct</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "client-protection-policy" }} className="hover:text-primary transition-colors">Client Protection</Link></li>
            <li><Link to="/legal/$slug" params={{ slug: "trust-and-safety" }} className="hover:text-primary transition-colors">Trust & Safety</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} devoraaa. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed & Built with precision.</p>
      </div>
    </footer>
  );
};
