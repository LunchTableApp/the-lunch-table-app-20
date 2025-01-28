import { Switch } from "@/components/ui/switch";

interface FormHeaderProps {
  isNewFood: boolean;
  setIsNewFood: (value: boolean) => void;
}

export const FormHeader = ({ isNewFood, setIsNewFood }: FormHeaderProps) => (
  <div className="flex items-center space-x-2 mb-4">
    <Switch
      id="new-food"
      checked={isNewFood}
      onCheckedChange={setIsNewFood}
    />
    <label
      htmlFor="new-food"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      This is a new food I'm trying
    </label>
  </div>
);