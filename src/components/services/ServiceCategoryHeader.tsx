
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ServiceCategoryHeaderProps {
  categoryId: string;
  categoryName: string;
  categoryIcon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCategoryHeader: React.FC<ServiceCategoryHeaderProps> = ({
  categoryId,
  categoryName,
  categoryIcon,
  isExpanded,
  onToggle
}) => {
  return (
    <Card className="mb-3 overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500 text-white border-none flex items-center justify-center shadow-sm">
            <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
              {categoryIcon}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-gray-800 text-base">{categoryName}</h3>
        </div>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-indigo-500 transition-transform duration-300",
            isExpanded ? "transform rotate-180" : ""
          )}
        />
      </div>
    </Card>
  );
};

export default ServiceCategoryHeader;
