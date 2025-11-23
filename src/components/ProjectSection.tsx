'use client';

import Image from "next/image";
import { Project } from "@/lib/projects";
import { useState, useRef, useEffect } from "react";

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const performScroll = () => {
    if (scrollContainerRef.current && scrollSpeed.current !== 0) {
      scrollContainerRef.current.scrollLeft += scrollSpeed.current;
      animationFrameId.current = requestAnimationFrame(performScroll);
    } else {
      animationFrameId.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = 300; // Active zone width in pixels
    const maxSpeed = 12; // Maximum scroll speed

    let speed = 0;
    if (x < threshold) {
      // Scroll left - speed increases closer to edge
      speed = -maxSpeed * ((threshold - x) / threshold);
    } else if (x > rect.width - threshold) {
      // Scroll right
      speed = maxSpeed * ((x - (rect.width - threshold)) / threshold);
    }

    scrollSpeed.current = speed;

    if (speed !== 0 && animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(performScroll);
    }
  };

  const handleMouseLeave = () => {
    scrollSpeed.current = 0;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setHoverIndex(null);
  };

  return (
    <div className="mb-16">
      {/* Project Title */}
      <div className="text-center mb-8">
        <div className="inline-block bg-white text-amber-800 rounded-full px-8 py-3 border-2 border-white">
          <h2 className="text-2xl font-semibold uppercase">{project.name}</h2>
        </div>
      </div>

      {/* Project Images - Capsule Layout */}
      <div
        className="overflow-x-auto h-96 md:h-128 flex items-center scrollbar-hide px-4"
        ref={scrollContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-4 w-max mx-auto h-full">
          {project.images.map((image, index) => {
            const isHovered = hoverIndex === index;
            const isNeighbor = hoverIndex !== null && Math.abs(hoverIndex - index) === 1;

            return (
              <div
                key={index}
                className={`shrink-0 relative cursor-pointer transition-all duration-500 ease-out
                  ${isHovered ? 'w-56 h-96 md:w-64 md:h-128 z-10' : isNeighbor ? 'w-48 h-80 md:w-56 md:h-112' : 'w-40 h-64 md:w-48 md:h-96'}
                `}
                onMouseEnter={() => setHoverIndex(index)}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="w-full h-full rounded-[6rem] overflow-hidden bg-white shadow-xl relative">
                  <Image
                    src={image.path}
                    alt={`${project.name} - ${image.filename}`}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl z-50 hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            &times;
          </button>

          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-gray-300 transition-colors p-2 md:p-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null);
            }}
          >
            &#8249;
          </button>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={project.images[selectedIndex].path}
              alt={`${project.name} - fullscreen`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-gray-300 transition-colors p-2 md:p-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => prev !== null ? (prev + 1) % project.images.length : null);
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
