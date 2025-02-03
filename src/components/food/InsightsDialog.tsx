import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface InsightsDialogProps {
  showInsights: boolean;
  setShowInsights: (show: boolean) => void;
  foodName: string;
  insights: string;
}

export const InsightsDialog = ({
  showInsights,
  setShowInsights,
  foodName,
  insights,
}: InsightsDialogProps) => (
  <AlertDialog open={showInsights} onOpenChange={setShowInsights}>
    <AlertDialogContent className="max-w-[500px]">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-xl font-semibold text-primary">
          Food Benefits: {foodName}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-base whitespace-pre-line">
          {insights}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction className="bg-primary text-white hover:bg-primary/90">
          Got it!
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);