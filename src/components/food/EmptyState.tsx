import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};