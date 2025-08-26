'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  ControlButton,
  Background,
  MiniMap,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  SelectionMode,
  useReactFlow,
  Position,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  BackgroundVariant,
} from '@xyflow/react';
import { CustomEdge } from './custom-edge';
import { CustomNode } from './custom-node';
import { ViewportPortalElement } from './viewport-portal-element';
import { ViewportGridHelper } from './viewport-grid-helper';
import '@xyflow/react/dist/style.css';

// Component for Reset View button that needs access to React Flow instance
function ResetViewButton() {
  const { setViewport } = useReactFlow();
  
  const handleReset = () => {
    // Reset to default viewport
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 300 });
  };
  
  return (
    <ControlButton onClick={handleReset} title="Reset View">
      <span style={{ fontSize: '16px' }}>↺</span>
    </ControlButton>
  );
}

const initialNodes: Node[] = [
  {
    id: 'n1',
    data: { label: 'Node 1' },
    position: { x: 250, y: 100 },
    type: 'input',
    style: { 
      width: 150, 
      height: 50,
      backgroundColor: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px'
    },
  },
  {
    id: 'n2',
    data: { label: 'Node 2' },
    position: { x: 350, y: 200 },
    style: { 
      width: 150, 
      height: 50,
      backgroundColor: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px'
    },
  },
  {
    id: 'n3',
    data: { label: 'Node 3' },
    position: { x: 450, y: 100 },
    style: { 
      width: 150, 
      height: 50,
      backgroundColor: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    label: 'Edge 1→2',
  },
  {
    id: 'e2-3',
    source: 'n2',
    target: 'n3',
    label: 'Edge 2→3',
  },
];

// Design tool viewport controls (for middle/right mouse drag)
const designToolPanOnDrag = [1, 2];

interface FlowProps {
  controlMode?: 'default' | 'design';
  miniMapEnabled?: boolean;
  loadedData?: { nodes: any[], edges: any[], viewport?: any };
  onFlowDataChange?: (data: { nodes: any[], edges: any[], viewport?: any }) => void;
  miniMapConfig?: {
    zoomable: boolean;
    pannable: boolean;
    nodeStrokeWidth: number;
  };
  controlsEnabled?: boolean;
  controlsConfig?: {
    showZoom: boolean;
    showFitView: boolean;
    showInteractive: boolean;
    showResetView: boolean;
  };
  backgroundEnabled?: boolean;
  backgroundVariant?: 'dots' | 'lines' | 'cross';
  panelEnabled?: boolean;
  panelPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  baseEdgeConfig?: {
    labelBgEnabled: boolean;
    labelBgPadding: number;
    labelBgBorderRadius: number;
    interactionWidth: number;
    edgeType: 'straight' | 'bezier' | 'step' | 'smoothstep';
    animated: boolean;
  };
  customControlButtons?: Array<{
    id: string;
    label: string;
    icon: string;
    enabled: boolean;
    position: 'before' | 'after';
  }>;
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
  viewportPortalConfig?: {
    enabled: boolean;
    editMode?: boolean;
    elements: Array<{
      id: string;
      x: number;
      y: number;
      width?: number;
      height?: number;
      content: string;
      style: {
        backgroundColor: string;
        color: string;
        padding: number;
        borderRadius: number;
        fontSize: number;
        opacity: number;
      };
      type: 'text' | 'shape';
    }>;
    showGrid?: boolean;
    gridSize?: number;
  };
  onViewportPortalElementMove?: (id: string, x: number, y: number) => void;
  onViewportPortalElementResize?: (id: string, width: number, height: number) => void;
  layoutConfig?: {
    type: 'horizontal' | 'vertical' | 'mixed';
    autoLayout: boolean;
    spacing: { x: number; y: number };
  };
}

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

function FlowInner({ 
  controlMode = 'default',
  miniMapEnabled = false,
  miniMapConfig = { zoomable: true, pannable: true, nodeStrokeWidth: 3 },
  controlsEnabled = true,
  controlsConfig = { showZoom: true, showFitView: true, showInteractive: true, showResetView: true },
  backgroundEnabled = true,
  backgroundVariant = 'dots',
  panelEnabled = false,
  panelPosition = 'top-right',
  baseEdgeConfig = {
    labelBgEnabled: true,
    labelBgPadding: 5,
    labelBgBorderRadius: 3,
    interactionWidth: 20,
    edgeType: 'bezier',
    animated: false
  },
  customControlButtons = [],
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
  nodeToolbarConfig = {
    enabled: false,
    isVisible: false,
    position: 'top' as const,
    align: 'center' as const,
    offset: 10,
    buttons: [],
    style: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderRadius: 6,
      padding: 4
    }
  },
  viewportPortalConfig = {
    enabled: false,
    elements: []
  },
  onViewportPortalElementMove,
  onViewportPortalElementResize,
  layoutConfig = {
    type: 'mixed' as const,
    autoLayout: false,
    spacing: { x: 150, y: 100 }
  },
  loadedData,
  onFlowDataChange
}: FlowProps) {
  const [nodes, setNodes] = useState<Node[]>(
    loadedData?.nodes?.length ? loadedData.nodes : initialNodes
  );
  const [edges, setEdges] = useState<Edge[]>(loadedData?.edges?.length ? loadedData.edges : initialEdges);

  // Custom node types - Always allow editing via CustomNode for all types
  const nodeTypes = useMemo(
    () => ({
      custom: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      input: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      default: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      output: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
    }),
    [handleConfig, nodeResizeConfig, nodeToolbarConfig]
  );

  // Custom edge types that use our CustomEdge component
  const edgeTypes = useMemo(
    () => ({
      straight: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      bezier: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      step: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      smoothstep: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
    }),
    [edgeLabelConfig, edgeTextConfig]
  );

  // Apply layout when layout config changes
  useEffect(() => {
    if (!layoutConfig.autoLayout) return;
    
    const { type, spacing } = layoutConfig;
    
    setNodes(currentNodes => {
      const layoutNodes = currentNodes.map((node, index) => {
        if (type === 'horizontal') {
          // Horizontal layout: left to right
          return {
            ...node,
            position: {
              x: index * spacing.x,
              y: Math.floor(index / 3) * spacing.y
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left
          };
        } else if (type === 'vertical') {
          // Vertical layout: top to bottom
          return {
            ...node,
            position: {
              x: (index % 3) * spacing.x,
              y: index * spacing.y
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top
          };
        }
        return node;
      });
      
      return type !== 'mixed' ? layoutNodes : currentNodes;
    });
  }, [layoutConfig]); // Only react to layout changes

  // Update edges when baseEdgeConfig changes
  useEffect(() => {
    setEdges(currentEdges => 
      currentEdges.map(edge => ({
        ...edge,
        type: baseEdgeConfig.edgeType,
        animated: baseEdgeConfig.animated,
        labelShowBg: baseEdgeConfig.labelBgEnabled,
        labelBgStyle: baseEdgeConfig.labelBgEnabled ? {
          fill: 'white',
          fillOpacity: 0.9,
        } : undefined,
        labelBgPadding: baseEdgeConfig.labelBgEnabled ? [baseEdgeConfig.labelBgPadding, baseEdgeConfig.labelBgPadding] as [number, number] : undefined,
        labelBgBorderRadius: baseEdgeConfig.labelBgEnabled ? baseEdgeConfig.labelBgBorderRadius : undefined,
        interactionWidth: baseEdgeConfig.interactionWidth,
      }))
    );
  }, [baseEdgeConfig]);

  // Update nodes when config changes
  useEffect(() => {
    setNodes(currentNodes => 
      currentNodes.map(node => ({
        ...node,
        type: (handleConfig.useCustomNodes || nodeResizeConfig.enabled || nodeToolbarConfig.enabled) 
          ? 'custom' 
          : (node.id === 'n1' ? 'input' : node.id === 'n3' ? 'output' : 'default'),
        style: { 
          ...node.style, 
          width: node.style?.width || 150, 
          height: node.style?.height || 50 
        },
      }))
    );
  }, [handleConfig.useCustomNodes, nodeResizeConfig.enabled, nodeToolbarConfig.enabled]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        let updatedNodes = applyNodeChanges(changes, nds);
        
        // Check for dimension changes (resize events)
        changes.forEach(change => {
          if (change.type === 'dimensions' && change.dimensions) {
            updatedNodes = updatedNodes.map(node => 
              node.id === change.id 
                ? { 
                    ...node, 
                    width: change.dimensions!.width,
                    height: change.dimensions!.height,
                    style: {
                      ...(node as any).style,
                      width: change.dimensions!.width,
                      height: change.dimensions!.height
                    }
                  }
                : node
            );
          }
        });
        
        return updatedNodes;
      }),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Allow any-to-any connections except self-connections
  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // Prevent connecting a node to itself
      return connection.source !== connection.target;
    },
    []
  );

  // Get screenToFlowPosition from React Flow
  const { screenToFlowPosition } = useReactFlow();

  // Add new node on double-click on the pane
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      // Only add node on double-click
      if (event.detail === 2) {
        event.preventDefault();
        
        // Use screenToFlowPosition for correct positioning
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: Node = {
          id: `node-${Date.now()}`,
          position,
          data: { label: `New Node ${nodes.length + 1}` },
          style: { 
            width: 150, 
            height: 50,
            backgroundColor: '#ffffff',
            border: '2px solid #e2e8f0',
            borderRadius: '8px'
          }
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [nodes.length, screenToFlowPosition]
  );

  const getBackgroundVariant = () => {
    switch (backgroundVariant) {
      case 'lines':
        return BackgroundVariant.Lines;
      case 'cross':
        return BackgroundVariant.Cross;
      case 'dots':
      default:
        return BackgroundVariant.Dots;
    }
  };

  const reactFlowProps = controlMode === 'design' ? {
    panOnScroll: true,
    selectionOnDrag: true,
    panOnDrag: designToolPanOnDrag,
    selectionMode: SelectionMode.Partial,
  } : {};

  // Handle loaded data changes
  useEffect(() => {
    if (loadedData?.nodes?.length) {
      setNodes(loadedData.nodes);
    }
    if (loadedData?.edges?.length) {
      setEdges(loadedData.edges);
    }
  }, [loadedData]);
  
  // Update parent when nodes/edges change (debounced to prevent loops)
  useEffect(() => {
    if (onFlowDataChange) {
      const timer = setTimeout(() => {
        onFlowDataChange({ nodes, edges });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes, edges, onFlowDataChange]);

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onPaneClick={onPaneClick}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        connectOnClick={false}
        nodesConnectable={true}
        {...reactFlowProps}
      >
        {backgroundEnabled && (
          <Background 
            variant={getBackgroundVariant()} 
            gap={12} 
            size={1}
            color="#aaa"
          />
        )}
        
        {controlsEnabled && (
          <Controls 
            showZoom={controlsConfig.showZoom}
            showFitView={controlsConfig.showFitView}
            showInteractive={controlsConfig.showInteractive}
          >
            {customControlButtons
              .filter(btn => btn.enabled && btn.position === 'before')
              .map(btn => (
                <ControlButton
                  key={btn.id}
                  onClick={() => {
                    // Handle button clicks
                    if (btn.label === 'Magic') {
                      alert('Something magical just happened! ✨');
                    } else if (btn.label === 'Reset') {
                      setNodes(initialNodes);
                      setEdges(initialEdges);
                      alert('Flow reset to initial state! 🔄');
                    } else if (btn.label === 'Save') {
                      const flowData = { nodes, edges };
                      console.log('Flow saved:', flowData);
                      alert('Flow saved to console! 💾');
                    } else {
                      alert(`${btn.label} button clicked!`);
                    }
                  }}
                  title={btn.label}
                  aria-label={btn.label}
                >
                  <span style={{ fontSize: '16px' }}>{btn.icon}</span>
                </ControlButton>
              ))}
            {customControlButtons
              .filter(btn => btn.enabled && btn.position === 'after')
              .map(btn => (
                <ControlButton
                  key={btn.id}
                  onClick={() => {
                    // Handle button clicks
                    if (btn.label === 'Magic') {
                      alert('Something magical just happened! ✨');
                    } else if (btn.label === 'Reset') {
                      setNodes(initialNodes);
                      setEdges(initialEdges);
                      alert('Flow reset to initial state! 🔄');
                    } else if (btn.label === 'Save') {
                      const flowData = { nodes, edges };
                      console.log('Flow saved:', flowData);
                      alert('Flow saved to console! 💾');
                    } else {
                      alert(`${btn.label} button clicked!`);
                    }
                  }}
                  title={btn.label}
                  aria-label={btn.label}
                >
                  <span style={{ fontSize: '16px' }}>{btn.icon}</span>
                </ControlButton>
              ))}
            {controlsConfig.showResetView && <ResetViewButton />}
          </Controls>
        )}
        
        {miniMapEnabled && (
          <MiniMap 
            nodeColor={nodeColor}
            nodeStrokeWidth={miniMapConfig.nodeStrokeWidth}
            zoomable={miniMapConfig.zoomable}
            pannable={miniMapConfig.pannable}
          />
        )}
        
        {panelEnabled && (
          <Panel position={panelPosition}>
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Flow Title</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Example panel content</p>
            </div>
          </Panel>
        )}
        
        {/* Viewport Grid Helper */}
        {viewportPortalConfig.enabled && viewportPortalConfig.showGrid && (
          <ViewportGridHelper gridSize={viewportPortalConfig.gridSize || 50} />
        )}
        
        {/* Viewport Portal Elements */}
        {viewportPortalConfig.enabled && viewportPortalConfig.elements.map((element) => (
          <ViewportPortalElement
            key={element.id}
            element={element}
            onPositionChange={onViewportPortalElementMove || (() => {})}
            onSizeChange={onViewportPortalElementResize || (() => {})}
            isEditable={viewportPortalConfig.editMode || false}
          />
        ))}
      </ReactFlow>
    </div>
  );
}

// Wrapper component with ReactFlowProvider
function Flow(props: FlowProps) {
  return (
    <ReactFlowProvider>
      <FlowInner {...props} />
    </ReactFlowProvider>
  );
}

export default Flow;
