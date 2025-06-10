import React, { useState } from 'react';
import { useDesigner } from '@/contexts/DesignerContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';

const ProjectManager = () => {
  const { currentProject, createNewProject, saveProject, loadProject } = useDesigner();
  const [projectName, setProjectName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateProject = () => {
    if (projectName.trim() !== '') {
      createNewProject(projectName);
      setProjectName('');
      setIsDialogOpen(false);
    } else {
      toast.error('Project name cannot be empty.');
    }
  };

  const handleSaveProject = () => {
    saveProject();
  };

  const handleLoadProject = () => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (projects.length > 0) {
      // For simplicity, load the first project
      loadProject(projects[0]);
      toast.success(`Loaded project: ${projects[0].name}`);
    } else {
      toast.error('No projects found to load.');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            Create New Project
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Project</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a name for your new project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateProject}>Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={handleSaveProject} disabled={!currentProject}>
        Save Project
      </Button>

      <Button onClick={handleLoadProject}>
        Load Project
      </Button>
    </div>
  );
};

export default ProjectManager;
