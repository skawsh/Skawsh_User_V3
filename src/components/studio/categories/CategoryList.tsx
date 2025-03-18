
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md mx-auto bg-black text-white rounded-t-xl p-4 pb-8 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Services</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {categories.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <button
                  onClick={() => onCategorySelect(category.title)}
                  className="flex items-center justify-between w-full text-left py-2"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h4 className="font-medium">{category.title}</h4>
                  </div>
                  <div className="bg-gray-700 rounded-full h-6 w-6 flex items-center justify-center">
                    <span className="text-xs">{category.count}</span>
                  </div>
                </button>

                {category.subCategories && (
                  <div className="pl-8 space-y-3">
                    {category.subCategories.map((subCategory, subIdx) => (
                      <button
                        key={subIdx}
                        onClick={() => onCategorySelect(category.title)}
                        className="text-gray-300 hover:text-white text-sm w-full text-left py-1"
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
