import React, { useId, useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import { Label } from '../Label';
import { NumberInputPropTypes } from './types';
import sharedStyles from '../styles.module.css';
import styles from './styles.module.css';

const NumberInput = ({
  label,
  placeholder,
  value,
  allowNegative,
  onChange,
  onBlur,
  direction
}: NumberInputPropTypes) => {
  const numberInputId = useId();
  const [inFocus, setInFocus] = useState<boolean>(false);

  const preventNegative = (event: ChangeEvent<HTMLInputElement>) => {
    if (allowNegative) {
      return event.target.value;
    }

    const valueAsNum = parseInt(event.target.value, 10);

    if (!valueAsNum) {
      return '';
    }

    return Math.abs(valueAsNum).toString()
  }

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
            inputId={numberInputId}
          >
            {label}
          </Label>
        ) : null
      }
      <input
        id={numberInputId}
        className={classNames(sharedStyles.input, styles.numberInput)}
        type='number'
        pattern="[0-9]*"
        placeholder={label && direction === 'inside' ? label : placeholder}
        value={value}
        min={allowNegative ? undefined : '0'}
        onChange={(event) => {
          let value = preventNegative(event)

          onChange && onChange(value)
        }}
        onBlur={(event) => {
          let value = preventNegative(event)

          setInFocus(false);
          onBlur && onBlur(value);
        }}
        onFocus={() => setInFocus(true)}
      />
    </fieldset>
  )
}

NumberInput.defaultProps = {
  allowNegative: false,
}

export default NumberInput;
