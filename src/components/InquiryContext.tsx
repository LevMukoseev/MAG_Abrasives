'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface InquirySelection {
  category: string;
  product: string;
  source: '' | 'catalog';
}

const emptySelection: InquirySelection = { category: '', product: '', source: '' };
const InquiryContext = createContext<{
  selection: InquirySelection;
  select: (selection: InquirySelection) => void;
} | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [selection, select] = useState(emptySelection);
  return <InquiryContext.Provider value={{ selection, select }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('InquiryProvider is required');
  return context;
}
