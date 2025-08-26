'use client';

import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeText,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
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
    [path, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 0,
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

  const edgeLabel = label || (data as CustomEdgeData)?.label;

  // Calculate position based on edgeTextConfig.position
  let positionX = labelX;
  let positionY = labelY;
  
  if (edgeTextConfig.enabled && edgeTextConfig.position !== 'center') {
    const ratio = edgeTextConfig.position === 'start' ? 0.25 : 0.75;
    positionX = sourceX + (targetX - sourceX) * ratio;
    positionY = sourceY + (targetY - sourceY) * ratio;
  }

  // If using EdgeText (SVG-based)
  if (edgeTextConfig.enabled && edgeLabel) {
    return (
      <>
        <BaseEdge
          id={id}
          path={path}
          markerEnd={markerEnd}
          markerStart={markerStart}
        />
        <EdgeText
          x={positionX}
          y={positionY}
          label={edgeLabel as string}
          labelStyle={edgeTextConfig.labelStyle}
          labelShowBg={edgeTextConfig.labelShowBg}
          labelBgStyle={edgeTextConfig.labelBgStyle}
          labelBgPadding={edgeTextConfig.labelBgPadding}
          labelBgBorderRadius={edgeTextConfig.labelBgBorderRadius}
        />
      </>
    );
  }

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
            {edgeLabel as string}
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
      label={edgeLabel as string | undefined}
      labelShowBg={labelShowBg}
      labelBgStyle={labelBgStyle}
      labelBgPadding={labelBgPadding}
      labelBgBorderRadius={labelBgBorderRadius}
      markerEnd={markerEnd}
      markerStart={markerStart}
    />
  );
}