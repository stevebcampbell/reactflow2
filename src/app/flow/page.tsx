import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FlowExample } from '@/components/flow-example';

export default function FlowPage() {
  return (
    <div className="container mx-auto p-8 space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">React Flow Demo</h1>
        <p className="text-xl text-muted-foreground">
          Interactive node-based diagrams with drag and drop functionality
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔄 Interactive Flow Diagram</CardTitle>
          <CardDescription>
            Drag nodes around, connect them, and explore the React Flow
            features. This example demonstrates:
          </CardDescription>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-4">
            <li>Draggable nodes with custom styling</li>
            <li>Interactive connections between nodes</li>
            <li>Minimap for navigation</li>
            <li>Background with dots pattern</li>
            <li>Built-in controls for zoom and pan</li>
          </ul>
        </CardHeader>
        <CardContent>
          <FlowExample />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              ✨ <strong>Interactive:</strong> Drag nodes and create connections
            </div>
            <div>
              🎨 <strong>Customizable:</strong> Style nodes with Tailwind CSS
            </div>
            <div>
              📱 <strong>Responsive:</strong> Works on desktop and mobile
            </div>
            <div>
              ⚡ <strong>Performance:</strong> Optimized for large diagrams
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              🔄 <strong>Workflows:</strong> Business process diagrams
            </div>
            <div>
              🏗️ <strong>Architecture:</strong> System design visualizations
            </div>
            <div>
              🧠 <strong>Mind Maps:</strong> Ideas and concept mapping
            </div>
            <div>
              📊 <strong>Data Flow:</strong> Information processing diagrams
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
