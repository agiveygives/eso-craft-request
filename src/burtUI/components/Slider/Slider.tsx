import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SliderPropTypes } from './types';
import styles from './styles.module.css';

const Slider = ({ label, bordered, values }: SliderPropTypes) => {
  const [displayValue, setDisplayValue] = useState<string>(values[0]);
  const [value, setValue] = useState<string>('1');

  const maxValue = values.length

  return (
    <fieldset className={classNames(styles.container, { [styles.bordered]: bordered })}>
      <legend>{label} {displayValue}</legend>
      <div className={styles.sliderContainer}>
        <div className={styles.track} style={{ width: `${((parseInt(value, 10) - 1) / maxValue) * 100}%` }} />
        <input
          type="range"
          min="1"
          max={maxValue.toString()}
          className={styles.sliderInput}
          onChange={(event) => {
            setValue(event.target.value)
            setDisplayValue(values[parseInt(event.target.value, 10) - 1])
          }}
          value={value}
        />
      </div>
    </fieldset>
  )
};

export default Slider;
