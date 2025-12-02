import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About Us | BAUHAUS'
  }, [])

  return (
    <div className="pt-24 md:pt-28 lg:pt-32 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-black/50 to-black pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80 mb-4 md:mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-serif font-light tracking-tight mb-6 md:mb-8 leading-tight">
              About <span className="font-normal">BAUHAUS</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-serif italic leading-relaxed mb-8">
                BAUHAUS is a Nigerian cultural company dedicated to celebrating and sharing the richness of Nigerian heritage
              </p>
              <div className="w-32 h-0.5 bg-gradient-to-r from-amber-500/30 via-amber-500 to-amber-500/30 mx-auto" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6">
            {/* Image Section */}
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-neutral-800/20 to-amber-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop&q=80" 
                    alt="Nigerian Cultural Artifacts"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80 mb-4">
                    What We Do
                  </span>
                  <h2 className="text-2xl md:text-3xl text-white font-serif font-light mb-6">
                    Showcasing Nigerian Excellence
                  </h2>
                </div>
                
                <div className="space-y-5 md:space-y-6">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose">
                    BAUHAUS operates across multiple verticals to bring Nigerian culture to the world. We develop and produce original books, television series, documentaries, and feature films that showcase the depth and diversity of Nigerian storytelling.
                  </p>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose">
                    Our publishing division works with emerging and established Nigerian authors to bring their stories to global audiences. We provide editorial expertise, production support, and distribution partnerships to ensure every story reaches its full potential.
                  </p>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose">
                    Through our tourism division, we create immersive travel experiences that take visitors to the heart of Nigerian culture. From the vibrant streets of Lagos to the historical sites of Ile-Ife, we curate journeys that educate, inspire, and connect travelers with authentic Nigerian experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="flex justify-center mb-12 md:mb-16 lg:mb-20 px-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          
          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6">
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-8 md:p-10 hover:border-amber-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80">
                    Our Vision
                  </span>
                </div>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  We envision a world where Nigerian stories, culture, and destinations are celebrated globally. Through our work in books, films, publishing, and tourism, we aim to be the premier gateway to Nigerian cultural experiences.
                </p>
              </div>
            </div>
            
            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent to-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-8 md:p-10 hover:border-amber-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80">
                    Our Mission
                  </span>
                </div>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Our mission is to discover, develop, and deliver compelling Nigerian content that resonates with audiences worldwide while creating meaningful connections between Nigeria and the global community.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Divider */}
          <div className="mt-16 md:mt-20 lg:mt-24 px-4">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
          </div>
        </div>
      </section>
      
      {/* Optional Stats Section - Uncomment if needed */}
      
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-white mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}

// Optional stats data

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '25+', label: 'Authors' },
  { value: '10k+', label: 'Travelers' },
  { value: '5+', label: 'Countries' }
]
