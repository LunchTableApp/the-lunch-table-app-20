import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CategoryBadge } from "./CategoryBadge";

interface CategoryInputProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export const CategoryInput = ({ categories, onCategoriesChange }: CategoryInputProps) => {
  const [newCategory, setNewCategory] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCategory.trim()) {
      e.preventDefault();
      if (!categories.includes(newCategory.trim())) {
        onCategoriesChange([...categories, newCategory.trim()]);
      }
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    onCategoriesChange(categories.filter(cat => cat !== categoryToRemove));
  };

  return (
    <div className="space-y-2">
      <Input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a category and press Enter..."
        className="w-full"
      />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryBadge
            key={category}
            category={category}
            onRemove={() => removeCategory(category)}
          />
        ))}
      </div>
    </div>
  );
};