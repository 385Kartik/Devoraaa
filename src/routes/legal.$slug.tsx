import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { legalDocs } from "@/data/legalDocs";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/legal/$slug")({
  component: LegalPage,
  loader: ({ params }) => {
    const doc = legalDocs[params.slug];
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.doc?.title || 'Legal'} : Devora` },
      { name: "description", content: `Devora ${loaderData?.doc?.title} and policies.` }
    ]
  })
});

function LegalPage() {
  const { doc } = Route.useLoaderData();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black tracking-tight md:text-5xl mb-4">{doc.title}</h1>
          <p className="text-sm text-primary font-medium tracking-widest uppercase mb-12">
            Last Updated: {doc.lastUpdated}
          </p>
          
          {doc.intro && (
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {doc.intro}
              </p>
            </div>
          )}

          <div className="space-y-12">
            {doc.sections.map((section, idx) => (
              <section key={idx} className="scroll-mt-24">
                {section.title && (
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                )}
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
