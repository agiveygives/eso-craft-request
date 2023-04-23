import React from 'react';
import classNames from 'classnames';
import { LabelPropTypes } from './types';
import sharedStyles from '../styles.module.css';

const Label = ({ direction, inFocus, inputValue, inputId, children }: LabelPropTypes) => {
  if (direction === 'inside') {
    return (
      <legend
        className={classNames(
          sharedStyles.legend,
          {
            [sharedStyles.hidden]: !inFocus && (!inputValue || inputValue.length <= 0),
            [sharedStyles.visible]: inFocus || inputValue,
          },
        )}
      >
        {children}
      </legend>
    )
  }

  return (
    <label htmlFor={inputId}>
      {children}
    </label>
  )
}

export default Label;
