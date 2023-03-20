import React from 'react';
import classNames from 'classnames';
import { ButtonPropTypes } from './types';
import styles from './styles.module.css';

const Button = ({ type, variant, children }: ButtonPropTypes) => (
  <button className={classNames(styles.button, { [styles.primary]: type === 'primary' })}>
    {children}
  </button>
);

Button.defaultProps = {
  type: 'primary',
  variant: 'filled',
}

export default Button;
