import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminArticles() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-articles", page, status, search],
    queryFn: () =>
      api.articles.adminList({
        page,
        limit: 10,
        status: status !== "all" ? status : undefined,
        search: search || undefined,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.articles.delete(id),
    onSuccess: () => {
      toast({ title: "Article deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-serif">Articles</h1>
            <p className="text-muted-foreground mt-1">Manage your blog articles</p>
          </div>
          <Button asChild>
            <Link to="/admin/articles/new">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : data?.articles && data.articles.length > 0 ? (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.articles.map((article: any) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">
                            <Link
                              to={`/admin/articles/${article.id}`}
                              className="hover:underline"
                            >
                              {article.title}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              by {article.authorName}
                            </p>
                          </TableCell>
                          <TableCell>{article.categoryName || "-"}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
                                article.status === "published"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                  : article.status === "draft"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              }`}
                            >
                              {article.status}
                            </span>
                          </TableCell>
                          <TableCell>{article.viewCount || 0}</TableCell>
                          <TableCell>
                            {format(new Date(article.createdAt), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/articles/${article.id}`}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                {article.status === "published" && (
                                  <DropdownMenuItem asChild>
                                    <Link to={`/blog/${article.slug}`} target="_blank">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      View Live
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setDeleteId(article.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {data.pagination.pages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Page {data.pagination.page} of {data.pagination.pages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === data.pagination.pages}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles found</p>
                <Button asChild>
                  <Link to="/admin/articles/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first article
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
