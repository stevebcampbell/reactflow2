'use client';

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
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

const initialEdges: Edge[] = [];

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
  panelPosition = 'top-right'
}: FlowProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
          />
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
