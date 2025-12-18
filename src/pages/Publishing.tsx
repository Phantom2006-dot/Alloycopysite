import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const Publishing = () => {
  const publishingFaqs = [
    {
      question: "What types of books do you publish?",
      answer:
        "We publish a diverse range of works including literary fiction, non-fiction, poetry, young adult literature, children's books, and travel writing. We focus on stories that celebrate Nigerian culture, heritage, and contemporary life.",
    },
    {
      question: "How do I submit my manuscript?",
      answer:
        "Please send your query letter, synopsis, and the first three chapters of your manuscript to submissions@bauhausproduction.com. Include a brief author bio and any relevant publishing credits. We review submissions on a rolling basis.",
    },
    {
      question: "What is your response time for submissions?",
      answer:
        "We aim to respond to all submissions within 6-8 weeks. However, due to the volume of submissions we receive, this may take longer. We appreciate your patience and will only contact you if we wish to move forward.",
    },
    {
      question: "Do you offer self-publishing services?",
      answer:
        "Yes! We offer comprehensive self-publishing services including cover design, interior layout, editing, proofreading, and distribution through major retailers like Amazon and bookstores worldwide.",
    },
    {
      question: "What translation rights do you acquire?",
      answer:
        "Our mission is to bring knowledge and wisdom from far away lands to African peoples. We acquire translation rights to international works and translate them into English and local African languages, making global knowledge accessible to African audiences.",
    },
    {
      question: "How much does it cost to publish with you?",
      answer:
        "Costs vary depending on the services you need. For traditional publishing, we handle all costs as we believe in investing in quality work. For self-publishing services, we offer competitive packages. Contact us for a detailed quote.",
    },
    {
      question: "Will I retain the rights to my work?",
      answer:
        "Yes! Authors retain copyright to their work. We acquire specific rights for publication and distribution as outlined in our publishing agreement. You can discuss specific terms with our team.",
    },
    {
      question: "Do you provide marketing support?",
      answer:
        "We provide marketing support for all our published titles, including social media promotion, press releases, book launch events, and connections with media outlets. We're invested in your book's success.",
    },
    {
      question: "Can international authors submit?",
      answer:
        "Absolutely! We welcome submissions from authors worldwide. We're particularly interested in works that connect with African audiences or celebrate African diaspora stories.",
    },
    {
      question: "What is your acquisition rights process?",
      answer:
        "For translation and acquisition rights, we work directly with rights holders and literary agents. We negotiate fair terms that benefit all parties and ensure quality translations that preserve the original work's essence.",
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">
          PUBLISHING
        </h1>

        {/* Mission Statement Section */}
        <section className="mb-16 animate-slide-up">
          <div className="bg-secondary/50 border border-border p-8 md:p-12 rounded-lg">
            <h2 className="section-title text-center mb-6">OUR MISSION</h2>
            <p className="text-lg md:text-xl leading-relaxed font-serif text-foreground/90 text-center">
              Our mission for acquiring translation rights of intellectual property
              is to bring the knowledge and wisdom of far away lands to African
              peoples.
            </p>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Overview */}
        <section className="text-center mb-16 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif text-foreground/90">
            BAUHAUS Publishing brings compelling stories and voices from Nigeria
            to readers around the world.
          </p>
        </section>

        <div className="divider mb-16" />

        {/* Services */}
        <section
          className="animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="section-title text-center mb-12">OUR SERVICES</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Traditional Publishing</h3>
              <p className="text-sm text-foreground/80">
                Full-service publishing including editing, design, production, and
                distribution for selected manuscripts.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Editorial Services</h3>
              <p className="text-sm text-foreground/80">
                Professional editing, proofreading, and manuscript development to
                help authors refine their work.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Design & Production</h3>
              <p className="text-sm text-foreground/80">
                Cover design, interior layout, and print-ready file preparation for
                self-publishing authors.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Distribution</h3>
              <p className="text-sm text-foreground/80">
                Global distribution through major retailers including Amazon,
                bookstores, and libraries.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">
                Translation & Acquisition Rights
              </h3>
              <p className="text-sm text-foreground/80">
                Acquiring translation rights to international works and bringing
                global knowledge to African audiences through quality translations.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg mb-3">Marketing Support</h3>
              <p className="text-sm text-foreground/80">
                Comprehensive marketing and promotion services to ensure your book
                reaches its target audience.
              </p>
            </div>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Submission Guidelines */}
        <section
          className="animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="section-title text-center mb-8">SUBMISSION GUIDELINES</h2>

          <div className="space-y-6 body-text">
            <p>
              BAUHAUS Publishing is always looking for fresh voices and compelling
              stories that celebrate Nigerian culture, heritage, and contemporary
              life. We're particularly interested in:
            </p>

            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Literary fiction set in Nigeria or featuring Nigerian characters</li>
              <li>Non-fiction exploring Nigerian history, culture, and society</li>
              <li>Travel writing and cultural guides</li>
              <li>Young adult and children's books with African themes</li>
              <li>Poetry collections celebrating African voices</li>
            </ul>

            <p className="pt-4">
              <strong>How to Submit:</strong> Please send your query letter,
              synopsis, and the first three chapters of your manuscript to our
              submissions email. Include a brief author bio and any relevant
              publishing credits.
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

        <div className="divider mb-16" />

        {/* Publishing FAQs */}
        <section
          className="animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="section-title text-center mb-12">
            PUBLISHING FAQs
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {publishingFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-serif font-semibold">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Publishing;
