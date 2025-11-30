import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About Us | BAUHAUS'
  }, [])

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-12">
            Who We Are
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-serif italic leading-relaxed text-center mb-12">
            BAUHAUS is a Nigerian cultural company dedicated to celebrating and sharing the richness of Nigerian heritage through books, films, documentaries, publishing, and tourism.
          </p>
          
          <div className="flex justify-center mb-16">
            <div className="w-32 h-0.5 bg-white"></div>
          </div>
          
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-10">
            What We Do
          </h2>
          
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 max-w-3xl mx-auto text-center">
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
          
          <div className="flex justify-center my-16">
            <div className="w-32 h-0.5 bg-white"></div>
          </div>
          
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-10">
            Our Vision
          </h2>
          
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 max-w-3xl mx-auto text-center">
            <p>
              We envision a world where Nigerian stories, culture, and destinations are celebrated globally. Through our work in books, films, publishing, and tourism, we aim to be the premier gateway to Nigerian cultural experiences.
            </p>
            <p>
              Our mission is to discover, develop, and deliver compelling Nigerian content that resonates with audiences worldwide while creating meaningful connections between Nigeria and the global community.
            </p>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="w-64 md:w-80">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" 
                alt="Featured Book"
                className="w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
