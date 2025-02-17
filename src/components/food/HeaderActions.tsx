
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeaderActions = () => {
  const navigate = useNavigate();
  
  return (
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
      <Button 
        onClick={() => navigate("/chat")} 
        variant="outline"
        className="w-full sm:w-auto"
      >
        Chat Assistant
      </Button>
    </div>
  );
};
