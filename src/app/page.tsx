import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-8 space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to your Next.js + Radix UI + React Flow application
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <Button asChild>
            <Link href="/halomap">Try HaloMap</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/components">View Components</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-2xl mb-2">
              🎨
            </div>
            <CardTitle>Beautiful UI Components</CardTitle>
            <CardDescription>
              Built with Radix UI primitives and styled with Tailwind CSS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Accessible, customizable components that work out of the box with
              full keyboard navigation and screen reader support.
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/components">Explore Components →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-2xl mb-2">
              🔄
            </div>
            <CardTitle>Interactive Flow Diagrams</CardTitle>
            <CardDescription>
              Create dynamic, node-based interfaces with React Flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Build interactive flowcharts, process diagrams, and visual
              workflows with drag-and-drop functionality.
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/flow">Try Flow Demo →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-2xl mb-2">
              🚀
            </div>
            <CardTitle>Deploy Anywhere</CardTitle>
            <CardDescription>
              Optimized for Vercel with zero configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ready for production deployment with built-in optimizations, edge
              functions, and global CDN.
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/about">Learn More →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Get started with this template in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div className="space-y-2">
              <div className="text-2xl">1️⃣</div>
              <h3 className="font-semibold">Clone Repository</h3>
              <p className="text-sm text-muted-foreground">
                Clone this repository and install dependencies
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">2️⃣</div>
              <h3 className="font-semibold">Customize</h3>
              <p className="text-sm text-muted-foreground">
                Modify components and add your own features
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">3️⃣</div>
              <h3 className="font-semibold">Deploy</h3>
              <p className="text-sm text-muted-foreground">
                Push to Git and deploy to Vercel automatically
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
