'use client';

import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
  getStepPath,
  EdgeProps,
} from '@xyflow/react';

interface CustomEdgeData {
  label?: string;
}

interface CustomEdgeProps extends EdgeProps<CustomEdgeData> {
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

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  labelShowBg,
  labelBgStyle,
  labelBgPadding,
  labelBgBorderRadius,
  markerEnd,
  markerStart,
  type = 'bezier',
  edgeLabelConfig = {
    useHtmlLabels: false,
    showBackground: true,
    backgroundColor: '#ffcc00',
    textColor: '#000000',
    fontSize: 12,
    padding: 10,
    borderRadius: 5,
    fontWeight: 'normal',
    interactive: false,
  },
}: CustomEdgeProps) {
  let path: string;
  let labelX: number;
  let labelY: number;

  // Get path based on edge type
  if (type === 'straight') {
    [path, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  } else if (type === 'step') {
    [path, labelX, labelY] = getStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  } else if (type === 'smoothstep') {
    [path, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  } else {
    // Default to bezier
    [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }

  const edgeLabel = label || data?.label;

  // If using HTML labels, render with EdgeLabelRenderer
  if (edgeLabelConfig.useHtmlLabels && edgeLabel) {
    return (
      <>
        <BaseEdge
          id={id}
          path={path}
          markerEnd={markerEnd}
          markerStart={markerStart}
        />
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: edgeLabelConfig.showBackground ? edgeLabelConfig.backgroundColor : 'transparent',
              color: edgeLabelConfig.textColor,
              padding: edgeLabelConfig.showBackground ? edgeLabelConfig.padding : 0,
              borderRadius: edgeLabelConfig.borderRadius,
              fontSize: edgeLabelConfig.fontSize,
              fontWeight: edgeLabelConfig.fontWeight === 'bold' ? 700 : 400,
              pointerEvents: edgeLabelConfig.interactive ? 'all' : 'none',
              cursor: edgeLabelConfig.interactive ? 'pointer' : 'default',
            }}
            className={edgeLabelConfig.interactive ? 'nodrag nopan' : ''}
            onClick={edgeLabelConfig.interactive ? () => alert(`Edge ${id} clicked!`) : undefined}
          >
            {edgeLabel}
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }

  // Otherwise use standard SVG label
  return (
    <BaseEdge
      id={id}
      path={path}
      label={edgeLabel}
      labelShowBg={labelShowBg}
      labelBgStyle={labelBgStyle}
      labelBgPadding={labelBgPadding}
      labelBgBorderRadius={labelBgBorderRadius}
      markerEnd={markerEnd}
      markerStart={markerStart}
    />
  );
}