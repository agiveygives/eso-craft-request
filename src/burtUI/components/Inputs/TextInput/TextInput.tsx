import React, { useId, useState } from 'react';
import classNames from 'classnames';
import { Label } from '../Label';
import { TextInputPropTypes } from './types';
import sharedStyles from '../styles.module.css';

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  direction
}: TextInputPropTypes) => {
  const textInputId = useId();
  const [inFocus, setInFocus] = useState<boolean>(false);

  return (
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
            inputId={textInputId}
          >
            {label}
          </Label>
        ) : null
      }
      <input
        id={textInputId}
        className={sharedStyles.input}
        type='text'
        placeholder={label && direction === 'inside' ? label : placeholder}
        value={value}
        onChange={onChange}
        onBlur={(event) => {
          setInFocus(false);
          onBlur && onBlur(event);
        }}
        onFocus={() => setInFocus(true)}
      />
    </fieldset>
  )
}

export default TextInput;
