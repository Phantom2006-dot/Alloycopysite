import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About Us | BAUHAUS'
  }, [])

  return (
    <div className="pt-28 lg:pt-32 bg-black min-h-screen">
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-black pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl text-white font-serif tracking-wide mb-8">
              about us
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-serif italic leading-relaxed max-w-4xl mx-auto">
              BAUHAUS is a Nigerian cultural company dedicated to celebrating and sharing the richness of Nigerian heritage
            </p>
          </div>
          
          <div className="flex justify-center mb-20">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                What We Do
              </span>
              <div className="text-gray-300 text-base leading-relaxed space-y-6">
                <p>
                  BAUHAUS operates across multiple verticals to bring Nigerian culture to the world. We develop and produce original books, television series, documentaries, and feature films that showcase the depth and diversity of Nigerian storytelling.
                </p>
                <p>
                  Our publishing division works with emerging and established Nigerian authors to bring their stories to global audiences. We provide editorial expertise, production support, and distribution partnerships to ensure every story reaches its full potential.
                </p>
                <p>
                  Through our tourism division, we create immersive travel experiences that take visitors to the heart of Nigerian culture. From the vibrant streets of Lagos to the historical sites of Ile-Ife, we curate journeys that educate, inspire, and connect travelers with authentic Nigerian experiences.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 rounded-lg blur-xl" />
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop" 
                  alt="Featured Book"
                  className="relative w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mb-20">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 md:p-10">
              <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                Our Vision
              </span>
              <p className="text-gray-300 text-base leading-relaxed">
                We envision a world where Nigerian stories, culture, and destinations are celebrated globally. Through our work in books, films, publishing, and tourism, we aim to be the premier gateway to Nigerian cultural experiences.
              </p>
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 md:p-10">
              <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                Our Mission
              </span>
              <p className="text-gray-300 text-base leading-relaxed">
                Our mission is to discover, develop, and deliver compelling Nigerian content that resonates with audiences worldwide while creating meaningful connections between Nigeria and the global community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
