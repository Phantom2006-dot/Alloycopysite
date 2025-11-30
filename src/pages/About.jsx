import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About Us | BAUHAUS Production'
  }, [])

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-12">
            Who We Are
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-serif italic leading-relaxed text-center mb-12">
            Bauhaus Production, a Warner Bros. Discovery Company, develops and produces the best commercial books, television, and films that speak to the journey of self-discovery and coming of age at any age.
          </p>
          
          <div className="flex justify-center mb-16">
            <div className="w-32 h-0.5 bg-white"></div>
          </div>
          
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-10">
            What We Do
          </h2>
          
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              Bauhaus Production, a Warner Bros. Discovery Company, is a creative think tank and full-service editorial partner that develops and produces original books, television series, and feature films. The company generates unique commercial entertainment franchises and collaborates with authors, leading publishers, streaming platforms, television networks, and movie studios to deliver its properties to the world.
            </p>
            <p>
              More than eighty of Bauhaus Production's books have reached the <em className="font-serif">New York Times</em> Best Sellers list, including most recently <em className="font-serif">Everything We Never Said</em> by Sloan Harlow, <em className="font-serif">Liar's Beach</em> by Katie Cotugno, <em className="font-serif">The Davenports</em> by Krystal Marquis, the American Royals series by Katharine McGee, <em className="font-serif">You</em> by Caroline Kepnes, <em className="font-serif">The Wife Upstairs</em> by Rachel Hawkins, <em className="font-serif">Tokyo Ever After</em> and <em className="font-serif">Tokyo Dreaming</em> by Emiko Jean, and <em className="font-serif">Everything, Everything</em>, <em className="font-serif">The Sun is also a Star</em>, and <em className="font-serif">Instructions for Dancing</em> by Nicola Yoon. Bestselling franchises The Sisterhood of the Traveling Pants, Gossip Girl, The Vampire Diaries, and Pretty Little Liars have sold tens of millions of copies worldwide.
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
