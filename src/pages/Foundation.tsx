import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Calculator, Users, Target, Award } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Foundation = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "Literacy Programs",
      description:
        "Comprehensive literacy initiatives designed to improve reading and writing skills in underserved communities across Nigeria.",
    },
    {
      icon: Calculator,
      title: "Numeracy Education",
      description:
        "Structured numeracy training programs to enhance mathematical skills and financial literacy among youth.",
    },
    {
      icon: Users,
      title: "Youth Empowerment",
      description:
        "Mentorship, skill development, and leadership training to equip young people with tools for success.",
    },
    {
      icon: Target,
      title: "Community Outreach",
      description:
        "Direct engagement with underserved communities to identify needs and deliver tailored educational solutions.",
    },
    {
      icon: Award,
      title: "Scholarship Programs",
      description:
        "Educational scholarships and grants to support talented youth from disadvantaged backgrounds.",
    },
    {
      icon: Heart,
      title: "Holistic Development",
      description:
        "Programs that address not just academics but also emotional, social, and personal growth.",
    },
  ];

  const faqs = [
    {
      question: "What is the Bauhaus Foundation?",
      answer:
        "The Bauhaus Foundation is a dedicated initiative focused on bringing youth empowerment, literacy, and numeracy education to underserved communities. We believe that education is the foundation for transforming lives and building stronger communities.",
    },
    {
      question: "Who does the Foundation serve?",
      answer:
        "We primarily serve youth and young adults in underserved communities across Nigeria. Our programs are designed for individuals who have limited access to quality educational resources and opportunities.",
    },
    {
      question: "What programs does the Foundation offer?",
      answer:
        "We offer comprehensive literacy programs, numeracy education, youth empowerment initiatives, community outreach, scholarship programs, and holistic development services that address academic and personal growth.",
    },
    {
      question: "How can I get involved?",
      answer:
        "There are many ways to support our mission! You can volunteer, donate, partner with us on projects, or help spread awareness about our programs. Contact us at foundation@bauhausproduction.com for more information.",
    },
    {
      question: "Are there scholarship opportunities?",
      answer:
        "Yes! We offer scholarships and grants to talented youth from disadvantaged backgrounds. Applications are reviewed on a rolling basis. Visit our website or contact us for application details and eligibility requirements.",
    },
    {
      question: "How is the Foundation funded?",
      answer:
        "The Bauhaus Foundation is supported through donations, grants, corporate partnerships, and revenue from our publishing and media initiatives. All funds are dedicated to our educational programs and community impact.",
    },
    {
      question: "What impact has the Foundation made?",
      answer:
        "Since our launch, we have reached thousands of youth across multiple communities, improving literacy rates, numeracy skills, and providing mentorship and empowerment opportunities. We continue to expand our reach and deepen our impact.",
    },
    {
      question: "Can organizations partner with the Foundation?",
      answer:
        "Absolutely! We welcome partnerships with NGOs, educational institutions, corporate organizations, and community groups. Partnerships allow us to expand our reach and create more sustainable impact. Contact us to discuss collaboration opportunities.",
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="section-title mb-6">BAUHAUS FOUNDATION</h1>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif text-foreground/90">
            Empowering Youth Through Education and Opportunity
          </p>
        </section>

        <div className="divider mb-16" />

        {/* Mission Statement */}
        <section className="mb-16 animate-slide-up">
          <div className="bg-secondary/50 border border-border p-8 md:p-12 rounded-lg">
            <h2 className="section-title text-center mb-6">OUR MISSION</h2>
            <p className="text-lg text-foreground/85 leading-relaxed text-center font-serif">
              The Bauhaus Foundation is dedicated to bringing youth empowerment,
              literacy, and numeracy education to underserved communities across
              Nigeria. We believe that every young person deserves access to
              quality education and the opportunity to reach their full potential.
              Through innovative programs and community partnerships, we are
              transforming lives and building stronger, more educated communities.
            </p>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Focus Areas */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-title text-center mb-12">OUR FOCUS AREAS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className="border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="font-serif text-lg font-semibold mb-3">
                      {program.title}
                    </h3>
                    <p className="text-sm text-foreground/80">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Impact & Commitment */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title text-center mb-12">OUR COMMITMENT</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Education & Access
              </h3>
              <p className="text-sm text-foreground/80">
                We are committed to providing accessible, high-quality educational
                programs that meet the needs of underserved communities. Our
                programs are designed to be culturally relevant and practically
                applicable.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Sustainable Impact
              </h3>
              <p className="text-sm text-foreground/80">
                We focus on creating sustainable, long-term impact through
                partnerships, community engagement, and evidence-based program
                development. Our goal is to create lasting change that benefits
                generations to come.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Youth Empowerment
              </h3>
              <p className="text-sm text-foreground/80">
                Beyond academics, we empower youth with leadership skills,
                mentorship, and opportunities for personal and professional growth.
                We believe in developing the whole person.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 border border-border">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Community Partnership
              </h3>
              <p className="text-sm text-foreground/80">
                We work closely with communities, local organizations, and
                stakeholders to understand needs and co-create solutions that are
                meaningful and effective.
              </p>
            </div>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* FAQs */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="section-title text-center mb-12">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-serif font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <div className="divider mb-16" />

        {/* Call to Action */}
        <section className="text-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="section-title mb-8">GET INVOLVED</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join us in our mission to transform lives through education. Whether
            you want to volunteer, donate, or partner with us, there are many ways
            to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:foundation@bauhausproduction.com"
              className="inline-block border border-foreground/30 px-8 py-3 hover:bg-foreground/5 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/contact"
              className="inline-block bg-foreground text-background px-8 py-3 hover:bg-foreground/90 transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Foundation;
