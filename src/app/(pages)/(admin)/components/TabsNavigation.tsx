import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Tab {
  value: string;
  label: string;
}

interface TabsNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabsList className="flex space-x-2 justify-between ">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-1 text-sm font-medium rounded-lg ${
            activeTab === tab.value ? " data-[state=active]:bg-primary data-[state=active]:text-white" : "bg-gray-100 hover:bg-gray-200"
          } transition`}
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsNavigation;
