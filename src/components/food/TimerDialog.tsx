
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimerDialog = ({ isOpen, onClose }: TimerDialogProps) => {
  const [minutes, setMinutes] = useState("30");
  const { toast } = useToast();
  
  const handleStartTimer = () => {
    const minutesNum = parseInt(minutes);
    if (isNaN(minutesNum) || minutesNum <= 0) {
      toast({
        title: "Invalid time",
        description: "Please enter a valid number of minutes",
        variant: "destructive",
      });
      return;
    }

    // Convert minutes to milliseconds
    const milliseconds = minutesNum * 60 * 1000;
    
    // Set timer using built-in setTimeout
    setTimeout(() => {
      // Show notification when timer is done
      toast({
        title: "Time to Check In!",
        description: "How are you feeling after your meal?",
      });
    }, milliseconds);

    toast({
      title: "Reminder Set",
      description: `We'll check how you're feeling in ${minutesNum} minutes`,
    });
    
    onClose();
  };

  const handleMinutesChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      // Round to nearest 10
      const roundedNum = Math.max(10, Math.round(num / 10) * 10);
      setMinutes(roundedNum.toString());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Want a reminder to check how you feel?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
              When should we check in? (minutes)
            </label>
            <div className="flex gap-2">
              <Input
                id="minutes"
                type="number"
                value={minutes}
                onChange={(e) => handleMinutesChange(e.target.value)}
                min="10"
                step="10"
                className="flex-1"
              />
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleStartTimer} className="w-full">
            Set Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

