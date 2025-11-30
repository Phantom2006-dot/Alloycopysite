import { useEffect } from 'react'

const inquiryTypes = [
  { type: "Subrights Inquiries", contact: "Romy Golan", email: "subrights@bauhausproduction.com" },
  { type: "Film + TV Inquiries", contact: "Sarah Kim Campbell", email: "filmtv@bauhausproduction.com" },
  { type: "Press Inquiries", contact: "Michael Donkis", email: "press@bauhausproduction.com" },
]

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | BAUHAUS Production'
  }, [])

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-16">
            Contact
          </h1>
          
          <div className="space-y-10 text-center mb-16">
            {inquiryTypes.map((inquiry, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-sm mb-1">{inquiry.type}</h3>
                <a 
                  href={`mailto:${inquiry.email}`}
                  className="text-gray-400 hover:text-white transition-colors underline text-sm"
                >
                  {inquiry.contact}
                </a>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-center mb-20">
            <div>
              <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">New York</h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p>30 Hudson Yards</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Burbank</h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p>4000 Warner Blvd</p>
                <p>Burbank, CA 91522</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-8">
              The Collaborative - Book Submissions
            </h2>
            
            <h3 className="text-2xl md:text-3xl text-white text-center mb-10 font-serif">
              Looking to work with Bauhaus Production?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm leading-relaxed mb-12">
              <div className="space-y-4">
                <p>
                  Traditionally, Bauhaus Production has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published: The Collaborative.
                </p>
                <p>
                  Our Collaborative program is a great opportunity for authors to submit complete manuscripts and work with Bauhaus Production as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content—and find a publishing home for the book.
                </p>
                <p>
                  In this program, authors not only benefit from Bauhaus Production's editorial expertise but also have the support of our TV and film producing teams, each with a major studio behind them. As part of Warner Bros. Discovery, Bauhaus Production requires the rights to produce each property in TV, film, and all media. In turn, authors will share in profits.
                </p>
                <p>
                  What We're Looking For: We aim to acquire complete manuscripts with an emphasis on upmarket fiction for adults, including book club fiction, Mystery Thriller and Suspense, and select genre properties, and all categories in young adult. We're excited about fresh, new voices and strong, unique concepts.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Submission Guidelines: We evaluate fiction manuscripts only—no scripts, please. If you don't have an agent, please send us a query email with a brief overview of your book, a short description of your writing background, and the first five pages of your manuscript. Please note if the manuscript has previously been submitted to publishing houses. And, agents, feel free to get in touch on behalf of your clients. We cannot accept submissions from legal minors. We'll be in touch as soon as possible if we'd like to pursue your work. If you don't hear from us within three months, it means it's not the best fit at this time. Thank you for considering Bauhaus Production as a place to send your work!
                </p>
                <p>
                  Bauhaus Production is constantly developing new concepts in-house. Given the nature of the IP business, may already have independently developed or may in the future develop a project with ideas or themes that are similar to your submitted material. In submitting material to Bauhaus, you acknowledge that you will have no claim therein. Bauhaus will require a signed submission release prior to review of any writing material not being sent by an agent.
                </p>
              </div>
            </div>

            <div className="border border-gray-700 p-8 text-center max-w-xl mx-auto">
              <p className="text-gray-300 text-sm mb-2">Please submit by e-mail to</p>
              <a 
                href="mailto:thecollaborative@bauhausproduction.com" 
                className="text-white font-medium hover:underline"
              >
                thecollaborative@bauhausproduction.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
