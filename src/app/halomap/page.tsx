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
    showInteractive: true
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
  
  // NodeResizeControl state
  const [nodeResizeConfig, setNodeResizeConfig] = useState({
    enabled: false,
    color: '#3b82f6',
    handleSize: 8,
    lineSize: 2,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 500,
    maxHeight: 500,
    keepAspectRatio: false,
    position: 'corners' as 'all' | 'corners' | 'edges',
    variant: 'handle' as 'handle' | 'line',
    autoScale: true
  });

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
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
        onPanelPositionChange={(pos) => setPanelPosition(pos as any)}
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
      />      {/* Main Flow Area */}
      <div className="flex-1 relative">
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
