import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Video, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Event {
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
  status: "upcoming" | "ongoing" | "past";
}

const fallbackEvents = [
  {
    id: 1,
    name: "Book Launch: Nigerian Heritage Collection",
    date: "March 2025",
    location: "Lagos, Nigeria",
    description: "Join us for the launch of our latest book celebrating Nigerian heritage and storytelling traditions.",
    status: "upcoming"
  },
  {
    id: 2,
    name: "BAUHAUS Film Screening",
    date: "April 2025",
    location: "Northampton, UK",
    description: "Exclusive screening of our latest documentary followed by Q&A with the filmmakers.",
    status: "upcoming"
  },
  {
    id: 3,
    name: "Author Meet & Greet",
    date: "May 2025",
    location: "Colorado, USA",
    description: "Meet our published authors and learn about their creative journeys.",
    status: "upcoming"
  },
];

const Events = () => {
  const { data: upcomingData } = useQuery<Event[]>({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const res = await fetch("/api/events/upcoming");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const { data: pastData } = useQuery<Event[]>({
    queryKey: ["past-events"],
    queryFn: async () => {
      const res = await fetch("/api/events/past");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const upcomingEvents = upcomingData || [];
  const pastEvents = pastData || [];
  const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="section-title text-center mb-4 animate-fade-in">EVENTS</h1>
        <p className="text-center text-muted-foreground mb-12 animate-fade-in">
          Join us at our upcoming events in Colorado, Northampton, and Lagos
        </p>

        <section className="mb-16">
          <h2 className="section-title text-center mb-8">UPCOMING EVENTS</h2>
          
          <div className="space-y-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  className="overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {event.featuredImage && (
                    <div className="aspect-video bg-muted">
                      <img
                        src={event.featuredImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg mb-2">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-foreground/80 mb-3">{event.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(event.eventDate), "MMMM d, yyyy")}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          )}
                          {event.isVirtual && (
                            <span className="flex items-center gap-1">
                              <Video className="h-3 w-3" />
                              Virtual Event
                            </span>
                          )}
                        </div>
                      </div>
                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-foreground/30 text-sm hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                        >
                          Register <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              fallbackEvents.map((event, index) => (
                <article 
                  key={event.id}
                  className="p-6 bg-secondary/50 border border-border animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg mb-2">{event.name}</h3>
                      <p className="text-sm text-foreground/80 mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span>-</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-foreground/30 text-sm hover:bg-foreground hover:text-background transition-colors">
                      Learn More
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {pastEvents.length > 0 && (
          <>
            <div className="divider mb-16" />
            <section className="mb-16">
              <h2 className="section-title text-center mb-8">PAST EVENTS</h2>
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-serif">{event.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(event.eventDate), "MMMM d, yyyy")}
                            {event.location && ` - ${event.location}`}
                          </p>
                        </div>
                        <span className="text-xs bg-muted px-2 py-1 rounded">Completed</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="divider mb-16" />

        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title text-center mb-8">OUR LOCATIONS</h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <h3 className="font-serif text-lg mb-2">Colorado, USA</h3>
              <p className="text-sm text-muted-foreground">
                Book launches, readings, and cultural events in the American West.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg mb-2">Northampton, UK</h3>
              <p className="text-sm text-muted-foreground">
                Film screenings, author events, and community gatherings at our UK headquarters.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg mb-2">Lagos, Nigeria</h3>
              <p className="text-sm text-muted-foreground">
                Major launches, cultural celebrations, and tourism showcases in our home city.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-block border border-foreground/30 px-8 py-6">
            <h3 className="font-serif text-lg mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to hear about upcoming events and new releases
            </p>
            <a
              href="mailto:events@bauhausproduction.com"
              className="link-gold text-sm"
            >
              events@bauhausproduction.com
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Events;
