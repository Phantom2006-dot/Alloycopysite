import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { FileText, Image, Users, Calendar, Plus, Eye, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { data: articlesData } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => api.articles.adminList({ limit: 5 }),
  });

  const { data: eventsData } = useQuery({
    queryKey: ["admin-events"],
    queryFn: () => api.events.adminList(),
  });

  const { data: teamData } = useQuery({
    queryKey: ["admin-team"],
    queryFn: () => api.team.adminList(),
  });

  const stats = [
    {
      title: "Total Articles",
      value: articlesData?.pagination?.total || 0,
      icon: FileText,
      href: "/admin/articles",
    },
    {
      title: "Team Members",
      value: teamData?.length || 0,
      icon: Users,
      href: "/admin/team",
    },
    {
      title: "Events",
      value: eventsData?.length || 0,
      icon: Calendar,
      href: "/admin/events",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-serif">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome to BAUHAUS CMS</p>
          </div>
          <Button asChild>
            <Link to="/admin/articles/new">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Articles</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/articles">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {articlesData?.articles && articlesData.articles.length > 0 ? (
                <div className="space-y-4">
                  {articlesData.articles.map((article: any) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/admin/articles/${article.id}`}
                          className="font-medium hover:underline truncate block"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            article.status === "published" 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : article.status === "draft"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                          }`}>
                            {article.status}
                          </span>
                          <span>{format(new Date(article.createdAt), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {article.viewCount || 0}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No articles yet.{" "}
                  <Link to="/admin/articles/new" className="text-primary hover:underline">
                    Create your first article
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/events">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {eventsData && eventsData.filter((e: any) => e.status === "upcoming").length > 0 ? (
                <div className="space-y-4">
                  {eventsData
                    .filter((e: any) => e.status === "upcoming")
                    .slice(0, 5)
                    .map((event: any) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/admin/events/${event.id}`}
                            className="font-medium hover:underline truncate block"
                          >
                            {event.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(event.eventDate), "MMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No upcoming events.{" "}
                  <Link to="/admin/events/new" className="text-primary hover:underline">
                    Create an event
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/admin/articles/new">
                  <FileText className="h-5 w-5" />
                  <span>New Article</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/admin/events/new">
                  <Calendar className="h-5 w-5" />
                  <span>New Event</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/admin/uploads">
                  <Image className="h-5 w-5" />
                  <span>Upload Media</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/admin/team/new">
                  <Users className="h-5 w-5" />
                  <span>Add Team Member</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
