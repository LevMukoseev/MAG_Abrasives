'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FeatureCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  initialText: string;
  isOpen: boolean;
  onToggle: () => void;
  details?: {
    imageSrc?: string;
    imageAlt?: string;
    listItems: string[];
  };
}

export default function FeatureCard({ icon, title, initialText, details, isOpen, onToggle }: FeatureCardProps) {
  const isExpandable = !!details;

  return (
    <div
      className={`rounded-2xl transition-all duration-500 ease-in-out ${isOpen ? 'bg-gray-100 shadow-2xl' : 'bg-white shadow-lg hover:shadow-xl'}`}
      onClick={isExpandable ? onToggle : undefined}
    >
      <div className={`p-8 ${isExpandable ? 'cursor-pointer' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-5">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          {isExpandable && (
            <div className="w-8 h-8 flex items-center justify-center text-gray-400">
              {isOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-4 ml-16">{initialText}</p>
      </div>

      {isExpandable && (
        <div
          className={`overflow-hidden transition-[max-height,padding] duration-700 ease-in-out ${isOpen ? 'max-h-[1000px] pt-4 pb-8' : 'max-h-0'}`}
        >
          <div className="px-8">
            <div className="border-t border-gray-200 pt-8">
              {details.imageSrc ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <Image
                      src={details.imageSrc}
                      alt={details.imageAlt || 'Детальное изображение'}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <div>
                    <ul className="space-y-4 text-gray-700">
                      {details.listItems.map((item, index) => (
                        <li key={index} className="flex">
                          <svg className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4 text-gray-700">
                  {details.listItems.map((item, index) => (
                    <li key={index} className="flex">
                      <svg className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 