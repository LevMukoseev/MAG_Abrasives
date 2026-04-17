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
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="border-b border-gray-200">
        <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2 pb-3" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-normal text-center min-h-[56px] py-3 px-3 border-b-2 rounded-md font-medium text-sm sm:text-base transition-colors focus:outline-none`}
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