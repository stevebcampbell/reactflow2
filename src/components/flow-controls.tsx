'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlowControlsProps {
  controlMode: 'default' | 'design';
  onControlModeChange: (mode: 'default' | 'design') => void;
}

function FlowControls({ controlMode, onControlModeChange }: FlowControlsProps) {
  return (
    <div className="w-80 border-r bg-white dark:bg-slate-900 p-4 space-y-4 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
          🔧 React Flow Configuration
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Configure viewport, interactions, and behavior options for testing
        </p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={['viewport']}
        className="space-y-2"
      >
        {/* Viewport Controls Section */}
        <AccordionItem
          value="viewport"
          className="border rounded-lg bg-white dark:bg-slate-800"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🖱️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">
                  Panning and Zooming
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Viewport control behavior
                </div>
              </div>
              {controlMode === 'default' && (
                <Badge
                  variant="default"
                  className="bg-blue-600 text-white text-xs"
                >
                  Default
                </Badge>
              )}
              {controlMode === 'design' && (
                <Badge
                  variant="secondary"
                  className="bg-purple-600 text-white text-xs"
                >
                  Design Tool
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-2">
                  About Viewport Controls
                </h4>
                <p className="text-blue-700 dark:text-blue-300 text-xs">
                  The default pan and zoom behavior of React Flow is inspired by
                  slippy maps. You can customize this behavior easily with
                  interaction props.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Button
                    onClick={() => onControlModeChange('default')}
                    variant={controlMode === 'default' ? 'default' : 'outline'}
                    className="w-full justify-start mb-2"
                    size="sm"
                  >
                    <span className="mr-2">🎯</span>
                    Default Viewport Controls
                  </Button>
                  <div className="ml-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                      <div className="font-medium mb-1">Standard behavior:</div>
                      <div>
                        • <strong>Pan:</strong> pointer drag
                      </div>
                      <div>
                        • <strong>Zoom:</strong> pinch or scroll
                      </div>
                      <div>
                        • <strong>Select:</strong> shift + pointer drag
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                        Most familiar to users, follows standard web interaction
                        patterns
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={() => onControlModeChange('design')}
                    variant={controlMode === 'design' ? 'default' : 'outline'}
                    className="w-full justify-start mb-2"
                    size="sm"
                  >
                    <span className="mr-2">🎨</span>
                    Design Tool Controls
                  </Button>
                  <div className="ml-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                      <div className="font-medium mb-1">
                        Figma/Sketch-like behavior:
                      </div>
                      <div>
                        • <strong>Pan:</strong> scroll, middle/right mouse drag,
                        space + pointer drag
                      </div>
                      <div>
                        • <strong>Zoom:</strong> pinch or cmd + scroll
                      </div>
                      <div>
                        • <strong>Select:</strong> pointer drag
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                        Partial selection enabled, familiar to design tool users
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Active Configuration */}
              <div className="mt-4 p-3 rounded-lg border-2 border-dashed">
                <h4 className="font-semibold text-black dark:text-white text-sm mb-2">
                  🔄 Currently Active
                </h4>
                {controlMode === 'default' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-black dark:text-white">
                        Standard React Flow behavior
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 ml-4">
                      Try: Drag to pan, scroll to zoom, shift+drag to select
                      area
                    </div>
                  </div>
                )}
                {controlMode === 'design' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-black dark:text-white">
                        Design tool behavior
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 ml-4">
                      Try: Scroll to pan, cmd+scroll to zoom, drag to select
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Interaction Features Section */}
        <AccordionItem
          value="interaction"
          className="border rounded-lg bg-white dark:bg-slate-800"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">⚡</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">
                  Interaction Features
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Currently enabled capabilities
                </div>
              </div>
              <Badge
                variant="default"
                className="bg-green-600 text-white text-xs"
              >
                Active
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                These interactive capabilities are currently enabled in the
                flow:
              </p>

              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      Selectable nodes and edges
                    </div>
                    <div className="text-xs text-green-700 dark:text-green-300">
                      Click to select, hold Cmd/Ctrl for multi-select
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      Draggable nodes
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      Drag nodes around to reposition them
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded border">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      Connectable nodes
                    </div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">
                      Drag from node handles to create connections
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      Multi-selection area
                    </div>
                    <div className="text-xs text-orange-700 dark:text-orange-300">
                      Use selection methods based on current mode
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      Delete selected elements
                    </div>
                    <div className="text-xs text-red-700 dark:text-red-300">
                      Press Backspace to delete selected items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Coming Soon Sections */}
        <AccordionItem
          value="nodetypes"
          className="border rounded-lg bg-white dark:bg-slate-800 opacity-70"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">📦</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">
                  Node Types & Customization
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Custom node components and behaviors
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-gray-100 text-gray-600"
              >
                Coming Soon
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Future node customization options:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🔸 Custom node components with React</div>
                <div>🔸 Input/Output node types</div>
                <div>🔸 Group and subflow nodes</div>
                <div>🔸 Resizable nodes</div>
                <div>🔸 Node templates and presets</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="edges"
          className="border rounded-lg bg-white dark:bg-slate-800 opacity-70"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔗</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">
                  Edge Customization
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Connection styles and behaviors
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-gray-100 text-gray-600"
              >
                Coming Soon
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Future edge customization options:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🔸 Edge types (straight, bezier, step, smoothstep)</div>
                <div>🔸 Animated edges and flow indicators</div>
                <div>🔸 Edge labels and custom markers</div>
                <div>🔸 Custom edge components</div>
                <div>🔸 Connection validation rules</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="layout"
          className="border rounded-lg bg-white dark:bg-slate-800 opacity-70"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🗂️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">
                  Layout & Export
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Automatic layouts and export options
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-gray-100 text-gray-600"
              >
                Coming Soon
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Future layout and export features:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🔸 Hierarchical and tree layouts</div>
                <div>🔸 Force-directed graph layouts</div>
                <div>🔸 Export as PNG/SVG images</div>
                <div>🔸 JSON import/export functionality</div>
                <div>🔸 Auto-arrange and alignment tools</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800 dark:text-blue-200">
            💡 Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <div>• Click sections to expand/collapse them</div>
          <div>• Switch viewport modes to test different behaviors</div>
          <div>• Try the interactions described in each mode</div>
          <div>• More configuration options coming soon!</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FlowControls;
