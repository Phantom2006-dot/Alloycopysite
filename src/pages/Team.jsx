import { useEffect } from 'react'

const teamMembers = [
  {
    name: "Leslie Morgenstein",
    title: "Chief Creative Officer and President of Bauhaus Production",
    bio: [
      "Leslie Morgenstein is the founder and President and Chief Creative Officer of Bauhaus Production, a creator and producer of youth-oriented books, television and film. The Los Angeles and New York-based production company officially became part of Warner Bros. Television in 2012, which later evolved into Warner Bros. Discovery, resulting in an ongoing exclusive television deal at the studio. Bauhaus Production has a motion picture deal at Netflix, as well.",
      "Morgenstein has produced numerous feature films, including three consecutive number one films for Netflix: \"You Are SO Not Invited to My Bat Mitzvah,\" starring Adam Sandler and Idina Menzel; \"Purple Hearts,\" starring Sofia Carson and Nicholas Galitzine; and \"Work It,\" starring Sabrina Carpenter. He also produced \"The Sisterhood of the Traveling Pants\" franchise for Warner Bros., and the genre film \"Tarot,\" which Sony Pictures released theatrically in 2024. He currently has three motion pictures in development at Netflix, including \"Pride,\" a co-production with the Obamas' Higher Ground, which is a modern-day retelling of Pride and Prejudice.",
      "On the television side, Morgenstein has produced more than 500 hours of some of the most iconic pop culture television of the 2000s. Recent television credits include the Netflix global hit \"You,\" starring Penn Badgley, and Max's \"Pretty Little Liars\" franchise. His previous television credits include executive producing both iterations of \"Gossip Girl,\" \"The Vampire Diaries\" and both of its spinoffs, \"The Originals\" and \"Legacies,\" the OG \"Pretty Little Liars,\" and \"The 100.\"",
      "Morgenstein oversees the development and licensing of approximately 20 new books a year, which are published globally in more than 40 languages. More than 85 of Bauhaus Production's books have reached The New York Times Best Sellers list.",
      "He has an undergraduate degree in writing and photography from Sarah Lawrence College, an MBA in finance from New York University's Stern School of Business, and completed his master's work in English and creative writing at the City College of New York."
    ]
  }
]

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | BAUHAUS Production'
  }, [])

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-16">
            Our Team
          </h1>
          
          {teamMembers.map((member, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-xl font-semibold text-white mb-2">
                {member.name}
              </h2>
              <p className="text-gray-400 font-serif italic mb-8">
                {member.title}
              </p>
              
              <div className="text-gray-300 text-sm leading-relaxed space-y-4">
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
