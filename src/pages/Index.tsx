import Layout from "@/components/Layout";
import MediaCarousel from "@/components/MediaCarousel";

const mediaItems = [
  { id: 1, title: "Nigerian Heritage", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", type: "book" as const },
  { id: 2, title: "Lagos Stories", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", type: "book" as const },
  { id: 3, title: "Discover Nigeria", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", type: "film" as const },
  { id: 4, title: "Cultural Journeys", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", type: "book" as const },
  { id: 5, title: "African Voices", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", type: "film" as const },
  { id: 6, title: "Tourism Guide", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", type: "book" as const },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Media Carousel Section */}
      <section className="py-12 md:py-16">
        <MediaCarousel items={mediaItems} />
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <blockquote className="quote-text mb-6">
            "BAUHAUS brings together the best of Nigerian storytelling through books, films, and unforgettable travel experiences."
          </blockquote>
        </div>
      </section>

      {/* Services Overview */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-lg font-serif mb-3">Books & Publishing</h3>
              <p className="text-sm text-muted-foreground">
                Discover our catalog of compelling stories celebrating Nigerian culture and heritage.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif mb-3">Films & Documentaries</h3>
              <p className="text-sm text-muted-foreground">
                Visual storytelling that captures the essence of African narratives.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif mb-3">Tourism</h3>
              <p className="text-sm text-muted-foreground">
                Explore Lagos, Abuja, Akwa Ibom, and more with our comprehensive travel guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
