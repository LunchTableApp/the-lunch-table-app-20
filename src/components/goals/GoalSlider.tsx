import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

interface GoalSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const GoalSlider = ({ value, onChange }: GoalSliderProps) => {
  return (
    <FormItem>
      <FormLabel>Monthly New Foods Goal: {value}</FormLabel>
      <FormControl>
        <Slider
          min={1}
          max={50}
          step={1}
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          className="py-4"
        />
      </FormControl>
      <FormDescription>
        Set a goal for how many new foods you want to try each month (1-50)
      </FormDescription>
    </FormItem>
  );
};