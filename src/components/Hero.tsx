import { Globe } from "./Globe";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-900/20 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Welcome to devoraaa</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            We Build The <br/>
            <span className="text-gradient-orange">Digital Future.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Premium web development, seamless AI automation, and visually stunning digital experiences. From concept to scale, we bring your vision to reality.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#projects" className="px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)]">
              View Our Work
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full bg-white/5 text-foreground border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md">
              Contact Us
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-[600px]">
            <Globe />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
