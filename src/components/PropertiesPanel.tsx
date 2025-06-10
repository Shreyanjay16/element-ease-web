import React from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { propertyGroups } from '@/lib/components';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PropertiesPanel = () => {
  const { selectedComponent, updateComponent } = useDesigner();

  if (!selectedComponent) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Select a component to view and edit its properties.
      </div>
    );
  }

  const handleChangeStyle = (styleName: string, value: string) => {
    updateComponent(selectedComponent.id, {
      styles: {
        ...selectedComponent.styles,
        [styleName]: value,
      },
    });
  };

  const handleChangeContent = (value: string) => {
    updateComponent(selectedComponent.id, { content: value });
  };

  const handleChangeAttribute = (attributeName: string, value: string) => {
    updateComponent(selectedComponent.id, {
      attributes: {
        ...selectedComponent.attributes,
        [attributeName]: value,
      },
    });
  };

  return (
    <div className="bg-designer-panel border-l border-designer-panel-border h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold text-designer-panel-foreground sticky top-0 bg-designer-panel z-10 pb-2 border-b border-designer-panel-border">
        Properties
      </h2>

      {/* Content editing for text-based components */}
      {['text', 'heading', 'button', 'link'].includes(selectedComponent.type) && (
        <div className="mb-4">
          <Label htmlFor="content" className="block text-sm font-medium text-designer-panel-foreground">
            Content
          </Label>
          <Input
            type="text"
            id="content"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-designer-blue focus:border-designer-blue"
            value={selectedComponent.content || ''}
            onChange={(e) => handleChangeContent(e.target.value)}
          />
        </div>
      )}

      {/* Attribute editing for image and link components */}
      {['image', 'link'].some(type => type === selectedComponent.type) && selectedComponent.attributes && (
        <div className="mb-4">
          <h3 className="text-md font-semibold text-designer-panel-foreground mb-2">Attributes</h3>
          {Object.entries(selectedComponent.attributes).map(([key, value]) => (
            <div key={key} className="mb-2">
              <Label htmlFor={`attribute-${key}`} className="block text-sm font-medium text-designer-panel-foreground capitalize">
                {key}
              </Label>
              <Input
                type="text"
                id={`attribute-${key}`}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-designer-blue focus:border-designer-blue"
                value={value || ''}
                onChange={(e) => handleChangeAttribute(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Style editing */}
      {propertyGroups.map((group) => (
        <div key={group.name} className="mb-6">
          <h3 className="text-md font-semibold text-designer-panel-foreground mb-2">{group.name}</h3>
          {group.properties.map((prop) => (
            <div key={prop.name} className="mb-2">
              <Label htmlFor={prop.name} className="block text-sm font-medium text-designer-panel-foreground capitalize">
                {prop.label}
              </Label>
              {prop.type === 'select' ? (
                <select
                  id={prop.name}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-designer-blue focus:border-designer-blue"
                  value={selectedComponent.styles?.[prop.name] || ''}
                  onChange={(e) => handleChangeStyle(prop.name, e.target.value)}
                >
                  {prop.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : prop.type === 'color' ? (
                <Input
                  type="color"
                  id={prop.name}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-designer-blue focus:border-designer-blue"
                  value={selectedComponent.styles?.[prop.name] || ''}
                  onChange={(e) => handleChangeStyle(prop.name, e.target.value)}
                />
              ) : (
                <Input
                  type="text"
                  id={prop.name}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-designer-blue focus:border-designer-blue"
                  value={selectedComponent.styles?.[prop.name] || ''}
                  onChange={(e) => handleChangeStyle(prop.name, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
