interface DropdownSelectorProps {
  onChange: (value: string) => void;
  value: string;
  classes?: string;
  style?: React.CSSProperties;
  title: string;
  id: string;
  isRequired?: boolean;
  isOneLiner?: boolean;
  dropdownValues: DropdownDataType[];
  height?: DropdownSelectorHeight;
  dropdownSelectStyle?: React.CSSProperties;
}

interface DropdownDataType {
  title: string;
  value: string;
}
