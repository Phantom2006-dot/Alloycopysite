import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, Copy, Image as ImageIcon, FileText, Check } from "lucide-react";
import { toast } from "sonner";

interface Upload {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  thumbnailPath: string | null;
  alt: string | null;
  folder: string | null;
  createdAt: string;
}

export default function Uploads() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: uploads = [], isLoading } = useQuery<Upload[]>({
    queryKey: ["uploads"],
    queryFn: async () => {
      const res = await fetch("/api/uploads");
      if (!res.ok) throw new Error("Failed to fetch uploads");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/uploads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete upload");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
      toast.success("File deleted successfully");
    },
    onError: () => toast.error("Failed to delete file"),
  });

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      queryClient.invalidateQueries({ queryKey: ["uploads"] });
      toast.success("File uploaded successfully");
      setIsUploadOpen(false);
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  }, [queryClient]);

  const copyUrl = (upload: Upload) => {
    navigator.clipboard.writeText(upload.path);
    setCopiedId(upload.id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Media Library</h1>
            <p className="text-muted-foreground">Manage your uploaded files</p>
          </div>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No files uploaded yet. Upload your first file to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {uploads.map((upload) => (
              <Card key={upload.id} className="overflow-hidden group">
                <div className="aspect-square relative bg-muted">
                  {isImage(upload.mimeType) ? (
                    <img
                      src={upload.thumbnailPath || upload.path}
                      alt={upload.alt || upload.originalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => copyUrl(upload)}
                    >
                      {copiedId === upload.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => deleteMutation.mutate(upload.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs truncate" title={upload.originalName}>
                    {upload.originalName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(upload.size)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Choose a file to upload
              </p>
              <Input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                className="max-w-xs mx-auto"
                accept="image/*,.pdf,.doc,.docx"
              />
              {uploading && (
                <p className="text-sm text-muted-foreground mt-4">Uploading...</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
