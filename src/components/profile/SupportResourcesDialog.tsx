
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SupportResourcesDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Support Resources
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support Resources</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">24/7 Crisis Support</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium">988 Suicide & Crisis Lifeline</p>
                <p className="text-sm text-muted-foreground">
                  Call or text 988 - Free, confidential support available 24/7
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Crisis Text Line</p>
                <p className="text-sm text-muted-foreground">
                  Text HOME to 741741 - Free crisis counseling 24/7
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">Teen-Specific Support</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium">Teen Line</p>
                <p className="text-sm text-muted-foreground">
                  Call 310-855-HOPE or Text "TEEN" to 839863
                  <br />
                  Available 6pm-10pm PT
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">The Trevor Project (LGBTQ+)</p>
                <p className="text-sm text-muted-foreground">
                  Call 1-866-488-7386 - Available 24/7
                  <br />
                  Text START to 678678
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">Additional Resources</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium">NAMI HelpLine</p>
                <p className="text-sm text-muted-foreground">
                  Call 1-800-950-NAMI (6264)
                  <br />
                  Available Mon-Fri, 10am-10pm ET
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              All resources listed are verified and maintained by recognized mental health organizations. If you're experiencing an immediate emergency, please call 911.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
