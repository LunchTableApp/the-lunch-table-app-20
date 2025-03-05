import { HeaderActions } from "./HeaderActions";
export const LoggedEntriesHeader = () => <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-green-400">
      Logged Entries
    </h1>
    <HeaderActions />
  </div>;