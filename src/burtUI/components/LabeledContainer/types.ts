export type LabeledContainerPropTypes = {
  className?: string;
  labelClassName?: string;
  label: string;
  children: JSX.Element | string;
  bordered?: boolean;
  color?: 'primary' | 'light';
  labelSize?: 'sm' | 'md' | 'lg';
}
