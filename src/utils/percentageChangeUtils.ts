type PercentageChange = {
  percentage: string;
  direction: 1 | -1 | 0;
};

export const calculatePercentChange = (
  currValue: string | number,
  prevValue: string | undefined
): PercentageChange | undefined => {
  if (prevValue == undefined) {
    return;
  }

  const currentValue = parseInt(currValue.toString());
  const previousValue = parseInt(prevValue.toString());

  let percentageChange = 0;
  let direction: 1 | -1 | 0 = 0;

  if (previousValue === 0 && currentValue > 0) {
    percentageChange = 100;
    direction = 1;
  } else if (previousValue > 0) {
    percentageChange = ((currentValue - previousValue) / previousValue) * 100;
    direction = percentageChange > 0 ? 1 : percentageChange < 0 ? -1 : 0;
  }

  const result = {
    percentage: `${Math.round(percentageChange * 100) / 100}%`,
    direction: direction,
  };

  return result;
};
