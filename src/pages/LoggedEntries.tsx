import { useState } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { useToast } from "@/hooks/use-toast";
import { CabbageTracker } from "@/components/CabbageTracker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FoodItem } from "@/types/food";
import type { DbFoodEntry } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import { DateRangeFilter } from "@/components/food/DateRangeFilter";
import { FoodStats } from "@/components/food/FoodStats";
import { ExportButton } from "@/components/food/ExportButton";
import { filterEntriesByDateRange } from "@/utils/dateFilters";
import { SearchBar } from "@/components/food/SearchBar";
import { SortSelect } from "@/components/food/SortSelect";
import { BulkActionBar } from "@/components/food/BulkActionBar";
import { EmptyState } from "@/components/food/EmptyState";
import { HeaderActions } from "@/components/food/HeaderActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LoggedEntries = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<string>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data as DbFoodEntry[]).map((entry): FoodItem => ({
        id: entry.id,
        name: entry.name,
        tasteRating: entry.taste_rating,
        satisfactionRating: entry.satisfaction_rating,
        fullnessRating: entry.fullness_rating,
        notes: entry.notes,
        date: new Date(entry.date),
        isNewFood: entry.is_new_food,
        categories: entry.categories || []
      }));
    },
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('food_entries')
        .delete()
        .in('id', ids)
        .eq('user_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      toast({
        title: "Entries deleted",
        description: "Selected entries have been deleted successfully!",
      });
      setSelectedEntries([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete entries. Please try again.",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    }
  });

  const handleBulkDelete = () => {
    if (selectedEntries.length > 0) {
      setShowDeleteDialog(true);
    }
  };

  const confirmBulkDelete = () => {
    deleteMutation.mutate(selectedEntries);
    setShowDeleteDialog(false);
  };

  const toggleEntrySelection = (id: string) => {
    setSelectedEntries(prev =>
      prev.includes(id)
        ? prev.filter(entryId => entryId !== id)
        : [...prev, id]
    );
  };

  const filteredAndSortedFoods = (foods || [])
    .filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(food => filterEntriesByDateRange([food], timeFilter).length > 0)
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.date.getTime() - a.date.getTime();
        case "rating":
          const avgA = (a.tasteRating + a.satisfactionRating + a.fullnessRating) / 3;
          const avgB = (b.tasteRating + b.satisfactionRating + b.fullnessRating) / 3;
          return avgB - avgA;
        case "taste":
          return b.tasteRating - a.tasteRating;
        case "satisfaction":
          return b.satisfactionRating - a.satisfactionRating;
        case "fullness":
          return b.fullnessRating - a.fullnessRating;
        default:
          return 0;
      }
    });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newFoodsThisMonth = foods.filter(
    food => {
      const foodDate = new Date(food.date);
      return food.isNewFood && 
             foodDate.getMonth() === currentMonth && 
             foodDate.getFullYear() === currentYear;
    }
  ).length;

  const monthlyGoal = parseInt(localStorage.getItem('monthlyFoodGoal') || '5');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background py-4 px-4 sm:py-8">
        <div className="container max-w-2xl mx-auto">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background py-4 px-4 sm:py-8">
      <div className="container max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Logged Entries
          </h1>
          <HeaderActions />
        </div>

        <CabbageTracker 
          newFoodsCount={newFoodsThisMonth}
          monthlyGoal={monthlyGoal}
        />

        <FoodStats foods={filteredAndSortedFoods} />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <DateRangeFilter value={timeFilter} onChange={setTimeFilter} />
          <SortSelect value={sortBy} onValueChange={setSortBy} />
          <ExportButton foods={filteredAndSortedFoods} />
        </div>

        {selectedEntries.length > 0 && (
          <BulkActionBar
            selectedCount={selectedEntries.length}
            onDelete={handleBulkDelete}
          />
        )}

        <div className="space-y-4">
          {filteredAndSortedFoods.map((food) => (
            <FoodEntry
              key={food.id}
              {...food}
              onDelete={(id) => deleteMutation.mutate([id])}
              selected={selectedEntries.includes(food.id)}
              onSelect={toggleEntrySelection}
            />
          ))}
          {foods.length === 0 ? (
            <EmptyState />
          ) : filteredAndSortedFoods.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No entries match your search criteria
            </p>
          ) : null}
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the selected entries.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmBulkDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LoggedEntries;