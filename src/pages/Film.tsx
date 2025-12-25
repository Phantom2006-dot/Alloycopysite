import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Film as FilmIcon, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  categoryName?: string;
  featuredImage?: string | null;
}

const Film = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filmFaqs = [
    {
      question: "What types of films does Bauhaus produce?",
      answer:
        "We produce a diverse range of films including documentaries, feature films, short films, and digital content that celebrate Nigerian culture, heritage, and contemporary stories. Our work focuses on authentic African narratives.",
    },
    {
      question: "How can I submit my film project?",
      answer:
        "We welcome submissions from filmmakers and producers. Please send a project synopsis, director's statement, and sample footage (if available) to films@bauhausproduction.com. We review submissions on a rolling basis.",
    },
    {
      question: "Do you offer film production services?",
      answer:
        "Yes! We offer comprehensive film production services including pre-production planning, cinematography, post-production, sound design, and distribution. Contact us to discuss your project needs.",
    },
    {
      question: "What is your distribution process?",
      answer:
        "We distribute films through multiple channels including film festivals, streaming platforms, theatrical releases, and broadcast networks. We work to maximize reach and ensure your film reaches the right audience.",
    },
    {
      question: "Do you work with international filmmakers?",
      answer:
        "Absolutely! We collaborate with filmmakers from around the world. We're particularly interested in projects that connect with African audiences or tell African diaspora stories.",
    },
    {
      question: "What is the timeline for film production?",
      answer:
        "Timelines vary depending on the scope and complexity of the project. A typical feature film production takes 12-24 months from pre-production to final delivery. We'll provide a detailed timeline during project planning.",
    },
    {
      question: "Do you provide funding for film projects?",
      answer:
        "We work with filmmakers through various models including co-production, distribution deals, and partnerships. Funding options depend on the project. Contact us to discuss possibilities for your specific project.",
    },
    {
      question: "Can I watch your films online?",
      answer:
        "Many of our films are available through our streaming partners and platforms. Check our Films & Documentaries section for featured titles, or contact us for information about specific films.",
    },
    {
      question: "How do you ensure quality in your productions?",
      answer:
        "We maintain high production standards through experienced crew, professional equipment, rigorous quality control processes, and collaboration with industry experts. We're committed to delivering world-class content.",
    },
    {
      question: "What is your vision for African cinema?",
      answer:
        "We believe African stories deserve to be told by African voices and shared with the world. Our mission is to create platforms for authentic African narratives, support emerging filmmakers, and contribute to a vibrant, sustainable African film industry.",
    },
  ];

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
    data: filmsData,
    isLoading: filmsLoading,
    error: filmsError,
  } = useQuery({
    queryKey: ["films"],
    queryFn: async () => {
      try {
        const data = await api.media.list({ type: "film", limit: 100 });
        return data.items || [];
      } catch (error) {
        console.error("Error fetching films:", error);
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
    queryKey: ["articles", "films"],
    queryFn: async () => {
      try {
        const data = await api.articles.list({
          category: "films",
          limit: 5,
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
    if (filmsError || articlesError) {
      console.error("Query errors detected:", { filmsError, articlesError });
      setHasError(true);
      setErrorMessage("Failed to load some data. Please refresh the page.");
    }
  }, [filmsError, articlesError]);

  const films: MediaItem[] = filmsData || [];
  const articles: Article[] = articlesData || [];

  // Get default images for each type
  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop";
  };

  // Create fallback items if no featured items exist
  const getFallbackItems = ( ) => {
    return [
      {
        id: 1,
        title: "Discover Nigeria",
        image: getDefaultImage(),
        type: "film" as const,
      },
      {
        id: 2,
        title: "Lagos Life",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        type: "film" as const,
      },
      {
        id: 3,
        title: "Cultural Journey",
        image:
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        type: "film" as const,
      },
      {
        id: 4,
        title: "African Heritage",
        image: getDefaultImage( ),
        type: "film" as const,
      },
      {
        id: 5,
        title: "Nigerian Stories",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        type: "film" as const,
      },
      {
        id: 6,
        title: "Documentary Film",
        image:
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        type: "film" as const,
      },
    ];
  };

  // Create carousel items with proper images
  const carouselItems =
    films.length > 0
      ? films.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.coverImage || getDefaultImage(),
          type: item.type,
        }))
      : []; // Removed fallback items as we want to control them via filter in MediaCarousel

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

  const isLoading = filmsLoading || articlesLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Films...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">
          FILMS & DOCUMENTARIES
        </h1>

        {/* Carousel Section - ALWAYS SHOW with proper items */}
        <section className="py-12 md:py-16">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-serif text-center">Featured Films</h2>
          </div>

          {/* Always render MediaCarousel with items */}
          {MediaCarousel ? (
            <MediaCarousel type="film" forceStatic={true} />
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

        {films.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 mb-16">
            <h2 className="text-xl font-serif text-center mb-12">All Films</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film) => (
                <Card
                  key={film.id}
                  className="overflow-hidden group card-hover border-border"
                >
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
                      <span className="absolute top-2 right-2 bg-foreground text-background px-2 py-1 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {film.trailerUrl && (
                      <a
                        href={film.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                      >
                        <Play className="h-12 w-12 text-white" />
                      </a>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-medium">{film.title}</h3>
                    {film.genre && (
                      <p className="text-sm text-muted-foreground">
                        {film.genre}
                      </p>
                    )}
                    {film.releaseDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(film.releaseDate), "yyyy")}
                      </p>
                    )}
                    {film.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {film.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-2xl px-6 text-center mb-16">
            <FilmIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Our film collection is being prepared. Check back soon for amazing
              Nigerian films and documentaries!
            </p>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mx-auto max-w-2xl px-6 mb-12">
            <h2 className="text-xl font-serif text-center mb-12">
              Recent News
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
                      {article.categoryName || "Film News"}
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

        <div className="divider mb-16" />

        {/* Film FAQs */}
        <section className="mx-auto max-w-4xl px-6 mb-12 animate-slide-up">
          <h2 className="section-title text-center mb-12">FILM FAQs</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {filmFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-serif font-semibold">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Film;
