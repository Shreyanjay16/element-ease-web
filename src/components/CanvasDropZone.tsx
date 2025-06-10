import React, { useRef } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { ComponentRenderer } from '@/components/ComponentRenderer';

const CanvasDropZone = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { components, addComponent, isDragging, draggedComponentType } = useDesigner();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      // Here you might want to adjust the addComponent function
      // to accept x and y coordinates for positioning
      addComponent({ type: componentType, x, y });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={canvasRef}
      className="flex-1 h-full p-4 bg-designer-canvas grid-pattern overflow-auto relative transition-opacity duration-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        opacity: isDragging ? 0.5 : 1,
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      {components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
      {isDragging && draggedComponentType && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500 text-xl bg-designer-canvas/50 backdrop-blur-sm">
          Drop {draggedComponentType} here
        </div>
      )}
    </div>
  );
};

export default CanvasDropZone;

