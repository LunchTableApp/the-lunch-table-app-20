import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CabbageTracker } from "@/components/CabbageTracker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FoodItem } from "@/types/food";
import type { DbFoodEntry } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import { filterEntriesByDateRange } from "@/utils/dateFilters";
import { LoggedEntriesHeader } from "@/components/food/LoggedEntriesHeader";
import { FilterBar } from "@/components/food/FilterBar";
import { FoodList } from "@/components/food/FoodList";
import { DeleteConfirmDialog } from "@/components/food/DeleteConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";

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

  const toggleEntrySelection = (id: string) => {
    setSelectedEntries(prev =>
      prev.includes(id)
        ? prev.filter(entryId => entryId !== id)
        : [...prev, id]
    );
  };

  const confirmBulkDelete = () => {
    deleteMutation.mutate(selectedEntries);
    setShowDeleteDialog(false);
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
        <LoggedEntriesHeader />

        <CabbageTracker 
          newFoodsCount={newFoodsThisMonth}
          monthlyGoal={monthlyGoal}
        />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          foods={filteredAndSortedFoods}
        />

        <FoodList
          foods={filteredAndSortedFoods}
          selectedEntries={selectedEntries}
          onDelete={deleteMutation.mutate}
          onToggleSelect={toggleEntrySelection}
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
        />

        <DeleteConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={confirmBulkDelete}
        />
      </div>
    </div>
  );
};

export default LoggedEntries;