import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books, categories } from '../data/books'

export default function Books() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.title = 'Books | BAUHAUS Production'
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const featuredBooks = books.filter(b => b.featured).slice(0, 6)
  
  const filteredBooks = books.filter(book => {
    return activeCategory === 'All' || book.category === activeCategory
  })

  const goToNext = useCallback(() => {
    if (isAnimating || featuredBooks.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, featuredBooks.length])

  const goToPrev = useCallback(() => {
    if (isAnimating || featuredBooks.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, featuredBooks.length])

  useEffect(() => {
    const timer = setInterval(goToNext, 1000)
    return () => clearInterval(timer)
  }, [goToNext])

  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + featuredBooks.length) % featuredBooks.length
      result.push({ ...featuredBooks[index], offset: i })
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
              2025 Releases
            </span>
            <h1 className="text-4xl md:text-5xl text-white font-serif tracking-wide">
              books
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
                        src={item.cover}
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
              {featuredBooks.map((_, idx) => (
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
              Browse Collection
            </span>
            <h2 className="text-2xl md:text-3xl text-white font-serif">
              Featured Library
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', 'Adult', 'Young Adult', 'Middle Grade'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.1em] rounded-full border transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-400 border-neutral-700 hover:border-neutral-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
