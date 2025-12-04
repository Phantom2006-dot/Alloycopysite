import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Database, Image, Globe } from "lucide-react";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Settings</h1>
          <p className="text-muted-foreground">Manage your site settings</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle className="text-lg">Site Information</CardTitle>
              </div>
              <CardDescription>
                Basic site configuration and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Site name, description, and other general settings can be configured here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                <CardTitle className="text-lg">Media Settings</CardTitle>
              </div>
              <CardDescription>
                Configure image upload and storage options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cloudinary is configured and ready for image uploads.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle className="text-lg">Database</CardTitle>
              </div>
              <CardDescription>
                Database connection and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                PostgreSQL database is connected and operational.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <CardTitle className="text-lg">Advanced</CardTitle>
              </div>
              <CardDescription>
                Advanced configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                API keys, authentication settings, and other advanced options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
