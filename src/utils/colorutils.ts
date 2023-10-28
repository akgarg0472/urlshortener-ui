export const generateChartBgAndHoverColorArrays = (
  numberOfColors: number
): {
  backgroundColor: string[];
  hoverBackgroundColor: string[];
} => {
  const backgroundColor: string[] = [];
  const hoverBackgroundColor: string[] = [];

  for (let i = 0; i < numberOfColors; i++) {
    const hue = Math.floor(Math.random() * 360);

    const backgroundRGB = `hsla(${hue}, 70%, 60%, 0.667)`;
    const hoverRGB = `hsla(${hue}, 70%, 60%, 1)`;

    backgroundColor.push(backgroundRGB);
    hoverBackgroundColor.push(hoverRGB);
  }

  return { backgroundColor, hoverBackgroundColor };
};

export const generateChartBgAndBorderColorArrays = (
  numberOfColors: number
): {
  backgroundColor: string[];
  borderColor: string[];
} => {
  const backgroundColor: string[] = [];
  const borderColor: string[] = [];

  for (let i = 0; i < numberOfColors; i++) {
    const hue = Math.floor(Math.random() * 360);

    const backgroundRGB = `hsla(${hue}, 70%, 60%, 0.667)`;
    const borderRGB = `hsla(${hue}, 70%, 60%, 1)`;

    backgroundColor.push(backgroundRGB);
    borderColor.push(borderRGB);
  }

  return { backgroundColor, borderColor };
};
