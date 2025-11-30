import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books, categories } from '../data/books'

export default function Books() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    document.title = 'Books | BAUHAUS Production'
  }, [])

  const featuredBooks = books.filter(b => b.featured).slice(0, 6)
  
  const filteredBooks = books.filter(book => {
    return activeCategory === 'All' || book.category === activeCategory
  })

  const goToNext = useCallback(() => {
    if (isAnimating || featuredBooks.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, featuredBooks.length])

  const goToPrev = useCallback(() => {
    if (isAnimating || featuredBooks.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, featuredBooks.length])

  useEffect(() => {
    const timer = setInterval(goToNext, 2000)
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

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white mb-2">
            Books
          </h1>
          <p className="text-gray-400 text-xs">2025 Releases</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[50vh] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {getVisibleItems().map((item, idx) => {
                const offset = item.offset
                const isCenter = offset === 0
                const scale = isCenter ? 1 : 0.75
                const opacity = isCenter ? 1 : 0.6
                const translateX = offset * 300

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    <div className="w-56 md:w-64 h-80 md:h-96 bg-gray-900 overflow-hidden shadow-2xl">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {featuredBooks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(idx)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-8">
            Featured Library
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', 'Adult', 'Young Adult', 'Middle Grade'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs tracking-wider transition-colors ${
                  activeCategory === category
                    ? 'text-white underline'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {filteredBooks.map(book => (
              <div key={book.id} className="group cursor-pointer">
                <div className="overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-40 md:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
