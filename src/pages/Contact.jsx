import { useState, useEffect } from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import CTAButton from '../components/ui/CTAButton'

const inquiryTypes = [
  { type: "Subrights Inquiries", email: "subrights@bauhausproduction.com", contact: "Rights Team" },
  { type: "Film + TV Inquiries", email: "filmtv@bauhausproduction.com", contact: "Production Team" },
  { type: "Press Inquiries", email: "press@bauhausproduction.com", contact: "Media Relations" },
  { type: "Publishing Inquiries", email: "submissions@bauhausproduction.com", contact: "Editorial Team" },
  { type: "Tourism Inquiries", email: "tourism@bauhausproduction.com", contact: "Travel Team" },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact | BAUHAUS'
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.honeypot) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="pt-20">
      <SectionWrapper>
        <SectionTitle title="Contact" />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {inquiryTypes.slice(0, 4).map((inquiry, index) => (
              <div key={index} className="text-center">
                <h3 className="text-white font-semibold mb-2">{inquiry.type}</h3>
                <a 
                  href={`mailto:${inquiry.email}`}
                  className="text-gray-400 hover:text-amber-500 transition-colors underline"
                >
                  {inquiry.contact}
                </a>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="text-center">
              <h3 className="text-white font-semibold uppercase tracking-wider mb-4">UK Office</h3>
              <div className="space-y-2 text-gray-400">
                <p>4 Notre Dame Mews</p>
                <p>Northampton, NN1 2BG</p>
                <p className="mt-4">
                  <a href="tel:+441604434082" className="hover:text-white transition-colors">
                    +44 1604 434082
                  </a>
                </p>
                <p>
                  <a href="mailto:info@bauhausproduction.com" className="hover:text-white transition-colors">
                    info@bauhausproduction.com
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Nigeria Office</h3>
              <div className="space-y-2 text-gray-400">
                <p>41 Coker Road</p>
                <p>Ilupeju, Lagos</p>
                <p className="mt-4">
                  <a href="tel:+2347038892961" className="hover:text-white transition-colors">
                    +234 703 889 2961
                  </a>
                </p>
                <p>
                  <a href="mailto:akinalaka@bauhaus-education.co.uk" className="hover:text-white transition-colors">
                    akinalaka@bauhaus-education.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.5!2d-0.9!3d52.24!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDE0JzI0LjAiTiAwwrA1NCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UK Office Location"
              ></iframe>
            </div>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d3.36!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnMDAuMCJOIDPCsDIxJzM2LjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nigeria Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle title="The Collaborative - Book Submissions" />
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl text-white text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Looking to work with BAUHAUS?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm leading-relaxed mb-8">
            <div>
              <p className="mb-4">
                Traditionally, BAUHAUS has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published: The Collaborative.
              </p>
              <p className="mb-4">
                Our Collaborative program is a great opportunity for authors to submit complete manuscripts and work with BAUHAUS as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content—and find a publishing home for the book.
              </p>
              <p className="mb-4">
                In this program, authors not only benefit from BAUHAUS's editorial expertise but also have the support of our TV and film producing teams. BAUHAUS requires the rights to produce each property in TV, film, and all media. In turn, authors will share in profits.
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong className="text-white">What We're Looking For:</strong> We aim to acquire complete manuscripts with an emphasis on upmarket fiction for adults, including book club fiction, Mystery Thriller and Suspense, and select genre properties, and all categories in young adult. We're excited about fresh, new voices and strong, unique concepts.
              </p>
              <p className="mb-4">
                <strong className="text-white">Submission Guidelines:</strong> We evaluate fiction manuscripts only—no scripts, please. If you don't have an agent, please send us a query email with a brief overview of your book, a short description of your writing background, and the first five pages of your manuscript.
              </p>
              <p>
                BAUHAUS is constantly developing new concepts in-house. Given the nature of the IP business, we may already have independently developed or may in the future develop a project with ideas or themes that are similar to your submitted material.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-300 mb-4">Please submit by e-mail to</p>
            <a 
              href="mailto:thecollaborative@bauhausproduction.com" 
              className="text-white text-lg font-semibold hover:text-amber-500 transition-colors"
            >
              thecollaborative@bauhausproduction.com
            </a>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle 
          title="Send Us a Message" 
          subtitle="We'd love to hear from you"
        />
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>

              <div className="text-center">
                <CTAButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </CTAButton>
              </div>
            </form>
          )}
        </div>
      </SectionWrapper>
    </div>
  )
}
