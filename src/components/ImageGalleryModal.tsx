'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ProjectImage } from '@/lib/projects';

interface ImageGalleryModalProps {
  images: ProjectImage[];
  currentIndex: number;
  projectName: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ImageGalleryModal({
  images,
  currentIndex,
  projectName,
  onClose,
  onNext,
  onPrevious,
}: ImageGalleryModalProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        aria-label="Zamknij"
      >
        ×
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          aria-label="Poprzednie zdjęcie"
        >
          ‹
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          aria-label="Następne zdjęcie"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Image
          src={currentImage.path}
          alt={`${projectName} - ${currentImage.filename}`}
          width={1920}
          height={1080}
          className="max-w-full max-h-[90vh] object-contain"
          priority
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

