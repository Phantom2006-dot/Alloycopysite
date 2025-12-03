import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Save, Eye, Send } from "lucide-react";

export default function ArticleEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { canPublish } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    featuredImage: "",
    featuredImageAlt: "",
    status: "draft",
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
  });

  const { data: article, isLoading: isLoadingArticle } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const articles = await api.articles.adminList({ limit: 100 });
      return articles.articles.find((a: any) => a.id === parseInt(id!));
    },
    enabled: !isNew,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.categories.list(),
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        excerpt: article.excerpt || "",
        categoryId: article.categoryId?.toString() || "",
        featuredImage: article.featuredImage || "",
        featuredImageAlt: article.featuredImageAlt || "",
        status: article.status || "draft",
        isFeatured: article.isFeatured || false,
        metaTitle: article.metaTitle || "",
        metaDescription: article.metaDescription || "",
      });
    }
  }, [article]);

  const createMutation = useMutation({
    mutationFn: (data: any) => api.articles.create(data),
    onSuccess: (result) => {
      toast({ title: "Article created successfully" });
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      navigate(`/admin/articles/${result.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.articles.update(parseInt(id!), data),
    onSuccess: () => {
      toast({ title: "Article updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", id] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (status?: string) => {
    const data = {
      ...formData,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      status: status || formData.status,
    };

    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (!isNew && isLoadingArticle) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold font-serif">
                {isNew ? "New Article" : "Edit Article"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isNew ? "Create a new blog post" : "Update your article"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            {canPublish && (
              <Button onClick={() => handleSubmit("published")} disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter article title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief summary of the article"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your article content here... (Supports HTML)"
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;a&gt;)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                    disabled={!canPublish && formData.status !== "draft"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      {canPublish && (
                        <>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Article</Label>
                  <Switch
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFeatured: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredImage: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featuredImageAlt">Alt Text</Label>
                  <Input
                    id="featuredImageAlt"
                    value={formData.featuredImageAlt}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredImageAlt: e.target.value })
                    }
                    placeholder="Describe the image"
                  />
                </div>

                {formData.featuredImage && (
                  <div className="rounded-md overflow-hidden border">
                    <img
                      src={formData.featuredImage}
                      alt={formData.featuredImageAlt || "Preview"}
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x200?text=Invalid+Image";
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                    placeholder="SEO title (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                    placeholder="SEO description (optional)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
