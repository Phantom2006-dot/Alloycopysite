import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";

const tvShows = [
  { id: 1, title: "You", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 2, title: "Gossip Girl", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 3, title: "Pretty Little Liars", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 4, title: "The Vampire Diaries", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 5, title: "The 100", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", type: "tv" as const },
  { id: 6, title: "Legacies", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", type: "tv" as const },
];

const recentNews = [
  {
    source: "Variety",
    date: "May 5, 2025",
    headline: "'You' Season 5 Breaks Netflix Viewing Records in First Week",
  },
  {
    source: "Deadline",
    date: "April 20, 2025",
    headline: "Alloy Entertainment Sets New Drama Series at Max",
  },
  {
    source: "The Hollywood Reporter",
    date: "March 15, 2025",
    headline: "Pretty Little Liars Spinoff in Development at Warner Bros.",
  },
];

const TV = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">TV</h1>

        {/* TV Carousel */}
        <section className="mb-20">
          <MediaCarousel items={tvShows} />
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

export default TV;
