interface FormProgressBarProps {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[];
}

interface ProgressIndicatorProps {
  fill: boolean;
  number: number;
  title: string;
  renderLeftLine?: boolean;
  renderRightLine?: boolean;
  fillRightLine: boolean;
  isHighlighed: boolean;
}
