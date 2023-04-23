import React from 'react';
import classNames from 'classnames';
import { LabeledContainerPropTypes } from './types';
import styles from './styles.module.css';

const LabeledContainer = ({ className, label, labelClassName,  labelSize, bordered, color, children }: LabeledContainerPropTypes) => {
  return (
    <fieldset className={classNames(styles.container, { [styles.bordered]: bordered }, className)}>
      <legend
        className={
          classNames(
            styles.label,
            {
              [styles.primary]: color === 'primary',
              [styles.light]: color === 'light',
              [styles.small]: labelSize === 'sm',
              [styles.medium]: labelSize === 'md',
              [styles.large]: labelSize === 'lg',
            },
            labelClassName
          )
        }
      >
        {label}
      </legend>

      {children}
    </fieldset>
  )
};

LabeledContainer.defaultProps = {
  className: '',
  labelClassName: '',
  bordered: false,
  color: 'primary',
  labelSize: 'md',
}

export default LabeledContainer;
