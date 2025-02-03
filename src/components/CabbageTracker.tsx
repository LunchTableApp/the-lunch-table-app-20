interface CabbageTrackerProps {
  newFoodsCount: number;
  monthlyGoal: number;
}

export const CabbageTracker = ({ newFoodsCount, monthlyGoal }: CabbageTrackerProps) => {
  const percentage = Math.min((newFoodsCount / monthlyGoal) * 100, 100);
  const isGoalCompleted = newFoodsCount >= monthlyGoal;
  
  // Calculate the circumference and offset for the progress ring
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-black">New Foods Progress</h2>
      <div className="flex justify-center mb-4">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="stroke-gray-200"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="stroke-primary transition-all duration-500"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {newFoodsCount}/{monthlyGoal}
            </span>
          </div>

          {/* Confetti animation for goal completion */}
          {isGoalCompleted && (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`confetti-${i}`}
                  className="absolute w-2 h-2 bg-primary animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${1 + Math.random()}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="text-center">
        {isGoalCompleted ? (
          <p className="text-lg font-bold text-green-500">
            🎉 Congratulations! You've reached your monthly goal! 🎉
          </p>
        ) : (
          <p className="text-lg font-medium">
            {newFoodsCount} of {monthlyGoal} new foods tried
          </p>
        )}
        <p className="text-sm text-gray-500">
          {percentage.toFixed(0)}% of monthly goal
        </p>
      </div>
    </div>
  );
};
