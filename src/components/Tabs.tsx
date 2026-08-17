'use client';

import React, { useState, ReactNode, FC } from 'react';

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white rounded-xl2 shadow-lg p-4 sm:p-6">
      <div className="border-b border-black/10">
        <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2 pb-3" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-ink/60 bg-paper-soft hover:text-ink hover:bg-black/5'
              } whitespace-normal text-center min-h-[56px] py-3 px-3 rounded-xl2 font-bold text-sm sm:text-base transition-colors focus:outline-none`}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-8">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
