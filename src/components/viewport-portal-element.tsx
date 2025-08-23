'use client';

import { useState, useRef, useEffect } from 'react';
import { ViewportPortal } from '@xyflow/react';

interface ViewportPortalElementProps {
  element: {
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
  };
  onPositionChange: (id: string, x: number, y: number) => void;
  onSizeChange?: (id: string, width: number, height: number) => void;
  isEditable?: boolean;
}

export function ViewportPortalElement({ 
  element, 
  onPositionChange,
  onSizeChange,
  isEditable = false 
}: ViewportPortalElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: element.x, y: element.y });
  const [size, setSize] = useState({ 
    width: element.width || (element.type === 'shape' ? 50 : 150), 
    height: element.height || (element.type === 'shape' ? 50 : 40) 
  });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition({ x: element.x, y: element.y });
  }, [element.x, element.y]);

  useEffect(() => {
    if (element.width && element.height) {
      setSize({ width: element.width, height: element.height });
    }
  }, [element.width, element.height]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditable || isResizing) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    if (!isEditable) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    // Prevent text selection during drag
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragStart.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      const finalX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragStart.x));
      const finalY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragStart.y));
      setPosition({ x: finalX, y: finalY });
      setIsDragging(false);
      // Restore text selection
      document.body.style.userSelect = prevUserSelect;
      // Call the position change handler with the final position
      onPositionChange(element.id, finalX, finalY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = prevUserSelect;
    };
  }, [isDragging, dragStart, element.id, onPositionChange]);

  // Handle resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;

      if (resizeHandle.includes('right')) {
        newWidth = Math.max(50, size.width + deltaX);
      }
      if (resizeHandle.includes('left')) {
        newWidth = Math.max(50, size.width - deltaX);
        newX = position.x + deltaX;
      }
      if (resizeHandle.includes('bottom')) {
        newHeight = Math.max(30, size.height + deltaY);
      }
      if (resizeHandle.includes('top')) {
        newHeight = Math.max(30, size.height - deltaY);
        newY = position.y + deltaY;
      }

      setSize({ width: newWidth, height: newHeight });
      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
      
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle('');
      if (onSizeChange) {
        onSizeChange(element.id, size.width, size.height);
      }
      if (position.x !== element.x || position.y !== element.y) {
        onPositionChange(element.id, position.x, position.y);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeHandle, dragStart, size, position, element.id, element.x, element.y, onSizeChange, onPositionChange]);

  return (
    <ViewportPortal>
      <div
        ref={elementRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          backgroundColor: element.style.backgroundColor,
          color: element.style.color,
          padding: element.style.padding,
          fontSize: element.style.fontSize,
          opacity: element.style.opacity,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: `2px solid ${isEditable ? '#3b82f6' : 'rgba(0,0,0,0.1)'}`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: element.type === 'shape' ? 'bold' : 'normal',
          cursor: isEditable && !isResizing ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
          pointerEvents: isEditable ? 'auto' : 'none',
          transition: isDragging || isResizing ? 'none' : 'border-color 0.2s',
          zIndex: isDragging || isResizing ? 1000 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: element.type === 'shape' ? '50%' : element.style.borderRadius,
          boxSizing: 'border-box'
        }}
      >
        {/* Status indicator */}
        {isEditable && (
          <div
            style={{
              position: 'absolute',
              top: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: isDragging || isResizing ? 1 : 0.7
            }}
          >
            {isDragging 
              ? `${Math.round(position.x)}, ${Math.round(position.y)}` 
              : isResizing 
              ? `${Math.round(size.width)} × ${Math.round(size.height)}`
              : '✋ Drag • ↔️ Resize'}
          </div>
        )}
        
        {/* Content */}
        <div style={{ pointerEvents: 'none' }}>{element.content}</div>
        
        {/* Resize handles */}
        {isEditable && (
          <>
            {/* Corner handles */}
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
              style={{
                position: 'absolute',
                top: -4,
                left: -4,
                width: 8,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'nw-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 8,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'ne-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
              style={{
                position: 'absolute',
                bottom: -4,
                left: -4,
                width: 8,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'sw-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
              style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                width: 8,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'se-resize'
              }}
            />
            
            {/* Edge handles */}
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
              style={{
                position: 'absolute',
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 20,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'n-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
              style={{
                position: 'absolute',
                bottom: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 20,
                height: 8,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 's-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
              style={{
                position: 'absolute',
                left: -4,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 8,
                height: 20,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'w-resize'
              }}
            />
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
              style={{
                position: 'absolute',
                right: -4,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 8,
                height: 20,
                backgroundColor: '#3b82f6',
                border: '1px solid white',
                borderRadius: '2px',
                cursor: 'e-resize'
              }}
            />
          </>
        )}
      </div>
    </ViewportPortal>
  );
}