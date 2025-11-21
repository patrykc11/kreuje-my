'use client';

import Link from 'next/link';
import { useState } from 'react';

const ConsultationButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/kontakt"
      className="rounded-4xl px-8 py-4 transition-colors duration-300 border-2"
      style={{
        color: isHovered ? 'black' : 'white',
        backgroundColor: isHovered ? 'white' : 'transparent',
        borderColor: 'white',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-lg uppercase text-center">UMÓW SIĘ NA BEZPŁATNĄ KONSULTACJE</span>
    </Link>
  );
};

export default ConsultationButton;

