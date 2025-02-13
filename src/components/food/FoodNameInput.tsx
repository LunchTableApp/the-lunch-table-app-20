
interface FoodNameInputProps {
  name: string;
  setName: (value: string) => void;
}

export const FoodNameInput = ({ name, setName }: FoodNameInputProps) => (
  <div className="mb-4">
    <label htmlFor="food-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Food Name
    </label>
    <input
      id="food-name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-black dark:text-white"
      placeholder="Enter food name..."
    />
  </div>
);
