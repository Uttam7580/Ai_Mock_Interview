'use client';

import React, { useEffect, useState } from 'react';
import { getTechLogos } from '@/lib/utils';
import { cn } from '@/lib/utils'; // ✅ Make sure you have a `cn` utility (like from tailwind-variants or clsx)

type TechIconProps = {
  techStack: string[];
};

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const icons = await getTechLogos(techStack);
      setTechIcons(icons);
    };

    if (techStack.length) {
      fetchIcons();
    }
  }, [techStack]);

  return (
    <div className='flex flex-row gap-2'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            'relative group bg-dark-300 rounded-full p-2 flex-center',
            index >= 1 && '-ml-3'
          )}
        >
          <img src={url} alt={tech} className="w-6 h-6" />
          <span className='tech-tooltip'>{tech}</span>
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
