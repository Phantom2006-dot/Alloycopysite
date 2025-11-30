import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const filmsList = [
  { id: 1, title: "Clique", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, title: "The Sisterhood", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  { id: 3, title: "It's a Boy Girl Thing", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" },
  { id: 4, title: "Sex Drive", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop" },
  { id: 5, title: "Purple Hearts", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop" },
  { id: 6, title: "Work It", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" },
]

const filmNews = [
  { id: 1, source: "Deadline", date: "May 2, 2025", title: "Luke Wilson & Heather Graham To Star In Rom-Com 'Getting Rid Of Matthew' From 'Purple Hearts' & 'Gossip Girl' Outfit Bauhaus; Architect Launching For Cannes" },
  { id: 2, source: "Deadline", date: "February 5, 2025", title: "Rupert Holmes' 'Escape (The Pina Colada Song)' Getting Rom-Com Feature Treatment" },
  { id: 3, source: "Deadline", date: "December 17, 2024", title: "Tatmania's John Hoberg & Kat Likkel Tapped To Script 'Christmas Forever: Part Animated Feature From Bauhaus Production" },
  { id: 4, source: "Deadline", date: "October 15, 2024", title: "'Pride' Movie, Modern Take On Jane Austen, In Works At Netflix From Higher Ground & Bauhaus" },
  { id: 5, source: "Deadline", date: "March 28, 2024", title: "Bauhaus Production Moves Into Animation With Feature Film 'Christmas Forever: Escape to the North Pole'" },
  { id: 6, source: "Deadline", date: "November 19, 2024", title: "Bestselling Rom-Com 'In A Holidaze' For Netflix & Bauhaus Production" },
]

export default function Films() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    document.title = 'Film | BAUHAUS Production'
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filmsList.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filmsList.length) % filmsList.length)
  }, [])

  const getVisibleFilms = () => {
    const films = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + filmsList.length) % filmsList.length
      films.push({ ...filmsList[index], offset: i })
    }
    return films
  }

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-12">
            Film
          </h1>
          
          <div className="relative">
            <div className="flex justify-center items-center gap-3 overflow-hidden py-4">
              {getVisibleFilms().map((film) => {
                const isCenter = film.offset === 0
                return (
                  <div 
                    key={`${film.id}-${film.offset}`} 
                    className={`flex-shrink-0 transition-all duration-500 ${
                      isCenter ? 'w-36 md:w-44 z-10' : 'w-28 md:w-36 opacity-60'
                    }`}
                  >
                    <img 
                      src={film.image} 
                      alt={film.title}
                      className="w-full h-44 md:h-56 object-cover"
                    />
                  </div>
                )
              })}
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {filmsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif text-white text-center mb-12">
            Recent News
          </h2>
          
          <div className="space-y-4">
            {filmNews.map((news) => (
              <a
                key={news.id}
                href="#"
                className="block border border-gray-700 hover:border-gray-500 transition-colors p-4 text-center"
              >
                <p className="text-white font-semibold text-sm mb-2">
                  {news.source} ({news.date})
                </p>
                <p className="text-gray-400 text-sm">
                  {news.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
