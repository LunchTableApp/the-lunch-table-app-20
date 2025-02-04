export const filterEntriesByDateRange = (entries: any[], timeFilter: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const last3MonthsStart = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const last6MonthsStart = new Date(today.getFullYear(), today.getMonth() - 6, 1);
  const thisYearStart = new Date(today.getFullYear(), 0, 1);

  switch (timeFilter) {
    case "today":
      return entries.filter(entry => entry.date >= today);
    case "yesterday":
      return entries.filter(entry => entry.date >= yesterday && entry.date < today);
    case "thisWeek":
      return entries.filter(entry => entry.date >= thisWeekStart);
    case "lastWeek":
      return entries.filter(entry => entry.date >= lastWeekStart && entry.date < thisWeekStart);
    case "thisMonth":
      return entries.filter(entry => entry.date >= thisMonthStart);
    case "lastMonth":
      return entries.filter(entry => entry.date >= lastMonthStart && entry.date < thisMonthStart);
    case "last3Months":
      return entries.filter(entry => entry.date >= last3MonthsStart);
    case "last6Months":
      return entries.filter(entry => entry.date >= last6MonthsStart);
    case "thisYear":
      return entries.filter(entry => entry.date >= thisYearStart);
    default:
      return entries;
  }
};