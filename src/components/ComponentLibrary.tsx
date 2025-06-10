
import React from 'react';
import { defaultComponents } from '@/lib/components';
import { useDesigner } from '@/contexts/DesignerContext';
import { 
  LayoutIcon, TypeIcon, HeadingIcon, SquareIcon, ImageIcon, 
  LinkIcon, MinusIcon, LayoutGridIcon, AlignCenterIcon, 
  Sparkle, Star, PartyPopper, Smile
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
      <div className="p-4 sticky top-0 bg-designer-panel z-10 border-b border-designer-panel-border animated-gradient rounded-br-lg">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkle className="w-5 h-5 text-white float" /> Components
        </h2>
        <p className="text-sm text-white/90">Drag to add to canvas or double-click</p>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-3">
        {defaultComponents.map((component, index) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => handleDragStart(e, component.type)}
            onDragEnd={handleDragEnd}
            onDoubleClick={() => handleDoubleClick(component.type)}
            className={`flex flex-col items-center justify-center p-3 border border-designer-panel-border rounded-lg bg-background hover:border-designer-blue hover:bg-secondary/20 cursor-grab transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 ${index % 3 === 0 ? 'hover:rotate-1' : index % 3 === 1 ? 'hover:rotate-0' : 'hover:rotate-[-1deg]'}`}
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: 'backwards'
            }}
          >
            <div className="mb-2 text-designer-blue p-2 bg-designer-panel/50 rounded-full">
              {getIconComponent(component.icon)}
            </div>
            <span className="text-xs font-medium text-center">{component.name}</span>
          </div>
        ))}
      </div>
      
      <div className="px-4 mt-4">
        <div className="p-3 rounded-lg border border-designer-panel-border bg-background/50">
          <div className="flex items-center text-designer-blue-foreground text-sm gap-2 justify-center">
            <PartyPopper className="w-4 h-4 text-accent" />
            <span>Design with joy!</span>
            <Smile className="w-4 h-4 text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;
