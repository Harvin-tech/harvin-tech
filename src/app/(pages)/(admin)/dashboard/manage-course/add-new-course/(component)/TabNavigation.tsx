import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabs: string[];
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  return (
    <Tabs
      defaultValue={activeTab.toString()}
      onValueChange={(value: string) => setActiveTab(parseInt(value))}
      className="w-full mb-2"
    >
      <TabsList className="w-full justify-start flex-col md:flex-row min-h-[148px] md:min-h-9 items-start md:items-center">
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={index.toString()} className="w-full">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
