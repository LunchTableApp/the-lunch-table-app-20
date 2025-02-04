import { FoodEntry } from "@/components/FoodEntry";
import { EmptyState } from "./EmptyState";
import { BulkActionBar } from "./BulkActionBar";
import { FoodItem } from "@/types/food";

interface FoodListProps {
  foods: FoodItem[];
  selectedEntries: string[];
  onDelete: (ids: string[]) => void;
  onToggleSelect: (id: string) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
}

export const FoodList = ({
  foods,
  selectedEntries,
  onDelete,
  onToggleSelect,
  showDeleteDialog,
  setShowDeleteDialog,
}: FoodListProps) => {
  const handleBulkDelete = () => {
    if (selectedEntries.length > 0) {
      setShowDeleteDialog(true);
    }
  };

  return (
    <div className="space-y-4">
      {selectedEntries.length > 0 && (
        <BulkActionBar
          selectedCount={selectedEntries.length}
          onDelete={handleBulkDelete}
        />
      )}

      {foods.map((food) => (
        <FoodEntry
          key={food.id}
          {...food}
          onDelete={(id) => onDelete([id])}
          selected={selectedEntries.includes(food.id)}
          onSelect={onToggleSelect}
        />
      ))}
      
      {foods.length === 0 && <EmptyState />}
    </div>
  );
};