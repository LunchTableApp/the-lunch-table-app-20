
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes: string;
  setNotes: (value: string) => void;
}

export const NotesSection = ({ notes, setNotes }: NotesSectionProps) => (
  <div className="mb-4">
    <label htmlFor="food-notes" className="block text-sm font-medium text-gray-700 mb-1">
      Notes
    </label>
    <Textarea
      id="food-notes"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="How did this food make you feel?"
      className="min-h-[100px] bg-white dark:bg-black"
    />
  </div>
);
