import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkActionBarProps {
  selectedCount: number;
  onDelete: () => void;
}

export const BulkActionBar = ({ selectedCount, onDelete }: BulkActionBarProps) => (
  <div className="flex justify-between items-center mb-4 p-2 bg-muted rounded-lg">
    <span className="text-sm font-medium">
      {selectedCount} {selectedCount === 1 ? 'entry' : 'entries'} selected
    </span>
    <Button
      variant="destructive"
      size="sm"
      onClick={onDelete}
      className="gap-2"
    >
      <Trash2 size={16} />
      Delete Selected
    </Button>
  </div>
);