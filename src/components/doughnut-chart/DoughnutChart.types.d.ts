interface DoughnutChartProps {
  data: DoughnutChartData[];
  datasetLabel: string;
  legendPosition: "top" | "bottom" | "left" | "right";
  borderWidth?: number;
}

interface DoughnutChartData {
  label: string;
  value: string | number;
}
