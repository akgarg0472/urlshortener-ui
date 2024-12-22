interface BarChartProps {
  data: BarChartData[];
  datasetLabel: string;
  legendPosition?: "top" | "bottom" | "left" | "right";
  borderWidth?: number;
}

interface BarChartData {
  label: string;
  value: string | number;
}
