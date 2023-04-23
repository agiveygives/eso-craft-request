export interface BaseSelectPropTypes {
  className?: string;
  options: {
    value: string | number;
    display: string;
  }[];
  defaultValue?: string | number;
}
