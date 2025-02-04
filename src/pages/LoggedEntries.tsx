import { useState } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CabbageTracker } from "@/components/CabbageTracker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FoodItem } from "@/types/food";
import type { DbFoodEntry } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangeFilter } from "@/components/food/DateRangeFilter";
import { FoodStats } from "@/components/food/FoodStats";
import { ExportButton } from "@/components/food/ExportButton";
import { filterEntriesByDateRange } from "@/utils/dateFilters";

const LoggedEntries = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<string>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

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
        isNewFood: entry.is_new_food
      }));
    },
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('food_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      toast({
        title: "Food deleted",
        description: "Your food entry has been deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete food entry. Please try again.",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    }
  });

  const filteredAndSortedFoods = (foods || [])
    .filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.notes?.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button 
              onClick={() => navigate("/goal-settings")} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              Goal Settings
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              Add New Entry
            </Button>
          </div>
        </div>

        <CabbageTracker 
          newFoodsCount={newFoodsThisMonth}
          monthlyGoal={monthlyGoal}
        />

        <FoodStats foods={filteredAndSortedFoods} />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DateRangeFilter value={timeFilter} onChange={setTimeFilter} />
          <Select value={sortBy} onValueChange={setSortBy}>
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
          <ExportButton foods={filteredAndSortedFoods} />
        </div>

        <div className="space-y-4">
          {filteredAndSortedFoods.map((food) => (
            <FoodEntry
              key={food.id}
              {...food}
              onDelete={() => deleteMutation.mutate(food.id)}
            />
          ))}
          {foods.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <img 
                  src="/eaten-carrot-logo.svg" 
                  alt="No entries" 
                  className="w-24 h-24 mx-auto opacity-50"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No food entries yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start tracking your food journey by adding your first entry
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90"
              >
                Add Your First Entry
              </Button>
            </div>
          ) : filteredAndSortedFoods.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No entries match your search criteria
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoggedEntries;