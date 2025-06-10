
import React, { useState, useEffect } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { Project } from '@/types/designer';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { FolderOpenIcon, TrashIcon } from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentProject, setComponents } = useDesigner();

  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(storedProjects);
  }, [isOpen]);

  const handleLoadProject = (project: Project) => {
    setCurrentProject(project);
    setComponents(project.components);
    setIsOpen(false);
    toast.success(`Loaded project: ${project.name}`);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      toast.success('Project deleted');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <FolderOpenIcon className="w-4 h-4 mr-1" />
            Open Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Open Project</DialogTitle>
          </DialogHeader>
          
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No saved projects found
            </p>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleLoadProject(project)} 
                  className="p-4 border border-border rounded-md mb-2 hover:bg-designer-panel cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Last modified: {formatDate(project.updatedAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.components.length} component(s)
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
