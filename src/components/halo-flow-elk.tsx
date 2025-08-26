'use client';

import { useState, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import {
  ReactFlow,
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
  ReactFlowProvider,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js';
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

const elk = new ELK();

// ELK layout algorithms
const elkAlgorithms = [
  { id: 'layered', name: 'Layered (Sugiyama)' },
  { id: 'stress', name: 'Stress' },
  { id: 'mrtree', name: 'Mr. Tree' },
  { id: 'radial', name: 'Radial' },
  { id: 'force', name: 'Force' },
  { id: 'disco', name: 'DisCo' },
  { id: 'box', name: 'Box' },
  { id: 'rectpacking', name: 'Rectangle Packing' },
];

// Default ELK options
const defaultElkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '120',
  'elk.spacing.nodeNode': '80',
  'elk.direction': 'DOWN',
  'elk.portConstraints': 'FIXED_ORDER',
  'elk.layered.considerModelOrder': 'NODES_AND_EDGES',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
};

// Comprehensive test dataset for ELK layout demonstration
const initialNodes: Node[] = [
  // Input layer
  {
    id: 'input-1',
    data: { label: '🎯 Start Process' },
    position: { x: 0, y: 0 },
    type: 'input',
    style: { width: 150, height: 50 },
  },
  {
    id: 'input-2',
    data: { label: '📊 Data Source' },
    position: { x: 0, y: 100 },
    type: 'input',
    style: { width: 150, height: 50 },
  },
  
  // Processing layer 1
  {
    id: 'process-1',
    data: { label: '🔍 Validation' },
    position: { x: 200, y: 0 },
    style: { width: 180, height: 80, backgroundColor: '#fef3c7' },
  },
  {
    id: 'process-2',
    data: { label: '🔄 Transform Data' },
    position: { x: 200, y: 100 },
    style: { width: 180, height: 60, backgroundColor: '#fef3c7' },
  },
  {
    id: 'process-3',
    data: { label: '🧮 Calculate Metrics' },
    position: { x: 200, y: 200 },
    style: { width: 180, height: 60, backgroundColor: '#fef3c7' },
  },
  
  // Decision nodes
  {
    id: 'decision-1',
    data: { label: '❓ Quality Check' },
    position: { x: 400, y: 50 },
    style: { width: 150, height: 60, backgroundColor: '#ede9fe', borderRadius: '20px' },
  },
  {
    id: 'decision-2',
    data: { label: '⚖️ Threshold Met?' },
    position: { x: 400, y: 150 },
    style: { width: 150, height: 60, backgroundColor: '#ede9fe', borderRadius: '20px' },
  },
  
  // Processing layer 2
  {
    id: 'analyze-1',
    data: { label: '📈 Statistical Analysis' },
    position: { x: 600, y: 0 },
    style: { width: 180, height: 100, backgroundColor: '#dcfce7' },
  },
  {
    id: 'analyze-2',
    data: { label: '🤖 ML Pipeline' },
    position: { x: 600, y: 120 },
    style: { width: 180, height: 70, backgroundColor: '#dcfce7' },
  },
  {
    id: 'analyze-3',
    data: { label: '📊 Visualization' },
    position: { x: 600, y: 210 },
    style: { width: 180, height: 70, backgroundColor: '#dcfce7' },
  },
  
  // Error handling branch
  {
    id: 'error-1',
    data: { label: '⚠️ Error Handler' },
    position: { x: 400, y: 300 },
    style: { width: 150, height: 60, backgroundColor: '#fee2e2' },
  },
  {
    id: 'error-2',
    data: { label: '📝 Log Errors' },
    position: { x: 600, y: 300 },
    style: { width: 150, height: 60, backgroundColor: '#fee2e2' },
  },
  
  // Integration layer
  {
    id: 'integrate-1',
    data: { label: '🔗 API Gateway' },
    position: { x: 800, y: 50 },
    style: { width: 160, height: 60, backgroundColor: '#fce7f3' },
  },
  {
    id: 'integrate-2',
    data: { label: '💾 Database' },
    position: { x: 800, y: 150 },
    style: { width: 160, height: 60, backgroundColor: '#fce7f3' },
  },
  {
    id: 'integrate-3',
    data: { label: '📧 Notification Service' },
    position: { x: 800, y: 250 },
    style: { width: 160, height: 60, backgroundColor: '#fce7f3' },
  },
  
  // Output layer
  {
    id: 'output-1',
    data: { label: '✅ Success' },
    position: { x: 1000, y: 50 },
    type: 'output',
    style: { width: 150, height: 50 },
  },
  {
    id: 'output-2',
    data: { label: '📊 Reports' },
    position: { x: 1000, y: 150 },
    type: 'output',
    style: { width: 150, height: 50 },
  },
  {
    id: 'output-3',
    data: { label: '🚨 Alerts' },
    position: { x: 1000, y: 250 },
    type: 'output',
    style: { width: 150, height: 50 },
  },
  
  // Feedback loop nodes
  {
    id: 'feedback-1',
    data: { label: '🔄 Feedback Loop' },
    position: { x: 800, y: 350 },
    style: { width: 150, height: 50 },
  },
  {
    id: 'monitor-1',
    data: { label: '📡 Monitoring' },
    position: { x: 600, y: 400 },
    style: { width: 150, height: 50 },
  },
];

const initialEdges: Edge[] = [
  // From inputs to processing
  { id: 'e1', source: 'input-1', target: 'process-1', animated: true, label: 'Initialize' },
  { id: 'e2', source: 'input-2', target: 'process-2', animated: true },
  { id: 'e3', source: 'input-2', target: 'process-3' },
  
  // Processing to decisions
  { id: 'e4', source: 'process-1', target: 'decision-1', label: 'Validate' },
  { id: 'e5', source: 'process-2', target: 'decision-1' },
  { id: 'e6', source: 'process-3', target: 'decision-2' },
  
  // Decision branches
  { id: 'e7', source: 'decision-1', target: 'analyze-1', label: 'Pass', style: { stroke: '#22c55e' } },
  { id: 'e8', source: 'decision-1', target: 'error-1', label: 'Fail', style: { stroke: '#ef4444' } },
  { id: 'e9', source: 'decision-2', target: 'analyze-2', label: 'Above', style: { stroke: '#22c55e' } },
  { id: 'e10', source: 'decision-2', target: 'analyze-3', label: 'Below', style: { stroke: '#f59e0b' } },
  
  // Analysis to integration
  { id: 'e11', source: 'analyze-1', target: 'integrate-1' },
  { id: 'e12', source: 'analyze-2', target: 'integrate-2' },
  { id: 'e13', source: 'analyze-3', target: 'integrate-2' },
  { id: 'e14', source: 'analyze-3', target: 'integrate-3' },
  
  // Error handling flow
  { id: 'e15', source: 'error-1', target: 'error-2', style: { stroke: '#ef4444' } },
  { id: 'e16', source: 'error-2', target: 'integrate-3', style: { stroke: '#ef4444' } },
  
  // Integration to outputs
  { id: 'e17', source: 'integrate-1', target: 'output-1' },
  { id: 'e18', source: 'integrate-2', target: 'output-2' },
  { id: 'e19', source: 'integrate-3', target: 'output-3' },
  
  // Feedback loops
  { id: 'e20', source: 'output-1', target: 'feedback-1', animated: true, style: { stroke: '#6b7280', strokeDasharray: '5 5' } },
  { id: 'e21', source: 'output-2', target: 'feedback-1', style: { stroke: '#6b7280', strokeDasharray: '5 5' } },
  { id: 'e22', source: 'feedback-1', target: 'monitor-1', animated: true },
  { id: 'e23', source: 'monitor-1', target: 'process-3', animated: true, label: 'Adjust', style: { stroke: '#6b7280', strokeDasharray: '5 5' } },
  
  // Cross connections for complexity
  { id: 'e24', source: 'analyze-1', target: 'analyze-2', style: { stroke: '#94a3b8' } },
  { id: 'e25', source: 'integrate-1', target: 'integrate-2', style: { stroke: '#94a3b8' } },
  { id: 'e26', source: 'error-2', target: 'output-3', style: { stroke: '#ef4444', strokeDasharray: '3 3' } },
];

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
  layoutConfig?: {
    type: 'horizontal' | 'vertical' | 'mixed';
    autoLayout: boolean;
    spacing: { x: number; y: number };
    elkAlgorithm?: string;
    elkConsiderModelOrder?: boolean;
    elkCrossingMinimization?: boolean;
  };
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
    enabled?: boolean;
    editMode?: boolean;
    elements?: Array<{
      id: string;
      x: number;
      y: number;
      width?: number;
      height?: number;
      content: string;
      style?: any;
      type?: 'text' | 'shape';
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
  layoutConfig = {
    type: 'vertical',
    autoLayout: true,
    spacing: { x: 150, y: 100 },
    elkAlgorithm: 'layered',
    elkConsiderModelOrder: true,
    elkCrossingMinimization: true
  },
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
  loadedData,
  onFlowDataChange
}: FlowProps) {
  const [nodes, setNodes] = useNodesState(loadedData?.nodes?.length ? loadedData.nodes : initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(loadedData?.edges?.length ? loadedData.edges : initialEdges);
  const { fitView, getViewport, screenToFlowPosition } = useReactFlow();
  
  // Custom handler for node changes that preserves dimensions
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(nds => {
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
                    ...node.style,
                    width: change.dimensions!.width,
                    height: change.dimensions!.height
                  }
                }
              : node
          );
        }
      });
      
      return updatedNodes;
    });
  }, [setNodes]);
  
  // Use layoutConfig from props
  const selectedAlgorithm = layoutConfig.elkAlgorithm || 'layered';
  const elkDirection = layoutConfig.type === 'horizontal' ? 'RIGHT' : 'DOWN';

  // Get layouted elements using ELK
  const getLayoutedElements = useCallback(async (nodes: Node[], edges: Edge[], options = {}) => {
    const elkOptions = {
      ...defaultElkOptions,
      'elk.algorithm': selectedAlgorithm,
      'elk.direction': elkDirection,
      'elk.layered.considerModelOrder': layoutConfig.elkConsiderModelOrder ? 'NODES_AND_EDGES' : 'NONE',
      'elk.layered.crossingMinimization.strategy': layoutConfig.elkCrossingMinimization ? 'LAYER_SWEEP' : 'NONE',
      ...options,
    };

    const isHorizontal = elkDirection === 'RIGHT';
    
    // Prepare graph for ELK
    const graph = {
      id: 'root',
      layoutOptions: elkOptions,
      children: nodes.map((node) => ({
        id: node.id,
        width: node.style?.width || 150,
        height: node.style?.height || 50,
        // Add port information if using handles
        ports: handleConfig.useCustomNodes ? [
          { id: `${node.id}_in`, properties: { side: isHorizontal ? 'WEST' : 'NORTH' } },
          { id: `${node.id}_out`, properties: { side: isHorizontal ? 'EAST' : 'SOUTH' } },
        ] : undefined,
        properties: {
          'org.eclipse.elk.portConstraints': 'FIXED_ORDER',
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
        // Use ports if handles are enabled
        sourcePort: handleConfig.useCustomNodes ? `${edge.source}_out` : undefined,
        targetPort: handleConfig.useCustomNodes ? `${edge.target}_in` : undefined,
      })),
    };

    try {
      const layoutedGraph = await elk.layout(graph);
      
      // Transform back to React Flow format
      const layoutedNodes = (layoutedGraph.children || []).map((node) => {
        const originalNode = nodes.find(n => n.id === node.id)!;
        return {
          ...originalNode,
          position: { x: node.x || 0, y: node.y || 0 },
          targetPosition: isHorizontal ? Position.Left : Position.Top,
          sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
          // Use custom type if custom nodes are enabled
          type: handleConfig.useCustomNodes || nodeResizeConfig.enabled || nodeToolbarConfig.enabled
            ? (originalNode.type || 'default')
            : originalNode.type,
          // Preserve dimensions from original node
          width: originalNode.width,
          height: originalNode.height,
          style: {
            ...originalNode.style,
            width: originalNode.width || originalNode.style?.width,
            height: originalNode.height || originalNode.style?.height,
          }
        };
      });

      const layoutedEdges = edges.map((edge) => ({
        ...edge,
        type: baseEdgeConfig.edgeType,
        animated: baseEdgeConfig.animated,
        data: {
          ...edge.data,
          label: edge.data?.label || edge.label,
        },
        label: edgeLabelConfig.useHtmlLabels || edgeTextConfig.enabled 
          ? undefined 
          : edge.data?.label || edge.label,
      }));

      return { nodes: layoutedNodes, edges: layoutedEdges };
    } catch (error) {
      console.error('ELK layout error:', error);
      return { nodes, edges };
    }
  }, [selectedAlgorithm, elkDirection, handleConfig.useCustomNodes, baseEdgeConfig]);


  // Manual layout trigger
  const applyLayout = useCallback(() => {
    getLayoutedElements(nodes, edges)
      .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        window.requestAnimationFrame(() => fitView());
      })
      .catch(error => {
        console.error('ELK layout error:', error);
        console.log('Layout algorithm failed, keeping original positions');
      });
  }, [nodes, edges, getLayoutedElements, setNodes, setEdges, fitView]);

  // Load from session storage on mount
  useEffect(() => {
    if (layoutConfig.loadFromSession) {
      const savedState = sessionStorage.getItem('halomap-elk-flow');
      if (savedState) {
        try {
          const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedState);
          setNodes(savedNodes);
          setEdges(savedEdges);
          setTimeout(() => fitView(), 100);
        } catch (error) {
          console.error('Failed to load saved state:', error);
        }
      }
    }
  }, [layoutConfig.loadFromSession]);

  // Handle layout actions
  useEffect(() => {
    if (layoutConfig.applyLayout) {
      applyLayout();
    }
    if (layoutConfig.resetLayout) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      setTimeout(() => applyLayout(), 100);
    }
  }, [layoutConfig.applyLayout, layoutConfig.resetLayout]);
  
  // Update edges when configuration changes (without re-layout)
  useEffect(() => {
    setEdges(currentEdges => currentEdges.map(edge => ({
      ...edge,
      type: baseEdgeConfig.edgeType,
      animated: baseEdgeConfig.animated,
      data: {
        ...edge.data,
        label: edge.data?.label || edge.label,
      },
      label: edgeLabelConfig.useHtmlLabels || edgeTextConfig.enabled 
        ? undefined 
        : edge.data?.label || edge.label,
    })));
  }, [baseEdgeConfig.edgeType, baseEdgeConfig.animated, edgeLabelConfig.useHtmlLabels, edgeTextConfig.enabled]);
  
  // Update nodes when handle configuration changes (without re-layout)
  useEffect(() => {
    // Always use custom type to support editing
    const needsCustomType = true; // Always true to support double-click editing
    setNodes(currentNodes => currentNodes.map(node => ({
      ...node,
      type: 'custom', // Always use custom to support editing
      // Preserve dimensions and style
      style: {
        ...node.style,
        width: node.width || node.style?.width,
        height: node.height || node.style?.height,
      },
      // Ensure data is preserved
      data: {
        ...node.data,
      }
    })));
  }, [handleConfig.useCustomNodes, nodeResizeConfig.enabled, nodeToolbarConfig.enabled]);

  // Layout only on algorithm/direction changes and initial mount
  useLayoutEffect(() => {
    applyLayout();
  }, [selectedAlgorithm, elkDirection]);
  
  // Handle loaded data changes
  useEffect(() => {
    if (loadedData?.nodes?.length) {
      setNodes(loadedData.nodes);
    }
    if (loadedData?.edges?.length) {
      setEdges(loadedData.edges);
    }
    if (loadedData?.viewport) {
      setTimeout(() => {
        fitView({ padding: 0.1 });
      }, 100);
    }
  }, [loadedData, setNodes, setEdges, fitView]);
  
  // Update parent when nodes/edges/viewport change (debounced to prevent loops)
  useEffect(() => {
    if (onFlowDataChange) {
      const timer = setTimeout(() => {
        const viewport = getViewport();
        onFlowDataChange({ nodes, edges, viewport });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes, edges, onFlowDataChange, getViewport]);

  // Save state to session storage when nodes/edges or any configuration changes
  useEffect(() => {
    const flowState = {
      nodes,
      edges,
      viewport: getViewport(),
      configurations: {
        controlMode,
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
        version: '1.1.0',
        type: 'halomap-flow',
        engine: 'elk'
      }
    };
    sessionStorage.setItem('halomap-elk-flow', JSON.stringify(flowState));
  }, [
    nodes, edges, layoutConfig, controlMode,
    miniMapEnabled, miniMapConfig,
    controlsEnabled, controlsConfig,
    backgroundEnabled, backgroundVariant,
    panelEnabled, panelPosition,
    baseEdgeConfig, customControlButtons,
    edgeLabelConfig, edgeTextConfig,
    handleConfig, nodeResizeConfig,
    nodeToolbarConfig, viewportPortalConfig
  ]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Allow any-to-any connections except self-connections
  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // Prevent connecting a node to itself
      return connection.source !== connection.target;
    },
    []
  );

  // Add new node on double-click on the pane
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      // Only add node on double-click
      if (event.detail === 2) {
        event.preventDefault();
        
        // Use screenToFlowPosition to get the correct position
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: Node = {
          id: `node-${Date.now()}`,
          position,
          data: { label: `New Node ${nodes.length + 1}` },
          width: 150,
          height: 50,
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
    [nodes.length, handleConfig.useCustomNodes, nodeResizeConfig.enabled, nodeToolbarConfig.enabled, screenToFlowPosition]
  );

  const onLayout = useCallback(
    async (direction: 'DOWN' | 'RIGHT') => {
      setElkDirection(direction);
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(nodes, edges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      window.requestAnimationFrame(() => fitView());
    },
    [nodes, edges, getLayoutedElements, setNodes, setEdges, fitView]
  );

  // Custom node types - Always use custom nodes to support editing
  const nodeTypes = useMemo(
    () => ({
      custom: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      input: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      default: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
      output: (props: any) => <CustomNode {...props} handleConfig={handleConfig} nodeResizeConfig={nodeResizeConfig} nodeToolbarConfig={nodeToolbarConfig} />,
    }),
    [handleConfig, nodeResizeConfig, nodeToolbarConfig]
  );

  // Custom edge types
  const edgeTypes = useMemo(
    () => ({
      straight: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      bezier: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      step: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
      smoothstep: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} edgeTextConfig={edgeTextConfig} />,
    }),
    [edgeLabelConfig, edgeTextConfig]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={true}
        connectOnClick={false}
        nodesConnectable={true}
        elementsSelectable={true}
        deleteKeyCode={controlMode === 'design' ? ['Delete', 'Backspace'] : []}
        selectionOnDrag={controlMode === 'design'}
        selectionMode={controlMode === 'design' ? SelectionMode.Partial : SelectionMode.Full}
        panOnDrag={controlMode === 'default'}
      >
        {backgroundEnabled && (
          <Background 
            variant={backgroundVariant as BackgroundVariant}
            gap={backgroundVariant === 'dots' ? 16 : undefined}
            size={backgroundVariant === 'dots' ? 1 : undefined}
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
        {viewportPortalConfig.enabled && viewportPortalConfig.elements?.map((element) => (
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

function Flow(props: FlowProps) {
  return (
    <ReactFlowProvider>
      <FlowInner {...props} />
    </ReactFlowProvider>
  );
}

export default Flow;