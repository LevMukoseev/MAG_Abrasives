'use client';

import React, { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const id = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveTab(nextIndex);
    document.getElementById(`${id}-tab-${nextIndex}`)?.focus();
  };

  return (
    <div className="bg-white rounded-xl2 shadow-lg p-4 sm:p-6">
      <div className="border-b border-black/10">
        <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2 pb-3" role="tablist" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`${activeTab === index ? 'bg-accent text-white shadow-sm' : 'text-ink/60 bg-paper-soft hover:text-ink hover:bg-black/5'} whitespace-normal text-center min-h-[56px] py-3 px-3 rounded-xl2 font-bold text-sm sm:text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-8">
        {tabs.map((tab, index) => (
          <div
            key={tab.title}
            id={`${id}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${index}`}
            hidden={activeTab !== index}
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
