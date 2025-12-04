import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Film as FilmIcon, Play } from "lucide-react";

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

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
}

const fallbackFilms = [
  { id: 1, title: "Discover Nigeria", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", type: "film" as const },
  { id: 2, title: "Lagos Life", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", type: "film" as const },
  { id: 3, title: "Cultural Journey", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", type: "film" as const },
  { id: 4, title: "Heritage Stories", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop", type: "film" as const },
  { id: 5, title: "Nigerian Voices", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", type: "film" as const },
  { id: 6, title: "Destination Africa", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", type: "film" as const },
];

const Film = () => {
  const { data: filmsData } = useQuery<MediaItem[]>({
    queryKey: ["films"],
    queryFn: async () => {
      const res = await fetch("/api/media/type/film");
      if (!res.ok) throw new Error("Failed to fetch films");
      return res.json();
    },
  });

  const { data: articlesData } = useQuery<{ articles: Article[] }>({
    queryKey: ["articles", "films"],
    queryFn: async () => {
      const res = await fetch("/api/articles?category=films&limit=5");
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
  });

  const films = filmsData || [];
  const articles = articlesData?.articles || [];

  const featuredFilms = films.filter(f => f.isFeatured);
  const allFilms = featuredFilms.length > 0 ? featuredFilms : films;

  const carouselItems = allFilms.length > 0 
    ? allFilms.map(item => ({
        id: item.id,
        title: item.title,
        image: item.coverImage || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        type: item.type,
      }))
    : fallbackFilms;

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">FILMS & DOCUMENTARIES</h1>

        <section className="mb-20">
          {allFilms.length > 0 && (
            <p className="text-center text-muted-foreground mb-8">Featured Films</p>
          )}
          <MediaCarousel items={carouselItems} />
        </section>

        {films.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 mb-16">
            <h2 className="text-xl font-serif text-center mb-12">All Films</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film) => (
                <Card key={film.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    {film.coverImage ? (
                      <img
                        src={film.coverImage}
                        alt={film.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FilmIcon className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    {film.isFeatured && (
                      <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {film.trailerUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-medium">{film.title}</h3>
                    {film.genre && (
                      <p className="text-sm text-muted-foreground">{film.genre}</p>
                    )}
                    {film.releaseDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(film.releaseDate).getFullYear()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-2xl px-6 mb-12">
          <h2 className="text-xl font-serif text-center mb-12">Recent News</h2>
          
          <div className="space-y-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <article
                  key={article.id}
                  className="border border-foreground/20 p-6 text-center animate-slide-up hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium text-accent mb-2">
                    BAUHAUS Films {article.publishedAt && `(${new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`}
                  </p>
                  <p className="text-sm text-foreground/80">{article.title}</p>
                </article>
              ))
            ) : (
              <>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up">
                  <p className="text-sm font-medium text-accent mb-2">BAUHAUS Films (January 2025)</p>
                  <p className="text-sm text-foreground/80">New Documentary Series Exploring Nigerian Cultural Heritage in Production</p>
                </article>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <p className="text-sm font-medium text-accent mb-2">African Film Review (December 2024)</p>
                  <p className="text-sm text-foreground/80">BAUHAUS Documentary Selected for International Film Festival</p>
                </article>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <p className="text-sm font-medium text-accent mb-2">Film Today (November 2024)</p>
                  <p className="text-sm text-foreground/80">BAUHAUS Announces Partnership with Nigerian Filmmakers</p>
                </article>
              </>
            )}
          </div>
        </section>

        <div className="divider" />
      </div>
    </Layout>
  );
};

export default Film;
