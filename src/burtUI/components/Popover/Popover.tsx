import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { PopoverPropTypes } from './types';
import styles from './styles.module.css';

const Popover = forwardRef<HTMLDivElement, PopoverPropTypes>(function Popover({ show, header, children, contentClassName }, ref) {
  return (
    <div ref={ref} className={classNames(styles.popover, { [styles.hidden]: !show })}>
      <div>{header}</div>
      <div className={classNames(styles.content, contentClassName)}>
        {children}
      </div>
    </div>
  )
})

Popover.defaultProps = {
  show: false,
}

export default Popover;
