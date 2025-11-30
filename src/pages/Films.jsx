import { useState, useEffect } from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import MediaCard from '../components/ui/MediaCard'
import NewsCard from '../components/ui/NewsCard'
import { films, news } from '../data/films'

export default function Films() {
  const [activeType, setActiveType] = useState('All')
  const types = ['All', 'Film', 'Documentary']

  useEffect(() => {
    document.title = 'Films & Documentaries | BAUHAUS'
  }, [])

  const filteredFilms = films.filter(film => 
    activeType === 'All' || film.type === activeType
  )

  return (
    <div className="pt-20">
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-8">
            Film
          </h1>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide justify-center">
            {films.slice(0, 4).map(film => (
              <div key={film.id} className="flex-shrink-0 w-48">
                <img 
                  src={film.poster} 
                  alt={film.title}
                  className="w-full h-72 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {films.slice(0, 4).map((_, idx) => (
              <div key={idx} className="w-2 h-2 rounded-full bg-gray-600"></div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper>
        <SectionTitle title="Recent News" />
        <div className="max-w-3xl mx-auto space-y-4">
          {news.map(item => (
            <NewsCard
              key={item.id}
              source={item.source}
              date={item.date}
              title={item.title}
              description={item.description}
              link="#"
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle 
          title="Our Productions" 
          subtitle="Films and documentaries from BAUHAUS"
        />
        
        <div className="flex justify-center gap-4 mb-12">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2 text-sm uppercase tracking-wider rounded transition-colors ${
                activeType === type
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {type === 'All' ? 'All' : type + 's'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredFilms.map(film => (
            <div key={film.id} className="group">
              <MediaCard
                image={film.poster}
                title={film.title}
                subtitle={`${film.type} | ${film.year}`}
                description={film.synopsis}
                buttonText={film.status === 'Available' ? 'Watch Now' : film.status}
              />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
