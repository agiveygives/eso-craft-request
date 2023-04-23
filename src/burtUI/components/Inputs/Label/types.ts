export type LabelPropTypes = {
  children: JSX.Element | string;
  direction?: 'vertical' | 'horizontal' | 'inside'; // maybe not inside?
  inFocus?: boolean;
  inputValue?: string;
  inputId: string;
}
