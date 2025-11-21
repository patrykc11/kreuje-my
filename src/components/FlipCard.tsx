import { ReactNode } from 'react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
}

const FlipCard = ({ front, back }: FlipCardProps) => {
  return (
    <div className="group h-48 w-48 [perspective:1000px] mx-auto cursor-pointer">
      <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-full bg-white">
        {/* Front */}
        <div className="absolute inset-0 h-full w-full flex items-center justify-center [backface-visibility:hidden] rounded-full">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full bg-white text-center px-2">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

