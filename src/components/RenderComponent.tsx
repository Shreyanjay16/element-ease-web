
import React from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { ComponentBase } from '@/types/designer';

interface RenderComponentProps {
  component: ComponentBase;
  isSelected: boolean;
}

const RenderComponent = ({ component, isSelected }: RenderComponentProps) => {
  const { setSelectedComponent, removeComponent } = useDesigner();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(component);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeComponent(component.id);
    }
  };

  // Render based on component type
  const renderContent = () => {
    const customStyles = component.styles || {};
    const attributes = component.attributes || {};

    switch (component.type) {
      case 'container':
        return (
          <div style={customStyles} {...attributes}>
            {component.children?.map(child => (
              <RenderComponent 
                key={child.id} 
                component={child} 
                isSelected={false} 
              />
            ))}
          </div>
        );
      
      case 'text':
        return <p style={customStyles} {...attributes}>{component.content}</p>;
      
      case 'heading':
        return <h2 style={customStyles} {...attributes}>{component.content}</h2>;
      
      case 'button':
        return <button style={customStyles} {...attributes}>{component.content}</button>;
      
      case 'image':
        return <img src={attributes.src} alt={attributes.alt} style={customStyles} />;
      
      case 'link':
        return <a href={attributes.href} target={attributes.target} style={customStyles}>{component.content}</a>;
      
      case 'divider':
        return <hr style={customStyles} {...attributes} />;
      
      case 'grid':
        return (
          <div style={customStyles} {...attributes}>
            {component.children?.map(child => (
              <RenderComponent 
                key={child.id} 
                component={child} 
                isSelected={false} 
              />
            ))}
          </div>
        );
      
      case 'row':
        return (
          <div style={customStyles} {...attributes}>
            {component.children?.map(child => (
              <RenderComponent 
                key={child.id} 
                component={child} 
                isSelected={false} 
              />
            ))}
          </div>
        );
      
      default:
        return <div style={customStyles} {...attributes}>Unknown component</div>;
    }
  };

  return (
    <div
      className={`relative ${isSelected ? 'outline outline-2 outline-designer-component-border' : 'hover:outline hover:outline-1 hover:outline-designer-component-border'}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {renderContent()}
      {isSelected && (
        <div className="absolute -top-6 right-0 bg-designer-blue text-xs text-white px-2 py-1 rounded-t-md">
          {component.name}
        </div>
      )}
    </div>
  );
};

export default RenderComponent;
