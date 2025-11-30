import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import SectionWrapper from '../components/ui/SectionWrapper'
import SectionTitle from '../components/ui/SectionTitle'
import { blogPosts, blogCategories } from '../data/blog'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Blog | BAUHAUS'
  }, [])

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = activeCategory === 'All' || post.category === activeCategory
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="pt-20">
      <SectionWrapper>
        <SectionTitle 
          title="Blog" 
          subtitle="Stories, insights, and updates from the BAUHAUS team"
        />

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {blogCategories.map(category => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="h-full">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                  <span className="text-amber-500">{post.category}</span>
                  <span>|</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your criteria.</p>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <nav className="flex gap-2">
            <button className="px-4 py-2 bg-white text-black rounded">1</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white border border-gray-700 rounded">2</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white border border-gray-700 rounded">3</button>
          </nav>
        </div>
      </SectionWrapper>
    </div>
  )
}
