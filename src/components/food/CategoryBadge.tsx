import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
  onRemove?: () => void;
  className?: string;
}

export const CategoryBadge = ({ category, onRemove, className }: CategoryBadgeProps) => (
  <Badge variant="secondary" className={className}>
    {category}
    {onRemove && (
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="ml-1 hover:text-destructive"
      >
        <X size={14} />
      </button>
    )}
  </Badge>
);