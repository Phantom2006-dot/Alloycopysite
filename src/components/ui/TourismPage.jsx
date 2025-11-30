import { useEffect } from 'react'
import { MapPin, Clock, Shield, Car, Phone } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import SectionTitle from './SectionTitle'
import CTAButton from './CTAButton'

export default function TourismPage({ destination }) {
  useEffect(() => {
    document.title = `Visit ${destination.name} | BAUHAUS Tourism`
  }, [destination.name])

  return (
    <div className="pt-20">
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <span className="text-amber-500 text-sm uppercase tracking-wider mb-2 block">
              {destination.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Visit {destination.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <SectionTitle title="Top Attractions" />
        <div className="grid md:grid-cols-2 gap-8">
          {destination.highlights.map((highlight, index) => (
            <div key={index} className="group">
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img 
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{highlight.title}</h3>
              <p className="text-gray-400">{highlight.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {destination.nightlife && (
        <SectionWrapper background="dark">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="Nightlife & Entertainment" />
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              {destination.nightlife}
            </p>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper>
        <SectionTitle title="Practical Information" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-amber-500" />
              <h3 className="text-white font-semibold">Best Time to Visit</h3>
            </div>
            <p className="text-gray-400 text-sm">{destination.bestTime}</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-6 w-6 text-amber-500" />
              <h3 className="text-white font-semibold">Transportation</h3>
            </div>
            <p className="text-gray-400 text-sm">{destination.transportation}</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-amber-500" />
              <h3 className="text-white font-semibold">Safety Tips</h3>
            </div>
            <p className="text-gray-400 text-sm">{destination.safety}</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-6 w-6 text-amber-500" />
              <h3 className="text-white font-semibold">Emergency Contacts</h3>
            </div>
            <p className="text-gray-400 text-sm">{destination.emergencyContacts}</p>
          </div>
        </div>
      </SectionWrapper>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Explore {destination.name}?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Let us help you plan your perfect trip with personalized recommendations and local insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/contact">Contact Our Travel Team</CTAButton>
            <CTAButton to="/tourism" variant="secondary">View All Destinations</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
