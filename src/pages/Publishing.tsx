import Layout from "@/components/Layout";

const Publishing = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">PUBLISHING</h1>

        {/* Overview */}
        <section className="text-center mb-16 animate-slide-up">
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif text-foreground/90">
            BAUHAUS Publishing brings compelling stories and voices from Nigeria to readers around the world.
          </p>
        </section>

        <div className="divider mb-16" />

        {/* Services */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-title text-center mb-12">OUR SERVICES</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Traditional Publishing</h3>
              <p className="text-sm text-foreground/80">
                Full-service publishing including editing, design, production, and distribution for selected manuscripts.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Editorial Services</h3>
              <p className="text-sm text-foreground/80">
                Professional editing, proofreading, and manuscript development to help authors refine their work.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Design & Production</h3>
              <p className="text-sm text-foreground/80">
                Cover design, interior layout, and print-ready file preparation for self-publishing authors.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Distribution</h3>
              <p className="text-sm text-foreground/80">
                Global distribution through major retailers including Amazon, bookstores, and libraries.
              </p>
            </div>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Submission Guidelines */}
        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title text-center mb-8">SUBMISSION GUIDELINES</h2>
          
          <div className="space-y-6 body-text">
            <p>
              BAUHAUS Publishing is always looking for fresh voices and compelling stories that celebrate Nigerian culture, heritage, and contemporary life. We're particularly interested in:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Literary fiction set in Nigeria or featuring Nigerian characters</li>
              <li>Non-fiction exploring Nigerian history, culture, and society</li>
              <li>Travel writing and cultural guides</li>
              <li>Young adult and children's books with African themes</li>
              <li>Poetry collections celebrating African voices</li>
            </ul>

            <p className="pt-4">
              <strong>How to Submit:</strong> Please send your query letter, synopsis, and the first three chapters of your manuscript to our submissions email. Include a brief author bio and any relevant publishing credits.
            </p>
          </div>

          {/* Submission CTA */}
          <div className="mt-12 text-center">
            <div className="inline-block border border-foreground/30 px-8 py-4">
              <p className="text-sm mb-1">Submit your manuscript to</p>
              <a
                href="mailto:submissions@bauhausproduction.com"
                className="link-accent text-sm"
              >
                submissions@bauhausproduction.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Publishing;
