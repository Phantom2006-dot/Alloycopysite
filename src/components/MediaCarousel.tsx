import { useState, useEffect, useCallback } from "react";

interface MediaItem {
  id: number;
  title: string;
  image: string;
  type: "book" | "film" | "tv";
}

interface MediaCarouselProps {
  items: MediaItem[];
}

const MediaCarousel = ({ items }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const getVisibleItems = useCallback(() => {
    const total = items.length;
    if (total === 0) return [];
    
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let index = (currentIndex + i + total) % total;
      indices.push(index);
    }
    return indices;
  }, [currentIndex, items.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsTransitioning(false);
    }, 400);
  }, [items.length, isTransitioning]);

  const scrollTo = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  const visibleIndices = getVisibleItems();

  const getSlideStyle = (position: number) => {
    const isCenter = position === 2;
    
    return {
      opacity: isCenter 
        ? (isTransitioning ? 0 : 1) 
        : (isCenter ? 1 : 0.6),
      transform: isCenter ? "scale(1.05)" : "scale(0.95)",
      transition: isCenter 
        ? "opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)"
        : "none",
    };
  };

  if (items.length === 0) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div className="flex justify-center items-center gap-2 md:gap-4">
          {visibleIndices.map((itemIndex, position) => {
            const item = items[itemIndex];
            const isCenter = position === 2;
            
            return (
              <div
                key={`${position}-${itemIndex}`}
                className={`relative flex-shrink-0 ${
                  position === 0 || position === 4 
                    ? "hidden lg:block w-[15%]" 
                    : position === 1 || position === 3
                    ? "w-[20%] md:w-[18%]"
                    : "w-[45%] md:w-[30%] lg:w-[25%]"
                }`}
                style={getSlideStyle(position)}
              >
                <div 
                  className={`aspect-[2/3] overflow-hidden bg-secondary ${
                    isCenter ? "shadow-2xl" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-foreground scale-125"
                : "bg-foreground/30"
            }`}
            data-testid={`carousel-dot-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;
