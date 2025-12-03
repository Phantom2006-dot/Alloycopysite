import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";

const books = [
  { id: 1, title: "Nigerian Heritage", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", type: "book" as const },
  { id: 2, title: "Lagos Chronicles", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", type: "book" as const },
  { id: 3, title: "Voices of Africa", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", type: "book" as const },
  { id: 4, title: "Journey to Ile-Ife", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop", type: "book" as const },
  { id: 5, title: "Abuja Stories", image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop", type: "book" as const },
  { id: 6, title: "Cultural Roots", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop", type: "book" as const },
];

const recentNews = [
  {
    source: "BAUHAUS Publishing",
    date: "January 2025",
    headline: "New Collection Celebrating Nigerian Storytelling Traditions",
  },
  {
    source: "African Literary Review",
    date: "December 2024",
    headline: "BAUHAUS Expands Distribution to Global Markets",
  },
  {
    source: "Publishing Today",
    date: "November 2024",
    headline: "BAUHAUS Partners with Nigerian Authors for Cultural Series",
  },
];

const Books = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">BOOKS</h1>

        {/* Books Carousel */}
        <section className="mb-20">
          <MediaCarousel items={books} />
        </section>

        {/* Recent News */}
        <section className="mx-auto max-w-2xl px-6">
          <h2 className="text-xl font-serif text-center mb-12">Recent News</h2>
          
          <div className="space-y-6">
            {recentNews.map((news, index) => (
              <article
                key={index}
                className="border border-foreground/20 p-6 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-sm font-medium text-accent mb-2">
                  {news.source} ({news.date})
                </p>
                <p className="text-sm text-foreground/80">{news.headline}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Books;
