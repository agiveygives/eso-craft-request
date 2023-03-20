import React, { useState } from 'react';
import { SwitchPropTypes } from './types';
import styles from './styles.module.css';

const Switch = ({ onToggle }: SwitchPropTypes) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <label className={styles.switch}>
      <input type="checkbox" className={styles.checkbox} checked={checked} onClick={() => {
        setChecked((oldChecked) => !oldChecked);
        onToggle && onToggle();
      }} />
      <span className={styles.slider} />
    </label>
  )
}

export default Switch;
