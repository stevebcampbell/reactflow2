"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

export interface FlowControlsProps {
  controlMode: 'default' | 'design';
  onControlModeChange: (mode: 'default' | 'design') => void;
  miniMapEnabled?: boolean;
  onMiniMapEnabledChange?: (enabled: boolean) => void;
  miniMapConfig?: {
    zoomable: boolean;
    pannable: boolean;
    nodeStrokeWidth: number;
  };
  onMiniMapConfigChange?: (config: any) => void;
  controlsEnabled?: boolean;
  onControlsEnabledChange?: (enabled: boolean) => void;
  controlsConfig?: {
    showZoom: boolean;
    showFitView: boolean;
    showInteractive: boolean;
  };
  onControlsConfigChange?: (config: any) => void;
  backgroundEnabled?: boolean;
  onBackgroundEnabledChange?: (enabled: boolean) => void;
  backgroundVariant?: 'dots' | 'lines' | 'cross';
  onBackgroundVariantChange?: (variant: 'dots' | 'lines' | 'cross') => void;
  panelEnabled?: boolean;
  onPanelEnabledChange?: (enabled: boolean) => void;
  panelPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  onPanelPositionChange?: (position: string) => void;
}

function FlowControls({ 
  controlMode, 
  onControlModeChange,
  miniMapEnabled = false,
  onMiniMapEnabledChange,
  miniMapConfig = { zoomable: true, pannable: true, nodeStrokeWidth: 3 },
  onMiniMapConfigChange,
  controlsEnabled = true,
  onControlsEnabledChange,
  controlsConfig = { showZoom: true, showFitView: true, showInteractive: true },
  onControlsConfigChange,
  backgroundEnabled = true,
  onBackgroundEnabledChange,
  backgroundVariant = 'dots',
  onBackgroundVariantChange,
  panelEnabled = false,
  onPanelEnabledChange,
  panelPosition = 'top-right',
  onPanelPositionChange
}: FlowControlsProps) {
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

      <Accordion type="multiple" defaultValue={["viewport", "minimap", "controls", "background"]} className="space-y-2">
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

        {/* MiniMap Section */}
        <AccordionItem value="minimap" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🗺️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">MiniMap</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Bird's-eye view navigation</div>
              </div>
              {miniMapEnabled && <Badge variant="default" className="bg-green-600 text-white text-xs">Enabled</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="minimap-toggle" className="text-sm font-medium">Enable MiniMap</Label>
                <Switch
                  id="minimap-toggle"
                  checked={miniMapEnabled}
                  onCheckedChange={onMiniMapEnabledChange}
                />
              </div>
              
              {miniMapEnabled && (
                <div className="space-y-3 ml-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="minimap-zoomable" className="text-xs">Zoomable</Label>
                    <Switch
                      id="minimap-zoomable"
                      checked={miniMapConfig.zoomable}
                      onCheckedChange={(checked) => onMiniMapConfigChange?.({...miniMapConfig, zoomable: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="minimap-pannable" className="text-xs">Pannable</Label>
                    <Switch
                      id="minimap-pannable"
                      checked={miniMapConfig.pannable}
                      onCheckedChange={(checked) => onMiniMapConfigChange?.({...miniMapConfig, pannable: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <div>• Shows overview of entire flow</div>
                    <div>• Click to navigate quickly</div>
                    <div>• Colored nodes by type</div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Controls Section */}
        <AccordionItem value="controls" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🎮</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Controls</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Viewport control buttons</div>
              </div>
              {controlsEnabled && <Badge variant="default" className="bg-green-600 text-white text-xs">Enabled</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="controls-toggle" className="text-sm font-medium">Enable Controls</Label>
                <Switch
                  id="controls-toggle"
                  checked={controlsEnabled}
                  onCheckedChange={onControlsEnabledChange}
                />
              </div>
              
              {controlsEnabled && (
                <div className="space-y-3 ml-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="controls-zoom" className="text-xs">Show Zoom</Label>
                    <Switch
                      id="controls-zoom"
                      checked={controlsConfig.showZoom}
                      onCheckedChange={(checked) => onControlsConfigChange?.({...controlsConfig, showZoom: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="controls-fitview" className="text-xs">Show Fit View</Label>
                    <Switch
                      id="controls-fitview"
                      checked={controlsConfig.showFitView}
                      onCheckedChange={(checked) => onControlsConfigChange?.({...controlsConfig, showFitView: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="controls-interactive" className="text-xs">Show Interactive</Label>
                    <Switch
                      id="controls-interactive"
                      checked={controlsConfig.showInteractive}
                      onCheckedChange={(checked) => onControlsConfigChange?.({...controlsConfig, showInteractive: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <div>• Zoom in/out buttons</div>
                    <div>• Fit view to center content</div>
                    <div>• Toggle interactive mode</div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Background Section */}
        <AccordionItem value="background" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🎨</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Background</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Grid pattern styles</div>
              </div>
              {backgroundEnabled && <Badge variant="default" className="bg-green-600 text-white text-xs">Enabled</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="background-toggle" className="text-sm font-medium">Enable Background</Label>
                <Switch
                  id="background-toggle"
                  checked={backgroundEnabled}
                  onCheckedChange={onBackgroundEnabledChange}
                />
              </div>
              
              {backgroundEnabled && (
                <div className="space-y-3">
                  <Label className="text-xs font-medium">Pattern Style</Label>
                  <RadioGroup value={backgroundVariant} onValueChange={(value) => onBackgroundVariantChange?.(value as any)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dots" id="bg-dots" />
                      <Label htmlFor="bg-dots" className="text-xs cursor-pointer">Dots</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lines" id="bg-lines" />
                      <Label htmlFor="bg-lines" className="text-xs cursor-pointer">Lines</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cross" id="bg-cross" />
                      <Label htmlFor="bg-cross" className="text-xs cursor-pointer">Cross</Label>
                    </div>
                  </RadioGroup>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <div>• Visual grid for orientation</div>
                    <div>• Helps with node alignment</div>
                    <div>• Choose your preferred style</div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Panel Section */}
        <AccordionItem value="panel" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Panel</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Fixed overlay elements</div>
              </div>
              {panelEnabled && <Badge variant="default" className="bg-green-600 text-white text-xs">Enabled</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="panel-toggle" className="text-sm font-medium">Enable Panel</Label>
                <Switch
                  id="panel-toggle"
                  checked={panelEnabled}
                  onCheckedChange={onPanelEnabledChange}
                />
              </div>
              
              {panelEnabled && (
                <div className="space-y-3">
                  <Label className="text-xs font-medium">Panel Position</Label>
                  <RadioGroup value={panelPosition} onValueChange={onPanelPositionChange}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="top-left" id="panel-tl" />
                        <Label htmlFor="panel-tl" className="text-xs cursor-pointer">Top Left</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="top-center" id="panel-tc" />
                        <Label htmlFor="panel-tc" className="text-xs cursor-pointer">Top Center</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="top-right" id="panel-tr" />
                        <Label htmlFor="panel-tr" className="text-xs cursor-pointer">Top Right</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="bottom-left" id="panel-bl" />
                        <Label htmlFor="panel-bl" className="text-xs cursor-pointer">Bottom Left</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="bottom-center" id="panel-bc" />
                        <Label htmlFor="panel-bc" className="text-xs cursor-pointer">Bottom Center</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="bottom-right" id="panel-br" />
                        <Label htmlFor="panel-br" className="text-xs cursor-pointer">Bottom Right</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <div>• Fixed overlay UI elements</div>
                    <div>• Stays in place during pan/zoom</div>
                    <div>• Good for titles or controls</div>
                  </div>
                </div>
              )}
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
