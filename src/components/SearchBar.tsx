import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const quickSuggestions = [
  'شاورما دجاج',
  'مندي',
  'فلافل',
  'بيتزا',
  'حلويات'
];

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "ابحث عن مطعم، طبق، أو صنف…" 
}: SearchBarProps) => {
  return (
    <div className="px-4 py-3 space-y-3">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 pl-4 bg-input-background border-0 focus:ring-2 focus:ring-primary"
        />
      </div>
      
      {searchQuery === '' && (
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onSearchChange(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};