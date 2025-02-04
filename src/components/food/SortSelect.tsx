import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const SortSelect = ({ value, onValueChange }: SortSelectProps) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="w-full sm:w-[150px]">
      <SelectValue placeholder="Sort by..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="recent">Most Recent</SelectItem>
      <SelectItem value="rating">Highest Rated</SelectItem>
      <SelectItem value="taste">Taste</SelectItem>
      <SelectItem value="satisfaction">Satisfaction</SelectItem>
      <SelectItem value="fullness">Fullness</SelectItem>
    </SelectContent>
  </Select>
);