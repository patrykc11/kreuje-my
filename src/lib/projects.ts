import fs from 'fs';
import path from 'path';

export interface ProjectImage {
  filename: string;
  path: string;
}

export interface Project {
  name: string;
  folderName: string;
  images: ProjectImage[];
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'public', 'projekty');
  
  try {
    const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => {
        // Sort by number prefix if present, otherwise alphabetically
        const numA = parseInt(a.match(/^\d+\.?\s*/)?.[0] || '999');
        const numB = parseInt(b.match(/^\d+\.?\s*/)?.[0] || '999');
        if (numA !== 999 || numB !== 999) {
          return numA - numB;
        }
        return a.localeCompare(b);
      });

    const projects: Project[] = [];

    for (const folderName of folders) {
      const folderPath = path.join(projectsDir, folderName);
      const files = fs.readdirSync(folderPath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        })
        .sort()
        .map(filename => ({
          filename,
          path: `/projekty/${encodeURIComponent(folderName)}/${encodeURIComponent(filename)}`
        }));

      if (files.length > 0) {
        projects.push({
          name: folderName.replace(/^\d+\.?\s*/, ''), // Remove number prefix for display
          folderName,
          images: files
        });
      }
    }

    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

