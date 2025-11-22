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
}

const Hero = ({
  backgroundImageUrl,
  leftElement,
  rightElement,
  minHeight = '75vh',
  gradientOverlay = 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.75) 90%, rgba(255,255,255,0.95) 100%)',
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  darkTheme = false,
  fullWidth = false,
}: HeroProps) => {
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
      <div className={`z-10 flex flex-col items-center justify-center h-full ${fullWidth ? 'w-full' : 'w-6/7'} mx-auto my-8`}>
        <div className="flex items-center justify-between w-full px-8">
          {leftElement}
          {rightElement}
        </div>
      </div>
    </div>
  );
};

export default Hero;

