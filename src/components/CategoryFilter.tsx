import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  Code, 
  Video, 
  GraduationCap, 
  ShoppingBag, 
  Compass 
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES_CONFIG } from '../data/mockData';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  categoryCounts: Record<Category, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'freelancing': return <Briefcase className="w-3.5 h-3.5" />;
      case 'building': return <Code className="w-3.5 h-3.5" />;
      case 'content': return <Video className="w-3.5 h-3.5" />;
      case 'tutoring': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'selling': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'other': return <Compass className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-mono uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
          <span className="text-[#BEFF00]">●</span> Explore by hustle path
        </span>
        <span className="text-[11px] text-neutral-500 font-mono">
          Compare within similar earnings
        </span>
      </div>

      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id as Category] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as Category)}
              id={`cat-filter-${cat.id}`}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-extrabold shadow-sm'
                  : 'bg-[#111111] text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <span className={isSelected ? 'text-black' : 'text-[#BEFF00]'}>
                {getCategoryIcon(cat.id)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
