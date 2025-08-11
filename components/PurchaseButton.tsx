'use client';

import React from 'react';

interface PurchaseButtonProps {
  link?: string;
  text?: string;
  messageClassName?: string;
  disabled?: boolean;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  link = '#',
  text = '今すぐ共同オーナーになる',
  messageClassName = 'text-white',
  disabled = false // Default to false
}) => {
  const isExternal = link.startsWith('http');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) { // Prevent click if disabled
      e.preventDefault();
      return;
    }
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
    <div className={`inline-block rounded-lg shadow-xl transition duration-300 ease-in-out transform mt-8 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 hover:-translate-y-1'}`} style={{ backgroundColor: 'orange' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = disabled ? 'orange' : 'darkorange'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = disabled ? 'orange' : 'orange'}>
      <a
        href={link}
        onClick={handleClick}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block w-full h-full font-bold py-3 px-8 text-xl"
        aria-disabled={disabled} // Added aria-disabled
      >
        <span className={messageClassName}>{text}</span>
      </a>
    </div>
  );
};