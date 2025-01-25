import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

interface GoalFormValues {
  monthlyGoal: string;
}

const GoalSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<GoalFormValues>({
    defaultValues: {
      monthlyGoal: "",
    },
  });

  useEffect(() => {
    const savedGoal = localStorage.getItem('monthlyFoodGoal');
    if (savedGoal) {
      form.setValue('monthlyGoal', savedGoal);
    }
  }, [form]);

  const onSubmit = (values: GoalFormValues) => {
    const goalNumber = Number(values.monthlyGoal);
    
    if (!values.monthlyGoal || isNaN(goalNumber) || goalNumber < 1) {
      toast({
        title: "Invalid goal",
        description: "Please enter a valid number greater than 0",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('monthlyFoodGoal', values.monthlyGoal);
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly New Foods Goal</FormLabel>
                      <div className="flex gap-4">
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Enter number of new foods"
                            className="max-w-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <Button type="submit">
                          Save Goal
                        </Button>
                      </div>
                      <FormDescription>
                        Set a goal for how many new foods you want to try each month
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalSettings;