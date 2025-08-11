
'use client';

import React from 'react';

interface PurchaseButtonProps {
  link?: string;
  text?: string;
  messageClassName?: string;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ 
  link = '#',
  text = '今すぐ共同オーナーになる',
  messageClassName = 'text-white' 
}) => {
  const isExternal = link.startsWith('http');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal && link.startsWith('#')) {
      e.preventDefault();
      const targetId = link.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // For external links, the default browser behavior is sufficient.
  };

  return (
    <div className="inline-block rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 mt-8" style={{ backgroundColor: 'orange' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'darkorange'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'orange'}>
      <a
        href={link}
        onClick={handleClick}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block w-full h-full font-bold py-3 px-8 text-xl"
      >
        <span className={messageClassName}>{text}</span>
      </a>
    </div>
  );
};
