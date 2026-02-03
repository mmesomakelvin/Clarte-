
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div>
      <div className="border-b border-clarte-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`${
                activeTab === tab
                  ? 'border-clarte-orange-500 text-clarte-orange-600'
                  : 'border-transparent text-clarte-gray-500 hover:text-clarte-gray-700 hover:border-clarte-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
