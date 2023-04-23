import type { RefObject } from 'react';

export type PopoverPropTypes = {
  show?: boolean;
  children: JSX.Element | string;
  ref?: RefObject<HTMLDivElement>;
  contentClassName?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  header?: JSX.Element | string;
}
