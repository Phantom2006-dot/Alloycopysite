import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

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
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  categorySlug: string | null;
}

const fallbackBooks = [
  { id: 1, title: "Nigerian Heritage", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", type: "book" as const },
  { id: 2, title: "Lagos Chronicles", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", type: "book" as const },
  { id: 3, title: "Voices of Africa", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", type: "book" as const },
  { id: 4, title: "Journey to Ile-Ife", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop", type: "book" as const },
  { id: 5, title: "Abuja Stories", image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop", type: "book" as const },
  { id: 6, title: "Cultural Roots", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop", type: "book" as const },
];

const Books = () => {
  const { data: booksData } = useQuery<MediaItem[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch("/api/media/type/book");
      if (!res.ok) throw new Error("Failed to fetch books");
      return res.json();
    },
  });

  const { data: articlesData } = useQuery<{ articles: Article[] }>({
    queryKey: ["articles", "books"],
    queryFn: async () => {
      const res = await fetch("/api/articles?category=books&limit=5");
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
  });

  const books = booksData || [];
  const articles = articlesData?.articles || [];

  const featuredBooks = books.filter(b => b.isFeatured);
  const allBooks = featuredBooks.length > 0 ? featuredBooks : books;

  const carouselItems = allBooks.length > 0 
    ? allBooks.map(item => ({
        id: item.id,
        title: item.title,
        image: item.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        type: item.type,
      }))
    : fallbackBooks;

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">BOOKS</h1>

        <section className="mb-20">
          {allBooks.length > 0 && (
            <p className="text-center text-muted-foreground mb-8">Featured Books</p>
          )}
          <MediaCarousel items={carouselItems} />
        </section>

        {books.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 mb-16">
            <h2 className="text-xl font-serif text-center mb-12">All Books</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
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
                      <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-medium">{book.title}</h3>
                    {book.authorInfo && (
                      <p className="text-sm text-muted-foreground">by {book.authorInfo}</p>
                    )}
                    {book.genre && (
                      <p className="text-xs text-muted-foreground mt-1">{book.genre}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-2xl px-6">
          <h2 className="text-xl font-serif text-center mb-12">Recent News</h2>
          
          <div className="space-y-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <article
                  key={article.id}
                  className="border border-foreground/20 p-6 text-center animate-slide-up hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium text-accent mb-2">
                    BAUHAUS Publishing {article.publishedAt && `(${new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`}
                  </p>
                  <p className="text-sm text-foreground/80">{article.title}</p>
                </article>
              ))
            ) : (
              <>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up">
                  <p className="text-sm font-medium text-accent mb-2">BAUHAUS Publishing (January 2025)</p>
                  <p className="text-sm text-foreground/80">New Collection Celebrating Nigerian Storytelling Traditions</p>
                </article>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <p className="text-sm font-medium text-accent mb-2">African Literary Review (December 2024)</p>
                  <p className="text-sm text-foreground/80">BAUHAUS Expands Distribution to Global Markets</p>
                </article>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <p className="text-sm font-medium text-accent mb-2">Publishing Today (November 2024)</p>
                  <p className="text-sm text-foreground/80">BAUHAUS Partners with Nigerian Authors for Cultural Series</p>
                </article>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Books;
