'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from "next/image";
import { Project } from "@/lib/projects";
import ImageGalleryModal from "./ImageGalleryModal";

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const EDGE_THRESHOLD = 100; // Strefa krawędziowa w pikselach
  const SCROLL_SPEED = 3; // Prędkość scrollowania
  const VISIBLE_COUNT = 7; // Liczba widocznych zdjęć
  
  // Funkcja obliczająca dynamiczny padding na podstawie maksymalnej skali
  const getDynamicPadding = (): { vertical: number; horizontal: number } => {
    // Nie potrzebujemy padding, bo najechane nie rośnie
    return {
      vertical: 0,
      horizontal: 0,
    };
  };
  
  // Funkcja obliczająca skalę na podstawie odległości od zdjęcia z hoverem
  const getScale = (index: number): number => {
    if (hoveredIndex === null) return 1;
    
    // Sprawdź czy najechane zdjęcie jest w widocznych
    if (!visibleIndices.includes(hoveredIndex)) return 1;
    
    // Sprawdź czy to zdjęcie jest w widocznych
    if (!visibleIndices.includes(index)) return 1;
    
    // Oblicz odległość tylko w kontekście widocznych zdjęć
    const visibleSorted = [...visibleIndices].sort((a, b) => a - b);
    const hoveredPos = visibleSorted.indexOf(hoveredIndex);
    const currentPos = visibleSorted.indexOf(index);
    
    if (hoveredPos === -1 || currentPos === -1) return 1;
    
    const distance = Math.abs(currentPos - hoveredPos);
    
    // Najechane pozostaje w oryginalnym rozmiarze (1.0), reszta jest zmniejszana
    const scaleMap: { [key: number]: number } = {
      0: 1.0,    // Najechane - oryginalny rozmiar
      1: 0.85,   // Pierwsze po bokach
      2: 0.75,   // Kolejne
      3: 0.65,   // Następne
      4: 0.55,   // Najdalsze
      5: 0.45,   // Najdalsze
      6: 0.40,   // Najdalsze
      7: 0.35,   // Najdalsze
    };
    
    return scaleMap[distance] || 0.35;
  };

  // Funkcja aktualizująca widoczne zdjęcia
  const updateVisibleIndices = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const visible: number[] = [];

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      
      // Sprawdź czy zdjęcie jest widoczne w kontenerze
      const isVisible = 
        rect.left < containerRect.right &&
        rect.right > containerRect.left &&
        rect.top < containerRect.bottom &&
        rect.bottom > containerRect.top;
      
      if (isVisible) {
        visible.push(index);
      }
    });

    // Sortuj i weź maksymalnie 5 środkowych widocznych
    if (visible.length > 0) {
      visible.sort((a, b) => a - b);
      const start = Math.max(0, Math.floor((visible.length - VISIBLE_COUNT) / 2));
      const end = Math.min(start + VISIBLE_COUNT, visible.length);
      setVisibleIndices(visible.slice(start, end));
    } else {
      setVisibleIndices([]);
    }
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev < project.images.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev > 0 ? prev - 1 : project.images.length - 1
    );
  };

  // Aktualizuj widoczne zdjęcia przy scrollowaniu i resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Opóźnione wywołanie aby uniknąć synchronizacji w efekcie
    const timeoutId = setTimeout(() => {
      updateVisibleIndices();
    }, 0);

    const handleScroll = () => {
      updateVisibleIndices();
    };

    const handleResize = () => {
      updateVisibleIndices();
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [project.images.length, updateVisibleIndices]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const containerWidth = rect.width;

      // Sprawdź czy kursor jest w strefie krawędziowej
      const isNearLeftEdge = mouseX < EDGE_THRESHOLD;
      const isNearRightEdge = mouseX > containerWidth - EDGE_THRESHOLD;

      // Zatrzymaj poprzedni scroll jeśli istnieje
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }

      // Rozpocznij auto-scroll jeśli kursor jest przy krawędzi
      if (isNearLeftEdge || isNearRightEdge) {
        scrollIntervalRef.current = setInterval(() => {
          if (!container) return;
          
          const scrollAmount = isNearLeftEdge ? -SCROLL_SPEED : SCROLL_SPEED;
          
          // Sprawdź czy można jeszcze scrollować
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (isNearLeftEdge && container.scrollLeft <= 0) {
            if (scrollIntervalRef.current) {
              clearInterval(scrollIntervalRef.current);
              scrollIntervalRef.current = null;
            }
            return;
          }
          
          if (isNearRightEdge && container.scrollLeft >= maxScroll) {
            if (scrollIntervalRef.current) {
              clearInterval(scrollIntervalRef.current);
              scrollIntervalRef.current = null;
            }
            return;
          }
          
          container.scrollLeft += scrollAmount;
        }, 16); // ~60fps
      }
    };

    const handleMouseLeave = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="mb-16">
        {/* Project Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white text-amber-800 rounded-full px-8 py-3 border-2 border-white">
            <h2 className="text-2xl font-semibold uppercase">{project.name}</h2>
          </div>
        </div>

        {/* Project Images - Capsule Layout */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing"
        >
          <div 
            className="flex gap-4 justify-center min-w-max"
            style={{
              paddingTop: `${getDynamicPadding().vertical}px`,
              paddingBottom: `${getDynamicPadding().vertical}px`,
              paddingLeft: `${getDynamicPadding().horizontal}px`,
              paddingRight: `${getDynamicPadding().horizontal}px`,
            }}
          >
            {project.images.map((image, index) => {
              const scale = getScale(index);
              return (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="shrink-0 relative group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.3s ease-out',
                    transformOrigin: 'center',
                  }}
                >
                  <div className="w-56 h-80 rounded-[3rem] overflow-hidden bg-white shadow-xl relative">
                    <Image
                      src={image.path}
                      alt={`${project.name} - ${image.filename}`}
                      width={224}
                      height={320}
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100%' }}
                      fill={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ImageGalleryModal
          images={project.images}
          currentIndex={selectedImageIndex}
          projectName={project.name}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default ProjectSection;
