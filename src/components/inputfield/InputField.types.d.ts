interface InputFieldProps {
  title: string;
  text: string;
  type: InputFieldType;
  placeholder?: string;
  className?: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputFieldStyle?: React.CSSProperties;
}

interface HorizontalInputFieldProps {
  title: string;
  text: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  className?: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputFieldStyle?: React.CSSProperties;
}
