import { useEffect } from 'react'

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

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | BAUHAUS'
  }, [])

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-16">
            Our Team
          </h1>
          
          {teamMembers.map((member, index) => (
            <div key={index} className="mb-16 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                {member.name}
              </h2>
              <p className="text-gray-400 font-serif italic mb-8">
                {member.title}
              </p>
              
              <div className="text-gray-300 text-sm leading-relaxed space-y-4 text-center">
                {member.bio.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
