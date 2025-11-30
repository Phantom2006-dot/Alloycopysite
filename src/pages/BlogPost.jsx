import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react'
import SectionWrapper from '../components/ui/SectionWrapper'
import { blogPosts } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | BAUHAUS Blog`
    } else {
      document.title = 'Post Not Found | BAUHAUS'
    }
  }, [post])

  if (!post) {
    return (
      <div className="pt-20">
        <SectionWrapper>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-white underline hover:text-gray-300">
              Back to Blog
            </Link>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="pt-20">
      <article>
        <div className="relative h-[50vh] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <SectionWrapper className="-mt-32 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-amber-500">{post.category}</span>
              <span>|</span>
              <span>{post.date}</span>
              <span>|</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-300 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Share this article:</span>
                <div className="flex gap-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Share on Facebook">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Share on Twitter">
                    <Twitter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {relatedPosts.length > 0 && (
          <SectionWrapper background="dark">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="aspect-video overflow-hidden rounded-lg mb-3">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-gray-500 text-xs mb-1">{relatedPost.date}</p>
                    <h3 className="text-white font-medium group-hover:text-gray-300 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}
      </article>
    </div>
  )
}
