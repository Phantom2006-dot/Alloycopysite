import { useState, useEffect } from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import MediaCard from '../components/ui/MediaCard'
import { books, categories } from '../data/books'

export default function Books() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeYear, setActiveYear] = useState('All')

  useEffect(() => {
    document.title = 'Books | BAUHAUS'
  }, [])

  const years = ['All', ...new Set(books.map(b => b.year.toString()))].sort((a, b) => {
    if (a === 'All') return -1
    if (b === 'All') return 1
    return b - a
  })

  const filteredBooks = books.filter(book => {
    const categoryMatch = activeCategory === 'All' || book.category === activeCategory
    const yearMatch = activeYear === 'All' || book.year.toString() === activeYear
    return categoryMatch && yearMatch
  })

  const featuredBooks = books.filter(b => b.featured).slice(0, 4)

  return (
    <div className="pt-20">
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">
            Books
          </h1>
          <p className="text-gray-400">2024 Releases</p>
        </div>
      </section>

      <section className="py-8 bg-black border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide justify-center">
            {featuredBooks.map(book => (
              <div key={book.id} className="flex-shrink-0 w-48">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-72 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper>
        <SectionTitle title="Featured Library" />
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 text-sm rounded transition-colors ${
                  activeYear === year
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {year === 'All' ? 'All Years' : year}
              </button>
            ))}
          </div>
          <span className="text-gray-600 hidden md:inline">|</span>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm rounded transition-colors ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBooks.map(book => (
            <MediaCard
              key={book.id}
              image={book.cover}
              title={book.title}
              subtitle={book.author}
              description={book.description}
              buttonText="View Details"
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No books found matching your criteria.</p>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}
