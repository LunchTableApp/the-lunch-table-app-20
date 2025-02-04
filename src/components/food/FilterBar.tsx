import { SearchBar } from "./SearchBar";
import { DateRangeFilter } from "./DateRangeFilter";
import { SortSelect } from "./SortSelect";
import { ExportButton } from "./ExportButton";
import { FoodItem } from "@/types/food";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  foods: FoodItem[];
}

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  timeFilter,
  setTimeFilter,
  sortBy,
  setSortBy,
  foods,
}: FilterBarProps) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6">
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <DateRangeFilter value={timeFilter} onChange={setTimeFilter} />
    <SortSelect value={sortBy} onValueChange={setSortBy} />
    <ExportButton foods={foods} />
  </div>
);