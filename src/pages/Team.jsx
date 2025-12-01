import { useEffect } from 'react'
import { Users, Award, Globe, Heart } from 'lucide-react'

const teamMembers = [
  {
    name: "Leadership Team",
    title: "BAUHAUS Executive Team",
    bio: [
      "BAUHAUS is led by a team of passionate professionals dedicated to celebrating Nigerian culture through books, films, documentaries, publishing, and tourism.",
      "Our leadership brings together expertise from publishing, film production, and tourism industries, united by a shared vision of sharing Nigerian stories with the world.",
      "With offices in both the United Kingdom and Nigeria, our team works across borders to create content and experiences that resonate with global audiences while staying true to authentic Nigerian narratives.",
      "We are committed to discovering and nurturing new Nigerian voices, producing compelling visual content, and creating meaningful travel experiences that connect visitors with the heart of Nigerian culture.",
      "Our team's diverse backgrounds in editorial, production, marketing, and tourism operations enable us to deliver excellence across all of BAUHAUS's verticals."
    ]
  }
]

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Deep love for Nigerian culture and storytelling"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Commitment to producing world-class content"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Bridging Nigeria with audiences worldwide"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together across borders and disciplines"
  }
]

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | BAUHAUS'
  }, [])

  return (
    <div className="pt-28 lg:pt-32 bg-black min-h-screen">
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 to-black pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6">
              The People Behind BAUHAUS
            </span>
            <h1 className="text-4xl md:text-5xl text-white font-serif tracking-wide">
              team
            </h1>
          </div>
          
          {teamMembers.map((member, index) => (
            <div key={index} className="max-w-4xl mx-auto mb-20">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">
                  {member.name}
                </h2>
                <p className="text-gray-400 font-serif italic text-lg">
                  {member.title}
                </p>
              </div>
              
              <div className="flex justify-center mb-10">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              </div>
              
              <div className="text-gray-300 text-base leading-relaxed space-y-6 text-center">
                {member.bio.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 text-center hover:border-neutral-600 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-neutral-800 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
