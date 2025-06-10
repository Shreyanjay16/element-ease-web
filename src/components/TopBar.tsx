
import React, { useState } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateHTML, generateCSS, generateJS } from '@/lib/codeGeneration';
import { copyToClipboard, exportAsHTML, exportAsZip } from '@/lib/exportHelpers';
import { toast } from 'sonner';
import { 
  SaveIcon, PlusIcon, CodeIcon, DownloadIcon, CopyIcon,
  LayoutIcon, TabletIcon, SmartphoneIcon
} from 'lucide-react';

const TopBar = () => {
  const { 
    viewport, 
    setViewport, 
    saveProject, 
    createNewProject, 
    currentProject,
    components
  } = useDesigner();
  
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [activeCodeTab, setActiveCodeTab] = useState<string>('html');

  const handleCreateNewProject = () => {
    if (newProjectName.trim()) {
      createNewProject(newProjectName.trim());
      setIsNewProjectModalOpen(false);
      setNewProjectName('');
    }
  };

  const handleExportZip = async () => {
    if (!currentProject) {
      toast.error('No active project to export');
      return;
    }
    
    await exportAsZip(components, currentProject.name);
    toast.success('Project exported as ZIP');
  };

  const handleExportHTML = () => {
    if (!currentProject) {
      toast.error('No active project to export');
      return;
    }
    
    exportAsHTML(components, currentProject.name);
    toast.success('Project exported as HTML');
  };

  const handleCopyCode = (type: 'html' | 'css' | 'js') => {
    let code = '';
    
    switch (type) {
      case 'html':
        code = generateHTML(components);
        break;
      case 'css':
        code = generateCSS(components);
        break;
      case 'js':
        code = generateJS(components);
        break;
    }
    
    copyToClipboard(code);
    toast.success(`${type.toUpperCase()} code copied to clipboard`);
  };

  return (
    <header className="border-b border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold mr-6">WebCanvas</h1>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsNewProjectModalOpen(true)} 
              className="flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              New
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={saveProject} 
              disabled={!currentProject}
              className="flex items-center"
            >
              <SaveIcon className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tabs 
            value={viewport} 
            onValueChange={(value) => setViewport(value as 'desktop' | 'tablet' | 'mobile')}
            className="mr-4"
          >
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center">
                <LayoutIcon className="w-4 h-4 mr-1" /> Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center">
                <TabletIcon className="w-4 h-4 mr-1" /> Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center">
                <SmartphoneIcon className="w-4 h-4 mr-1" /> Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            onClick={() => setIsCodeModalOpen(true)}
            disabled={components.length === 0}
            className="flex items-center"
          >
            <CodeIcon className="w-4 h-4 mr-1" />
            Code
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                disabled={components.length === 0}
                className="flex items-center"
              >
                <DownloadIcon className="w-4 h-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportHTML}>
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportZip}>
                Export as ZIP
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Code Preview Modal */}
      <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
          </DialogHeader>
          <Tabs 
            value={activeCodeTab} 
            onValueChange={setActiveCodeTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            <div className="mt-4 relative">
              <pre className="p-4 rounded bg-muted overflow-auto max-h-96 text-sm">
                {activeCodeTab === 'html' && generateHTML(components)}
                {activeCodeTab === 'css' && generateCSS(components)}
                {activeCodeTab === 'js' && generateJS(components)}
              </pre>
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(activeCodeTab as 'html' | 'css' | 'js')}
              >
                <CopyIcon className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* New Project Modal */}
      <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input 
                id="project-name" 
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My Website"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreateNewProject}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default TopBar;
