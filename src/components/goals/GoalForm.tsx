import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { GoalSlider } from "./GoalSlider";

interface GoalFormValues {
  monthlyGoal: number;
}

export const GoalForm = () => {
  const { toast } = useToast();
  const form = useForm<GoalFormValues>({
    defaultValues: {
      monthlyGoal: 1,
    },
  });

  const onSubmit = (values: GoalFormValues) => {
    if (!values.monthlyGoal || values.monthlyGoal < 1) {
      toast({
        title: "Invalid goal",
        description: "Please select a valid number between 1 and 50",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('monthlyFoodGoal', String(values.monthlyGoal));
    toast({
      title: "Goal saved",
      description: "Your monthly food goal has been saved successfully!",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="monthlyGoal"
          render={({ field: { value, onChange } }) => (
            <GoalSlider value={value} onChange={onChange} />
          )}
        />
        <Button type="submit">
          Save Goal
        </Button>
      </form>
    </Form>
  );
};