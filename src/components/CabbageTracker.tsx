interface CabbageTrackerProps {
  newFoodsCount: number;
  monthlyGoal: number;
}

export const CabbageTracker = ({ newFoodsCount, monthlyGoal }: CabbageTrackerProps) => {
  const percentage = Math.min((newFoodsCount / monthlyGoal) * 100, 100);
  const leaves = Array.from({ length: monthlyGoal }, (_, i) => i < newFoodsCount);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">New Foods Progress</h2>
      <div className="flex justify-center mb-4">
        <div className="relative w-64 h-64">
          {leaves.map((filled, index) => {
            const angle = (index * 360) / monthlyGoal;
            const radius = 100;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={index}
                className={`absolute w-8 h-8 rounded-full transition-colors duration-300 ${
                  filled ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{
                  left: `${x + radius}px`,
                  top: `${y + radius}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">
          {newFoodsCount} of {monthlyGoal} new foods tried
        </p>
        <p className="text-sm text-gray-500">
          {percentage.toFixed(0)}% of monthly goal
        </p>
      </div>
    </div>
  );
};