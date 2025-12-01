import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroCarousel({ items = [], autoPlay = true, interval = 1000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToNext = useCallback(() => {
    if (isAnimating || items.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, items.length])

  const goToPrev = useCallback(() => {
    if (isAnimating || items.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 400)
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

  const getTranslateX = (offset) => {
    return offset * (isMobile ? 180 : 280)
  }

  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden bg-gradient-to-b from-black via-black to-neutral-950 pt-28 lg:pt-32 pb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        {getVisibleItems().map((item, idx) => {
          const offset = item.offset
          const isCenter = offset === 0
          const absOffset = Math.abs(offset)
          const scale = isCenter ? 1 : 0.7 - (absOffset * 0.05)
          const opacity = isCenter ? 1 : 0.5 - (absOffset * 0.1)
          const translateX = getTranslateX(offset)
          const zIndex = 10 - absOffset

          return (
            <div
              key={`${item.id}-${idx}`}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity: Math.max(opacity, 0.2),
                zIndex,
              }}
            >
              <div 
                className={`relative overflow-hidden shadow-2xl transition-all duration-500 ${
                  isCenter 
                    ? 'w-52 sm:w-60 md:w-72 h-72 sm:h-80 md:h-96 ring-1 ring-white/20' 
                    : 'w-44 sm:w-52 md:w-60 h-60 sm:h-72 md:h-80'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(idx)
                setTimeout(() => setIsAnimating(false), 400)
              }
            }}
            className={`transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-6 h-1.5 bg-white rounded-full' 
                : 'w-1.5 h-1.5 bg-gray-500 rounded-full hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
