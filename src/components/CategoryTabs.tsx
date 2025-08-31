import { useMemo } from 'react';
import { restaurants } from '../data/mockData';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const categories = useMemo(() => {
    const set = new Set<string>(['الكل']);
    restaurants.forEach(r => r.categories.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  return (
    <div className="px-4 py-3 bg-background border-b">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
