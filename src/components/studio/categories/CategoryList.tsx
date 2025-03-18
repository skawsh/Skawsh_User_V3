
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';

interface SubCategory {
  title: string;
  icon: React.ReactNode;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  count?: number;
  subCategories?: SubCategory[];
}

interface CategoryListProps {
  categories: Category[];
  onCategorySelect: (categoryTitle: string) => void;
  onClose: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategorySelect,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-[280px] mx-auto bg-black rounded-xl overflow-hidden animate-slide-up">
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Services</h3>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="py-2">
            {categories.map((category, idx) => (
              <div key={idx} className="mb-2">
                <div 
                  className="flex items-center justify-between w-full text-left px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h4 className="font-medium text-white">{category.title}</h4>
                  </div>
                  {category.count && (
                    <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center">
                      <span className="text-xs text-white">{category.count}</span>
                    </div>
                  )}
                </div>

                {category.subCategories && (
                  <div className="pl-10 space-y-3 mt-1">
                    {category.subCategories.map((subCategory, subIdx) => (
                      <button
                        key={subIdx}
                        onClick={() => onCategorySelect(subCategory.title)}
                        className="text-gray-300 hover:text-white text-sm w-full text-left py-1.5"
                      >
                        {subCategory.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryList;
