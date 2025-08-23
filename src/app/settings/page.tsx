import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">⚙️ Settings</h1>
        <p className="text-xl text-muted-foreground">
          Configure your application preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <Button>Apply Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
