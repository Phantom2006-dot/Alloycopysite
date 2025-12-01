import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const filmsList = [
  { id: 1, title: "Clique", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, title: "The Sisterhood", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  { id: 3, title: "It's a Boy Girl Thing", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" },
  { id: 4, title: "Sex Drive", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop" },
  { id: 5, title: "Purple Hearts", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop" },
  { id: 6, title: "Work It", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" },
]

const filmNews = [
  { id: 1, source: "Deadline", date: "May 2, 2025", title: "Luke Wilson & Heather Graham To Star In Rom-Com 'Getting Rid Of Matthew' From 'Purple Hearts' & 'Gossip Girl' Outfit BAUHAUS; Architect Launching For Cannes" },
  { id: 2, source: "Deadline", date: "February 5, 2025", title: "Rupert Holmes' 'Escape (The Pina Colada Song)' Getting Rom-Com Feature Treatment" },
  { id: 3, source: "Deadline", date: "December 17, 2024", title: "Tatmania's John Hoberg & Kat Likkel Tapped To Script 'Christmas Forever: Part Animated Feature From BAUHAUS" },
  { id: 4, source: "Deadline", date: "October 15, 2024", title: "'Pride' Movie, Modern Take On Jane Austen, In Works At Netflix From Higher Ground & BAUHAUS" },
  { id: 5, source: "Deadline", date: "March 28, 2024", title: "BAUHAUS Moves Into Animation With Feature Film 'Christmas Forever: Escape to the North Pole'" },
  { id: 6, source: "Deadline", date: "November 19, 2024", title: "Bestselling Rom-Com 'In A Holidaze' For Netflix & BAUHAUS" },
]

export default function Films() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.title = 'Film | BAUHAUS'
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToNext = useCallback(() => {
    if (isAnimating || filmsList.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % filmsList.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  const goToPrev = useCallback(() => {
    if (isAnimating || filmsList.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + filmsList.length) % filmsList.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(goToNext, 1000)
    return () => clearInterval(timer)
  }, [goToNext])

  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + filmsList.length) % filmsList.length
      result.push({ ...filmsList[index], offset: i })
    }
    return result
  }

  const getTranslateX = (offset) => {
    return offset * (isMobile ? 180 : 280)
  }

  return (
    <div className="pt-28 lg:pt-32 bg-black min-h-screen">
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6">
              Our Productions
            </span>
            <h1 className="text-4xl md:text-5xl text-white font-serif tracking-wide">
              film
            </h1>
          </div>
          
          <div className="relative min-h-[55vh] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {getVisibleItems().map((item, idx) => {
                const offset = item.offset
                const isCenter = offset === 0
                const absOffset = Math.abs(offset)
                const scale = isCenter ? 1 : 0.7 - (absOffset * 0.05)
                const opacity = isCenter ? 1 : 0.5 - (absOffset * 0.1)
                const translateX = getTranslateX(offset)

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity: Math.max(opacity, 0.2),
                      zIndex: 10 - absOffset,
                    }}
                  >
                    <div 
                      className={`relative overflow-hidden shadow-2xl transition-all duration-500 ${
                        isCenter 
                          ? 'w-52 sm:w-60 md:w-72 h-72 sm:h-80 md:h-96 ring-1 ring-white/20' 
                          : 'w-44 sm:w-52 md:w-60 h-60 sm:h-72 md:h-80'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
              {filmsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(idx)
                      setTimeout(() => setIsAnimating(false), 400)
                    }
                  }}
                  className={`transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6 h-1.5 bg-white rounded-full' 
                      : 'w-1.5 h-1.5 bg-gray-500 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
              Latest Updates
            </span>
            <h2 className="text-2xl md:text-3xl text-white font-serif">
              Recent News
            </h2>
          </div>
          
          <div className="space-y-4">
            {filmNews.map((news) => (
              <a
                key={news.id}
                href="#"
                className="group block bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 hover:bg-neutral-900/80 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <span className="text-white font-medium text-sm">
                    {news.source}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {news.date}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {news.title}
                </p>
                <div className="mt-4 flex items-center gap-2 text-gray-500 text-xs group-hover:text-white transition-colors">
                  <span>Read More</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
