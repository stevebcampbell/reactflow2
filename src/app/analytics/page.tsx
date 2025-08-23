import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">📈 Analytics</h1>
        <p className="text-xl text-muted-foreground">
          Analytics dashboard and metrics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Analytics features will be implemented here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will contain charts, metrics, and analytics data for your
            application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
