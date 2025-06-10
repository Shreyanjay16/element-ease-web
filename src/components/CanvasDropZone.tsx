
import React, { useRef } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { getComponentDefinition } from '@/lib/components';
import RenderComponent from './RenderComponent';

const CanvasDropZone = () => {
  const { 
    components, 
    isDragging, 
    draggedComponentType,
    setIsDragging,
    setDraggedComponentType,
    addComponent,
    selectedComponent,
    setSelectedComponent,
    viewport
  } = useDesigner();

  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const componentType = e.dataTransfer.getData('componentType');
    if (!componentType) return;
    
    const componentDef = getComponentDefinition(componentType);
    if (componentDef) {
      addComponent(componentDef);
    }
    
    setDraggedComponentType(null);
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only deselect if click is directly on the canvas, not on a component
    if (e.target === e.currentTarget || e.target === canvasRef.current) {
      setSelectedComponent(null);
    }
  };

  // Calculate viewport width based on current viewport setting
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="flex flex-1 justify-center overflow-x-auto overflow-y-auto bg-muted p-4">
      <div
        ref={canvasRef}
        style={{ width: getViewportWidth() }}
        className={`min-h-[800px] bg-designer-canvas grid-pattern shadow-md transition-all duration-300 ${
          isDragging ? 'border-2 border-dashed border-designer-blue bg-designer-component-hover' : 'border border-border'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBackgroundClick}
      >
        {components.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-lg">Drag components here</p>
            <p className="text-sm">or double-click a component in the library</p>
          </div>
        )}
        
        {components.map((component) => (
          <RenderComponent 
            key={component.id} 
            component={component}
            isSelected={selectedComponent?.id === component.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasDropZone;
