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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Calendar, MapPin, Video } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { format } from "date-fns";
import { api } from "@/lib/api"; // ADD THIS IMPORT

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
  createdAt: string;
}

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null); // ADD THIS
  const queryClient = useQueryClient();

  const initialFormData = {
    title: "",
    description: "",
    eventDate: "",
    endDate: "",
    location: "",
    isVirtual: false,
    virtualLink: "",
    featuredImage: "",
    registrationLink: "",
    eventType: "",
    status: "upcoming" as "upcoming" | "ongoing" | "past",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { data, isLoading } = useQuery<{ events: Event[] }>({
    queryKey: ["events"],
    queryFn: async () => {
      return api.events.list({ limit: 100, status: "all" }); // USE API CLIENT
    },
  });

  const events = data?.events || [];

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // USE THE API CLIENT WITH FILE SUPPORT
      return api.events.create(
        data,
        featuredImageFile ? { featuredImage: featuredImageFile } : undefined,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
      setIsOpen(false);
      setFormData(initialFormData);
      setFeaturedImageFile(null); // CLEAR FILE
    },
    onError: (error: any) => {
      console.error("Create error:", error);
      toast.error(error.message || "Failed to create event");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      // USE THE API CLIENT WITH FILE SUPPORT
      return api.events.update(
        id,
        data,
        featuredImageFile ? { featuredImage: featuredImageFile } : undefined,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully");
      setIsOpen(false);
      setEditingEvent(null);
      setFormData(initialFormData);
      setFeaturedImageFile(null); // CLEAR FILE
    },
    onError: (error: any) => {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update event");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.events.delete(id); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete event");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString().slice(0, 16)
        : "",
      endDate: event.endDate
        ? new Date(event.endDate).toISOString().slice(0, 16)
        : "",
      location: event.location || "",
      isVirtual: event.isVirtual,
      virtualLink: event.virtualLink || "",
      featuredImage: event.featuredImage || "",
      registrationLink: event.registrationLink || "",
      eventType: event.eventType || "",
      status: event.status,
    });
    setFeaturedImageFile(null); // Clear any existing file
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingEvent(null);
    setFormData(initialFormData);
    setFeaturedImageFile(null); // Clear any existing file
    setIsOpen(true);
  };

  // ADD THIS FUNCTION TO HANDLE FILE SELECTION
  const handleFileSelect = (file: File) => {
    setFeaturedImageFile(file);
    // Clear the URL if a file is selected
    setFormData((prev) => ({ ...prev, featuredImage: "" }));
  };

  // UPDATE ImageUpload component usage
  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, featuredImage: url }));
    // Clear the file if URL is entered
    setFeaturedImageFile(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "past":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Events</h1>
            <p className="text-muted-foreground">Manage your events</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No events yet. Create your first event to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {event.featuredImage ? (
                    <img
                      src={event.featuredImage}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{event.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(event.eventDate), "MMM d, yyyy")}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                  {event.isVirtual && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Video className="h-3 w-3" />
                      Virtual Event
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(event)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMutation.mutate(event.id)}
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
              {editingEvent ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <ImageUpload
                value={formData.featuredImage}
                onChange={handleImageUrlChange} // UPDATED
                placeholder="Enter image URL or upload a file"
                folder="events"
              />
              {/* ADD FILE UPLOAD INPUT FOR DIRECT FILE SELECTION */}
              <div className="mt-2">
                <Label htmlFor="featuredImageFile" className="text-sm">
                  Or select file directly:
                </Label>
                <Input
                  id="featuredImageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="mt-1"
                />
                {featuredImageFile && (
                  <p className="text-sm text-green-600 mt-1">
                    File selected: {featuredImageFile.name} (
                    {(featuredImageFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Start Date & Time</Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date & Time</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Venue address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Input
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  placeholder="e.g., Conference, Workshop"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Switch
                id="isVirtual"
                checked={formData.isVirtual}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isVirtual: checked })
                }
              />
              <Label htmlFor="isVirtual">Virtual Event</Label>
            </div>

            {formData.isVirtual && (
              <div className="space-y-2">
                <Label htmlFor="virtualLink">Virtual Event Link</Label>
                <Input
                  id="virtualLink"
                  value={formData.virtualLink}
                  onChange={(e) =>
                    setFormData({ ...formData, virtualLink: e.target.value })
                  }
                  placeholder="Zoom, Teams, or other meeting link"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="registrationLink">Registration Link</Label>
              <Input
                id="registrationLink"
                value={formData.registrationLink}
                onChange={(e) =>
                  setFormData({ ...formData, registrationLink: e.target.value })
                }
                placeholder="Eventbrite, Tickets, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Processing..."
                : editingEvent
                  ? "Update"
                  : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
