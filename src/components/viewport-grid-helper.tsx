'use client';

import { useEffect, useState } from 'react';
import { ViewportPortal } from '@xyflow/react';

interface ViewportGridHelperProps {
  gridSize: number;
}

export function ViewportGridHelper({ 
  gridSize = 50
}: ViewportGridHelperProps) {
  const [viewportSize, setViewportSize] = useState({ 
    width: 800, 
    height: 600 
  });

  useEffect(() => {
    // Get the actual React Flow container size
    const getContainerSize = () => {
      const reactFlowElement = document.querySelector('.react-flow');
      if (reactFlowElement) {
        const rect = reactFlowElement.getBoundingClientRect();
        setViewportSize({ 
          width: rect.width, 
          height: rect.height 
        });
      }
    };
    
    getContainerSize();
    window.addEventListener('resize', getContainerSize);
    
    // Initial delay to ensure React Flow is mounted
    const timer = setTimeout(getContainerSize, 100);
    
    return () => {
      window.removeEventListener('resize', getContainerSize);
      clearTimeout(timer);
    };
  }, []);

  const horizontalLines = Math.ceil(viewportSize.height / gridSize);
  const verticalLines = Math.ceil(viewportSize.width / gridSize);

  return (
    <ViewportPortal>
      {/* Background overlay to show viewport bounds */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: viewportSize.width,
          height: viewportSize.height,
          pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100px)',
          zIndex: 0
        }}
      />
      
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: viewportSize.width,
          height: viewportSize.height,
          pointerEvents: 'none',
          opacity: 0.3,
          zIndex: 0
        }}
      >
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Coordinate labels */}
        {Array.from({ length: Math.min(20, verticalLines) }, (_, i) => (
          <text
            key={`x-${i}`}
            x={i * gridSize}
            y={15}
            fill="#3b82f6"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
            opacity="0.7"
          >
            {i * gridSize}
          </text>
        ))}
        
        {Array.from({ length: Math.min(20, horizontalLines) }, (_, i) => (
          <text
            key={`y-${i}`}
            x={5}
            y={i * gridSize + 3}
            fill="#3b82f6"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="start"
            opacity="0.7"
          >
            {i * gridSize}
          </text>
        ))}
        
        {/* Origin marker and label */}
        <g>
          {/* Large corner bracket to show origin */}
          <path
            d={`M 0,30 L 0,0 L 30,0`}
            stroke="#ef4444"
            strokeWidth="4"
            fill="none"
            opacity="0.8"
          />
          <path
            d={`M 0,60 L 0,0 L 60,0`}
            stroke="#ef4444"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          
          {/* Origin dot */}
          <circle
            cx={0}
            cy={0}
            r={8}
            fill="#ef4444"
            stroke="white"
            strokeWidth="3"
          />
          
          {/* Origin label with background */}
          <rect
            x={35}
            y={5}
            width={120}
            height={35}
            fill="rgba(255, 255, 255, 0.95)"
            stroke="#ef4444"
            strokeWidth="2"
            rx="4"
          />
          <text
            x={45}
            y={25}
            fill="#ef4444"
            fontSize="16"
            fontWeight="bold"
            fontFamily="monospace"
          >
            Origin (0,0)
          </text>
        </g>
        
        {/* Viewport boundary indicator */}
        <rect
          x={0}
          y={0}
          width={viewportSize.width - 1}
          height={viewportSize.height - 1}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="10,5"
          opacity="0.2"
        />
        
        {/* Label explaining viewport coordinates */}
        <g transform={`translate(${viewportSize.width - 240}, 10)`}>
          <rect
            x={0}
            y={0}
            width={230}
            height={65}
            fill="rgba(255, 255, 255, 0.95)"
            stroke="#3b82f6"
            strokeWidth="1"
            rx="4"
          />
          <text
            x={10}
            y={18}
            fill="#1e40af"
            fontSize="11"
            fontWeight="bold"
            fontFamily="system-ui"
          >
            📍 ViewportPortal Coordinate System
          </text>
          <text
            x={10}
            y={34}
            fill="#64748b"
            fontSize="10"
            fontFamily="system-ui"
          >
            • (0,0) = Top-left of React Flow canvas
          </text>
          <text
            x={10}
            y={48}
            fill="#64748b"
            fontSize="10"
            fontFamily="system-ui"
          >
            • Elements stay fixed when panning
          </text>
        </g>
      </svg>
    </ViewportPortal>
  );
}