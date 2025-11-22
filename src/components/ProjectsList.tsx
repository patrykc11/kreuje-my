'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import ProjectSection from './ProjectSection';
import { Project } from '@/lib/projects';

const PROJECTS_PER_PAGE = 5;

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadProjects = useCallback(async (pageNum: number) => {
    try {
      const response = await fetch(`/api/projects?page=${pageNum}&limit=${PROJECTS_PER_PAGE}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      
      if (pageNum === 1) {
        setProjects(data.projects);
      } else {
        setProjects(prev => [...prev, ...data.projects]);
      }
      
      setHasMore(data.hasMore);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects(1);
  }, [loadProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      loadProjects(page);
    }
  }, [page, loadProjects]);

  if (projects.length === 0 && loading) {
    return (
      <div className="text-center text-white py-12">
        <p>Ładowanie projektów...</p>
      </div>
    );
  }

  return (
    <>
      {projects.map((project, index) => (
        <ProjectSection key={project.folderName || index} project={project} />
      ))}
      
      {hasMore && (
        <div ref={observerTarget} className="text-center text-white py-8">
          {loading && <p>Ładowanie kolejnych projektów...</p>}
        </div>
      )}
    </>
  );
}

