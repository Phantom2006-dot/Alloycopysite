import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '../../components/ui/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import { destinations } from '../../data/tourism'

const destinationList = [
  { key: 'lagos', path: '/tourism/lagos' },
  { key: 'abuja', path: '/tourism/abuja' },
  { key: 'akwaIbom', path: '/tourism/akwa-ibom' },
  { key: 'osun', path: '/tourism/osun' },
  { key: 'ogun', path: '/tourism/ogun' },
]

export default function TourismIndex() {
  useEffect(() => {
    document.title = 'Discover Nigeria | BAUHAUS Tourism'
  }, [])

  return (
    <div className="pt-20">
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=1920&h=1080&fit=crop"
          alt="Nigeria landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Discover Nigeria
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience the beauty, culture, and warmth of Africa's most populous nation
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <SectionTitle 
          title="Our Destinations" 
          subtitle="Comprehensive guides to Nigeria's most captivating locations"
        />
        
        <div className="grid gap-8">
          {destinationList.map(({ key, path }) => {
            const dest = destinations[key]
            return (
              <Link 
                key={key}
                to={path}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-gray-900 p-8 flex flex-col justify-center">
                    <span className="text-amber-500 text-sm uppercase tracking-wider mb-2">
                      {dest.tagline}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Visit {dest.name}
                    </h2>
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {dest.description}
                    </p>
                    <div className="flex items-center text-white group-hover:text-amber-500 transition-colors">
                      <span className="text-sm uppercase tracking-wider">Explore Guide</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </SectionWrapper>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Plan Your Nigerian Adventure</h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you're seeking cultural immersion, natural wonders, or urban excitement, Nigeria has something for every traveler.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Contact Our Travel Team
          </Link>
        </div>
      </section>
    </div>
  )
}
