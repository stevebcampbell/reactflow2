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
  edgeLabelConfig?: {
    useHtmlLabels: boolean;
    showBackground: boolean;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    padding: number;
    borderRadius: number;
    fontWeight: 'normal' | 'bold';
    interactive: boolean;
  };
  onEdgeLabelConfigChange?: (config: any) => void;
  edgeTextConfig?: {
    enabled: boolean;
    labelStyle: {
      fill: string;
      fontSize: number;
      fontWeight: number;
    };
    labelShowBg: boolean;
    labelBgStyle: {
      fill: string;
      fillOpacity: number;
    };
    labelBgPadding: [number, number];
    labelBgBorderRadius: number;
    position: 'center' | 'start' | 'end';
  };
  onEdgeTextConfigChange?: (config: any) => void;
  handleConfig?: {
    useCustomNodes: boolean;
    handleCount: number;
    handlePosition: 'horizontal' | 'vertical' | 'all';
    handleStyle: {
      width: number;
      height: number;
      borderRadius: number;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    };
    isConnectable: boolean;
    connectionMode: 'loose' | 'strict';
    connectionRadius: number;
  };
  onHandleConfigChange?: (config: any) => void;
  nodeResizeConfig?: {
    enabled: boolean;
    isVisible: boolean;
    color: string;
    handleSize: number;
    lineSize: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    keepAspectRatio: boolean;
    autoScale: boolean;
  };
  onNodeResizeConfigChange?: (config: any) => void;
  nodeToolbarConfig?: {
    enabled: boolean;
    isVisible: boolean;
    position: 'top' | 'right' | 'bottom' | 'left';
    align: 'start' | 'center' | 'end';
    offset: number;
    buttons: Array<{
      id: string;
      label: string;
      icon: string;
      action: 'delete' | 'duplicate' | 'edit' | 'info';
    }>;
    style: {
      backgroundColor: string;
      borderColor: string;
      borderRadius: number;
      padding: number;
    };
  };
  onNodeToolbarConfigChange?: (config: any) => void;
  viewportPortalConfig?: {
    enabled: boolean;
    editMode?: boolean;
    elements: Array<{
      id: string;
      type: 'text' | 'shape' | 'image' | 'custom';
      content: string;
      x: number;
      y: number;
      style: {
        color: string;
        backgroundColor: string;
        fontSize: number;
        padding: number;
        borderRadius: number;
        opacity: number;
      };
    }>;
    showGrid: boolean;
    gridSize: number;
  };
  onViewportPortalConfigChange?: (config: any) => void;
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
  onCustomControlButtonsChange,
  edgeLabelConfig = {
    useHtmlLabels: false,
    showBackground: true,
    backgroundColor: '#ffcc00',
    textColor: '#000000',
    fontSize: 12,
    padding: 10,
    borderRadius: 5,
    fontWeight: 'normal' as const,
    interactive: false
  },
  onEdgeLabelConfigChange,
  edgeTextConfig = {
    enabled: false,
    labelStyle: {
      fill: '#000000',
      fontSize: 12,
      fontWeight: 400
    },
    labelShowBg: true,
    labelBgStyle: {
      fill: '#ffffff',
      fillOpacity: 0.9
    },
    labelBgPadding: [4, 4] as [number, number],
    labelBgBorderRadius: 2,
    position: 'center' as const
  },
  onEdgeTextConfigChange,
  handleConfig = {
    useCustomNodes: false,
    handleCount: 2,
    handlePosition: 'horizontal' as const,
    handleStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#555',
      borderColor: '#fff',
      borderWidth: 1
    },
    isConnectable: true,
    connectionMode: 'loose' as const,
    connectionRadius: 10
  },
  onHandleConfigChange,
  nodeResizeConfig = {
    enabled: false,
    isVisible: true,
    color: '#3b82f6',
    handleSize: 8,
    lineSize: 2,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 500,
    maxHeight: 500,
    keepAspectRatio: false,
    autoScale: true
  },
  onNodeResizeConfigChange,
  nodeToolbarConfig = {
    enabled: false,
    isVisible: false,
    position: 'top' as const,
    align: 'center' as const,
    offset: 10,
    buttons: [
      { id: '1', label: 'Delete', icon: '🗑️', action: 'delete' as const },
      { id: '2', label: 'Copy', icon: '📋', action: 'duplicate' as const },
      { id: '3', label: 'Edit', icon: '✏️', action: 'edit' as const },
    ],
    style: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderRadius: 6,
      padding: 4
    }
  },
  onNodeToolbarConfigChange,
  viewportPortalConfig = {
    enabled: false,
    elements: [
      { 
        id: '1', 
        type: 'text' as const, 
        content: 'Viewport Text', 
        x: 250,
        y: 150,
        style: {
          color: '#1e293b',
          backgroundColor: '#fef3c7',
          fontSize: 14,
          padding: 8,
          borderRadius: 4,
          opacity: 1
        }
      }
    ],
    showGrid: false,
    gridSize: 50
  },
  onViewportPortalConfigChange
}: FlowControlsProps) {
  return (
    <div className="w-80 border-r bg-white dark:bg-slate-900 h-full overflow-y-auto overflow-x-hidden">
      <div className="p-4 space-y-4 pb-8">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="controls-resetview" className="text-xs">Show Reset View</Label>
                    <Switch
                      id="controls-resetview"
                      checked={controlsConfig.showResetView}
                      onCheckedChange={(checked) => onControlsConfigChange?.({...controlsConfig, showResetView: checked})}
                      className="scale-75"
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <div>• Zoom in/out buttons</div>
                    <div>• Fit view to center content</div>
                    <div>• Toggle interactive mode</div>
                    <div>• Reset to default view</div>
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

        {/* EdgeLabelRenderer Configuration Section */}
        <AccordionItem value="edgelabel" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏷️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Edge Label Renderer</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">HTML-based edge labels</div>
              </div>
              {edgeLabelConfig.useHtmlLabels && (
                <Badge variant="default" className="bg-orange-600 text-white text-xs">HTML</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Use HTML Labels Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="use-html-labels" className="text-sm font-medium">Use HTML Labels</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enable div-based labels instead of SVG
                  </p>
                </div>
                <Switch
                  id="use-html-labels"
                  checked={edgeLabelConfig.useHtmlLabels}
                  onCheckedChange={(checked) => onEdgeLabelConfigChange?.({...edgeLabelConfig, useHtmlLabels: checked})}
                />
              </div>

              {edgeLabelConfig.useHtmlLabels && (
                <>
                  {/* Background Options */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="label-bg" className="text-xs">Show Background</Label>
                      <Switch
                        id="label-bg"
                        checked={edgeLabelConfig.showBackground}
                        onCheckedChange={(checked) => onEdgeLabelConfigChange?.({...edgeLabelConfig, showBackground: checked})}
                        className="scale-75"
                      />
                    </div>

                    {edgeLabelConfig.showBackground && (
                      <div className="space-y-3 ml-2">
                        {/* Background Color */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="label-bg-color" className="text-xs">Background Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="label-bg-color"
                              type="color"
                              value={edgeLabelConfig.backgroundColor}
                              onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, backgroundColor: e.target.value})}
                              className="w-8 h-8 border rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={edgeLabelConfig.backgroundColor}
                              onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, backgroundColor: e.target.value})}
                              className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />
                          </div>
                        </div>

                        {/* Border Radius */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="label-radius" className="text-xs">Border Radius</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="label-radius"
                              type="range"
                              min="0"
                              max="20"
                              value={edgeLabelConfig.borderRadius}
                              onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, borderRadius: Number(e.target.value)})}
                              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeLabelConfig.borderRadius}px</span>
                          </div>
                        </div>

                        {/* Padding */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="label-padding" className="text-xs">Padding</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="label-padding"
                              type="range"
                              min="0"
                              max="20"
                              value={edgeLabelConfig.padding}
                              onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, padding: Number(e.target.value)})}
                              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeLabelConfig.padding}px</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Options */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Text Styling</div>
                    
                    {/* Text Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="label-text-color" className="text-xs">Text Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="label-text-color"
                          type="color"
                          value={edgeLabelConfig.textColor}
                          onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, textColor: e.target.value})}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={edgeLabelConfig.textColor}
                          onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, textColor: e.target.value})}
                          className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Font Size */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="label-font-size" className="text-xs">Font Size</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="label-font-size"
                          type="range"
                          min="8"
                          max="24"
                          value={edgeLabelConfig.fontSize}
                          onChange={(e) => onEdgeLabelConfigChange?.({...edgeLabelConfig, fontSize: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeLabelConfig.fontSize}px</span>
                      </div>
                    </div>

                    {/* Font Weight */}
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Font Weight</Label>
                      <RadioGroup 
                        value={edgeLabelConfig.fontWeight} 
                        onValueChange={(value) => onEdgeLabelConfigChange?.({...edgeLabelConfig, fontWeight: value as 'normal' | 'bold'})}
                        className="flex gap-3"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="normal" id="weight-normal" />
                          <Label htmlFor="weight-normal" className="text-xs cursor-pointer">Normal</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="bold" id="weight-bold" />
                          <Label htmlFor="weight-bold" className="text-xs cursor-pointer">Bold</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Interactive Toggle */}
                  <div className="space-y-2 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="label-interactive" className="text-xs">Interactive Labels</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Allow pointer events on labels
                        </p>
                      </div>
                      <Switch
                        id="label-interactive"
                        checked={edgeLabelConfig.interactive}
                        onCheckedChange={(checked) => onEdgeLabelConfigChange?.({...edgeLabelConfig, interactive: checked})}
                        className="scale-75"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-xs text-orange-700 dark:text-orange-300">
                  <div className="font-semibold mb-1">EdgeLabelRenderer Features:</div>
                  <div>• Renders labels as HTML divs</div>
                  <div>• Supports complex React components</div>
                  <div>• Better for rich content & styling</div>
                  <div>• Positioned above SVG edges</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* EdgeText Configuration Section */}
        <AccordionItem value="edgetext" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔤</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Edge Text</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">SVG text component for edges</div>
              </div>
              {edgeTextConfig.enabled && (
                <Badge variant="default" className="bg-indigo-600 text-white text-xs">SVG</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Enable EdgeText */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="edgetext-enable" className="text-sm font-medium">Use EdgeText</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Use SVG-based text component
                  </p>
                </div>
                <Switch
                  id="edgetext-enable"
                  checked={edgeTextConfig.enabled}
                  onCheckedChange={(checked) => onEdgeTextConfigChange?.({...edgeTextConfig, enabled: checked})}
                />
              </div>

              {edgeTextConfig.enabled && (
                <>
                  {/* Text Position */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Label Position</Label>
                    <RadioGroup 
                      value={edgeTextConfig.position} 
                      onValueChange={(value) => onEdgeTextConfigChange?.({...edgeTextConfig, position: value})}
                    >
                      <div className="flex gap-3">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="start" id="pos-start" />
                          <Label htmlFor="pos-start" className="text-xs cursor-pointer">Start</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="center" id="pos-center" />
                          <Label htmlFor="pos-center" className="text-xs cursor-pointer">Center</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="end" id="pos-end" />
                          <Label htmlFor="pos-end" className="text-xs cursor-pointer">End</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Text Styling */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Text Style</div>
                    
                    {/* Text Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-fill" className="text-xs">Text Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="text-fill"
                          type="color"
                          value={edgeTextConfig.labelStyle.fill}
                          onChange={(e) => onEdgeTextConfigChange?.({
                            ...edgeTextConfig,
                            labelStyle: { ...edgeTextConfig.labelStyle, fill: e.target.value }
                          })}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={edgeTextConfig.labelStyle.fill}
                          onChange={(e) => onEdgeTextConfigChange?.({
                            ...edgeTextConfig,
                            labelStyle: { ...edgeTextConfig.labelStyle, fill: e.target.value }
                          })}
                          className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Font Size */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-size" className="text-xs">Font Size</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="text-size"
                          type="range"
                          min="8"
                          max="24"
                          value={edgeTextConfig.labelStyle.fontSize}
                          onChange={(e) => onEdgeTextConfigChange?.({
                            ...edgeTextConfig,
                            labelStyle: { ...edgeTextConfig.labelStyle, fontSize: Number(e.target.value) }
                          })}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeTextConfig.labelStyle.fontSize}px</span>
                      </div>
                    </div>

                    {/* Font Weight */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-weight" className="text-xs">Font Weight</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="text-weight"
                          type="range"
                          min="100"
                          max="900"
                          step="100"
                          value={edgeTextConfig.labelStyle.fontWeight}
                          onChange={(e) => onEdgeTextConfigChange?.({
                            ...edgeTextConfig,
                            labelStyle: { ...edgeTextConfig.labelStyle, fontWeight: Number(e.target.value) }
                          })}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeTextConfig.labelStyle.fontWeight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Background Options */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-bg" className="text-xs">Show Background</Label>
                      <Switch
                        id="text-bg"
                        checked={edgeTextConfig.labelShowBg}
                        onCheckedChange={(checked) => onEdgeTextConfigChange?.({...edgeTextConfig, labelShowBg: checked})}
                        className="scale-75"
                      />
                    </div>

                    {edgeTextConfig.labelShowBg && (
                      <div className="space-y-3 ml-2">
                        {/* Background Color */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bg-fill" className="text-xs">BG Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="bg-fill"
                              type="color"
                              value={edgeTextConfig.labelBgStyle.fill}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgStyle: { ...edgeTextConfig.labelBgStyle, fill: e.target.value }
                              })}
                              className="w-8 h-8 border rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={edgeTextConfig.labelBgStyle.fill}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgStyle: { ...edgeTextConfig.labelBgStyle, fill: e.target.value }
                              })}
                              className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />
                          </div>
                        </div>

                        {/* Background Opacity */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bg-opacity" className="text-xs">BG Opacity</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="bg-opacity"
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={edgeTextConfig.labelBgStyle.fillOpacity}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgStyle: { ...edgeTextConfig.labelBgStyle, fillOpacity: Number(e.target.value) }
                              })}
                              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{edgeTextConfig.labelBgStyle.fillOpacity}</span>
                          </div>
                        </div>

                        {/* Padding */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bg-padding" className="text-xs">Padding</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="bg-padding-x"
                              type="number"
                              min="0"
                              max="20"
                              value={edgeTextConfig.labelBgPadding[0]}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgPadding: [Number(e.target.value), edgeTextConfig.labelBgPadding[1]]
                              })}
                              className="w-12 px-1 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />
                            <span className="text-xs">x</span>
                            <input
                              id="bg-padding-y"
                              type="number"
                              min="0"
                              max="20"
                              value={edgeTextConfig.labelBgPadding[1]}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgPadding: [edgeTextConfig.labelBgPadding[0], Number(e.target.value)]
                              })}
                              className="w-12 px-1 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />
                          </div>
                        </div>

                        {/* Border Radius */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bg-radius" className="text-xs">Border Radius</Label>
                          <div className="flex items-center gap-2">
                            <input
                              id="bg-radius"
                              type="range"
                              min="0"
                              max="10"
                              value={edgeTextConfig.labelBgBorderRadius}
                              onChange={(e) => onEdgeTextConfigChange?.({
                                ...edgeTextConfig,
                                labelBgBorderRadius: Number(e.target.value)
                              })}
                              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 w-6">{edgeTextConfig.labelBgBorderRadius}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div className="text-xs text-indigo-700 dark:text-indigo-300">
                  <div className="font-semibold mb-1">EdgeText Features:</div>
                  <div>• SVG-based text rendering</div>
                  <div>• Precise positioning control</div>
                  <div>• Native SVG styling options</div>
                  <div>• Lightweight & performant</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Handle Configuration Section */}
        <AccordionItem value="handle" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔗</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Node Handles</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Connection points on nodes</div>
              </div>
              {handleConfig.useCustomNodes && (
                <Badge variant="default" className="bg-teal-600 text-white text-xs">Custom</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Use Custom Nodes Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="use-custom-nodes" className="text-sm font-medium">Use Custom Nodes</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enable nodes with custom handles
                  </p>
                </div>
                <Switch
                  id="use-custom-nodes"
                  checked={handleConfig.useCustomNodes}
                  onCheckedChange={(checked) => onHandleConfigChange?.({...handleConfig, useCustomNodes: checked})}
                />
              </div>

              {handleConfig.useCustomNodes && (
                <>
                  {/* Handle Count */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-count" className="text-xs">Handle Count</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="handle-count"
                          type="range"
                          min="1"
                          max="4"
                          value={handleConfig.handleCount}
                          onChange={(e) => onHandleConfigChange?.({...handleConfig, handleCount: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-4">{handleConfig.handleCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Handle Position Layout */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Handle Layout</Label>
                    <RadioGroup 
                      value={handleConfig.handlePosition} 
                      onValueChange={(value) => onHandleConfigChange?.({...handleConfig, handlePosition: value})}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="horizontal" id="layout-horizontal" />
                          <Label htmlFor="layout-horizontal" className="text-xs cursor-pointer">Horizontal (Left/Right)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vertical" id="layout-vertical" />
                          <Label htmlFor="layout-vertical" className="text-xs cursor-pointer">Vertical (Top/Bottom)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="layout-all" />
                          <Label htmlFor="layout-all" className="text-xs cursor-pointer">All Sides</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Handle Style */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Handle Style</div>
                    
                    {/* Size */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-size" className="text-xs">Size</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="handle-size"
                          type="range"
                          min="6"
                          max="20"
                          value={handleConfig.handleStyle.width}
                          onChange={(e) => {
                            const size = Number(e.target.value);
                            onHandleConfigChange?.({
                              ...handleConfig,
                              handleStyle: { 
                                ...handleConfig.handleStyle, 
                                width: size, 
                                height: size,
                                borderRadius: size / 2 
                              }
                            });
                          }}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{handleConfig.handleStyle.width}px</span>
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-bg" className="text-xs">Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="handle-bg"
                          type="color"
                          value={handleConfig.handleStyle.backgroundColor}
                          onChange={(e) => onHandleConfigChange?.({
                            ...handleConfig,
                            handleStyle: { ...handleConfig.handleStyle, backgroundColor: e.target.value }
                          })}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={handleConfig.handleStyle.backgroundColor}
                          onChange={(e) => onHandleConfigChange?.({
                            ...handleConfig,
                            handleStyle: { ...handleConfig.handleStyle, backgroundColor: e.target.value }
                          })}
                          className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Border Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-border" className="text-xs">Border</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="handle-border"
                          type="color"
                          value={handleConfig.handleStyle.borderColor}
                          onChange={(e) => onHandleConfigChange?.({
                            ...handleConfig,
                            handleStyle: { ...handleConfig.handleStyle, borderColor: e.target.value }
                          })}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="3"
                          value={handleConfig.handleStyle.borderWidth}
                          onChange={(e) => onHandleConfigChange?.({
                            ...handleConfig,
                            handleStyle: { ...handleConfig.handleStyle, borderWidth: Number(e.target.value) }
                          })}
                          className="w-12 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{handleConfig.handleStyle.borderWidth}px</span>
                      </div>
                    </div>
                  </div>

                  {/* Connection Settings */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Connection Settings</div>
                    
                    {/* Is Connectable */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-connectable" className="text-xs">Connectable</Label>
                      <Switch
                        id="handle-connectable"
                        checked={handleConfig.isConnectable}
                        onCheckedChange={(checked) => onHandleConfigChange?.({...handleConfig, isConnectable: checked})}
                        className="scale-75"
                      />
                    </div>

                    {/* Connection Mode */}
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Connection Mode</Label>
                      <RadioGroup 
                        value={handleConfig.connectionMode} 
                        onValueChange={(value) => onHandleConfigChange?.({...handleConfig, connectionMode: value as 'loose' | 'strict'})}
                        className="flex gap-3"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="loose" id="mode-loose" />
                          <Label htmlFor="mode-loose" className="text-xs cursor-pointer">Loose</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="strict" id="mode-strict" />
                          <Label htmlFor="mode-strict" className="text-xs cursor-pointer">Strict</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Connection Radius */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="connection-radius" className="text-xs">Connection Radius</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="connection-radius"
                          type="range"
                          min="5"
                          max="50"
                          value={handleConfig.connectionRadius}
                          onChange={(e) => onHandleConfigChange?.({...handleConfig, connectionRadius: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{handleConfig.connectionRadius}px</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="text-xs text-teal-700 dark:text-teal-300">
                  <div className="font-semibold mb-1">Handle Features:</div>
                  <div>• Define connection points on nodes</div>
                  <div>• Control source/target positions</div>
                  <div>• Customize appearance & behavior</div>
                  <div>• Validate connections dynamically</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* NodeResizer Configuration Section */}
        <AccordionItem value="noderesizer" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">📐</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Node Resizer</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Drag-to-resize functionality</div>
              </div>
              {nodeResizeConfig.enabled && (
                <Badge variant="default" className="bg-cyan-600 text-white text-xs">Resizable</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Enable Resize */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resize-enable" className="text-sm font-medium">Enable Resizing</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Allow nodes to be resized
                  </p>
                </div>
                <Switch
                  id="resize-enable"
                  checked={nodeResizeConfig.enabled}
                  onCheckedChange={(checked) => onNodeResizeConfigChange?.({...nodeResizeConfig, enabled: checked})}
                />
              </div>

              {nodeResizeConfig.enabled && (
                <>
                  {/* Visibility Options */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Display Options</div>
                    
                    {/* Always Visible vs On Selection */}
                    <div className="space-y-2">
                      <Label className="text-xs">Visibility</Label>
                      <RadioGroup 
                        value={nodeResizeConfig.isVisible ? 'always' : 'selected'} 
                        onValueChange={(value) => onNodeResizeConfigChange?.({...nodeResizeConfig, isVisible: value === 'always'})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="always" id="vis-always" />
                          <Label htmlFor="vis-always" className="text-xs cursor-pointer">Always Visible</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="selected" id="vis-selected" />
                          <Label htmlFor="vis-selected" className="text-xs cursor-pointer">Only When Selected</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Visual Style */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Visual Style</div>
                    
                    {/* Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="resize-color" className="text-xs">Handle Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="resize-color"
                          type="color"
                          value={nodeResizeConfig.color}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, color: e.target.value})}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={nodeResizeConfig.color}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, color: e.target.value})}
                          className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Handle Size */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="handle-size" className="text-xs">Handle Size</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="handle-size"
                          type="range"
                          min="4"
                          max="16"
                          value={nodeResizeConfig.handleSize}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, handleSize: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{nodeResizeConfig.handleSize}px</span>
                      </div>
                    </div>

                    {/* Line Width */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="line-width" className="text-xs">Line Width</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="line-width"
                          type="range"
                          min="1"
                          max="5"
                          value={nodeResizeConfig.lineSize}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, lineSize: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-6">{nodeResizeConfig.lineSize}px</span>
                      </div>
                    </div>
                  </div>

                  {/* Size Constraints */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Size Constraints</div>
                    
                    {/* Min Width */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="min-width" className="text-xs">Min Width</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="min-width"
                          type="number"
                          min="10"
                          max="200"
                          value={nodeResizeConfig.minWidth}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, minWidth: Number(e.target.value)})}
                          className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                      </div>
                    </div>

                    {/* Min Height */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="min-height" className="text-xs">Min Height</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="min-height"
                          type="number"
                          min="10"
                          max="200"
                          value={nodeResizeConfig.minHeight}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, minHeight: Number(e.target.value)})}
                          className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                      </div>
                    </div>

                    {/* Max Width */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-width" className="text-xs">Max Width</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="max-width"
                          type="number"
                          min="100"
                          max="1000"
                          value={nodeResizeConfig.maxWidth}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, maxWidth: Number(e.target.value)})}
                          className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                      </div>
                    </div>

                    {/* Max Height */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-height" className="text-xs">Max Height</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="max-height"
                          type="number"
                          min="100"
                          max="1000"
                          value={nodeResizeConfig.maxHeight}
                          onChange={(e) => onNodeResizeConfigChange?.({...nodeResizeConfig, maxHeight: Number(e.target.value)})}
                          className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                      </div>
                    </div>
                  </div>

                  {/* Behavior Options */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Behavior</div>
                    
                    {/* Keep Aspect Ratio */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="aspect-ratio" className="text-xs">Keep Aspect Ratio</Label>
                      <Switch
                        id="aspect-ratio"
                        checked={nodeResizeConfig.keepAspectRatio}
                        onCheckedChange={(checked) => onNodeResizeConfigChange?.({...nodeResizeConfig, keepAspectRatio: checked})}
                        className="scale-75"
                      />
                    </div>

                    {/* Auto Scale */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-scale" className="text-xs">Auto Scale</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Scale controls with zoom
                        </p>
                      </div>
                      <Switch
                        id="auto-scale"
                        checked={nodeResizeConfig.autoScale}
                        onCheckedChange={(checked) => onNodeResizeConfigChange?.({...nodeResizeConfig, autoScale: checked})}
                        className="scale-75"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <div className="text-xs text-cyan-700 dark:text-cyan-300">
                  <div className="font-semibold mb-1">NodeResizer Features:</div>
                  <div>• Drag handles to resize nodes</div>
                  <div>• All 8 resize points (corners + edges)</div>
                  <div>• Min/max size constraints</div>
                  <div>• Aspect ratio preservation option</div>
                  <div>• Auto-scales with zoom level</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* NodeToolbar Configuration Section */}
        <AccordionItem value="nodetoolbar" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">🛠️</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Node Toolbar</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Context actions for nodes</div>
              </div>
              {nodeToolbarConfig.enabled && (
                <Badge variant="default" className="bg-amber-600 text-white text-xs">Toolbar</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Enable Toolbar */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="toolbar-enable" className="text-sm font-medium">Enable Toolbar</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Show action buttons on nodes
                  </p>
                </div>
                <Switch
                  id="toolbar-enable"
                  checked={nodeToolbarConfig.enabled}
                  onCheckedChange={(checked) => onNodeToolbarConfigChange?.({...nodeToolbarConfig, enabled: checked})}
                />
              </div>

              {nodeToolbarConfig.enabled && (
                <>
                  {/* Visibility Mode */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Visibility</Label>
                    <RadioGroup 
                      value={nodeToolbarConfig.isVisible ? 'always' : 'selected'} 
                      onValueChange={(value) => onNodeToolbarConfigChange?.({...nodeToolbarConfig, isVisible: value === 'always'})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="selected" id="toolbar-selected" />
                        <Label htmlFor="toolbar-selected" className="text-xs cursor-pointer">Show on Selection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="always" id="toolbar-always" />
                        <Label htmlFor="toolbar-always" className="text-xs cursor-pointer">Always Visible</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Position</Label>
                    <RadioGroup 
                      value={nodeToolbarConfig.position} 
                      onValueChange={(value) => onNodeToolbarConfigChange?.({...nodeToolbarConfig, position: value as any})}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="top" id="pos-top" />
                        <Label htmlFor="pos-top" className="text-xs cursor-pointer">Top</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="right" id="pos-right" />
                        <Label htmlFor="pos-right" className="text-xs cursor-pointer">Right</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="bottom" id="pos-bottom" />
                        <Label htmlFor="pos-bottom" className="text-xs cursor-pointer">Bottom</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="left" id="pos-left" />
                        <Label htmlFor="pos-left" className="text-xs cursor-pointer">Left</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Alignment */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Alignment</Label>
                    <RadioGroup 
                      value={nodeToolbarConfig.align} 
                      onValueChange={(value) => onNodeToolbarConfigChange?.({...nodeToolbarConfig, align: value as any})}
                      className="flex gap-3"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="start" id="align-start" />
                        <Label htmlFor="align-start" className="text-xs cursor-pointer">Start</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="center" id="align-center" />
                        <Label htmlFor="align-center" className="text-xs cursor-pointer">Center</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="end" id="align-end" />
                        <Label htmlFor="align-end" className="text-xs cursor-pointer">End</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Offset */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toolbar-offset" className="text-xs">Offset</Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="toolbar-offset"
                        type="range"
                        min="0"
                        max="50"
                        value={nodeToolbarConfig.offset}
                        onChange={(e) => onNodeToolbarConfigChange?.({...nodeToolbarConfig, offset: Number(e.target.value)})}
                        className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{nodeToolbarConfig.offset}px</span>
                    </div>
                  </div>

                  {/* Toolbar Buttons */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Toolbar Buttons</div>
                    <div className="space-y-2">
                      {nodeToolbarConfig.buttons.map((button, index) => (
                        <div key={button.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={button.icon}
                              onChange={(e) => {
                                const newButtons = [...nodeToolbarConfig.buttons];
                                newButtons[index] = { ...button, icon: e.target.value };
                                onNodeToolbarConfigChange?.({...nodeToolbarConfig, buttons: newButtons});
                              }}
                              className="w-10 px-1 py-1 text-center text-xs border rounded bg-white dark:bg-slate-800"
                              maxLength={2}
                            />
                            <input
                              type="text"
                              value={button.label}
                              onChange={(e) => {
                                const newButtons = [...nodeToolbarConfig.buttons];
                                newButtons[index] = { ...button, label: e.target.value };
                                onNodeToolbarConfigChange?.({...nodeToolbarConfig, buttons: newButtons});
                              }}
                              className="flex-1 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newButtons = nodeToolbarConfig.buttons.filter(b => b.id !== button.id);
                              onNodeToolbarConfigChange?.({...nodeToolbarConfig, buttons: newButtons});
                            }}
                            className="h-6 w-6 p-0"
                          >
                            ❌
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const newButton = {
                          id: Date.now().toString(),
                          label: 'Action',
                          icon: '✨',
                          action: 'info' as const
                        };
                        onNodeToolbarConfigChange?.({...nodeToolbarConfig, buttons: [...nodeToolbarConfig.buttons, newButton]});
                      }}
                    >
                      <span className="mr-2">➕</span>
                      Add Button
                    </Button>
                  </div>

                  {/* Style Settings */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Toolbar Style</div>
                    
                    {/* Background Color */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toolbar-bg" className="text-xs">Background</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="toolbar-bg"
                          type="color"
                          value={nodeToolbarConfig.style.backgroundColor}
                          onChange={(e) => onNodeToolbarConfigChange?.({
                            ...nodeToolbarConfig,
                            style: { ...nodeToolbarConfig.style, backgroundColor: e.target.value }
                          })}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={nodeToolbarConfig.style.backgroundColor}
                          onChange={(e) => onNodeToolbarConfigChange?.({
                            ...nodeToolbarConfig,
                            style: { ...nodeToolbarConfig.style, backgroundColor: e.target.value }
                          })}
                          className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toolbar-radius" className="text-xs">Border Radius</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="toolbar-radius"
                          type="range"
                          min="0"
                          max="20"
                          value={nodeToolbarConfig.style.borderRadius}
                          onChange={(e) => onNodeToolbarConfigChange?.({
                            ...nodeToolbarConfig,
                            style: { ...nodeToolbarConfig.style, borderRadius: Number(e.target.value) }
                          })}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{nodeToolbarConfig.style.borderRadius}px</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  <div className="font-semibold mb-1">NodeToolbar Features:</div>
                  <div>• Context actions for nodes</div>
                  <div>• Non-scaling with viewport</div>
                  <div>• Customizable position & alignment</div>
                  <div>• Dynamic button configuration</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ViewportPortal Configuration Section */}
        <AccordionItem value="viewportportal" className="border rounded-lg bg-white dark:bg-slate-800">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <div className="flex-1 text-left">
                <span className="font-semibold text-black dark:text-white">Viewport Portal</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Fixed screen overlays (HUD elements)</div>
              </div>
              {viewportPortalConfig.enabled && (
                <Badge variant="default" className="bg-violet-600 text-white text-xs">
                  {viewportPortalConfig.elements.length} Items
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Explanation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  📍 What is ViewportPortal?
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                  ViewportPortal uses a <strong>different coordinate system</strong> than regular nodes!
                </p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs">
                    <div className="font-semibold text-green-600 dark:text-green-400 mb-1">🔲 Regular Nodes</div>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-0.5 text-[10px]">
                      <li>• Flow coordinates</li>
                      <li>• Move with pan</li>
                      <li>• Scale with zoom</li>
                      <li>• Can be anywhere</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">📍 ViewportPortal</div>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-0.5 text-[10px]">
                      <li>• Screen coordinates</li>
                      <li>• Fixed position</li>
                      <li>• No zoom effect</li>
                      <li>• (0,0) = top-left screen</li>
                    </ul>
                  </div>
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Use cases:</strong> Watermarks, legends, HUD elements, floating controls
                </div>
                <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                  <strong>💡 Try it:</strong> Enable portal, add an element, then pan/zoom the flow - notice how the element stays in place on your screen!
                </div>
              </div>

              {/* Enable ViewportPortal */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="portal-enable" className="text-sm font-medium">Enable Viewport Portal</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Show fixed overlay elements
                  </p>
                </div>
                <Switch
                  id="portal-enable"
                  checked={viewportPortalConfig.enabled}
                  onCheckedChange={(checked) => onViewportPortalConfigChange?.({...viewportPortalConfig, enabled: checked})}
                />
              </div>

              {viewportPortalConfig.enabled && (
                <>
                  {/* Enable Edit Mode */}
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✋</span>
                      <div>
                        <Label htmlFor="edit-mode" className="text-xs font-semibold text-yellow-900 dark:text-yellow-100">
                          Edit Mode
                        </Label>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                          Enable dragging elements in viewport
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="edit-mode"
                      checked={viewportPortalConfig.editMode || false}
                      onCheckedChange={(checked) => onViewportPortalConfigChange?.({...viewportPortalConfig, editMode: checked})}
                      className="scale-75"
                    />
                  </div>

                  {/* Show Grid Helper */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-grid" className="text-xs">Show Grid Helper</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Visual grid for positioning
                      </p>
                    </div>
                    <Switch
                      id="show-grid"
                      checked={viewportPortalConfig.showGrid || false}
                      onCheckedChange={(checked) => onViewportPortalConfigChange?.({...viewportPortalConfig, showGrid: checked})}
                      className="scale-75"
                    />
                  </div>

                  {viewportPortalConfig.showGrid && (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="grid-size" className="text-xs">Grid Size</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="grid-size"
                          type="range"
                          min="10"
                          max="100"
                          step="10"
                          value={viewportPortalConfig.gridSize || 50}
                          onChange={(e) => onViewportPortalConfigChange?.({...viewportPortalConfig, gridSize: Number(e.target.value)})}
                          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{viewportPortalConfig.gridSize || 50}px</span>
                      </div>
                    </div>
                  )}

                  {/* Portal Elements */}
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Portal Elements</div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {viewportPortalConfig.elements.map((element, index) => (
                        <div key={element.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-slate-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <RadioGroup 
                                value={element.type} 
                                onValueChange={(value) => {
                                  const newElements = [...viewportPortalConfig.elements];
                                  newElements[index] = { ...element, type: value as any };
                                  onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                }}
                                className="flex gap-2"
                              >
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="text" id={`type-text-${element.id}`} />
                                  <Label htmlFor={`type-text-${element.id}`} className="text-xs cursor-pointer">Text</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="shape" id={`type-shape-${element.id}`} />
                                  <Label htmlFor={`type-shape-${element.id}`} className="text-xs cursor-pointer">Shape</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newElements = viewportPortalConfig.elements.filter(e => e.id !== element.id);
                                onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                              }}
                              className="h-6 w-6 p-0"
                            >
                              ❌
                            </Button>
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={element.content}
                              onChange={(e) => {
                                const newElements = [...viewportPortalConfig.elements];
                                newElements[index] = { ...element, content: e.target.value };
                                onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                              }}
                              placeholder="Content"
                              className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                            />

                            {/* Position */}
                            <div className="flex gap-2">
                              <div className="flex items-center gap-1 flex-1">
                                <Label className="text-xs">X:</Label>
                                <input
                                  type="number"
                                  value={element.x}
                                  onChange={(e) => {
                                    const newElements = [...viewportPortalConfig.elements];
                                    newElements[index] = { 
                                      ...element, 
                                      x: Number(e.target.value)
                                    };
                                    onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                  }}
                                  className="w-full px-1 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                                />
                              </div>
                              <div className="flex items-center gap-1 flex-1">
                                <Label className="text-xs">Y:</Label>
                                <input
                                  type="number"
                                  value={element.y}
                                  onChange={(e) => {
                                    const newElements = [...viewportPortalConfig.elements];
                                    newElements[index] = { 
                                      ...element, 
                                      y: Number(e.target.value)
                                    };
                                    onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                  }}
                                  className="w-full px-1 py-1 text-xs border rounded bg-white dark:bg-slate-800"
                                />
                              </div>
                            </div>

                            {/* Style Options */}
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={element.style.color}
                                onChange={(e) => {
                                  const newElements = [...viewportPortalConfig.elements];
                                  newElements[index] = { 
                                    ...element, 
                                    style: { ...element.style, color: e.target.value }
                                  };
                                  onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                }}
                                className="w-8 h-6 border rounded cursor-pointer"
                                title="Text Color"
                              />
                              <input
                                type="color"
                                value={element.style.backgroundColor}
                                onChange={(e) => {
                                  const newElements = [...viewportPortalConfig.elements];
                                  newElements[index] = { 
                                    ...element, 
                                    style: { ...element.style, backgroundColor: e.target.value }
                                  };
                                  onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                }}
                                className="w-8 h-6 border rounded cursor-pointer"
                                title="Background Color"
                              />
                              <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={element.style.opacity}
                                onChange={(e) => {
                                  const newElements = [...viewportPortalConfig.elements];
                                  newElements[index] = { 
                                    ...element, 
                                    style: { ...element.style, opacity: Number(e.target.value) }
                                  };
                                  onViewportPortalConfigChange?.({...viewportPortalConfig, elements: newElements});
                                }}
                                className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                title={`Opacity: ${element.style.opacity}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Element Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const newElement = {
                          id: Date.now().toString(),
                          type: 'text' as const,
                          content: 'New Element',
                          x: 100,
                          y: 100,
                          style: {
                            color: '#1e293b',
                            backgroundColor: '#ffffff',
                            fontSize: 14,
                            padding: 8,
                            borderRadius: 4,
                            opacity: 1
                          }
                        };
                        onViewportPortalConfigChange?.({...viewportPortalConfig, elements: [...viewportPortalConfig.elements, newElement]});
                      }}
                    >
                      <span className="mr-2">➕</span>
                      Add Element
                    </Button>
                  </div>
                </>
              )}

              {/* Info Box */}
              <div className="bg-violet-50 dark:bg-violet-900/20 p-2 rounded-lg border border-violet-200 dark:border-violet-800">
                <div className="text-xs text-violet-700 dark:text-violet-300">
                  <div className="font-semibold mb-1">ViewportPortal Features:</div>
                  <div>• Elements in flow coordinate system</div>
                  <div>• Affected by pan and zoom</div>
                  <div>• Perfect for annotations</div>
                  <div>• Custom overlays and markers</div>
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
    </div>
  )
}

export default FlowControls;
