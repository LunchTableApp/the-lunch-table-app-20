import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface DateRangeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <Calendar className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Date range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All time</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="yesterday">Yesterday</SelectItem>
        <SelectItem value="thisWeek">This week</SelectItem>
        <SelectItem value="lastWeek">Last week</SelectItem>
        <SelectItem value="thisMonth">This month</SelectItem>
        <SelectItem value="lastMonth">Last month</SelectItem>
        <SelectItem value="last3Months">Last 3 months</SelectItem>
        <SelectItem value="last6Months">Last 6 months</SelectItem>
        <SelectItem value="thisYear">This year</SelectItem>
      </SelectContent>
    </Select>
  );
};