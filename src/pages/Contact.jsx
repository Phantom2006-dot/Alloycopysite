import { useEffect } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const inquiryTypes = [
  { type: "General Inquiries", contact: "General Team", email: "info@bauhausproduction.com" },
  { type: "Film + TV Inquiries", contact: "Production Team", email: "filmtv@bauhausproduction.com" },
  { type: "Publishing Inquiries", contact: "Editorial Team", email: "publishing@bauhausproduction.com" },
  { type: "Tourism Inquiries", contact: "Tourism Team", email: "tourism@bauhausproduction.com" },
]

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | BAUHAUS'
  }, [])

  return (
    <div className="pt-28 lg:pt-32 bg-black min-h-screen">
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 to-black pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl text-white font-serif tracking-wide">
              contact
            </h1>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {inquiryTypes.map((inquiry, index) => (
              <a
                key={index}
                href={`mailto:${inquiry.email}`}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 text-center hover:border-neutral-600 hover:bg-neutral-900/80 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{inquiry.type}</h3>
                <p className="text-gray-400 text-xs break-all hover:text-white transition-colors">
                  {inquiry.email}
                </p>
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-white font-semibold uppercase tracking-wider text-sm">UK Office</h3>
              </div>
              <div className="text-gray-400 text-sm space-y-3 ml-16">
                <p>4 Notre Dame Mews</p>
                <p>Northampton, NN1 2BG</p>
                <div className="pt-4 space-y-2">
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href="tel:+441604434082" className="hover:text-white transition-colors">+44 1604 434082</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href="mailto:info@bauhausproduction.com" className="hover:text-white transition-colors">info@bauhausproduction.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Nigeria Office</h3>
              </div>
              <div className="text-gray-400 text-sm space-y-3 ml-16">
                <p>41 Coker Road</p>
                <p>Ilupeju, Lagos</p>
                <div className="pt-4 space-y-2">
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href="tel:+2347038892961" className="hover:text-white transition-colors">+234 703 889 2961</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href="mailto:akinalaka@bauhaus-education.co.uk" className="hover:text-white transition-colors break-all">akinalaka@bauhaus-education.co.uk</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl opacity-50" />
            <div className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 md:p-12">
              <div className="text-center mb-10">
                <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
                  Publishing
                </span>
                <h2 className="text-2xl md:text-3xl text-white font-serif mb-4">
                  Looking to work with BAUHAUS?
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Submit your manuscript and work with us to shape your novel and find a publishing home.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                  <p>
                    BAUHAUS has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published.
                  </p>
                  <p>
                    Our program is a great opportunity for authors to submit complete manuscripts and work with BAUHAUS as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content.
                  </p>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                  <p>
                    <strong className="text-white">Submission Guidelines:</strong> We evaluate fiction manuscripts only—no scripts, please. If you don't have an agent, please send us a query email with a brief overview of your book, a short description of your writing background, and the first five pages of your manuscript.
                  </p>
                  <p>
                    Please note if the manuscript has previously been submitted to publishing houses. We'll be in touch as soon as possible if we'd like to pursue your work.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="mailto:submissions@bauhausproduction.com" 
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-gray-200 transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  Submit Your Manuscript
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
