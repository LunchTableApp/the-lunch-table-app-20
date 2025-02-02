import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

interface GoalFormValues {
  monthlyGoal: number;
}

const GoalSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<GoalFormValues>({
    defaultValues: {
      monthlyGoal: 1,
    },
  });

  useEffect(() => {
    const savedGoal = localStorage.getItem('monthlyFoodGoal');
    if (savedGoal) {
      form.setValue('monthlyGoal', Number(savedGoal));
    }
  }, [form]);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <Card className="animate-fadeIn">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Goal Settings</CardTitle>
              <Button 
                variant="outline"
                onClick={() => navigate("/logged-entries")}
              >
                Back to Entries
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="monthlyGoal"
                  render={({ field: { value, onChange } }) => (
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
                  )}
                />
                <Button type="submit">
                  Save Goal
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalSettings;