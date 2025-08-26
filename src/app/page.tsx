'use client';

import React, { useState, useCallback } from 'react';
import HaloFlow from '@/components/halo-flow';
import HaloFlowELK from '@/components/halo-flow-elk';
import FlowControls from '@/components/flow-controls';
import { HelpMenu } from '@/components/help-menu';
import { Button } from '@/components/ui/button';

export default function HaloMapPage() {
  const [controlMode, setControlMode] = useState<'default' | 'design'>(
    'default'
  );
  
  // Store nodes and edges at the page level for save/load
  const [flowData, setFlowData] = useState<{ nodes: any[], edges: any[], viewport?: any }>({ 
    nodes: [], 
    edges: [] 
  });
  
  // Layout mode state
  const [layoutMode, setLayoutMode] = useState<'standard' | 'elk'>('standard');
  
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

  // Layout state
  const [layoutConfig, setLayoutConfig] = useState({
    type: 'mixed' as 'horizontal' | 'vertical' | 'mixed',
    autoLayout: false,
    spacing: { x: 150, y: 100 }
  });

  // ViewportPortal state (moved before save handler)
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

  // Save handler
  const handleSave = useCallback(() => {
    const flowState = {
      nodes: flowData.nodes,
      edges: flowData.edges,
      viewport: flowData.viewport,
      configurations: {
        controlMode,
        layoutMode,
        layoutConfig,
        miniMapEnabled,
        miniMapConfig,
        controlsEnabled,
        controlsConfig,
        backgroundEnabled,
        backgroundVariant,
        panelEnabled,
        panelPosition,
        baseEdgeConfig,
        customControlButtons,
        edgeLabelConfig,
        edgeTextConfig,
        handleConfig,
        nodeResizeConfig,
        nodeToolbarConfig,
        viewportPortalConfig
      },
      timestamp: Date.now(),
      schema: {
        version: '2.0.0',
        type: 'halomap-flow',
        engine: layoutMode
      }
    };
    
    const blob = new Blob([JSON.stringify(flowState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `halomap-flow-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [flowData, controlMode, layoutMode, layoutConfig, miniMapEnabled, miniMapConfig,
      controlsEnabled, controlsConfig, backgroundEnabled, backgroundVariant,
      panelEnabled, panelPosition, baseEdgeConfig, customControlButtons,
      edgeLabelConfig, edgeTextConfig, handleConfig, nodeResizeConfig,
      nodeToolbarConfig, viewportPortalConfig]);
  
  // Load handler
  const handleLoad = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target?.result as string;
          try {
            const parsedData = JSON.parse(data);
            
            // Load flow data
            if (parsedData.nodes && parsedData.edges) {
              setFlowData({
                nodes: parsedData.nodes,
                edges: parsedData.edges,
                viewport: parsedData.viewport
              });
            }
            
            // Load all configurations if they exist
            if (parsedData.configurations) {
              const configs = parsedData.configurations;
              
              if (configs.controlMode !== undefined) setControlMode(configs.controlMode);
              if (configs.layoutMode !== undefined) setLayoutMode(configs.layoutMode);
              if (configs.miniMapEnabled !== undefined) setMiniMapEnabled(configs.miniMapEnabled);
              if (configs.miniMapConfig) setMiniMapConfig(configs.miniMapConfig);
              if (configs.controlsEnabled !== undefined) setControlsEnabled(configs.controlsEnabled);
              if (configs.controlsConfig) setControlsConfig(configs.controlsConfig);
              if (configs.backgroundEnabled !== undefined) setBackgroundEnabled(configs.backgroundEnabled);
              if (configs.backgroundVariant) setBackgroundVariant(configs.backgroundVariant);
              if (configs.panelEnabled !== undefined) setPanelEnabled(configs.panelEnabled);
              if (configs.panelPosition) setPanelPosition(configs.panelPosition);
              if (configs.baseEdgeConfig) setBaseEdgeConfig(configs.baseEdgeConfig);
              if (configs.customControlButtons) setCustomControlButtons(configs.customControlButtons);
              if (configs.edgeLabelConfig) setEdgeLabelConfig(configs.edgeLabelConfig);
              if (configs.edgeTextConfig) setEdgeTextConfig(configs.edgeTextConfig);
              if (configs.handleConfig) setHandleConfig(configs.handleConfig);
              if (configs.nodeResizeConfig) setNodeResizeConfig(configs.nodeResizeConfig);
              if (configs.nodeToolbarConfig) setNodeToolbarConfig(configs.nodeToolbarConfig);
              if (configs.viewportPortalConfig) setViewportPortalConfig(configs.viewportPortalConfig);
              if (configs.layoutConfig) setLayoutConfig(configs.layoutConfig);
            }
          } catch (error) {
            console.error('Failed to parse saved file:', error);
            alert('Invalid file format. Please select a valid HaloMap flow file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left Sidebar - Flow Controls */}
      <FlowControls 
        controlMode={controlMode} 
        onControlModeChange={setControlMode}
        layoutMode={layoutMode}
        onLayoutModeChange={setLayoutMode}
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
        layoutConfig={layoutConfig}
        onLayoutConfigChange={setLayoutConfig}
      />
      
      {/* Main Flow Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          {layoutMode === 'standard' ? (
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
              layoutConfig={layoutConfig}
              loadedData={flowData}
              onFlowDataChange={setFlowData}
            />
          ) : (
            <HaloFlowELK 
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
              layoutConfig={layoutConfig}
              loadedData={flowData}
              onFlowDataChange={setFlowData}
            />
          )}
        </div>

        {/* Overlay title and help */}
        <div className="absolute top-4 left-4 bg-white dark:bg-slate-900 backdrop-blur rounded-lg px-4 py-2 border-2 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">
                🗺️ HaloMap
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {layoutMode === 'elk' ? 'Powered by ELK.js' : 'Interactive React Flow'} -{' '}
                {controlMode === 'default'
                  ? 'Default Controls'
                  : 'Design Tool Controls'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                💾 Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleLoad}>
                📂 Load
              </Button>
              <HelpMenu>
                <Button variant="outline" size="sm">
                  Help
                </Button>
              </HelpMenu>
            </div>
          </div>
        </div>

        {/* Control mode indicator */}
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 backdrop-blur rounded-lg px-3 py-2 border-2 shadow-lg">
          <div className="text-sm space-y-1">
            <div>
              <span className="text-gray-600 dark:text-gray-300">Layout: </span>
              <span className="font-semibold text-black dark:text-white">
                {layoutMode === 'standard' ? '📐 Standard' : '🔧 ELK'}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-300">Mode: </span>
              <span className="font-semibold text-black dark:text-white">
                {controlMode === 'default' ? '🎯 Default' : '🎨 Design Tool'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg px-3 py-2 border shadow-md">
          <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
            <div>💡 <strong>Double-click</strong> canvas to add node</div>
            <div>✏️ <strong>Double-click</strong> node to edit label</div>
            <div>🔗 <strong>Drag</strong> from handle to connect nodes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
