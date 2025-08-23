'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface HelpMenuProps {
  children: React.ReactNode;
}

export function HelpMenu({ children }: HelpMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 border-2 shadow-2xl">
        <DialogHeader className="bg-white dark:bg-slate-900">
          <DialogTitle className="flex items-center gap-2 text-black dark:text-white">
            🗺️ HaloMap Help Center
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Learn how to use all the features and interactions available in
            HaloMap
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="interactions"
          className="w-full bg-white dark:bg-slate-900"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-slate-800">
            <TabsTrigger
              value="interactions"
              className="text-black dark:text-white"
            >
              Interactions
            </TabsTrigger>
            <TabsTrigger
              value="shortcuts"
              className="text-black dark:text-white"
            >
              Shortcuts
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="text-black dark:text-white"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="text-black dark:text-white"
            >
              Examples
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="interactions"
            className="space-y-4 bg-white dark:bg-slate-900"
          >
            <Card className="bg-white dark:bg-slate-800 border-2">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">
                  🖱️ Mouse Interactions
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Learn how to interact with nodes and edges using your mouse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-black dark:text-white">
                      Node Operations
                    </h4>
                    <ul className="text-sm space-y-1 text-black dark:text-white">
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Click
                        </strong>{' '}
                        - Select a node
                      </li>
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Drag
                        </strong>{' '}
                        - Move nodes around
                      </li>
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Double-click
                        </strong>{' '}
                        - Edit node (if enabled)
                      </li>
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Right-click
                        </strong>{' '}
                        - Context menu (if enabled)
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-black dark:text-white">
                      Edge Operations
                    </h4>
                    <ul className="text-sm space-y-1 text-black dark:text-white">
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Click
                        </strong>{' '}
                        - Select an edge
                      </li>
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Drag from handle
                        </strong>{' '}
                        - Create new connection
                      </li>
                      <li>
                        •{' '}
                        <strong className="text-black dark:text-white">
                          Hover over handle
                        </strong>{' '}
                        - Show connection preview
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-2">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">
                  🔗 Creating Connections
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  How to connect nodes together
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg border-2">
                  <ol className="space-y-2 text-black dark:text-white">
                    <li>
                      <strong className="text-black dark:text-white">1.</strong>{' '}
                      Hover over a node to see connection handles
                    </li>
                    <li>
                      <strong className="text-black dark:text-white">2.</strong>{' '}
                      Click and drag from a handle
                    </li>
                    <li>
                      <strong className="text-black dark:text-white">3.</strong>{' '}
                      Drag to another node&apos;s handle
                    </li>
                    <li>
                      <strong className="text-black dark:text-white">4.</strong>{' '}
                      Release to create the connection
                    </li>
                  </ol>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Try connecting Node 1 to Node 2 by dragging from the bottom
                  handle of Node 1 to the top handle of Node 2!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shortcuts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  ⌨️ Keyboard Shortcuts
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Speed up your workflow with these keyboard shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Selection</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground">Multi-select</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Shift + Click
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">
                          Add to selection
                        </span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Cmd/Ctrl + Click
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Select all</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Cmd/Ctrl + A
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Selection area</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Shift + Drag
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Actions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground">Delete selected</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Backspace
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Copy</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Cmd/Ctrl + C
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Paste</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Cmd/Ctrl + V
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Undo</span>
                        <kbd className="px-2 py-1 bg-secondary border rounded text-xs text-foreground">
                          Cmd/Ctrl + Z
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    ✨ Interactive Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">
                      Selectable nodes and edges
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-foreground">Draggable nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-foreground">Connectable nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-foreground">
                      Multi-selection area
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-foreground">
                      Delete selected elements
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    🎮 Controls Panel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <span className="text-foreground">
                      Zoom in/out controls
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📐</span>
                    <span className="text-foreground">Fit view to content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔒</span>
                    <span className="text-foreground">
                      Lock/unlock viewport
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🗺️</span>
                    <span className="text-foreground">Interactive minimap</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  🚀 Try These Examples
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Step-by-step examples to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-secondary border p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Example 1: Create Your First Connection
                    </h4>
                    <ol className="text-sm space-y-1 text-foreground">
                      <li>
                        1. Look for Node 1 (input node) and Node 2 in the flow
                      </li>
                      <li>
                        2. Hover over Node 1 to see the connection handles
                      </li>
                      <li>
                        3. Click and drag from the bottom handle of Node 1
                      </li>
                      <li>4. Drag to the top handle of Node 2 and release</li>
                      <li>5. You&apos;ve created your first connection! 🎉</li>
                    </ol>
                  </div>

                  <div className="bg-secondary border p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Example 2: Multi-Select and Delete
                    </h4>
                    <ol className="text-sm space-y-1 text-foreground">
                      <li>1. Hold Shift and click on multiple nodes</li>
                      <li>
                        2. Or hold Shift and drag to create a selection area
                      </li>
                      <li>3. Press Backspace to delete selected items</li>
                      <li>4. Use Cmd/Ctrl + Z to undo if needed</li>
                    </ol>
                  </div>

                  <div className="bg-secondary border p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Example 3: Navigate the Flow
                    </h4>
                    <ol className="text-sm space-y-1 text-foreground">
                      <li>1. Use mouse wheel to zoom in and out</li>
                      <li>2. Click and drag empty space to pan around</li>
                      <li>3. Use the controls panel for precise navigation</li>
                      <li>4. Click the fit view button to center everything</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 bg-white dark:bg-slate-900">
          <Button
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
