
// Component type definitions
export interface ComponentBase {
  id: string;
  type: string;
  name: string;
  styles: Record<string, string>;
  content?: string;
  children?: ComponentBase[];
  attributes?: Record<string, string>;
}

export interface ComponentDefinition {
  type: string;
  name: string;
  icon: string;
  defaultStyles: Record<string, string>;
  defaultContent?: string;
  defaultChildren?: Omit<ComponentBase, 'id'>[];
  defaultAttributes?: Record<string, string>;
}

// Project type
export interface Project {
  id: string;
  name: string;
  components: ComponentBase[];
  createdAt: string;
  updatedAt: string;
}

// Viewport sizes
export type Viewport = 'desktop' | 'tablet' | 'mobile';

// Property types
export interface PropertyGroup {
  name: string;
  properties: Property[];
}

export type PropertyType = 'text' | 'color' | 'number' | 'select' | 'boolean';

export interface Property {
  name: string;
  label: string;
  type: PropertyType;
  options?: string[];
  defaultValue?: string | number | boolean;
}
