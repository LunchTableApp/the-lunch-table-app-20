
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
        title: "Timer Complete!",
        description: `${minutesNum} minutes have passed since your meal`,
      });
    }, milliseconds);

    toast({
      title: "Timer Started",
      description: `You'll be notified in ${minutesNum} minutes`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Set Reminder Timer
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
              Minutes until reminder
            </label>
            <div className="flex gap-2">
              <Input
                id="minutes"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="1"
                className="flex-1"
              />
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleStartTimer} className="w-full">
            Start Timer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
