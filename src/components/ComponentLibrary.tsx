import React from 'react';
import { defaultComponents } from '@/lib/components';
import { useDesigner } from '@/contexts/DesignerContext';
import { 
  LayoutIcon, TypeIcon, HeadingIcon, SquareIcon, ImageIcon, 
  LinkIcon, MinusIcon, LayoutGridIcon, AlignCenterIcon 
} from 'lucide-react';

const ComponentLibrary = () => {
  const { setIsDragging, setDraggedComponentType, addComponent } = useDesigner();
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'layout': return <LayoutIcon className="w-5 h-5" />;
      case 'type': return <TypeIcon className="w-5 h-5" />;
      case 'heading': return <HeadingIcon className="w-5 h-5" />;
      case 'square': return <SquareIcon className="w-5 h-5" />;
      case 'image': return <ImageIcon className="w-5 h-5" />;
      case 'link': return <LinkIcon className="w-5 h-5" />;
      case 'minus': return <MinusIcon className="w-5 h-5" />;
      case 'layout-grid': return <LayoutGridIcon className="w-5 h-5" />;
      case 'layout-align-middle': return <AlignCenterIcon className="w-5 h-5" />;
      default: return <SquareIcon className="w-5 h-5" />;
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    setIsDragging(true);
    setDraggedComponentType(componentType);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedComponentType(null);
  };

  // Handle double click to add component
  const handleDoubleClick = (componentType: string) => {
    const componentDef = defaultComponents.find(c => c.type === componentType);
    if (componentDef) {
      addComponent(componentDef);
    }
  };

  return (
    <div className="bg-designer-panel border-r border-designer-panel-border h-full overflow-y-auto pb-4">
      <div className="p-4 sticky top-0 bg-designer-panel z-10 border-b border-designer-panel-border">
        <h2 className="text-lg font-semibold text-designer-panel-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">Drag to add to canvas or double-click</p>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-2">
        {defaultComponents.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => handleDragStart(e, component.type)}
            onDragEnd={handleDragEnd}
            onDoubleClick={() => handleDoubleClick(component.type)}
            className="flex flex-col items-center justify-center p-3 border border-border rounded-lg bg-background hover:border-designer-blue hover:bg-secondary cursor-grab transition-all duration-200"
          >
            <div className="mb-1 text-designer-blue">
              {getIconComponent(component.icon)}
            </div>
            <span className="text-xs font-medium text-center">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;
