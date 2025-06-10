
import React, { useRef } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { RenderComponent } from '@/components/RenderComponent';

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
      className="flex-1 h-full p-4 bg-designer-canvas grid-pattern overflow-auto relative transition-all duration-300 hover:bg-gradient-to-br hover:from-designer-canvas hover:to-violet-50/20"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        opacity: isDragging ? 0.7 : 1,
        pointerEvents: isDragging ? 'none' : 'auto',
        transform: isDragging ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {components.map((component) => (
        <RenderComponent key={component.id} component={component} />
      ))}
      {isDragging && draggedComponentType && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-violet-600 text-2xl font-bold bg-gradient-to-br from-violet-100/80 to-teal-100/80 backdrop-blur-sm border-2 border-dashed border-violet-400 rounded-lg animate-pulse">
          ✨ Drop {draggedComponentType} here to create magic! ✨
        </div>
      )}
    </div>
  );
};

export default CanvasDropZone;
