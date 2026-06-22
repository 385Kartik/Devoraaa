import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-widest text-foreground flex items-center gap-2">
          <span className="text-primary">D</span>evoraaa<span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
        </nav>
        <a href="#contact" className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm">
          Let's Talk
        </a>
      </div>
    </header>
  );
};
