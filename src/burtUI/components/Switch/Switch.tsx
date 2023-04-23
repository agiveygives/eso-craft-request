import React, { useEffect, useState } from 'react';
import { SwitchPropTypes } from './types';
import styles from './styles.module.css';

const Switch = ({ checked, onToggle }: SwitchPropTypes) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked])

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onClick={() => {
          setIsChecked((oldChecked) => !oldChecked);
        }}
        onChange={() => {
          onToggle && onToggle();
        }}
      />
      <span className={styles.slider} />
    </label>
  )
}

export default Switch;
