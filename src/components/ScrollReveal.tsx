'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'rotate-in';
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  className = '' 
}: ScrollRevealProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const animationClasses = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'fade-in-left': 'animate-fade-in-left',
    'fade-in-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in',
    'rotate-in': 'animate-rotate-in',
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} ${hasIntersected ? animationClasses[animation] : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

