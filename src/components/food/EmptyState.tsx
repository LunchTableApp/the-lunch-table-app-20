
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto my-8 fade-in">
      <h3 className="text-2xl font-semibold bg-gradient-soft bg-clip-text text-transparent mb-4">
        No food entries yet
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Start tracking your food journey by adding your first entry
      </p>
      <Button 
        onClick={() => navigate("/")}
        className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-medium px-6 py-3 rounded-full"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Your First Entry
      </Button>
    </div>
  );
};
