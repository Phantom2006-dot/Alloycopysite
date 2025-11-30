import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroCarousel({ items = [], autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = useCallback(() => {
    if (isAnimating || items.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, items.length])

  const goToPrev = useCallback(() => {
    if (isAnimating || items.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, items.length])

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, goToNext, items.length])

  if (items.length === 0) return null

  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length
      result.push({ ...items[index], offset: i })
    }
    return result
  }

  return (
    <div className="relative w-full h-[65vh] overflow-hidden bg-black pt-20">
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {items.map((_, idx) => (
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
  )
}
