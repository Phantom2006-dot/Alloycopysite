import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroCarousel from '../components/ui/HeroCarousel'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import MediaCard from '../components/ui/MediaCard'
import QuoteBanner from '../components/ui/QuoteBanner'
import CTAButton from '../components/ui/CTAButton'
import { books } from '../data/books'
import { films } from '../data/films'
import { blogPosts } from '../data/blog'

const carouselItems = [
  { id: 1, title: "The Lagos Diaries", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" },
  { id: 2, title: "Lagos Rising", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 3, title: "Echoes of Benin", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" },
  { id: 4, title: "Crossing the Niger", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  { id: 5, title: "Midnight in Abuja", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop" },
  { id: 6, title: "Daughters of Harmattan", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop" },
]

export default function Home() {
  useEffect(() => {
    document.title = 'BAUHAUS | Books, Films, Publishing & Tourism'
  }, [])

  const featuredBooks = books.filter(b => b.featured).slice(0, 4)
  const featuredFilms = films.slice(0, 3)
  const featuredPosts = blogPosts.filter(p => p.featured).slice(0, 3)

  return (
    <>
      <HeroCarousel items={carouselItems} />

      <QuoteBanner
        quote="BAUHAUS captures the essence of Nigerian storytelling, weaving together tradition and modernity with masterful precision."
        publication="The Guardian Nigeria"
      />

      <SectionWrapper>
        <SectionTitle 
          title="Featured Books" 
          subtitle="Explore our latest literary releases"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <MediaCard
              key={book.id}
              image={book.cover}
              title={book.title}
              subtitle={book.author}
              link="/books"
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton to="/books" variant="secondary">View All Books</CTAButton>
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark">
        <SectionTitle 
          title="Films & Documentaries" 
          subtitle="Visual stories that inspire and inform"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFilms.map(film => (
            <MediaCard
              key={film.id}
              image={film.poster}
              title={film.title}
              subtitle={film.type}
              description={film.synopsis}
              link="/films"
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton to="/films" variant="secondary">View All Films</CTAButton>
        </div>
      </SectionWrapper>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Discover Nigeria
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                From the vibrant streets of Lagos to the sacred groves of Osun, Nigeria offers experiences that captivate the soul. Let us be your guide to this land of rich culture, stunning landscapes, and warm hospitality.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton to="/tourism/lagos">Explore Lagos</CTAButton>
                <CTAButton to="/tourism" variant="secondary">All Destinations</CTAButton>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400&h=300&fit=crop" 
                alt="Lagos cityscape" 
                className="rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop" 
                alt="Cultural festival" 
                className="rounded-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop" 
                alt="Nigerian beach" 
                className="rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop" 
                alt="Sacred grove" 
                className="rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <SectionTitle 
          title="From Our Blog" 
          subtitle="Stories, insights, and updates from the BAUHAUS team"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-gray-500 text-sm mb-2">{post.category} | {post.date}</p>
              <h3 className="text-white font-semibold text-lg group-hover:text-gray-300 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton to="/blog" variant="secondary">Read More</CTAButton>
        </div>
      </SectionWrapper>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Share Your Story?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you're an author with a manuscript or a filmmaker with a vision, we want to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/publishing">Submit Your Work</CTAButton>
            <CTAButton to="/contact" variant="secondary">Get in Touch</CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
