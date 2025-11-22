'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ScrollSectionProps {
  children: ReactNode;
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale';
  delay?: number;
  className?: string;
}

const ScrollSection = ({ 
  children, 
  animationType = 'fade-up',
  delay = 0,
  className = ''
}: ScrollSectionProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const animationClass = {
    'fade-up': 'scroll-fade-up',
    'fade-left': 'scroll-fade-left',
    'fade-right': 'scroll-fade-right',
    'scale': 'scroll-scale',
  }[animationType];

  return (
    <div
      ref={elementRef}
      className={`scroll-animate ${animationClass} ${isIntersecting ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollSection;

