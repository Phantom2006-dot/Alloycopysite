import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import CTAButton from '../components/ui/CTAButton'
import { events, locations, categories } from '../data/events'

export default function Events() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  useEffect(() => {
    document.title = 'Events | BAUHAUS'
  }, [])

  const filteredEvents = events.filter(event => {
    const typeMatch = event.type === activeTab
    const locationMatch = locationFilter === 'All Locations' || event.location === locationFilter
    const categoryMatch = categoryFilter === 'All Categories' || event.category === categoryFilter
    return typeMatch && locationMatch && categoryMatch
  })

  return (
    <div className="pt-20">
      <SectionWrapper>
        <SectionTitle 
          title="Events" 
          subtitle="Join us at book launches, screenings, and cultural celebrations"
        />

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-8 py-3 text-sm uppercase tracking-wider rounded transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-8 py-3 text-sm uppercase tracking-wider rounded transition-colors ${
              activeTab === 'past'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-white"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {filteredEvents.map(event => (
            <div 
              key={event.id}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-xs uppercase tracking-wider rounded mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                  </div>
                </div>
                
                {activeTab === 'upcoming' && (
                  <div className="flex-shrink-0">
                    <CTAButton variant="secondary" size="sm">
                      Register
                    </CTAButton>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </SectionWrapper>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Host an Event with BAUHAUS</h2>
          <p className="text-gray-400 mb-8">
            Interested in partnering with us for a book launch, screening, or cultural event?
          </p>
          <CTAButton to="/contact">Get in Touch</CTAButton>
        </div>
      </section>
    </div>
  )
}
