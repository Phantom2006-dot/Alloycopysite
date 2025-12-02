import { useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Globe, Building, BookOpen, Briefcase } from 'lucide-react'

const inquiryTypes = [
  { 
    type: "General Inquiries", 
    contact: "General Team", 
    email: "info@bauhausproduction.com",
    icon: <Globe className="h-5 w-5" />,
    description: "For general questions and information"
  },
  { 
    type: "Film + TV Inquiries", 
    contact: "Production Team", 
    email: "filmtv@bauhausproduction.com",
    icon: <Briefcase className="h-5 w-5" />,
    description: "Production collaborations and partnerships"
  },
  { 
    type: "Publishing Inquiries", 
    contact: "Editorial Team", 
    email: "publishing@bauhausproduction.com",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Book submissions and publishing opportunities"
  },
  { 
    type: "Tourism Inquiries", 
    contact: "Tourism Team", 
    email: "tourism@bauhausproduction.com",
    icon: <Building className="h-5 w-5" />,
    description: "Travel experiences and cultural tours"
  },
]

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | BAUHAUS'
  }, [])

  return (
    <div className="pt-32 md:pt-36 lg:pt-40 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-black/40 to-black pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80 mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-serif font-light tracking-tight mb-6">
              Contact <span className="font-normal">Us</span>
            </h1>
            <div className="max-w-2xl mx-auto px-4">
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Reach out to our specialized teams for inquiries, collaborations, or to begin your journey with BAUHAUS
              </p>
            </div>
          </div>

          {/* Inquiry Cards Grid - Borderless Design */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {inquiryTypes.map((inquiry, index) => (
                <a
                  key={index}
                  href={`mailto:${inquiry.email}`}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-neutral-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-neutral-900/50 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-amber-900/20">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-amber-500/20 transition-colors duration-300">
                      <div className="text-amber-500">
                        {inquiry.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-white font-medium text-base md:text-lg mb-2 group-hover:text-amber-100 transition-colors duration-300">
                      {inquiry.type}
                    </h3>
                    
                    <p className="text-gray-400 text-xs mb-3 flex-1">
                      {inquiry.description}
                    </p>
                    
                    <div className="pt-4 mt-auto">
                      <p className="text-amber-500 text-sm font-medium mb-1">
                        {inquiry.contact}
                      </p>
                      <p className="text-gray-400 text-xs break-words hover:text-amber-100 transition-colors duration-200">
                        {inquiry.email}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Offices Section - Borderless Design */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <div className="text-center mb-10 md:mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Our Locations
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-serif font-light">
                Global Presence
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {/* UK Office */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-neutral-900/30 to-neutral-900/10 backdrop-blur-sm rounded-xl p-8 md:p-10 hover:bg-neutral-900/40 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg md:text-xl mb-2">United Kingdom Office</h3>
                      <p className="text-gray-400 text-sm">European Headquarters</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 ml-18">
                    <div className="text-gray-300">
                      <p className="font-medium text-white mb-1">Address</p>
                      <p className="text-sm">4 Notre Dame Mews</p>
                      <p className="text-sm">Northampton, NN1 2BG</p>
                      <p className="text-sm">United Kingdom</p>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <a 
                        href="tel:+441604434082" 
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-800/30 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                          <Phone className="h-3.5 w-3.5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />
                        </div>
                        <span className="text-sm">+44 1604 434082</span>
                      </a>
                      
                      <a 
                        href="mailto:info@bauhausproduction.com" 
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-800/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
                          <Mail className="h-3.5 w-3.5 text-gray-500 group-hover:text-amber-400 transition-colors duration-200" />
                        </div>
                        <span className="text-sm break-all">info@bauhausproduction.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nigeria Office */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-neutral-900/30 to-neutral-900/10 backdrop-blur-sm rounded-xl p-8 md:p-10 hover:bg-neutral-900/40 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg md:text-xl mb-2">Nigeria Office</h3>
                      <p className="text-gray-400 text-sm">African Headquarters</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 ml-18">
                    <div className="text-gray-300">
                      <p className="font-medium text-white mb-1">Address</p>
                      <p className="text-sm">41 Coker Road</p>
                      <p className="text-sm">Ilupeju, Lagos</p>
                      <p className="text-sm">Nigeria</p>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <a 
                        href="tel:+2347038892961" 
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-800/30 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                          <Phone className="h-3.5 w-3.5 text-gray-500 group-hover:text-green-400 transition-colors duration-200" />
                        </div>
                        <span className="text-sm">+234 703 889 2961</span>
                      </a>
                      
                      <a 
                        href="mailto:akinalaka@bauhaus-education.co.uk" 
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-800/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
                          <Mail className="h-3.5 w-3.5 text-gray-500 group-hover:text-amber-400 transition-colors duration-200" />
                        </div>
                        <span className="text-sm break-all">akinalaka@bauhaus-education.co.uk</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center mb-12 md:mb-16 lg:mb-20">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          </div>

          {/* Publishing Submission Section - Borderless Design */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-neutral-900/10 to-amber-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-gradient-to-b from-neutral-900/20 to-neutral-900/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 hover:bg-neutral-900/30 transition-all duration-300 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
              </div>
              
              <div className="relative">
                <div className="text-center mb-10 md:mb-12">
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80 mb-4">
                    Publishing Opportunities
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-serif font-light mb-4 md:mb-6">
                    Partner with BAUHAUS
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    Submit your manuscript and work with us to shape your novel and find a publishing home
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 md:gap-10 mb-10 md:mb-12">
                  <div className="space-y-5 md:space-y-6">
                    <div className="bg-neutral-900/20 backdrop-blur-sm rounded-xl p-6 hover:bg-neutral-900/30 transition-all duration-300">
                      <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-amber-500" />
                        Our Approach
                      </h3>
                      <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                        <p>
                          BAUHAUS has developed its properties internally, originating concepts in-house and guiding the development process with writers. Now there's another way to work with us on manuscripts you've already completed or self-published.
                        </p>
                        <p>
                          Our program is a great opportunity for authors to submit complete manuscripts and work with BAUHAUS as partners to shape the novel—reconceptualizing, reframing, or deepening the existing content.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-5 md:space-y-6">
                    <div className="bg-neutral-900/20 backdrop-blur-sm rounded-xl p-6 hover:bg-neutral-900/30 transition-all duration-300">
                      <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-3">
                        <Send className="h-5 w-5 text-amber-500" />
                        Submission Guidelines
                      </h3>
                      <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                        <p>
                          <strong className="text-white">We evaluate fiction manuscripts only</strong>—no scripts, please. If you don't have an agent, please send us a query email with:
                        </p>
                        <ul className="space-y-2 pl-5 list-disc text-gray-300">
                          <li>Brief overview of your book</li>
                          <li>Short description of your writing background</li>
                          <li>First five pages of your manuscript</li>
                        </ul>
                        <p>
                          Please note if the manuscript has previously been submitted to publishing houses. We'll be in touch as soon as possible if we'd like to pursue your work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a 
                    href="mailto:submissions@bauhausproduction.com" 
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-semibold text-sm uppercase tracking-wider hover:from-amber-600 hover:to-amber-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 min-w-[240px]"
                  >
                    <Send className="h-4 w-4" />
                    Submit Your Manuscript
                  </a>
                  <p className="text-gray-500 text-xs mt-4">
                    submissions@bauhausproduction.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Divider */}
          <div className="mt-16 md:mt-20 lg:mt-24">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800/30 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  )
}
