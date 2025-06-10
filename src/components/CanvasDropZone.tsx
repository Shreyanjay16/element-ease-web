
import React, { useRef, useCallback } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import RenderComponent from '@/components/RenderComponent';
import { getComponentDefinition } from '@/lib/components';

const CanvasDropZone = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { components, addComponent, isDragging, draggedComponentType } = useDesigner();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const componentType = e.dataTransfer.getData('componentType');
    console.log('Dropped component type:', componentType);
    
    if (componentType) {
      const componentDef = getComponentDefinition(componentType);
      if (componentDef) {
        console.log('Adding component:', componentDef);
        addComponent(componentDef);
      } else {
        console.error('Component definition not found for type:', componentType);
      }
    }
  }, [addComponent]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      ref={canvasRef}
      className="flex-1 h-full p-4 bg-designer-canvas grid-pattern overflow-auto relative transition-all duration-300 hover:bg-gradient-to-br hover:from-designer-canvas hover:to-violet-50/20"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {components.map((component) => (
        <RenderComponent key={component.id} component={component} isSelected={false} />
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
