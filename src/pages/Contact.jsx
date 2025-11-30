import { useEffect } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

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
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-16">
            Contact Us
          </h1>
          
          <div className="space-y-8 text-center mb-16">
            {inquiryTypes.map((inquiry, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-sm mb-1">{inquiry.type}</h3>
                <a 
                  href={`mailto:${inquiry.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {inquiry.email}
                </a>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="text-center p-8 border border-gray-800">
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">UK Office</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <p>4 Notre Dame Mews</p>
                <p>Northampton, NN1 2BG</p>
                <p className="flex items-center justify-center gap-2 mt-4">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+441604434082" className="hover:text-white transition-colors">+44 1604 434082</a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@bauhausproduction.com" className="hover:text-white transition-colors">info@bauhausproduction.com</a>
                </p>
              </div>
            </div>
            <div className="text-center p-8 border border-gray-800">
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Nigeria Office</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <p>41 Coker Road</p>
                <p>Ilupeju, Lagos</p>
                <p className="flex items-center justify-center gap-2 mt-4">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+2347038892961" className="hover:text-white transition-colors">+234 703 889 2961</a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:akinalaka@bauhaus-education.co.uk" className="hover:text-white transition-colors">akinalaka@bauhaus-education.co.uk</a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-8">
              Publishing Submissions
            </h2>
            
            <h3 className="text-2xl md:text-3xl text-white text-center mb-10 font-serif">
              Looking to work with BAUHAUS?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm leading-relaxed mb-12">
              <div className="space-y-4">
                <p>
                  BAUHAUS has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published.
                </p>
                <p>
                  Our program is a great opportunity for authors to submit complete manuscripts and work with BAUHAUS as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content—and find a publishing home for the book.
                </p>
                <p>
                  In this program, authors not only benefit from BAUHAUS's editorial expertise but also have the support of our TV and film producing teams. BAUHAUS requires the rights to produce each property in TV, film, and all media. In turn, authors will share in profits.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong className="text-white">Submission Guidelines:</strong> We evaluate fiction manuscripts only—no scripts, please. If you don't have an agent, please send us a query email with a brief overview of your book, a short description of your writing background, and the first five pages of your manuscript.
                </p>
                <p>
                  Please note if the manuscript has previously been submitted to publishing houses. We cannot accept submissions from legal minors. We'll be in touch as soon as possible if we'd like to pursue your work.
                </p>
                <p>
                  If you don't hear from us within three months, it means it's not the best fit at this time. Thank you for considering BAUHAUS as a place to send your work!
                </p>
              </div>
            </div>

            <div className="border border-gray-700 p-8 text-center max-w-xl mx-auto">
              <p className="text-gray-300 text-sm mb-2">Please submit by e-mail to</p>
              <a 
                href="mailto:submissions@bauhausproduction.com" 
                className="text-white font-medium hover:underline"
              >
                submissions@bauhausproduction.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
