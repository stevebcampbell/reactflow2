"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

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

      <Accordion type="multiple" defaultValue={["viewport"]} className="space-y-2">
        {/* Viewport Controls Section */}
        <AccordionItem value="viewport" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🖱️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Viewport Controls</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Panning and zooming behavior</div>
              </div>
              {controlMode === 'default' && <Badge variant="default" className="bg-blue-600 text-white text-xs">Default</Badge>}
              {controlMode === 'design' && <Badge variant="secondary" className="bg-purple-600 text-white text-xs">Design</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={() => onControlModeChange('default')}
                  variant={controlMode === 'default' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  size="sm"
                >
                  <span className="mr-2">🎯</span>
                  Default Controls
                </Button>
                <div className="ml-6 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  <div>• <strong>Pan:</strong> Pointer drag</div>
                  <div>• <strong>Zoom:</strong> Pinch or scroll</div>
                  <div>• <strong>Select:</strong> Shift + pointer drag</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => onControlModeChange('design')}
                  variant={controlMode === 'design' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  size="sm"
                >
                  <span className="mr-2">🎨</span>
                  Design Tool Controls
                </Button>
                <div className="ml-6 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  <div>• <strong>Pan:</strong> Scroll, middle/right mouse</div>
                  <div>• <strong>Zoom:</strong> Cmd + scroll</div>
                  <div>• <strong>Select:</strong> Pointer drag</div>
                </div>
              </div>

              {/* Current Configuration Display */}
              <div className="mt-4">
                {controlMode === 'default' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">Default Mode Active</h4>
                    <div className="text-blue-700 dark:text-blue-300 text-xs space-y-1">
                      <div>✓ Standard interaction patterns</div>
                      <div>✓ Familiar to most users</div>
                    </div>
                  </div>
                )}
                {controlMode === 'design' && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 text-sm mb-1">Design Tool Mode Active</h4>
                    <div className="text-purple-700 dark:text-purple-300 text-xs space-y-1">
                      <div>✓ Figma/Sketch-like controls</div>
                      <div>✓ Partial selection enabled</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800 dark:text-blue-200">
            💡 Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <div>• Switch viewport modes to test different behaviors</div>
          <div>• Try the interactions described in each mode</div>
          <div>• More configuration options coming soon!</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlowControls;
