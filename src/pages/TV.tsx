import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Play, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { useState, useEffect } from "react";

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
  externalLinks?: string | null;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  categoryName?: string;
  featuredImage?: string | null;
}

const TV = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      if (!Layout) {
        throw new Error("Layout component not found");
      }
      if (!MediaCarousel) {
        console.warn("MediaCarousel component not found, will use fallback");
      }
    } catch (error) {
      console.error("Component initialization error:", error);
      setHasError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Component error",
      );
    }
  }, []);

  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = useQuery({
    queryKey: ["tv-shows"],
    queryFn: async () => {
      try {
        const data = await api.media.list({ type: "tv", limit: 100 });
        return data.items || [];
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        return [];
      }
    },
    retry: 1,
  });

  const {
    data: articlesData,
    isLoading: articlesLoading,
    error: articlesError,
  } = useQuery({
    queryKey: ["articles", "tv"],
    queryFn: async () => {
      try {
        const data = await api.articles.list({
          category: "tv",
          limit: 3,
          status: "published",
        });
        return data.articles || [];
      } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
      }
    },
    retry: 1,
  });

  useEffect(() => {
    if (tvError || articlesError) {
      console.error("Query errors detected:", { tvError, articlesError });
      setHasError(true);
      setErrorMessage("Failed to load some data. Please refresh the page.");
    }
  }, [tvError, articlesError]);

  const shows: MediaItem[] = tvData || [];
  const articles: Article[] = articlesData || [];

  // Get default images for each type
  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop";
  };

  // Create fallback items if no featured items exist
  const getFallbackItems = () => {
    return [
      {
        id: 1,
        title: "Nigerian Tales",
        image: getDefaultImage(),
        type: "tv" as const,
      },
      {
        id: 2,
        title: "Lagos Living",
        image:
          "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "tv" as const,
      },
      {
        id: 3,
        title: "Culture Series",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=600&fit=crop",
        type: "tv" as const,
      },
      {
        id: 4,
        title: "African Stories",
        image: getDefaultImage(),
        type: "tv" as const,
      },
      {
        id: 5,
        title: "Heritage Shows",
        image:
          "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "tv" as const,
      },
      {
        id: 6,
        title: "Documentary Series",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=600&fit=crop",
        type: "tv" as const,
      },
    ];
  };

  // Create carousel items with proper images
  const carouselItems =
    shows.length > 0
      ? shows.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.coverImage || getDefaultImage(),
          type: item.type,
        }))
      : getFallbackItems();

  const getExternalLinks = (linksString: string | null) => {
    if (!linksString) return [];
    try {
      const links = JSON.parse(linksString);
      return Array.isArray(links) ? links : [];
    } catch {
      return [];
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const isLoading = tvLoading || articlesLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading TV Shows...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">
          TV SHOWS
        </h1>

        {/* Carousel Section - ALWAYS SHOW with proper items */}
        <section className="py-12 md:py-16">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-serif text-center">
              Featured TV Shows
            </h2>
          </div>

          {/* Always render MediaCarousel with items */}
          {MediaCarousel ? (
            <MediaCarousel type="tv" />
          ) : (
            // Fallback if MediaCarousel component is not available
            <div className="px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {carouselItems.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="bg-muted rounded-lg overflow-hidden aspect-[2/3]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-2 bg-black/70 text-white text-xs truncate">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {shows.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 mb-16">
            <h2 className="text-xl font-serif text-center mb-12">
              All TV Shows
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shows.map((show) => {
                const externalLinks = getExternalLinks(show.externalLinks);

                return (
                  <Card
                    key={show.id}
                    className="overflow-hidden group card-hover border-border"
                  >
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
                        <span className="absolute top-2 right-2 bg-foreground text-background px-2 py-1 text-xs rounded">
                          Featured
                        </span>
                      )}
                      {show.trailerUrl && (
                        <a
                          href={show.trailerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="h-12 w-12 text-white" />
                        </a>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif font-medium">{show.title}</h3>
                      {show.genre && (
                        <p className="text-sm text-muted-foreground">
                          {show.genre}
                        </p>
                      )}
                      {show.releaseDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(show.releaseDate), "MMM yyyy")}
                        </div>
                      )}
                      {show.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {show.description}
                        </p>
                      )}

                      {externalLinks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs font-medium mb-1">Watch on:</p>
                          <div className="flex flex-wrap gap-1">
                            {externalLinks.slice(0, 2).map((link, index) => (
                              <a
                                key={index}
                                href={link.url || link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-muted rounded hover:bg-foreground hover:text-background transition-colors"
                              >
                                {link.name || "Watch"}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {show.castInfo && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs font-medium mb-1">Cast:</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {show.castInfo}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-2xl px-6 text-center mb-16">
            <Tv className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              New TV shows and series coming soon. Stay tuned for exciting
              content!
            </p>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mx-auto max-w-2xl px-6 mb-12">
            <h2 className="text-xl font-serif text-center mb-12">
              TV Industry News
            </h2>

            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="block border border-border p-6 text-center animate-slide-up hover:border-foreground/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    {article.featuredImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-sm font-medium highlight-yellow mb-2">
                      {article.categoryName || "TV News"}
                      {article.publishedAt &&
                        ` • ${format(new Date(article.publishedAt), "MMM yyyy")}`}
                    </p>
                    <p className="text-sm text-foreground/80 font-medium">
                      {article.title}
                    </p>
                    {article.excerpt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="divider" />
      </div>
    </Layout>
  );
};

export default TV;
