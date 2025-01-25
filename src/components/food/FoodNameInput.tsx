interface FoodNameInputProps {
  name: string;
  setName: (value: string) => void;
}

export const FoodNameInput = ({ name, setName }: FoodNameInputProps) => (
  <div className="mb-4">
    <label htmlFor="food-name" className="block text-sm font-medium text-gray-700 mb-1">
      Food Name
    </label>
    <input
      id="food-name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Enter food name..."
    />
  </div>
);