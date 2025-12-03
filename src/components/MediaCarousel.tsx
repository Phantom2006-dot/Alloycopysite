import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-[0_0_60%] md:flex-[0_0_35%] lg:flex-[0_0_25%] min-w-0 px-2 md:px-4 transition-all duration-300"
              style={{
                transform: index === selectedIndex ? "scale(1.05)" : "scale(0.95)",
                opacity: index === selectedIndex ? 1 : 0.6,
              }}
            >
              <div className="aspect-[2/3] overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-foreground"
                : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;
