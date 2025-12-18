import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { api } from "@/lib/api";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
}

export default function ProductCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductCategory | null>(null);
  const queryClient = useQueryClient();

  const initialFormData = {
    name: "",
    description: "",
    image: "",
    sortOrder: "0",
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { data: categories, isLoading } = useQuery<ProductCategory[]>({
    queryKey: ["productCategories"],
    queryFn: () => api.productCategories.adminList(),
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => api.productCategories.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast.success("Category created successfully");
      setIsOpen(false);
      setFormData(initialFormData);
    },
    onError: () => toast.error("Failed to create category"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => 
      api.productCategories.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast.success("Category updated successfully");
      setIsOpen(false);
      setEditingItem(null);
      setFormData(initialFormData);
    },
    onError: () => toast.error("Failed to update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.productCategories.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => toast.error(error.message || "Failed to delete category"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      description: formData.description || undefined,
      image: formData.image || undefined,
      sortOrder: parseInt(formData.sortOrder) || 0,
      isActive: formData.isActive,
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const openEdit = (item: ProductCategory) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      image: item.image || "",
      sortOrder: item.sortOrder.toString(),
      isActive: item.isActive,
    });
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setIsOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-serif">Product Categories</h1>
              <p className="text-muted-foreground">Organize your products into categories</p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !categories || categories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No categories yet. Create categories like "Books", "Fashion", "Electronics" to organize your products.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <Card key={item.id} className="min-w-[280px] overflow-hidden md:min-w-0">
                <div className="aspect-video relative bg-muted">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <span className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${
                    item.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.slug}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.productCount || 0} products • Sort order: {item.sortOrder}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this category?")) {
                          deleteMutation.mutate(item.id);
                        }
                      }}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Books, Fashion, Electronics"
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
                placeholder="Brief description of this category"
              />
            </div>

            <div className="space-y-2">
              <Label>Category Image (Cloudinary)</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min="0"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {editingItem ? "Update Category" : "Create Category"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
