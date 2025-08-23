'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '🚀 Start Node' },
    style: {
      background: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      border: '1px solid hsl(var(--border))',
      width: 180,
    },
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: '⚙️ Process Node' },
    style: {
      background: 'hsl(var(--secondary))',
      color: 'hsl(var(--secondary-foreground))',
      border: '1px solid hsl(var(--border))',
      width: 180,
    },
  },
  {
    id: '3',
    position: { x: 200, y: 50 },
    data: { label: '✅ End Node' },
    style: {
      background: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
      border: '1px solid hsl(var(--border))',
      width: 180,
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

export function FlowExample() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
