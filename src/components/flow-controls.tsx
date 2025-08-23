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
  baseEdgeConfig?: {
    labelBgEnabled: boolean;
    labelBgPadding: number;
    labelBgBorderRadius: number;
    interactionWidth: number;
    edgeType: 'straight' | 'bezier' | 'step' | 'smoothstep';
    animated: boolean;
  };
  onBaseEdgeConfigChange?: (config: any) => void;
  customControlButtons?: Array<{
    id: string;
    label: string;
    icon: string;
    enabled: boolean;
    position: 'before' | 'after';
  }>;
  onCustomControlButtonsChange?: (buttons: any[]) => void;
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
  onPanelPositionChange,
  baseEdgeConfig = {
    labelBgEnabled: true,
    labelBgPadding: 5,
    labelBgBorderRadius: 3,
    interactionWidth: 20,
    edgeType: 'bezier',
    animated: false
  },
  onBaseEdgeConfigChange,
  customControlButtons = [
    { id: '1', label: 'Magic', icon: '✨', enabled: false, position: 'after' as const },
    { id: '2', label: 'Reset', icon: '🔄', enabled: false, position: 'after' as const },
    { id: '3', label: 'Save', icon: '💾', enabled: false, position: 'before' as const }
  ],
  onCustomControlButtonsChange
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

        {/* BaseEdge Configuration Section */}
        <AccordionItem value="baseedge" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">〰️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Edge Configuration</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">BaseEdge styling & behavior</div>
              </div>
              {baseEdgeConfig.animated && <Badge variant="default" className="bg-blue-600 text-white text-xs">Animated</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Edge Type Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Edge Type</Label>
                <RadioGroup value={baseEdgeConfig.edgeType} onValueChange={(value) => onBaseEdgeConfigChange?.({...baseEdgeConfig, edgeType: value})}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="straight" id="edge-straight" />
                      <Label htmlFor="edge-straight" className="text-xs cursor-pointer">Straight</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bezier" id="edge-bezier" />
                      <Label htmlFor="edge-bezier" className="text-xs cursor-pointer">Bezier</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="step" id="edge-step" />
                      <Label htmlFor="edge-step" className="text-xs cursor-pointer">Step</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="smoothstep" id="edge-smoothstep" />
                      <Label htmlFor="edge-smoothstep" className="text-xs cursor-pointer">Smooth Step</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Animated Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="edge-animated" className="text-xs">Animated Edges</Label>
                <Switch
                  id="edge-animated"
                  checked={baseEdgeConfig.animated}
                  onCheckedChange={(checked) => onBaseEdgeConfigChange?.({...baseEdgeConfig, animated: checked})}
                  className="scale-75"
                />
              </div>

              {/* Label Background Options */}
              <div className="space-y-3 border-t pt-3">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Label Background</div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="edge-label-bg" className="text-xs">Show Background</Label>
                  <Switch
                    id="edge-label-bg"
                    checked={baseEdgeConfig.labelBgEnabled}
                    onCheckedChange={(checked) => onBaseEdgeConfigChange?.({...baseEdgeConfig, labelBgEnabled: checked})}
                    className="scale-75"
                  />
                </div>

                {baseEdgeConfig.labelBgEnabled && (
                  <div className="space-y-2 ml-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edge-label-padding" className="text-xs">Padding</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="edge-label-padding"
                          type="range"
                          min="0"
                          max="20"
                          value={baseEdgeConfig.labelBgPadding}
                          onChange={(e) => onBaseEdgeConfigChange?.({...baseEdgeConfig, labelBgPadding: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-6">{baseEdgeConfig.labelBgPadding}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edge-label-radius" className="text-xs">Border Radius</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="edge-label-radius"
                          type="range"
                          min="0"
                          max="10"
                          value={baseEdgeConfig.labelBgBorderRadius}
                          onChange={(e) => onBaseEdgeConfigChange?.({...baseEdgeConfig, labelBgBorderRadius: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-6">{baseEdgeConfig.labelBgBorderRadius}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Interaction Width */}
              <div className="space-y-2 border-t pt-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edge-interaction" className="text-xs">Interaction Width</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="edge-interaction"
                      type="range"
                      min="1"
                      max="50"
                      value={baseEdgeConfig.interactionWidth}
                      onChange={(e) => onBaseEdgeConfigChange?.({...baseEdgeConfig, interactionWidth: Number(e.target.value)})}
                      className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{baseEdgeConfig.interactionWidth}px</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Invisible area around edges for easier interaction
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  <div className="font-semibold mb-1">BaseEdge Properties:</div>
                  <div>• Controls edge path rendering</div>
                  <div>• Handles label positioning</div>
                  <div>• Manages interaction areas</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ControlButton Configuration Section */}
        <AccordionItem value="controlbutton" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔘</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Control Buttons</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Custom control panel buttons</div>
              </div>
              {customControlButtons.filter(b => b.enabled).length > 0 && (
                <Badge variant="default" className="bg-purple-600 text-white text-xs">
                  {customControlButtons.filter(b => b.enabled).length} Active
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                Add custom buttons to the Controls panel. Toggle to enable/disable each button.
              </div>

              {/* Custom Button List */}
              <div className="space-y-3">
                {customControlButtons.map((button, index) => (
                  <div key={button.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{button.icon}</span>
                        <span className="text-sm font-medium text-black dark:text-white">{button.label}</span>
                      </div>
                      <Switch
                        checked={button.enabled}
                        onCheckedChange={(checked) => {
                          const newButtons = [...customControlButtons];
                          newButtons[index] = { ...button, enabled: checked };
                          onCustomControlButtonsChange?.(newButtons);
                        }}
                      />
                    </div>
                    
                    {button.enabled && (
                      <div className="mt-3 space-y-2 pl-7">
                        {/* Position Selection */}
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Position</Label>
                          <RadioGroup 
                            value={button.position} 
                            onValueChange={(value) => {
                              const newButtons = [...customControlButtons];
                              newButtons[index] = { ...button, position: value as 'before' | 'after' };
                              onCustomControlButtonsChange?.(newButtons);
                            }}
                            className="flex gap-3"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="before" id={`pos-before-${button.id}`} />
                              <Label htmlFor={`pos-before-${button.id}`} className="text-xs cursor-pointer">Before</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="after" id={`pos-after-${button.id}`} />
                              <Label htmlFor={`pos-after-${button.id}`} className="text-xs cursor-pointer">After</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {/* Icon Editor */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`icon-${button.id}`} className="text-xs">Icon</Label>
                          <input
                            id={`icon-${button.id}`}
                            type="text"
                            value={button.icon}
                            onChange={(e) => {
                              const newButtons = [...customControlButtons];
                              newButtons[index] = { ...button, icon: e.target.value };
                              onCustomControlButtonsChange?.(newButtons);
                            }}
                            className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800 text-center"
                            maxLength={2}
                          />
                        </div>
                        
                        {/* Label Editor */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`label-${button.id}`} className="text-xs">Label</Label>
                          <input
                            id={`label-${button.id}`}
                            type="text"
                            value={button.label}
                            onChange={(e) => {
                              const newButtons = [...customControlButtons];
                              newButtons[index] = { ...button, label: e.target.value };
                              onCustomControlButtonsChange?.(newButtons);
                            }}
                            className="w-24 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const newButton = {
                    id: Date.now().toString(),
                    label: 'New Button',
                    icon: '🔵',
                    enabled: false,
                    position: 'after' as const
                  };
                  onCustomControlButtonsChange?.([...customControlButtons, newButton]);
                }}
              >
                <span className="mr-2">➕</span>
                Add Custom Button
              </Button>

              {/* Info Box */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-xs text-purple-700 dark:text-purple-300">
                  <div className="font-semibold mb-1">ControlButton Usage:</div>
                  <div>• Adds custom actions to Controls panel</div>
                  <div>• Position before/after default buttons</div>
                  <div>• Customize icon and label</div>
                  <div>• Click handlers defined in code</div>
                </div>
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
