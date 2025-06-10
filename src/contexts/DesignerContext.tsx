import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Viewport, ComponentBase, ComponentDefinition, Project } from '@/types/designer';
import { defaultComponents } from '@/lib/components';
import { toast } from 'sonner';

interface DesignerContextType {
  selectedComponent: ComponentBase | null;
  setSelectedComponent: (component: ComponentBase | null) => void;
  components: ComponentBase[];
  addComponent: (component: ComponentDefinition) => void;
  updateComponent: (id: string, updates: Partial<ComponentBase>) => void;
  removeComponent: (id: string) => void;
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  saveProject: () => void;
  createNewProject: (name: string) => void;
  loadProject: (project: Project) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  draggedComponentType: string | null;
  setDraggedComponentType: (type: string | null) => void;
}

const DesignerContext = createContext<DesignerContextType | undefined>(undefined);

export const useDesigner = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesigner must be used within a DesignerProvider');
  }
  return context;
};

interface DesignerProviderProps {
  children: ReactNode;
}

export const DesignerProvider = ({ children }: DesignerProviderProps) => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentBase | null>(null);
  const [components, setComponents] = useState<ComponentBase[]>([]);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponentType, setDraggedComponentType] = useState<string | null>(null);

  const addComponent = (componentDef: ComponentDefinition) => {
    const newComponent: ComponentBase = {
      id: uuidv4(),
      type: componentDef.type,
      name: componentDef.name,
      styles: { ...componentDef.defaultStyles },
      content: componentDef.defaultContent,
      children: componentDef.defaultChildren?.map(child => ({
        ...child,
        id: uuidv4()
      })),
      attributes: componentDef.defaultAttributes,
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent);
    toast.success(`Added ${componentDef.name} component`);
  };

  const updateComponent = (id: string, updates: Partial<ComponentBase>) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id ? { ...component, ...updates } : component
      )
    );

    if (selectedComponent?.id === id) {
      setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const removeComponent = (id: string) => {
    const componentToRemove = components.find(c => c.id === id);
    if (componentToRemove) {
      setComponents(prev => prev.filter(component => component.id !== id));
      if (selectedComponent?.id === id) {
        setSelectedComponent(null);
      }
      toast.success(`Removed ${componentToRemove.name} component`);
    }
  };

  const saveProject = () => {
    if (!currentProject) return;

    const updatedProject: Project = {
      ...currentProject,
      components,
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage for this demo
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = projects.map((p: Project) => 
      p.id === updatedProject.id ? updatedProject : p
    );
    
    if (!projects.find((p: Project) => p.id === updatedProject.id)) {
      updatedProjects.push(updatedProject);
    }
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setCurrentProject(updatedProject);
    toast.success('Project saved successfully');
  };

  const createNewProject = (name: string) => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
    
    setCurrentProject(newProject);
    setComponents([]);
    setSelectedComponent(null);
    toast.success(`Created new project: ${name}`);
  };

  const loadProject = (project: Project) => {
    setCurrentProject(project);
    setComponents(project.components);
    setSelectedComponent(null);
  };

  const value = {
    selectedComponent,
    setSelectedComponent,
    components,
    addComponent,
    updateComponent,
    removeComponent,
    viewport,
    setViewport,
    currentProject,
    setCurrentProject,
    saveProject,
    createNewProject,
    loadProject,
    isDragging,
    setIsDragging,
    draggedComponentType,
    setDraggedComponentType,
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerProvider;
