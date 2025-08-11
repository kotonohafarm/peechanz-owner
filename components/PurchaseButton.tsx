
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
    <div className="inline-block bg-orange-500 hover:bg-orange-600 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-8">
      <a
        href={link}
        onClick={handleClick}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block w-full h-full font-bold py-3 px-8 text-xl" // Removed bg- and hover:bg-
      >
        <span className={messageClassName}>{text}</span>
      </a>
    </div>
  );
};
