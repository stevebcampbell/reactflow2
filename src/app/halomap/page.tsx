'use client';

import { useState } from 'react';
import HaloFlow from '@/components/halo-flow';
import FlowControls from '@/components/flow-controls';
import { HelpMenu } from '@/components/help-menu';
import { Button } from '@/components/ui/button';

export default function HaloMapPage() {
  const [controlMode, setControlMode] = useState<'default' | 'design'>(
    'default'
  );
  
  // MiniMap state
  const [miniMapEnabled, setMiniMapEnabled] = useState(false);
  const [miniMapConfig, setMiniMapConfig] = useState({
    zoomable: true,
    pannable: true,
    nodeStrokeWidth: 3
  });
  
  // Controls state
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [controlsConfig, setControlsConfig] = useState({
    showZoom: true,
    showFitView: true,
    showInteractive: true,
    showResetView: true
  });
  
  // Background state
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const [backgroundVariant, setBackgroundVariant] = useState<'dots' | 'lines' | 'cross'>('dots');
  
  // Panel state
  const [panelEnabled, setPanelEnabled] = useState(false);
  const [panelPosition, setPanelPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('top-right');
  
  // BaseEdge state
  const [baseEdgeConfig, setBaseEdgeConfig] = useState({
    labelBgEnabled: true,
    labelBgPadding: 5,
    labelBgBorderRadius: 3,
    interactionWidth: 20,
    edgeType: 'bezier' as 'straight' | 'bezier' | 'step' | 'smoothstep',
    animated: false
  });
  
  // Custom Control Buttons state
  const [customControlButtons, setCustomControlButtons] = useState([
    { id: '1', label: 'Magic', icon: '✨', enabled: false, position: 'after' as const },
    { id: '2', label: 'Reset', icon: '🔄', enabled: false, position: 'after' as const },
    { id: '3', label: 'Save', icon: '💾', enabled: false, position: 'before' as const }
  ]);
  
  // EdgeLabelRenderer state
  const [edgeLabelConfig, setEdgeLabelConfig] = useState({
    useHtmlLabels: false,
    showBackground: true,
    backgroundColor: '#ffcc00',
    textColor: '#000000',
    fontSize: 12,
    padding: 10,
    borderRadius: 5,
    fontWeight: 'normal' as 'normal' | 'bold',
    interactive: false
  });
  
  // EdgeText state
  const [edgeTextConfig, setEdgeTextConfig] = useState({
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
    position: 'center' as 'center' | 'start' | 'end'
  });
  
  // Handle state
  const [handleConfig, setHandleConfig] = useState({
    useCustomNodes: false,
    handleCount: 2,
    handlePosition: 'horizontal' as 'horizontal' | 'vertical' | 'all',
    handleStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#555',
      borderColor: '#fff',
      borderWidth: 1
    },
    isConnectable: true,
    connectionMode: 'loose' as 'loose' | 'strict',
    connectionRadius: 10
  });
  
  // NodeResizer state
  const [nodeResizeConfig, setNodeResizeConfig] = useState({
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
  });
  
  // NodeToolbar state
  const [nodeToolbarConfig, setNodeToolbarConfig] = useState({
    enabled: false,
    isVisible: false,
    position: 'top' as 'top' | 'right' | 'bottom' | 'left',
    align: 'center' as 'start' | 'center' | 'end',
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
  });
  
  // Handler for viewport portal element movement
  const handleViewportPortalElementMove = (id: string, x: number, y: number) => {
    setViewportPortalConfig(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, x, y } : el
      )
    }));
  };

  // Handler for viewport portal element resize
  const handleViewportPortalElementResize = (id: string, width: number, height: number) => {
    setViewportPortalConfig(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, width, height } : el
      )
    }));
  };

  // ViewportPortal state
  const [viewportPortalConfig, setViewportPortalConfig] = useState({
    enabled: false,
    editMode: false,
    elements: [
      {
        id: '1',
        x: 20,
        y: 20,
        width: 120,
        height: 40,
        content: '© 2024 HaloMap',
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#ffffff',
          padding: 8,
          borderRadius: 4,
          fontSize: 12,
          opacity: 0.9
        },
        type: 'text' as 'text' | 'shape'
      },
      {
        id: '2',
        x: 20,
        y: 60,
        width: 50,
        height: 50,
        content: '🧭 N',
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#000000',
          padding: 10,
          borderRadius: 20,
          fontSize: 16,
          opacity: 1
        },
        type: 'shape' as 'text' | 'shape'
      }
    ],
    showGrid: false,
    gridSize: 50
  });

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left Sidebar - Flow Controls */}
      <FlowControls 
        controlMode={controlMode} 
        onControlModeChange={setControlMode}
        miniMapEnabled={miniMapEnabled}
        onMiniMapEnabledChange={setMiniMapEnabled}
        miniMapConfig={miniMapConfig}
        onMiniMapConfigChange={setMiniMapConfig}
        controlsEnabled={controlsEnabled}
        onControlsEnabledChange={setControlsEnabled}
        controlsConfig={controlsConfig}
        onControlsConfigChange={setControlsConfig}
        backgroundEnabled={backgroundEnabled}
        onBackgroundEnabledChange={setBackgroundEnabled}
        backgroundVariant={backgroundVariant}
        onBackgroundVariantChange={setBackgroundVariant}
        panelEnabled={panelEnabled}
        onPanelEnabledChange={setPanelEnabled}
        panelPosition={panelPosition}
        onPanelPositionChange={setPanelPosition}
        baseEdgeConfig={baseEdgeConfig}
        onBaseEdgeConfigChange={setBaseEdgeConfig}
        customControlButtons={customControlButtons}
        onCustomControlButtonsChange={setCustomControlButtons}
        edgeLabelConfig={edgeLabelConfig}
        onEdgeLabelConfigChange={setEdgeLabelConfig}
        edgeTextConfig={edgeTextConfig}
        onEdgeTextConfigChange={setEdgeTextConfig}
        handleConfig={handleConfig}
        onHandleConfigChange={setHandleConfig}
        nodeResizeConfig={nodeResizeConfig}
        onNodeResizeConfigChange={setNodeResizeConfig}
        nodeToolbarConfig={nodeToolbarConfig}
        onNodeToolbarConfigChange={setNodeToolbarConfig}
        viewportPortalConfig={viewportPortalConfig}
        onViewportPortalConfigChange={setViewportPortalConfig}
      />      {/* Main Flow Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <HaloFlow 
            controlMode={controlMode}
            miniMapEnabled={miniMapEnabled}
            miniMapConfig={miniMapConfig}
            controlsEnabled={controlsEnabled}
            controlsConfig={controlsConfig}
            backgroundEnabled={backgroundEnabled}
            backgroundVariant={backgroundVariant}
            panelEnabled={panelEnabled}
            panelPosition={panelPosition}
            baseEdgeConfig={baseEdgeConfig}
            customControlButtons={customControlButtons}
            edgeLabelConfig={edgeLabelConfig}
            edgeTextConfig={edgeTextConfig}
            handleConfig={handleConfig}
            nodeResizeConfig={nodeResizeConfig}
            nodeToolbarConfig={nodeToolbarConfig}
            viewportPortalConfig={viewportPortalConfig}
            onViewportPortalElementMove={handleViewportPortalElementMove}
            onViewportPortalElementResize={handleViewportPortalElementResize}
          />
        </div>

        {/* Overlay title and help */}
        <div className="absolute top-4 left-4 bg-white dark:bg-slate-900 backdrop-blur rounded-lg px-4 py-2 border-2 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">
                🗺️ HaloMap
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Interactive React Flow -{' '}
                {controlMode === 'default'
                  ? 'Default Controls'
                  : 'Design Tool Controls'}
              </p>
            </div>
            <HelpMenu>
              <Button variant="outline" size="sm">
                Help
              </Button>
            </HelpMenu>
          </div>
        </div>

        {/* Control mode indicator */}
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 backdrop-blur rounded-lg px-3 py-2 border-2 shadow-lg">
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-300">Mode: </span>
            <span className="font-semibold text-black dark:text-white">
              {controlMode === 'default' ? '🎯 Default' : '🎨 Design Tool'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
