'use client';

import React from 'react';
import { Handle, Position, NodeProps, NodeResizer, NodeToolbar } from '@xyflow/react';

interface CustomNodeData {
  label: string;
}

interface CustomNodeProps extends NodeProps<CustomNodeData> {
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
  onNodeAction?: (nodeId: string, action: string) => void;
}

export function CustomNode({ 
  data, 
  selected,
  id,
  handleConfig = {
    useCustomNodes: false,
    handleCount: 2,
    handlePosition: 'horizontal',
    handleStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#555',
      borderColor: '#fff',
      borderWidth: 1
    },
    isConnectable: true,
    connectionMode: 'loose',
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
  onNodeAction
}: CustomNodeProps) {
  const renderHandles = () => {
    const handles = [];
    const { handleCount, handlePosition, handleStyle, isConnectable } = handleConfig;
    
    const style = {
      width: handleStyle.width,
      height: handleStyle.height,
      borderRadius: handleStyle.borderRadius,
      backgroundColor: handleStyle.backgroundColor,
      border: `${handleStyle.borderWidth}px solid ${handleStyle.borderColor}`,
    };

    if (handlePosition === 'horizontal') {
      // Left handles (targets)
      for (let i = 0; i < Math.ceil(handleCount / 2); i++) {
        const id = `target-${i}`;
        const top = handleCount === 1 ? '50%' : `${((i + 1) * 100) / (Math.ceil(handleCount / 2) + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="target"
            position={Position.Left}
            style={{ ...style, top }}
            isConnectable={isConnectable}
            isConnectableStart={handleConfig.connectionMode === 'loose'}
            isConnectableEnd={isConnectable}
          />
        );
      }
      
      // Right handles (sources)
      for (let i = 0; i < Math.floor(handleCount / 2); i++) {
        const id = `source-${i}`;
        const top = handleCount === 1 ? '50%' : `${((i + 1) * 100) / (Math.floor(handleCount / 2) + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="source"
            position={Position.Right}
            style={{ ...style, top }}
            isConnectable={isConnectable}
            isConnectableStart={isConnectable}
            isConnectableEnd={handleConfig.connectionMode === 'loose'}
          />
        );
      }
    } else if (handlePosition === 'vertical') {
      // Top handles (targets)
      for (let i = 0; i < Math.ceil(handleCount / 2); i++) {
        const id = `target-${i}`;
        const left = handleCount === 1 ? '50%' : `${((i + 1) * 100) / (Math.ceil(handleCount / 2) + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="target"
            position={Position.Top}
            style={{ ...style, left }}
            isConnectable={isConnectable}
            isConnectableStart={handleConfig.connectionMode === 'loose'}
            isConnectableEnd={isConnectable}
          />
        );
      }
      
      // Bottom handles (sources)
      for (let i = 0; i < Math.floor(handleCount / 2); i++) {
        const id = `source-${i}`;
        const left = handleCount === 1 ? '50%' : `${((i + 1) * 100) / (Math.floor(handleCount / 2) + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="source"
            position={Position.Bottom}
            style={{ ...style, left }}
            isConnectable={isConnectable}
            isConnectableStart={isConnectable}
            isConnectableEnd={handleConfig.connectionMode === 'loose'}
          />
        );
      }
    } else {
      // All sides
      const perSide = Math.max(1, Math.floor(handleCount / 4));
      
      // Top
      for (let i = 0; i < perSide; i++) {
        const id = `top-${i}`;
        const left = perSide === 1 ? '50%' : `${((i + 1) * 100) / (perSide + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="target"
            position={Position.Top}
            style={{ ...style, left }}
            isConnectable={isConnectable}
          />
        );
      }
      
      // Right
      for (let i = 0; i < perSide; i++) {
        const id = `right-${i}`;
        const top = perSide === 1 ? '50%' : `${((i + 1) * 100) / (perSide + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="source"
            position={Position.Right}
            style={{ ...style, top }}
            isConnectable={isConnectable}
          />
        );
      }
      
      // Bottom
      for (let i = 0; i < perSide; i++) {
        const id = `bottom-${i}`;
        const left = perSide === 1 ? '50%' : `${((i + 1) * 100) / (perSide + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="source"
            position={Position.Bottom}
            style={{ ...style, left }}
            isConnectable={isConnectable}
          />
        );
      }
      
      // Left
      for (let i = 0; i < perSide; i++) {
        const id = `left-${i}`;
        const top = perSide === 1 ? '50%' : `${((i + 1) * 100) / (perSide + 1)}%`;
        handles.push(
          <Handle
            key={id}
            id={id}
            type="target"
            position={Position.Left}
            style={{ ...style, top }}
            isConnectable={isConnectable}
          />
        );
      }
    }
    
    return handles;
  };

  const renderResizeControls = () => {
    if (!nodeResizeConfig.enabled) return null;
    
    // Show resizer based on visibility setting
    const shouldShow = nodeResizeConfig.isVisible || selected;

    // NodeResizer handles all resize positions automatically
    return (
      <NodeResizer
        isVisible={shouldShow}
        color={nodeResizeConfig.color}
        minWidth={nodeResizeConfig.minWidth}
        minHeight={nodeResizeConfig.minHeight}
        maxWidth={nodeResizeConfig.maxWidth}
        maxHeight={nodeResizeConfig.maxHeight}
        keepAspectRatio={nodeResizeConfig.keepAspectRatio}
        autoScale={nodeResizeConfig.autoScale}
        handleStyle={{
          width: nodeResizeConfig.handleSize,
          height: nodeResizeConfig.handleSize,
          borderRadius: '50%',
        }}
        lineStyle={{
          borderWidth: nodeResizeConfig.lineSize,
        }}
      />
    );
  };

  const renderToolbar = () => {
    if (!nodeToolbarConfig.enabled) return null;
    
    const shouldShow = nodeToolbarConfig.isVisible || selected;

    return (
      <NodeToolbar
        isVisible={shouldShow}
        position={nodeToolbarConfig.position as any}
        align={nodeToolbarConfig.align as any}
        offset={nodeToolbarConfig.offset}
        style={{
          backgroundColor: nodeToolbarConfig.style.backgroundColor,
          border: `1px solid ${nodeToolbarConfig.style.borderColor}`,
          borderRadius: nodeToolbarConfig.style.borderRadius,
          padding: nodeToolbarConfig.style.padding,
          display: 'flex',
          gap: '4px',
        }}
      >
        {nodeToolbarConfig.buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => {
              if (onNodeAction) {
                onNodeAction(id, button.action);
              } else {
                // Default actions
                if (button.action === 'delete') {
                  alert(`Delete node ${id}`);
                } else if (button.action === 'duplicate') {
                  alert(`Duplicate node ${id}`);
                } else if (button.action === 'edit') {
                  alert(`Edit node ${id}`);
                } else {
                  alert(`${button.label} clicked for node ${id}`);
                }
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            title={button.label}
          >
            <span>{button.icon}</span>
            <span>{button.label}</span>
          </button>
        ))}
      </NodeToolbar>
    );
  };

  return (
    <>
      {renderResizeControls()}
      {renderToolbar()}
      <div 
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          background: selected ? '#e0f2fe' : '#fff',
          border: selected ? '2px solid #0284c7' : '2px solid #e2e8f0',
          color: '#1e293b',
          minWidth: '150px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 500,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {data.label}
      </div>
      {handleConfig.useCustomNodes && renderHandles()}
    </>
  );
}