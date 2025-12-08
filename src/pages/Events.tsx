import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Video, Book, Film, MapPin as MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { format, isPast, isFuture } from "date-fns";
import { useState, useEffect } from "react";

interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  eventDate: string;
  endDate: string | null;
  location: string | null;
  isVirtual: boolean;
  virtualLink: string | null;
  featuredImage: string | null;
  registrationLink: string | null;
  eventType: string | null;
  status: string;
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

const Events = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      if (!Layout) {
        throw new Error("Layout component not found");
      }
    } catch (error) {
      console.error("Component initialization error:", error);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : "Component error");
    }
  }, []);

  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const data = await api.events.list({ limit: 100, status: "all" });
        return data.events || [];
      } catch (error) {
        console.error("Error fetching events:", error);
        return [];
      }
    },
    retry: 1,
  });

  const { data: articlesData, isLoading: articlesLoading, error: articlesError } = useQuery({
    queryKey: ["articles", "events"],
    queryFn: async () => {
      try {
        const data = await api.articles.list({ 
          category: "events", 
          limit: 5,
          status: "published"
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
    if (eventsError || articlesError) {
      console.error("Query errors detected:", { eventsError, articlesError });
      setHasError(true);
      setErrorMessage("Failed to load some data. Please refresh the page.");
    }
  }, [eventsError, articlesError]);

  const events: EventItem[] = eventsData || [];
  const articles: Article[] = articlesData || [];

  // Filter events by status
  const upcomingEvents = events.filter(event => 
    isFuture(new Date(event.eventDate)) || event.status === "upcoming"
  ).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const ongoingEvents = events.filter(event => 
    event.status === "ongoing" || 
    (event.endDate && !isPast(new Date(event.endDate)) && !isFuture(new Date(event.eventDate)))
  );

  const pastEvents = events.filter(event => 
    isPast(new Date(event.eventDate)) && event.status !== "upcoming"
  ).sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const isLoading = eventsLoading || articlesLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Events...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="section-title text-center mb-12 animate-fade-in">EVENTS & TOURISM</h1>

        <section className="mx-auto max-w-4xl px-6 mb-20 text-center">
          <p className="text-xl md:text-2xl leading-relaxed font-serif text-foreground/90 mb-8">
            Experience Nigerian culture through our curated events and tourism experiences.
          </p>
          <p className="body-text max-w-2xl mx-auto">
            From book launches and film screenings to cultural festivals and guided tours, we bring Nigerian stories to life through memorable events.
          </p>
        </section>

        {/* Upcoming Events */}
        <section className="mx-auto max-w-6xl px-6 mb-16">
          <h2 className="text-xl font-serif text-center mb-12">Upcoming Events</h2>
          
          {eventsLoading ? (
            <div className="text-center py-12">Loading events...</div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    {event.featuredImage ? (
                      <img
                        src={event.featuredImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    {event.eventType && (
                      <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 text-xs rounded">
                        {event.eventType}
                      </span>
                    )}
                    {event.isVirtual && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                        Virtual
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-medium">{event.title}</h3>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(event.eventDate), 'EEE, MMM d, yyyy • h:mm a')}</span>
                      </div>
                      
                      {event.location && !event.isVirtual && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.isVirtual && event.virtualLink && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Video className="h-4 w-4" />
                          <span>Virtual Event</span>
                        </div>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                        >
                          Register
                        </a>
                      )}
                      {event.isVirtual && event.virtualLink && (
                        <a
                          href={event.virtualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Join Virtually
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming events scheduled yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new event announcements!</p>
            </div>
          )}
        </section>

        {/* Event Categories */}
        <section className="mx-auto max-w-4xl px-6 mb-16">
          <h2 className="text-xl font-serif text-center mb-12">Event Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-medium mb-2">Book Launches</h3>
              <p className="text-sm text-muted-foreground">
                Celebrating new Nigerian literature with author readings and signings.
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-medium mb-2">Film Screenings</h3>
              <p className="text-sm text-muted-foreground">
                Premieres and special screenings of Nigerian films and documentaries.
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-medium mb-2">Cultural Tours</h3>
              <p className="text-sm text-muted-foreground">
                Guided tours exploring Nigerian heritage sites and cultural landmarks.
              </p>
            </Card>
          </div>
        </section>

        {/* Event News */}
        <section className="mx-auto max-w-2xl px-6 mb-12">
          <h2 className="text-xl font-serif text-center mb-12">Event News & Updates</h2>
          
          <div className="space-y-6">
            {articlesLoading ? (
              <div className="text-center py-8">Loading articles...</div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Link 
                  key={article.id} 
                  to={`/blog/${article.slug}`}
                  className="block border border-foreground/20 p-6 text-center animate-slide-up hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
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
                    <p className="text-sm font-medium text-accent mb-2">
                      {article.categoryName || "Event News"} 
                      {article.publishedAt && ` • ${format(new Date(article.publishedAt), 'MMM yyyy')}`}
                    </p>
                    <p className="text-sm text-foreground/80 font-medium">{article.title}</p>
                    {article.excerpt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up">
                  <p className="text-sm font-medium text-accent mb-2">Event Announcement (April 2025)</p>
                  <p className="text-sm text-foreground/80">Annual Nigerian Culture Festival Dates Announced</p>
                </article>
                <article className="border border-foreground/20 p-6 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <p className="text-sm font-medium text-accent mb-2">Tourism Update (March 2025)</p>
                  <p className="text-sm text-foreground/80">New Heritage Tour Routes Launched in Lagos</p>
                </article>
              </>
            )}
          </div>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="mx-auto max-w-4xl px-6">
            <h2 className="text-xl font-serif text-center mb-12">Past Events</h2>
            <div className="space-y-4">
              {pastEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.eventDate), 'MMM d, yyyy')} • {event.eventType}
                      </p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="divider" />
      </div>
    </Layout>
  );
};

export default Events;
