'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
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
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  BackgroundVariant,
} from '@xyflow/react';
import { CustomEdge } from './custom-edge';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'n1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: 'n2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: 'n3',
    data: { label: 'Node 3' },
    position: { x: 200, y: 0 },
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

function Flow({ 
  controlMode = 'default',
  miniMapEnabled = false,
  miniMapConfig = { zoomable: true, pannable: true, nodeStrokeWidth: 3 },
  controlsEnabled = true,
  controlsConfig = { showZoom: true, showFitView: true, showInteractive: true },
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
  }
}: FlowProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Custom edge types that use our CustomEdge component
  const edgeTypes = useMemo(
    () => ({
      straight: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} />,
      bezier: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} />,
      step: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} />,
      smoothstep: (props: any) => <CustomEdge {...props} edgeLabelConfig={edgeLabelConfig} />,
    }),
    [edgeLabelConfig]
  );

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

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
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

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
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
      </ReactFlow>
    </div>
  );
}

export default Flow;
