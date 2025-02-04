import { useState } from "react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const UpdateProfileDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async () => {
    try {
      if (newEmail) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: newEmail,
        });
        if (emailError) throw emailError;
      }

      if (newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (passwordError) throw passwordError;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsOpen(false);
      setNewEmail("");
      setNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Settings className="mr-2 h-4 w-4" />
          Update Profile
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="support">Support Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">New Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <Button onClick={handleUpdateProfile}>Update</Button>
            </div>
          </TabsContent>
          <TabsContent value="support">
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};