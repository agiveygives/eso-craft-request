import { ChangeEventHandler } from 'react';

export type TextInputPropTypes = {
  label?: string;
  direction?: 'vertical' | 'horizontal' | 'inside'; // maybe not inside?
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}
