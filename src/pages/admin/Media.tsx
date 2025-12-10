import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Book, Film, Tv } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { api } from "@/lib/api"; // ADD THIS IMPORT

interface MediaItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  type: "book" | "film" | "tv";
  coverImage: string | null;
  releaseDate: string | null;
  genre: string | null;
  castInfo: string | null;
  authorInfo: string | null;
  externalLinks: string | null;
  trailerUrl: string | null;
  isFeatured: boolean;
  status: string;
  createdAt: string;
}

const typeLabels: Record<string, { label: string; icon: typeof Book }> = {
  books: { label: "Books", icon: Book },
  films: { label: "Films", icon: Film },
  tv: { label: "TV Shows", icon: Tv },
};

const typeToApiType: Record<string, string> = {
  books: "book",
  films: "film",
  tv: "tv",
};

export default function Media() {
  const { type = "books" } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  
  const apiType = typeToApiType[type] || "book";
  const typeInfo = typeLabels[type] || typeLabels.books;
  const TypeIcon = typeInfo.icon;

  const initialFormData = {
    title: "",
    description: "",
    coverImage: "",
    releaseDate: "",
    genre: "",
    castInfo: "",
    authorInfo: "",
    externalLinks: "",
    trailerUrl: "",
    isFeatured: false,
    status: "published" as const,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { data, isLoading } = useQuery<{ items: MediaItem[] }>({
    queryKey: ["media", apiType],
    queryFn: async () => {
      return api.media.list({ type: apiType, limit: 100 }); // USE API CLIENT
    },
  });

  const items = data?.items || [];

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData & { type: string }) => {
      return api.media.create(data, coverImageFile ? { coverImage: coverImageFile } : undefined); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", apiType] });
      toast.success("Item created successfully");
      setIsOpen(false);
      setFormData(initialFormData);
      setCoverImageFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create item");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      return api.media.update(id, data, coverImageFile ? { coverImage: coverImageFile } : undefined); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", apiType] });
      toast.success("Item updated successfully");
      setIsOpen(false);
      setEditingItem(null);
      setFormData(initialFormData);
      setCoverImageFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update item");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.media.delete(id); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", apiType] });
      toast.success("Item deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete item");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate({ ...formData, type: apiType });
    }
  };

  const openEdit = (item: MediaItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      coverImage: item.coverImage || "",
      releaseDate: item.releaseDate ? new Date(item.releaseDate).toISOString().split("T")[0] : "",
      genre: item.genre || "",
      castInfo: item.castInfo || "",
      authorInfo: item.authorInfo || "",
      externalLinks: item.externalLinks || "",
      trailerUrl: item.trailerUrl || "",
      isFeatured: item.isFeatured,
      status: item.status as any,
    });
    setCoverImageFile(null);
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setCoverImageFile(null);
    setIsOpen(true);
  };

  const handleFileSelect = (file: File) => {
    setCoverImageFile(file);
    setFormData(prev => ({ ...prev, coverImage: "" }));
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, coverImage: url }));
    setCoverImageFile(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TypeIcon className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-serif">{typeInfo.label}</h1>
              <p className="text-muted-foreground">Manage your {typeInfo.label.toLowerCase()}</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add {typeInfo.label.slice(0, -1)}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No {typeInfo.label.toLowerCase()} yet. Add your first one to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative bg-muted">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <TypeIcon className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  {item.isFeatured && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                      Featured
                    </span>
                  )}
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs rounded ${
                    item.status === "published" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  {item.genre && <p className="text-sm text-muted-foreground">{item.genre}</p>}
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? `Edit ${typeInfo.label.slice(0, -1)}` : `Add ${typeInfo.label.slice(0, -1)}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={formData.coverImage}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL or upload a file"
                folder="media"
              />
              <div className="mt-2">
                <Label htmlFor="coverImageFile" className="text-sm">Or select file directly:</Label>
                <Input
                  id="coverImageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="mt-1"
                />
                {coverImageFile && (
                  <p className="text-sm text-green-600 mt-1">
                    File selected: {coverImageFile.name} ({(coverImageFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Release Date</Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                />
              </div>
            </div>

            {apiType === "book" && (
              <div className="space-y-2">
                <Label htmlFor="authorInfo">Author</Label>
                <Input
                  id="authorInfo"
                  value={formData.authorInfo}
                  onChange={(e) => setFormData({ ...formData, authorInfo: e.target.value })}
                />
              </div>
            )}

            {(apiType === "film" || apiType === "tv") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="castInfo">Cast Information</Label>
                  <Textarea
                    id="castInfo"
                    value={formData.castInfo}
                    onChange={(e) => setFormData({ ...formData, castInfo: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trailerUrl">Trailer URL</Label>
                  <Input
                    id="trailerUrl"
                    value={formData.trailerUrl}
                    onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="externalLinks">External Links</Label>
              <Input
                id="externalLinks"
                value={formData.externalLinks}
                onChange={(e) => setFormData({ ...formData, externalLinks: e.target.value })}
                placeholder="Purchase link, more info, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <Label htmlFor="isFeatured">Featured</Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending 
                ? "Processing..." 
                : editingItem ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}