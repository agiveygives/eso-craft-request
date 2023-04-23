export type NumberInputPropTypes = {
  label?: string;
  direction?: 'vertical' | 'horizontal' | 'inside'; // maybe not inside?
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  allowNegative?: boolean;
}
