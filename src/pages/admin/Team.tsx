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
import { Plus, Pencil, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { api } from "@/lib/api"; // ADD THIS IMPORT

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string | null;
  bio: string | null;
  profilePhoto: string | null;
  socialLinks: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const initialFormData = {
    name: "",
    role: "",
    department: "",
    bio: "",
    profilePhoto: "",
    socialLinks: "",
    sortOrder: 0,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { data: members = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      return api.team.list(); // USE API CLIENT
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return api.team.create(
        data,
        profilePhotoFile ? { profilePhoto: profilePhotoFile } : undefined,
      ); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member created successfully");
      setIsOpen(false);
      setFormData(initialFormData);
      setProfilePhotoFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create team member");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      return api.team.update(
        id,
        data,
        profilePhotoFile ? { profilePhoto: profilePhotoFile } : undefined,
      ); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member updated successfully");
      setIsOpen(false);
      setEditingMember(null);
      setFormData(initialFormData);
      setProfilePhotoFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update team member");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.team.delete(id); // USE API CLIENT
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete team member");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department || "",
      bio: member.bio || "",
      profilePhoto: member.profilePhoto || "",
      socialLinks: member.socialLinks || "",
      sortOrder: member.sortOrder,
      isActive: member.isActive,
    });
    setProfilePhotoFile(null);
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingMember(null);
    setFormData(initialFormData);
    setProfilePhotoFile(null);
    setIsOpen(true);
  };

  const handleFileSelect = (file: File) => {
    setProfilePhotoFile(file);
    setFormData((prev) => ({ ...prev, profilePhoto: "" }));
  };

  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, profilePhoto: url }));
    setProfilePhotoFile(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Team Members</h1>
            <p className="text-muted-foreground">Manage your team</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No team members yet. Add your first team member to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      {member.profilePhoto ? (
                        <img
                          src={member.profilePhoto}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                      {member.department && (
                        <p className="text-xs text-muted-foreground">
                          {member.department}
                        </p>
                      )}
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 text-xs rounded ${
                          member.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(member)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMutation.mutate(member.id)}
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                placeholder="e.g., CEO, Editor, Designer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                placeholder="e.g., Publishing, Films, Marketing"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <ImageUpload
                value={formData.profilePhoto}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL or upload a file"
                folder="team"
              />
              <div className="mt-2">
                <Label htmlFor="profilePhotoFile" className="text-sm">
                  Or select file directly:
                </Label>
                <Input
                  id="profilePhotoFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="mt-1"
                />
                {profilePhotoFile && (
                  <p className="text-sm text-green-600 mt-1">
                    File selected: {profilePhotoFile.name} (
                    {(profilePhotoFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialLinks">Social Links</Label>
              <Input
                id="socialLinks"
                value={formData.socialLinks}
                onChange={(e) =>
                  setFormData({ ...formData, socialLinks: e.target.value })
                }
                placeholder="LinkedIn, Twitter, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Display Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sortOrder: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Processing..."
                : editingMember
                  ? "Update"
                  : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
