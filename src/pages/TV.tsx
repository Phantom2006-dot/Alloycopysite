import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Play } from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  type: "book" | "film" | "tv";
  castInfo: string | null;
  genre: string | null;
  trailerUrl: string | null;
  isFeatured: boolean;
  releaseDate: string | null;
}

const fallbackShows = [
  { id: 1, title: "Nigerian Tales", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 2, title: "Lagos Living", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 3, title: "Culture Series", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 4, title: "African Stories", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop", type: "tv" as const },
];

const TV = () => {
  const { data: tvData } = useQuery<MediaItem[]>({
    queryKey: ["tv-shows"],
    queryFn: async () => {
      const res = await fetch("/api/media/type/tv");
      if (!res.ok) throw new Error("Failed to fetch TV shows");
      return res.json();
    },
  });

  const shows = tvData || [];
  const featuredShows = shows.filter(s => s.isFeatured);
  const allShows = featuredShows.length > 0 ? featuredShows : shows;

  const carouselItems = allShows.length > 0 
    ? allShows.map(item => ({
        id: item.id,
        title: item.title,
        image: item.coverImage || "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop",
        type: item.type,
      }))
    : fallbackShows;

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">TV SHOWS</h1>

        <section className="mb-20">
          {allShows.length > 0 && (
            <p className="text-center text-muted-foreground mb-8">Featured Shows</p>
          )}
          <MediaCarousel items={carouselItems} />
        </section>

        {shows.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 mb-16">
            <h2 className="text-xl font-serif text-center mb-12">All TV Shows</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shows.map((show) => (
                <Card key={show.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    {show.coverImage ? (
                      <img
                        src={show.coverImage}
                        alt={show.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Tv className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    {show.isFeatured && (
                      <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {show.trailerUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-medium">{show.title}</h3>
                    {show.genre && (
                      <p className="text-sm text-muted-foreground">{show.genre}</p>
                    )}
                    {show.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{show.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {shows.length === 0 && (
          <section className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-muted-foreground">
              New TV shows and series coming soon. Stay tuned for exciting content!
            </p>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default TV;
