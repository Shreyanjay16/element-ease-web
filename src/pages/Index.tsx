
import { DesignerProvider } from '@/contexts/DesignerContext';
import TopBar from '@/components/TopBar';
import ComponentLibrary from '@/components/ComponentLibrary';
import CanvasDropZone from '@/components/CanvasDropZone';
import PropertiesPanel from '@/components/PropertiesPanel';
import ProjectManager from '@/components/ProjectManager';

const Index = () => {
  return (
    <DesignerProvider>
      <div className="flex flex-col h-screen">
        <TopBar />
        
        <div className="flex items-center space-x-2 px-4 py-2 border-b border-border">
          <ProjectManager />
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 overflow-hidden">
            <ComponentLibrary />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <CanvasDropZone />
          </div>
          
          <div className="w-72 overflow-hidden">
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </DesignerProvider>
  );
};

export default Index;
