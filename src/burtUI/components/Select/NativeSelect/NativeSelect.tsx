import React from 'react';
import classNames from 'classnames';
import { NativeSelectPropTypes } from './types';
import sharedStyled from '../styles.module.css';

const NativeSelect = ({ className, options }: NativeSelectPropTypes) => {
  return (
    <select className={classNames(sharedStyled.select, className)}>
      {
        options.map(({ value, display }) => (
          <option key={value} value={value}>{display}</option>
        ))
      }
    </select>
  )
}

export default NativeSelect;
