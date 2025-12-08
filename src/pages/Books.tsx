import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Book, ShoppingBag, Calendar } from "lucide-react";
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
  authorInfo: string | null;
  genre: string | null;
  isFeatured: boolean;
  releaseDate: string | null;
  externalLinks?: string | null;
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

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  categoryName?: string;
  featuredImage?: string | null;
}

const Books = () => {
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
    data: booksData,
    isLoading: booksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const data = await api.media.list({ type: "book", limit: 100 });
        return data.items || [];
      } catch (error) {
        console.error("Error fetching books:", error);
        return [];
      }
    },
    retry: 1,
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["book-products"],
    queryFn: async () => {
      try {
        const data = await api.products.list({
          category: "books",
          limit: 6,
        });
        return data.products || [];
      } catch (error) {
        console.error("Error fetching products:", error);
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
    queryKey: ["articles", "books"],
    queryFn: async () => {
      try {
        const data = await api.articles.list({
          category: "books",
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
    if (booksError || productsError || articlesError) {
      console.error("Query errors detected:", {
        booksError,
        productsError,
        articlesError,
      });
      setHasError(true);
      setErrorMessage("Failed to load some data. Please refresh the page.");
    }
  }, [booksError, productsError, articlesError]);

  const books: MediaItem[] = booksData || [];
  const products: Product[] = productsData || [];
  const articles: Article[] = articlesData || [];

  // Get default images for each type
  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop";
  };

  // Create fallback items if no featured items exist
  const getFallbackItems = () => {
    return [
      {
        id: 1,
        title: "Nigerian Heritage",
        image: getDefaultImage(),
        type: "book" as const,
      },
      {
        id: 2,
        title: "Lagos Stories",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        type: "book" as const,
      },
      {
        id: 3,
        title: "Cultural Journeys",
        image:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        type: "book" as const,
      },
      {
        id: 4,
        title: "African Tales",
        image: getDefaultImage(),
        type: "book" as const,
      },
      {
        id: 5,
        title: "Yoruba History",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        type: "book" as const,
      },
      {
        id: 6,
        title: "Igbo Culture",
        image:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        type: "book" as const,
      },
    ];
  };

  // Create carousel items with proper images
  const carouselItems =
    books.length > 0
      ? books.map((item) => ({
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

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(cents / 100);
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

  const isLoading = booksLoading || productsLoading || articlesLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Books...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">
          BOOKS & PUBLISHING
        </h1>

        {/* Carousel Section - ALWAYS SHOW with proper items */}
        <section className="py-12 md:py-16">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-serif text-center">Featured Books</h2>
          </div>

          {/* Always render MediaCarousel with items */}
          {MediaCarousel ? (
            <MediaCarousel items={carouselItems} />
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

        {books.length > 0 ? (
          <>
            <section className="mx-auto max-w-6xl px-6 mb-16">
              <h2 className="text-xl font-serif text-center mb-12">
                Our Book Collection
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => {
                  const externalLinks = getExternalLinks(book.externalLinks);

                  return (
                    <Card
                      key={book.id}
                      className="overflow-hidden group card-hover border-border"
                    >
                      <div className="aspect-[3/4] relative bg-muted">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Book className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                        {book.isFeatured && (
                          <span className="absolute top-2 right-2 bg-foreground text-background px-2 py-1 text-xs rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif font-medium">{book.title}</h3>
                        {book.authorInfo && (
                          <p className="text-sm text-muted-foreground">
                            by {book.authorInfo}
                          </p>
                        )}
                        {book.genre && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {book.genre}
                          </p>
                        )}
                        {book.releaseDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            Published{" "}
                            {format(new Date(book.releaseDate), "yyyy")}
                          </div>
                        )}
                        {book.description && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {book.description}
                          </p>
                        )}

                        {externalLinks.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs font-medium mb-1">
                              Available at:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {externalLinks.slice(0, 2).map((link, index) => (
                                <a
                                  key={index}
                                  href={link.url || link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-1 bg-muted rounded hover:bg-foreground hover:text-background transition-colors"
                                >
                                  {link.name || "Buy"}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {products.length > 0 && (
              <section className="mx-auto max-w-6xl px-6 mb-16">
                <h2 className="text-xl font-serif text-center mb-12">
                  Purchase Books
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} to={`/store/${product.slug}`}>
                      <Card className="overflow-hidden group card-hover border-border">
                        <div className="aspect-[3/4] relative bg-muted">
                          {product.featuredImage ? (
                            <img
                              src={product.featuredImage}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                          )}
                          {!product.isInStock && (
                            <span className="absolute top-2 right-2 bg-muted-foreground text-background px-2 py-1 text-xs rounded">
                              Out of Stock
                            </span>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-serif font-medium">
                            {product.title}
                          </h3>
                          {product.category && (
                            <p className="text-xs text-muted-foreground">
                              {product.category.name}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold highlight-yellow">
                              {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                          {product.shortDescription && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                              {product.shortDescription}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="mx-auto max-w-2xl px-6 text-center mb-16">
            <Book className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Our book collection is being prepared. Check back soon for amazing
              Nigerian literature!
            </p>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mx-auto max-w-2xl px-6 mb-12">
            <h2 className="text-xl font-serif text-center mb-12">
              Publishing News
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
                      {article.categoryName || "Publishing News"}
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

export default Books;
