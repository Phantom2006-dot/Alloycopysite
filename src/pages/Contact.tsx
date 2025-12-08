import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">CONTACT US</h1>

        {/* Office Locations */}
        <section className="mb-16 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-12">
            {/* UK Office */}
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl mb-4">UK Office</h3>
              <div className="space-y-2 text-foreground/80">
                <p>4 Notre Dame Mews</p>
                <p>Northampton, NN1 2BG</p>
                <p className="pt-2">
                  <strong className="text-foreground">Phone:</strong> +44 1604 434082
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:info@bauhausproduction.com" className="link-accent">
                    info@bauhausproduction.com
                  </a>
                </p>
              </div>
            </div>

            {/* Nigeria Office */}
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl mb-4">Nigeria Office</h3>
              <div className="space-y-2 text-foreground/80">
                <p>41 Coker Road</p>
                <p>Ilupeju, Lagos</p>
                <p className="pt-2">
                  <strong className="text-foreground">Phone:</strong> +234 703 889 2961
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:akinalaka@bauhaus-education.co.uk" className="link-accent">
                    akinalaka@bauhaus-education.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Inquiries */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-title text-center mb-8">INQUIRIES</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-medium text-sm mb-2">Publishing Submissions</h4>
              <a href="mailto:submissions@bauhausproduction.com" className="link-accent text-sm">
                submissions@bauhausproduction.com
              </a>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Film & Documentary</h4>
              <a href="mailto:film@bauhausproduction.com" className="link-accent text-sm">
                film@bauhausproduction.com
              </a>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Tourism Inquiries</h4>
              <a href="mailto:tourism@bauhausproduction.com" className="link-accent text-sm">
                tourism@bauhausproduction.com
              </a>
            </div>
          </div>
        </section>

        <div className="divider my-16" />

        {/* Contact Form Placeholder */}
        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title text-center mb-8">SEND US A MESSAGE</h2>
          
          <form className="max-w-xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="What is this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                placeholder="Your message..."
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-foreground text-background font-medium text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
