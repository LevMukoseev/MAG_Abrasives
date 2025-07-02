'use client';

import React from 'react';

interface StickyHeaderProps {
  isVisible: boolean;
  onScrollToForm: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ isVisible, onScrollToForm }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-white/90 backdrop-blur-sm shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-12 md:h-12">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            Abrasive Expert
          </h1>
          <button className="btn-primary px-4 py-2 text-sm md:px-6 md:py-3 md:text-base" onClick={onScrollToForm}>
            <span>Оставить заявку</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader; 