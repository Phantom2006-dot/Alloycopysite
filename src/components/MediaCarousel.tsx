import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  src: string;
  type: "book" | "film" | "tv";
  mediaType: "image" | "video";
}

const VideoSlide = ({ src, title, isActive }: { src: string; title: string; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-full w-full group">
      <video
        ref={videoRef}
        src={src}
        title={title}
        className="h-full w-full object-cover"
        draggable="false"
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
        >
          {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
        </button>
      </div>
    </div>
  );
};

const STATIC_ITEMS: MediaItem[] = [
  { id: 1, title: "Image 1", src: "/attached_assets/MV5BMDE0Y2Y3NDctNjE0NS00ODU2LWIzNGYtYjdmODhiNGJmMjI4XkEyXkFqcG_1766663310548.jpg", type: "film", mediaType: "image" },
  { id: 2, title: "Image 2", src: "/attached_assets/MV5BMDJhMmU2MTktM2U1OC00MDhlLWI2MGQtMzlhOGZkOTdjYjE2XkEyXkFqcG_1766663310636.jpg", type: "film", mediaType: "image" },
  { id: 3, title: "Image 3", src: "/attached_assets/MV5BOGU1MmMwMGYtNmE2Yi00MzY5LTk4YzAtYjI4NjI2YjhkNTNhXkEyXkFqcG_1766663310686.jpg", type: "film", mediaType: "image" },
  { id: 4, title: "Image 4", src: "/attached_assets/MV5BOWY5YTc1NDQtZTBhZS00YmI4LWI0ZmMtOGJiNjdkMjQ1NjA0XkEyXkFqcG_1766663310723.jpg", type: "film", mediaType: "image" },
  { id: 5, title: "Image 5", src: "/attached_assets/video_1766663310548.mp4", type: "film", mediaType: "video" },
  { id: 6, title: "Image 6", src: "/IMAG1553_1766638018685.jpg", type: "tv", mediaType: "image" },
  { id: 7, title: "Image 7", src: "/IMAG1750_1766638018686.jpg", type: "book", mediaType: "image" },
  { id: 8, title: "Image 8", src: "/IMG_20191018_003712_1766638018687.jpg", type: "film", mediaType: "image" },
  { id: 9, title: "Image 9", src: "/IMG_20191018_004624_1766638018688.jpg", type: "tv", mediaType: "image" },
  { id: 10, title: "Image 10", src: "/WhatsApp_Image_2025-12-23_at_10.20.17_AM_(1)_1766638018689.jpeg", type: "book", mediaType: "image" },
  { id: 11, title: "Image 11", src: "/WhatsApp_Image_2025-12-23_at_10.20.17_AM_1766638018690.jpeg", type: "film", mediaType: "image" },
  { id: 12, title: "Image 12", src: "/WhatsApp_Image_2025-12-23_at_10.20.18_AM_(1)_1766638018691.jpeg", type: "tv", mediaType: "image" },
];

const MediaCarousel = () => {
  const items = STATIC_ITEMS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (isTransitioning || items.length === 0) return;
    
    setDirection("right");
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsTransitioning(false);
    }, 400);
  }, [items.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || items.length === 0) return;
    
    setDirection("left");
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsTransitioning(false);
    }, 400);
  }, [items.length, isTransitioning]);

  const scrollTo = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex || items.length === 0) return;
    
    setDirection(index > currentIndex ? "right" : "left");
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400);
  }, [currentIndex, items.length, isTransitioning]);

  const toggleAutoScroll = () => {
    setIsPaused(!isPaused);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || items.length === 0) return;
    
    const interval = setInterval(() => {
      if (direction === "right") {
        goToNext();
      } else {
        goToPrev();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [goToNext, goToPrev, isPaused, direction, items.length]);

  // Touch/swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrev();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

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
      className="relative py-4"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
        <button
          onClick={goToPrev}
          className="pointer-events-auto bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-all hover:scale-110 ml-2 md:ml-4"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={goToNext}
          className="pointer-events-auto bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-all hover:scale-110 mr-2 md:mr-4"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Carousel Content */}
      <div className="overflow-hidden px-8 md:px-12">
        <div className="flex justify-center items-center gap-2 md:gap-4">
          {visibleIndices.map((itemIndex, position) => {
            const item = items[itemIndex];
            const isCenter = position === 2;
            
            return (
              <div
                key={`${position}-${itemIndex}`}
                className={`relative flex-shrink-0 cursor-pointer ${
                  position === 0 || position === 4 
                    ? "hidden lg:block w-[15%]" 
                    : position === 1 || position === 3
                    ? "w-[20%] md:w-[18%]"
                    : "w-[45%] md:w-[30%] lg:w-[25%]"
                }`}
                style={getSlideStyle(position)}
                onClick={() => {
                  if (!isCenter) {
                    const diff = position - 2;
                    scrollTo((currentIndex + diff + items.length) % items.length);
                  }
                }}
              >
                <div 
                  className={`relative aspect-[2/3] overflow-hidden bg-secondary transition-all duration-300 ${
                    isCenter 
                      ? "shadow-2xl ring-2 ring-primary/20" 
                      : "hover:scale-105 hover:shadow-lg hover:opacity-80"
                  }`}
                >
                  {item.mediaType === "image" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      draggable="false"
                    />
                  ) : (
                    <VideoSlide 
                      src={item.src} 
                      title={item.title} 
                      isActive={isCenter && !isTransitioning} 
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-8">
        {/* Dots Navigation */}
        <div className="flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-foreground/30 hover:bg-foreground/50"
              }`}
              data-testid={`carousel-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        {/* Auto-scroll toggle and direction controls */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={toggleAutoScroll}
            className="flex items-center gap-2 bg-foreground/10 hover:bg-foreground/20 px-3 py-2 rounded-lg transition-colors"
            aria-label={isPaused ? "Play auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm">Play</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm">Pause</span>
              </>
            )}
          </button> */}

          {/* Direction toggle */}
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/70">Direction:</span>
            <div className="flex bg-foreground/10 rounded-lg p-1">
              <button
                onClick={() => setDirection("left")}
                className={`px-3 py-1 rounded transition-all ${
                  direction === "left" 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-foreground/20"
                }`}
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => setDirection("right")}
                className={`px-3 py-1 rounded transition-all ${
                  direction === "right" 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-foreground/20"
                }`}
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div> */}
        </div>

        {/* Current position indicator */}
        <div className="text-sm text-foreground/60">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
