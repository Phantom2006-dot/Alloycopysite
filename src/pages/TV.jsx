import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const tvShows = [
  { id: 1, title: "Ravenswood", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  { id: 2, title: "Samurai Girl", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 3, title: "Privileged", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" },
  { id: 4, title: "You", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop" },
  { id: 5, title: "Gossip Girl", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop" },
  { id: 6, title: "The Vampire Diaries", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" },
]

const tvNews = [
  { id: 1, source: "Media Play News", date: "May 22, 2025", title: "Nielsen: Netflix's 'You' Topped Weekly Household TV Streaming Through April 27" },
  { id: 2, source: "Variety", date: "April 29, 2025", title: "'You' Season 5 Hits 10.1 Million Views in Four Days, Reaching No. 1 on Netflix Chart" },
  { id: 3, source: "Vulture", date: "April 25, 2025", title: "'You' Series-Finale Recap: The Once and Future Lonely Boy" },
  { id: 4, source: "The Hollywood Reporter", date: "March 10, 2025", title: "'You' Season 5 Official Trailer Sees Penn Badgley Risking It All in the Killer Finale" },
  { id: 5, source: "Deadline", date: "January 30, 2025", title: "'You' Season 5 Teaser: Joe Is Trapped in A Cage in Final Season — Watch" },
  { id: 6, source: "Deadline", date: "March 6, 2024", title: "'The Davenports' Based on YA Novel in Works for Television at Amazon Video From Bauhaus Production" },
]

export default function TV() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    document.title = 'Television Series | BAUHAUS Production'
  }, [])

  const goToNext = useCallback(() => {
    if (isAnimating || tvShows.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % tvShows.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const goToPrev = useCallback(() => {
    if (isAnimating || tvShows.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + tvShows.length) % tvShows.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(goToNext, 2000)
    return () => clearInterval(timer)
  }, [goToNext])

  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + tvShows.length) % tvShows.length
      result.push({ ...tvShows[index], offset: i })
    }
    return result
  }

  return (
    <div className="pt-20 bg-black min-h-screen">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center mb-12">
            Television Series
          </h1>
          
          <div className="relative h-[50vh] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {getVisibleItems().map((item, idx) => {
                const offset = item.offset
                const isCenter = offset === 0
                const scale = isCenter ? 1 : 0.75
                const opacity = isCenter ? 1 : 0.6
                const translateX = offset * 300

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    <div className="w-56 md:w-64 h-80 md:h-96 bg-gray-900 overflow-hidden shadow-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {tvShows.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(idx)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif text-white text-center mb-12">
            Recent News
          </h2>
          
          <div className="space-y-4">
            {tvNews.map((news) => (
              <a
                key={news.id}
                href="#"
                className="block border border-gray-700 hover:border-gray-500 transition-colors p-4 text-center"
              >
                <p className="text-white font-semibold text-sm mb-2">
                  {news.source} ({news.date})
                </p>
                <p className="text-gray-400 text-sm">
                  {news.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
