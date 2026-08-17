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
    imageWidth?: number;
    imageHeight?: number;
    galleryImages?: {
      src: string;
      alt: string;
    }[];
    listItems: string[];
  };
}

export default function FeatureCard({ icon, title, initialText, details, isOpen, onToggle }: FeatureCardProps) {
  const isExpandable = !!details;

  return (
    <div
      className={`rounded-xl2 transition-all duration-500 ease-in-out ${
        isOpen ? 'bg-paper-soft shadow-lg' : 'bg-white shadow-md hover:shadow-lg'
      }`}
      onClick={isExpandable ? onToggle : undefined}
    >
      <div className={`p-6 sm:p-8 ${isExpandable ? 'cursor-pointer' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl2 flex items-center justify-center mr-5 shrink-0">
              {icon}
            </div>
            <h3 className="text-xl font-extrabold text-ink">{title}</h3>
          </div>
          {isExpandable && (
            <div className="w-8 h-8 flex items-center justify-center text-ink-muted shrink-0">
              {isOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
            </div>
          )}
        </div>
        <p className="text-ink/70 mt-4 sm:ml-16">{initialText}</p>
      </div>

      {isExpandable && (
        <div
          className={`overflow-hidden transition-[max-height,padding] duration-700 ease-in-out ${
            isOpen ? 'max-h-[1200px] pt-4 pb-8' : 'max-h-0'
          }`}
        >
          <div className="px-6 sm:px-8">
            <div className="border-t border-black/10 pt-8">
              {details.imageSrc ? (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <Image
                        src={details.imageSrc}
                        alt={details.imageAlt || 'Детальное изображение'}
                        width={details.imageWidth ?? 800}
                        height={details.imageHeight ?? 600}
                        className="w-full h-auto rounded-xl2"
                      />
                    </div>
                    <div>
                      <ul className="space-y-4 text-ink/80">
                        {details.listItems.map((item, index) => (
                          <li key={index} className="flex">
                            <svg className="w-5 h-5 mr-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {details.galleryImages && details.galleryImages.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
                      {details.galleryImages.map((image) => (
                        <div key={image.src} className="rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={320}
                            height={220}
                            className="w-full h-28 md:h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ul className="space-y-4 text-ink/80">
                  {details.listItems.map((item, index) => (
                    <li key={index} className="flex">
                      <svg className="w-5 h-5 mr-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
