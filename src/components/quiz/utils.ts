
export const generatePersonalizedPlan = (answers: string[]) => {
  const loggingFrequency = answers[6].replace('times', '');
  const duration = answers[7].replace('months', '');
  
  const recommendations: string[] = [];
  
  // Food adventurousness (Q1)
  if (answers[0] === 'veryLikely' || answers[0] === 'somewhatLikely') {
    recommendations.push("Your openness to trying new foods is a great strength! We'll help you explore diverse, nutritious options.");
  } else {
    recommendations.push("We'll start slowly with familiar foods and gradually introduce new options at your comfort level.");
  }

  // Food restriction (Q2)
  if (answers[1] === 'veryLikely' || answers[1] === 'somewhatLikely') {
    recommendations.push("We'll work on developing a more flexible relationship with food, focusing on nourishment rather than restriction.");
  }

  // Body image (Q3)
  if (answers[2] === 'veryLikely' || answers[2] === 'somewhatLikely') {
    recommendations.push("We'll focus on building a positive relationship between food and body image, emphasizing health and well-being.");
  }

  // Safety foods (Q4)
  if (answers[3] === 'veryLikely' || answers[3] === 'somewhatLikely') {
    recommendations.push("We'll start with your comfort foods and gradually expand your food variety in a safe, supportive way.");
  }

  // Goal orientation (Q5)
  if (answers[4] === 'veryLikely' || answers[4] === 'somewhatLikely') {
    recommendations.push("Your dedication to goals will be a valuable asset in your journey to better food relationships.");
  }

  // Support seeking (Q6)
  if (answers[5] === 'notLikely' || answers[5] === 'somewhatUnlikely') {
    recommendations.push("We'll help you build confidence in reaching out for support when needed.");
  }

  return {
    duration: `${duration} months`,
    frequency: `${loggingFrequency} times per week`,
    recommendations,
  };
};
