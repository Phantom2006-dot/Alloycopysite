import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books, categories } from '../data/books'

export default function Books() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    document.title = 'Books | BAUHAUS Production'
  }, [])

  const featuredBooks = books.filter(b => b.featured).slice(0, 5)
  
  const filteredBooks = books.filter(book => {
    return activeCategory === 'All' || book.category === activeCategory
  })

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length)
  }, [featuredBooks.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length)
  }, [featuredBooks.length])

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
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide justify-center">
              {featuredBooks.map((book, idx) => (
                <div 
                  key={book.id} 
                  className="flex-shrink-0 w-36 md:w-44"
                >
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-52 md:h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
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
