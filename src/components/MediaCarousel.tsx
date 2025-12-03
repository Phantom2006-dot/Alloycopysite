import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-[0_0_60%] md:flex-[0_0_35%] lg:flex-[0_0_25%] min-w-0 px-2 md:px-4"
              style={{
                transform: index === selectedIndex ? "scale(1.05)" : "scale(0.95)",
                opacity: index === selectedIndex ? 1 : 0.6,
                transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <div className="aspect-[2/3] overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
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
