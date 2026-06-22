import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import { images } from "@/assets/images";

const nayanImg = images.nayan;

export const Route = createFileRoute("/team/nayan-sachani")({
  component: NayanSachaniProfile,
});

function NayanSachaniProfile() {
  return (
    <SiteLayout>
      <SEO 
        title="Nayan Sachani - Head of Client Experience & Co-founder of devoraaa"
        description="Learn more about Nayan Sachani, Co-founder and Head of Client Experience at devoraaa. Specializing in product strategy, UI/UX, and client success."
      />
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-10 items-start"
        >
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/5]">
              <img 
                src={nayanImg} 
                alt="Nayan Sachani Co-founder and Head of Client Experience of devoraaa" 
                className="w-full h-full object-cover object-center filter contrast-125"
              />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <a href="https://www.instagram.com/nayan._.sachani/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/nayan-sachani-636477316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/sachaninayan-afk" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Nayan Sachani</h1>
            <h2 className="text-xl text-primary font-medium mt-2">Co-founder & Head of Client Experience at devoraaa</h2>
            
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Nayan Sachani is a product strategist and design-led co-founder. He co-founded devoraaa with a single belief: software should feel as good as it performs.
              </p>
              <p>
                As the face of client experience at devoraaa, Nayan leads UI/UX design, brand direction, and end-to-end client management — turning ambiguous briefs into clear, actionable product roadmaps.
              </p>
              <p>
                His expertise spans interaction design, design systems, user research, and conversion-focused interfaces. He ensures that every product shipped by devoraaa across web apps, mobile apps, SaaS platforms, and AI products provides an unmatched user experience.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div>
                <h3 className="font-bold text-white mb-2">Expertise</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>UI/UX Design</li>
                  <li>Product Strategy</li>
                  <li>Client Experience</li>
                  <li>Design Systems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Contact</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>officialdevora1@gmail.com</li>
                  <li>Based in India</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
