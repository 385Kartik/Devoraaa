import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = "devoraaa | High-End Software & AI Development by Kartik Parmar",
  description = "devoraaa is a premium software agency founded by Kartik Parmar, specializing in web, mobile, SaaS, and AI automation for enterprises.",
  keywords = "devora, devoraa, devoraaa, kartik parmar, kartik parmar devora, software development, AI automation, premium agency",
  image = "/Devora_logo.png",
  url = "https://devoraaa.com",
}: SEOProps) {
  
  // JSON-LD Schema connecting Kartik Parmar to devoraaa
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        "name": "devoraaa",
        "alternateName": ["devora", "devoraa"],
        "url": url,
        "logo": `${url}/Devora_logo.png`,
        "description": "devoraaa specializes in cutting-edge web, mobile, SaaS, and AI automation.",
        "founder": {
          "@type": "Person",
          "name": "Kartik Parmar",
          "worksFor": {
            "@type": "Organization",
            "name": "devoraaa"
          },
          "sameAs": [
            "https://devoraaa.com/team/kartik-parmar",
            "https://twitter.com/devoraaa"
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "devoraaa",
        "publisher": {
          "@id": `${url}/#organization`
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Kartik Parmar (devoraaa)" />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="devoraaa" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
