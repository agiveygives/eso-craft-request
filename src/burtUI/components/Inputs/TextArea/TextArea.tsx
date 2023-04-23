import React, { useId, useState } from 'react';
import classNames from 'classnames';
import { Label } from '../Label';
import { TextAreaPropTypes } from './types';
import sharedStyles from '../styles.module.css';
import styles from './styles.module.css';

const TextArea = ({
  direction, label, placeholder, value, onChange, onBlur, allowVerticalResize,
  allowHorizontalResize,
}: TextAreaPropTypes) => {
  const textareaInputId = useId();
  const [inFocus, setInFocus] = useState(false);

  return(
    <fieldset
      className={classNames(
        sharedStyles.container,
        {
          [sharedStyles.horizontal]: direction === 'horizontal',
          [sharedStyles.vertical]: direction === 'vertical',
        }
      )}
    >
      {
        label ? (
          <Label
            direction={direction}
            inFocus={inFocus}
            inputValue={value}
            inputId={textareaInputId}
          >
            {label}
          </Label>
        ) : null
      }

      <textarea
        className={classNames(sharedStyles.input, {
          [styles.noResize]: !allowHorizontalResize && !allowVerticalResize,
          [styles.onlyVerticalResize]: !allowHorizontalResize && allowVerticalResize,
          [styles.onlyHorizontalResize]: allowHorizontalResize && !allowVerticalResize,
          [styles.allowResize]: allowHorizontalResize && allowVerticalResize,
        })}
        placeholder={label && direction === 'inside' ? label : placeholder}
        value={value}
        onChange={(event) => {
          onChange && onChange(event.target.value)
        }}
        onBlur={(event) => {
          setInFocus(false);
          onBlur && onBlur(event.target.value)
        }}
        onFocus={() => setInFocus(true)}
      />
    </fieldset>
  )
}

export default TextArea;
