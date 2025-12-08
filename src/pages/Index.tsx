// [file name]: Index.tsx
// [file content begin]
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { Book, Film, MapPin, Calendar } from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  slug: string;
  coverImage: string | null;
  type: "book" | "film" | "tv";
  isFeatured: boolean;
  description?: string | null;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  categoryName?: string;
  authorName?: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  featuredImage: string | null;
  shortDescription: string | null;
  isInStock: boolean;
  category?: {
    name: string;
    slug: string;
  };
}

interface Event {
  id: number;
  title: string;
  slug: string;
  eventDate: string;
  location: string | null;
  isVirtual: boolean;
  featuredImage: string | null;
  status: string;
}

const Index = () => {
  const { data: mediaData, isLoading: mediaLoading } = useQuery({
    queryKey: ["featured-media"],
    queryFn: async () => {
      const data = await api.media.list({ featured: true, limit: 12 });
      return data.items || [];
    },
  });

  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ["featured-articles"],
    queryFn: async () => {
      const data = await api.articles.list({ 
        limit: 3, 
        status: "published",
        featured: true 
      });
      return data.articles || [];
    },
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const data = await api.products.list({ 
        featured: true, 
        limit: 3,
        status: "published"
      });
      return data.products || [];
    },
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const data = await api.events.list({ 
        limit: 3, 
        status: "upcoming" 
      });
      return data.events || [];
    },
  });

  const featuredItems = mediaData || [];
  const articles = articlesData || [];
  const products = productsData || [];
  const events = eventsData || [];

  const carouselItems = featuredItems.length > 0 
    ? featuredItems.map(item => ({
        id: item.id,
        title: item.title,
        image: item.coverImage || getDefaultImage(item.type),
        type: item.type,
      }))
    : getFallbackItems();

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(cents / 100);
  };

  const getDefaultImage = (type: string) => {
    const images = {
      book: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      film: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      tv: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop"
    };
    return images[type as keyof typeof images] || images.book;
  };

  const getFallbackItems = () => {
    return [
      { id: 1, title: "Nigerian Heritage", image: getDefaultImage("book"), type: "book" as const },
      { id: 2, title: "Lagos Stories", image: getDefaultImage("book"), type: "book" as const },
      { id: 3, title: "Discover Nigeria", image: getDefaultImage("film"), type: "film" as const },
      { id: 4, title: "Cultural Journeys", image: getDefaultImage("book"), type: "book" as const },
      { id: 5, title: "African Voices", image: getDefaultImage("film"), type: "film" as const },
      { id: 6, title: "Tourism Guide", image: getDefaultImage("book"), type: "book" as const },
    ];
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 px-6 text-center">
        <div className="mx-auto max-w-4xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
            Books, Films, Publishing & Tourism
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting readers, filmmakers, and travelers to the rich stories and destinations of Nigerian culture.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="px-6 mb-8">
          <h2 className="text-xl font-serif text-center">Featured Content</h2>
        </div>
        <MediaCarousel items={carouselItems} />
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-serif text-center mb-12">Latest Updates</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Latest Articles */}
            <div>
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Book className="h-5 w-5" />
                Recent Articles
              </h3>
              <div className="space-y-4">
                {articlesLoading ? (
                  <div className="text-center py-8">Loading articles...</div>
                ) : articles.length > 0 ? (
                  articles.map((article) => (
                    <Link 
                      key={article.id} 
                      to={`/blog/${article.slug}`}
                      className="block border-b pb-4 last:border-0 hover:opacity-80 transition-opacity"
                    >
                      <h4 className="font-medium text-sm mb-1">{article.title}</h4>
                      {article.publishedAt && (
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                        </p>
                      )}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No articles yet</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {eventsLoading ? (
                  <div className="text-center py-8">Loading events...</div>
                ) : events.length > 0 ? (
                  events.map((event) => (
                    <Link 
                      key={event.id} 
                      to={`/events/${event.slug}`}
                      className="block border-b pb-4 last:border-0 hover:opacity-80 transition-opacity"
                    >
                      <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(event.eventDate), 'MMM d, yyyy')}
                        {event.location && (
                          <>
                            <span className="mx-1">•</span>
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Film className="h-5 w-5" />
                Featured Products
              </h3>
              <div className="space-y-4">
                {productsLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/store/${product.slug}`}
                      className="block border-b pb-4 last:border-0 hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
                          {product.featuredImage ? (
                            <img 
                              src={product.featuredImage} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Film className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">{product.title}</h4>
                          <p className="text-xs font-semibold text-amber-600">
                            {formatPrice(product.price)}
                          </p>
                          {product.category && (
                            <p className="text-xs text-muted-foreground">{product.category.name}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No featured products</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <blockquote className="quote-text mb-6">
            "BAUHAUS brings together the best of Nigerian storytelling through books, films, and unforgettable travel experiences."
          </blockquote>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Link to="/books" className="group">
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg font-serif mb-3 group-hover:text-primary transition-colors">Books & Publishing</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover our catalog of compelling stories celebrating Nigerian culture and heritage.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/film" className="group">
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg font-serif mb-3 group-hover:text-primary transition-colors">Films & Documentaries</h3>
                  <p className="text-sm text-muted-foreground">
                    Visual storytelling that captures the essence of African narratives.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/events" className="group">
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg font-serif mb-3 group-hover:text-primary transition-colors">Events & Tourism</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore Lagos, Abuja, Akwa Ibom, and more with our comprehensive travel guides.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
// [file content end]
