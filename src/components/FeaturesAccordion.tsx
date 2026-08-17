'use client';

import { useState, ReactNode } from 'react';
import FeatureCard from './FeatureCard';

export interface Feature {
  id: string;
  icon: ReactNode;
  title: string;
  initialText: string;
  details?: {
    imageSrc?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    galleryImages?: { src: string; alt: string }[];
    listItems: string[];
  };
}

export default function FeaturesAccordion({ features }: { features: Feature[] }) {
  const [openFeatureId, setOpenFeatureId] = useState<string | null>(features[0]?.id ?? null);

  return (
    <div className="space-y-6">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          id={feature.id}
          icon={feature.icon}
          title={feature.title}
          initialText={feature.initialText}
          details={feature.details}
          isOpen={openFeatureId === feature.id}
          onToggle={() =>
            setOpenFeatureId((prev) => (prev === feature.id ? null : feature.id))
          }
        />
      ))}
    </div>
  );
}
