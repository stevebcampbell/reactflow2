import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-8 space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          About This Project
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about the technologies and design decisions behind this modern
          Next.js starter template
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Next.js 15
            </CardTitle>
            <CardDescription>React framework with App Router</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              The latest version of Next.js with App Router, Server Components,
              and Turbopack for lightning-fast development.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎨 Radix UI
            </CardTitle>
            <CardDescription>Accessible component primitives</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Unstyled, accessible UI components that serve as the foundation
              for our design system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💨 Tailwind CSS
            </CardTitle>
            <CardDescription>Utility-first CSS framework</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Rapidly build custom designs with utility classes, configured with
              custom design tokens.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔄 React Flow
            </CardTitle>
            <CardDescription>Interactive node-based diagrams</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Highly customizable library for building interactive flowcharts,
              diagrams, and node-based interfaces.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🛡️ TypeScript
            </CardTitle>
            <CardDescription>Type-safe development</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Full TypeScript support with strict type checking for better
              development experience and fewer bugs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Vercel Ready
            </CardTitle>
            <CardDescription>Deploy with zero configuration</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Optimized for deployment on Vercel with automatic builds, edge
              functions, and global CDN.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Project Goals</CardTitle>
          <CardDescription>
            What this starter template aims to achieve
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Developer Experience</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fast development with Turbopack</li>
                <li>• Type safety with TypeScript</li>
                <li>• Code quality with ESLint</li>
                <li>• Modern tooling and practices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">User Experience</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Accessible components by default</li>
                <li>• Responsive design for all devices</li>
                <li>• Fast loading and smooth interactions</li>
                <li>• Clean, modern interface</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button asChild>
          <Link
            href="https://github.com/stevebcampbell/reactflow2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="https://vercel.com/new/clone?repository-url=https://github.com/stevebcampbell/reactflow2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy to Vercel
          </Link>
        </Button>
      </div>
    </div>
  );
}
