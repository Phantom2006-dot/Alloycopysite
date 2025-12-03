import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";

const films = [
  { id: 1, title: "Discover Nigeria", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", type: "film" as const },
  { id: 2, title: "Lagos Life", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", type: "film" as const },
  { id: 3, title: "Cultural Journey", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", type: "film" as const },
  { id: 4, title: "Heritage Stories", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop", type: "film" as const },
  { id: 5, title: "Nigerian Voices", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", type: "film" as const },
  { id: 6, title: "Destination Africa", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", type: "film" as const },
];

const recentNews = [
  {
    source: "BAUHAUS Films",
    date: "January 2025",
    headline: "New Documentary Series Exploring Nigerian Cultural Heritage in Production",
  },
  {
    source: "African Film Review",
    date: "December 2024",
    headline: "BAUHAUS Documentary Selected for International Film Festival",
  },
  {
    source: "Film Today",
    date: "November 2024",
    headline: "BAUHAUS Announces Partnership with Nigerian Filmmakers",
  },
];

const Film = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">FILMS & DOCUMENTARIES</h1>

        {/* Film Carousel */}
        <section className="mb-20">
          <MediaCarousel items={films} />
        </section>

        {/* Recent News */}
        <section className="mx-auto max-w-2xl px-6 mb-12">
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

        <div className="divider" />
      </div>
    </Layout>
  );
};

export default Film;
