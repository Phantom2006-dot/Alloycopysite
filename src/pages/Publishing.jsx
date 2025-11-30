import { useEffect } from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import CTAButton from '../components/ui/CTAButton'

const services = [
  {
    title: "Manuscript Development",
    description: "Our experienced editorial team works closely with authors to develop and refine manuscripts, ensuring your story reaches its full potential.",
    icon: "📝"
  },
  {
    title: "Professional Editing",
    description: "Comprehensive editing services including developmental editing, line editing, copyediting, and proofreading.",
    icon: "✏️"
  },
  {
    title: "Book Design",
    description: "Eye-catching cover design and professional interior layout that make your book stand out on shelves and online.",
    icon: "🎨"
  },
  {
    title: "Distribution",
    description: "Wide distribution network ensuring your book reaches readers through major retailers, bookstores, and online platforms.",
    icon: "🌍"
  },
  {
    title: "Marketing Support",
    description: "Strategic marketing campaigns including social media promotion, press releases, and author event coordination.",
    icon: "📢"
  },
  {
    title: "Rights Management",
    description: "Professional handling of subsidiary rights including translation, audio, and film/TV adaptation opportunities.",
    icon: "⚖️"
  }
]

const process = [
  { step: 1, title: "Submit", description: "Send us your complete manuscript with a brief description and author bio." },
  { step: 2, title: "Review", description: "Our editorial team reviews submissions and responds within 3 months." },
  { step: 3, title: "Discussion", description: "If selected, we'll discuss our vision for your book and contractual terms." },
  { step: 4, title: "Development", description: "Work with our editors to polish your manuscript to perfection." },
  { step: 5, title: "Production", description: "Professional design, formatting, and preparation for publication." },
  { step: 6, title: "Launch", description: "Strategic release with marketing support and distribution." }
]

export default function Publishing() {
  useEffect(() => {
    document.title = 'Publishing | BAUHAUS'
  }, [])

  return (
    <div className="pt-20">
      <SectionWrapper>
        <SectionTitle 
          title="Publishing" 
          subtitle="Bringing Nigerian Stories to the World"
        />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-lg leading-relaxed">
            BAUHAUS Publishing is dedicated to discovering, developing, and promoting exceptional Nigerian literary talent. We work with emerging and established authors to bring their stories to readers around the world.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle title="Our Services" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-900 transition-colors">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle 
          title="The Collaborative" 
          subtitle="Book Submissions"
        />
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl text-white text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Looking to work with BAUHAUS?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Traditionally, BAUHAUS has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published: The Collaborative.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our Collaborative program is a great opportunity for authors to submit complete manuscripts and work with BAUHAUS as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content—and find a publishing home for the book.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In this program, authors not only benefit from BAUHAUS's editorial expertise but also have the support of our film producing teams, each with a major studio behind them. BAUHAUS requires the rights to produce each property in TV, film, and all media. In turn, authors will share in profits.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">What We're Looking For:</h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We aim to acquire complete manuscripts with an emphasis on upmarket fiction for adults, including book club fiction, Mystery Thriller and Suspense, and select genre properties, and all categories in young adult. We're excited about fresh, new voices and strong, unique concepts.
              </p>
              
              <h4 className="text-white font-semibold mb-4">Submission Guidelines:</h4>
              <p className="text-gray-300 leading-relaxed">
                We evaluate fiction manuscripts only—no scripts, please. If you don't have an agent, please send us a query email with a brief overview of your book, a short description of your writing background, and the first five pages of your manuscript. Please note if the manuscript has previously been submitted to publishing houses.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-300 mb-4">Please submit by e-mail to</p>
            <a 
              href="mailto:submissions@bauhausproduction.com" 
              className="text-white text-lg font-semibold hover:text-amber-500 transition-colors"
            >
              submissions@bauhausproduction.com
            </a>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle 
          title="Publishing Process" 
          subtitle="From manuscript to bookshelf"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item) => (
              <div key={item.step} className="relative p-6 bg-gray-900/50 rounded-lg">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h4 className="text-white font-semibold mt-4 mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg mb-8">
            We're always looking for compelling stories that celebrate Nigerian culture and resonate with global audiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="mailto:submissions@bauhausproduction.com">
              Submit Your Manuscript
            </CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
