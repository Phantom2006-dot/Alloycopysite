import Layout from "@/components/Layout";

const Team = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="section-title text-center mb-16 animate-fade-in">OUR TEAM</h1>

        <section className="text-center animate-slide-up">
          <p className="text-xl md:text-2xl leading-relaxed font-serif text-foreground/90 mb-8">
            BAUHAUS is led by a passionate team dedicated to celebrating Nigerian culture through books, films, and travel experiences.
          </p>
          
          <p className="body-text text-center max-w-2xl mx-auto">
            Our team brings together expertise in publishing, film production, and tourism to create meaningful connections between Nigerian stories and global audiences. We're committed to excellence in everything we do.
          </p>
        </section>

        <div className="divider my-16" />

        {/* Placeholder for team members */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-center text-muted-foreground italic">
            Team member profiles coming soon.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Team;
