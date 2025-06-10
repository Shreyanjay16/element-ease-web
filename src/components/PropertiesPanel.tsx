
import React from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { propertyGroups } from '@/lib/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PropertiesPanel = () => {
  const { selectedComponent, updateComponent, removeComponent } = useDesigner();

  if (!selectedComponent) {
    return (
      <div className="bg-designer-panel border-l border-designer-panel-border h-full p-4">
        <h2 className="text-lg font-semibold text-designer-panel-foreground">Properties</h2>
        <p className="text-sm text-muted-foreground mt-4">Select a component to edit its properties</p>
      </div>
    );
  }

  const handleStyleChange = (property: string, value: string) => {
    const updatedStyles = { ...selectedComponent.styles, [property]: value };
    updateComponent(selectedComponent.id, { styles: updatedStyles });
  };

  const handleContentChange = (value: string) => {
    updateComponent(selectedComponent.id, { content: value });
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    const updatedAttributes = { ...(selectedComponent.attributes || {}), [attribute]: value };
    updateComponent(selectedComponent.id, { attributes: updatedAttributes });
  };

  const handleDeleteComponent = () => {
    removeComponent(selectedComponent.id);
  };

  return (
    <div className="bg-designer-panel border-l border-designer-panel-border h-full overflow-y-auto">
      <div className="p-4 sticky top-0 bg-designer-panel z-10 border-b border-designer-panel-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-designer-panel-foreground">{selectedComponent.name} Properties</h2>
        <Button variant="ghost" size="icon" onClick={handleDeleteComponent} className="text-destructive">
          <Trash2Icon className="w-5 h-5" />
        </Button>
      </div>

      <Tabs defaultValue="styles" className="px-4 py-3">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="styles" className="space-y-4">
          <Accordion type="multiple">
            {propertyGroups.map((group) => (
              <AccordionItem key={group.name} value={group.name}>
                <AccordionTrigger className="text-sm font-medium">{group.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {group.properties.map((property) => {
                      const currentValue = selectedComponent.styles[property.name] || '';

                      switch (property.type) {
                        case 'select':
                          return (
                            <div key={property.name} className="grid gap-2">
                              <Label htmlFor={property.name} className="text-xs">{property.label}</Label>
                              <Select
                                value={currentValue}
                                onValueChange={(value) => handleStyleChange(property.name, value)}
                              >
                                <SelectTrigger id={property.name} className="h-8">
                                  <SelectValue placeholder={`Select ${property.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {property.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          );

                        case 'color':
                          return (
                            <div key={property.name} className="grid gap-2">
                              <Label htmlFor={property.name} className="text-xs">{property.label}</Label>
                              <div className="flex gap-2">
                                <Input
                                  id={property.name}
                                  type="text"
                                  value={currentValue}
                                  onChange={(e) => handleStyleChange(property.name, e.target.value)}
                                  className="h-8"
                                />
                                <Input
                                  type="color"
                                  value={currentValue || '#000000'}
                                  onChange={(e) => handleStyleChange(property.name, e.target.value)}
                                  className="w-10 h-8 p-1"
                                />
                              </div>
                            </div>
                          );

                        default:
                          return (
                            <div key={property.name} className="grid gap-2">
                              <Label htmlFor={property.name} className="text-xs">{property.label}</Label>
                              <Input
                                id={property.name}
                                type="text"
                                value={currentValue}
                                onChange={(e) => handleStyleChange(property.name, e.target.value)}
                                className="h-8"
                              />
                            </div>
                          );
                      }
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          {['text', 'heading', 'button', 'link'].includes(selectedComponent.type) && (
            <div className="grid gap-2">
              <Label htmlFor="component-content" className="text-sm">Content</Label>
              <Input
                id="component-content"
                value={selectedComponent.content || ''}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </div>
          )}
          
          {!['text', 'heading', 'button', 'link'].includes(selectedComponent.type) && (
            <p className="text-sm text-muted-foreground">This component type does not have editable content.</p>
          )}
        </TabsContent>
        
        <TabsContent value="attributes" className="space-y-4">
          {selectedComponent.type === 'image' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="src" className="text-sm">Image Source (URL)</Label>
                <Input
                  id="src"
                  value={selectedComponent.attributes?.src || ''}
                  onChange={(e) => handleAttributeChange('src', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alt" className="text-sm">Alt Text</Label>
                <Input
                  id="alt"
                  value={selectedComponent.attributes?.alt || ''}
                  onChange={(e) => handleAttributeChange('alt', e.target.value)}
                />
              </div>
            </>
          )}
          
          {selectedComponent.type === 'link' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="href" className="text-sm">Link URL</Label>
                <Input
                  id="href"
                  value={selectedComponent.attributes?.href || ''}
                  onChange={(e) => handleAttributeChange('href', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target" className="text-sm">Target</Label>
                <Select
                  value={selectedComponent.attributes?.target || '_blank'}
                  onValueChange={(value) => handleAttributeChange('target', value)}
                >
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_blank">New Window (_blank)</SelectItem>
                    <SelectItem value="_self">Same Window (_self)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {!['image', 'link'].includes(selectedComponent.type) && (
            <p className="text-sm text-muted-foreground">This component type does not have editable attributes.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
