import { useEffect } from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import TeamCard from '../components/ui/TeamCard'

const team = [
  {
    name: "Executive Team",
    title: "Leadership",
    bio: `BAUHAUS is led by a team of experienced professionals passionate about Nigerian storytelling and cultural preservation.

Our leadership brings together expertise in publishing, film production, and tourism development, united by a common vision to share Nigeria's rich heritage with the world.

With offices in the UK and Nigeria, our team works across continents to create content that resonates globally while remaining authentically Nigerian.`
  }
]

const milestones = [
  { year: "2018", title: "Founded", description: "BAUHAUS established with a mission to promote Nigerian culture" },
  { year: "2019", title: "First Publications", description: "Released our first book titles focusing on Nigerian fiction" },
  { year: "2020", title: "Film Division", description: "Expanded into documentary and film production" },
  { year: "2021", title: "UK Office", description: "Opened our Northampton office to serve the diaspora" },
  { year: "2022", title: "Tourism Launch", description: "Introduced destination guides and travel services" },
  { year: "2023", title: "Award Recognition", description: "Multiple publications received literary awards" },
  { year: "2024", title: "Growing Impact", description: "Expanded events program across three continents" },
]

export default function About() {
  useEffect(() => {
    document.title = 'About Us | BAUHAUS'
  }, [])

  return (
    <div className="pt-20">
      <SectionWrapper>
        <SectionTitle title="Who We Are" />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            BAUHAUS develops and produces the best books, films, and tourism experiences that speak to the richness of Nigerian culture and the universal journey of self-discovery.
          </p>
          <div className="w-24 h-0.5 bg-white mx-auto"></div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle title="What We Do" />
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            BAUHAUS is a creative think tank and full-service editorial partner that develops and produces original books, television series, feature films, and comprehensive tourism experiences. We generate unique commercial entertainment properties and collaborate with authors, leading publishers, streaming platforms, television networks, and movie studios to deliver our stories to the world.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Our tourism division provides authentic experiences for travelers seeking to discover Nigeria's diverse landscapes, rich history, and vibrant culture. From the bustling streets of Lagos to the sacred groves of Osun, we curate journeys that create lasting memories.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Through our publishing arm, we support emerging and established Nigerian writers, providing the editorial expertise and platform they need to share their stories with global audiences.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To amplify Nigerian voices and stories through quality publishing, film production, and immersive tourism experiences. We believe in the power of authentic storytelling to bridge cultures, inspire understanding, and celebrate the richness of Nigerian heritage.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To be the premier platform for Nigerian creative content and cultural experiences, recognized globally for excellence in publishing, film production, and sustainable tourism that empowers communities and preserves heritage.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle 
          title="Our Journey" 
          subtitle="Key milestones in the BAUHAUS story"
        />
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform md:-translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <span className="text-amber-500 font-bold text-lg">{milestone.year}</span>
                    <h4 className="text-white font-semibold text-xl mt-1">{milestone.title}</h4>
                    <p className="text-gray-400 mt-2">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white rounded-full transform md:-translate-x-1/2 border-4 border-black"></div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle title="Our Team" />
        <div className="max-w-4xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle title="Our Values" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h4 className="text-white font-semibold text-lg mb-3">Authenticity</h4>
            <p className="text-gray-400">We tell genuine Nigerian stories that reflect the true diversity and richness of our culture.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="text-white font-semibold text-lg mb-3">Excellence</h4>
            <p className="text-gray-400">We maintain the highest standards in everything we create, from books to films to travel experiences.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="text-white font-semibold text-lg mb-3">Community</h4>
            <p className="text-gray-400">We invest in Nigerian talent and work with local communities to create sustainable impact.</p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
