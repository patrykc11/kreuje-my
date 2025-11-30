import { ReactNode } from 'react';
import Navbar from './Navbar';

interface HeroProps {
  backgroundImageUrl: string;
  leftElement: ReactNode;
  rightElement: ReactNode;
  minHeight?: string;
  gradientOverlay?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  darkTheme?: boolean;
  fullWidth?: boolean;
  disableHoverAnimations?: boolean;
  contentWidth?: string;
  alignItems?: 'center' | 'start' | 'end' | 'stretch';
  rightElementHoverClass?: string;
}

const Hero = ({
  backgroundImageUrl,
  leftElement,
  rightElement,
  minHeight = '75vh',
  gradientOverlay = 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 7%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.75) 90%, rgba(255,255,255,0.95) 100%)',
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  darkTheme = false,
  fullWidth = false,
  disableHoverAnimations = false,
  contentWidth = 'w-6/7',
  alignItems = 'center',
  rightElementHoverClass,
}: HeroProps) => {
  const alignmentClasses = {
    center: 'items-center',
    start: 'items-start',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className="relative flex flex-col w-full justify-between"
      style={{
        minHeight,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar darkTheme={darkTheme} />
      {/* Gradient overlay - fade to white at top and bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: gradientOverlay
        }}
      ></div>

      {/* Hero overlay */}
      <div className={`z-10 flex flex-col items-center justify-center h-full ${fullWidth ? 'w-full' : contentWidth} mx-auto my-8`}>
        <div className={`flex flex-col md:flex-row ${alignmentClasses[alignItems]} justify-between w-full px-8 gap-8 md:gap-0`}>
          <div className={`h-full ${disableHoverAnimations ? '' : 'hover-scale transition-transform duration-500'}`}>
            {leftElement}
          </div>
          <div className={`${disableHoverAnimations ? '' : (rightElementHoverClass || 'hover-lift transition-all duration-500')} w-fit`}>
            {rightElement}
          </div>
        </div>
        </div>
      </div>
  );
};

export default Hero;

