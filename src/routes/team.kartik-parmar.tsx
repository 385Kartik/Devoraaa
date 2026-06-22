import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { images } from "@/assets/images";

const kartikImg = images.kartik;

export const Route = createFileRoute("/team/kartik-parmar")({
  component: KartikParmarProfile,
});

function KartikParmarProfile() {
  return (
    <SiteLayout>
      <SEO 
        title="Kartik Parmar - CTO & Co-founder of devoraaa"
        description="Learn more about Kartik Parmar, the CTO and Co-founder of devoraaa. Specializing in high-end software development, AI, and enterprise architecture."
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
                src={kartikImg} 
                alt="Kartik Parmar Co-founder and CTO of devoraaa" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 rounded-full transition-colors border border-white/10">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Kartik Parmar</h1>
            <h2 className="text-xl text-primary font-medium mt-2">Co-founder & Chief Technology Officer at devoraaa</h2>
            
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Kartik Parmar is the visionary Co-founder and CTO of devoraaa, a premium software and AI agency. With a deep passion for crafting immersive digital experiences and pushing the boundaries of web development, he has built an impressive portfolio of high-scale applications.
              </p>
              <p>
                Before establishing devoraaa, Kartik worked as a Full Stack Developer at Numberwale and founded Print-It. His technical leadership has led to the successful deployment of projects like Uni-Brain, NavRang, various AI automation systems, and dynamic enterprise web platforms.
              </p>
              <p>
                He specializes in React, Node.js, Cloud Architecture, and integrating state-of-the-art Artificial Intelligence to automate business workflows. Under his technical direction, devoraaa continues to deliver world-class digital products that combine beautiful aesthetics with robust performance.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div>
                <h3 className="font-bold text-white mb-2">Expertise</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Enterprise Architecture</li>
                  <li>Full Stack Web Apps</li>
                  <li>AI Integrations</li>
                  <li>Cloud Infrastructure</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Contact</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>hi@devoraaa.com</li>
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
