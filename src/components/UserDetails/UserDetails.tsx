import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TextInput, LabeledContainer } from '@/burtUI';
import craftableLevels from '../../constants/craftableLevels';
import styles from './styles.module.css';

const UserDetails = () => {
  const [username, setUsername] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(0);

  return (
    <div className={styles.container}>
      <TextInput
        label="ESO Username"
        direction='inside'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <LabeledContainer
        label={`Armor Level ${craftableLevels[sliderValue]}`}
        color='light'
        labelSize='lg'
      >
        <Slider
          min={0}
          max={craftableLevels.length - 1}
          value={sliderValue}
          onChange={(value) => {
            if (!Array.isArray(value)) {
              setSliderValue(value)
            }
          }}
          trackStyle={[{backgroundColor: 'var(--primary)'}]}
        />
      </LabeledContainer>
    </div>
  );
}

export default UserDetails;
