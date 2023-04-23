import React, { useState } from 'react';
import { LabeledContainer, NativeSelect, NumberInput } from '@/burtUI';
import styles from './styles.module.css';

const PaymentOptions = () => {
  const [crafterTip, setCrafterTip] = useState<string>('');

  return (
    <div className={styles.container}>
      <LabeledContainer
        className={styles.selectContainer}
        labelClassName={styles.selectLabel}
        label='Payment Type'
        color='primary'
      >
        <NativeSelect
          defaultValue='materials'
          options={[
            { value: 'materials', display: 'Materials' },
            { value: 'gold', display: 'Gold' },
          ]}
        />
      </LabeledContainer>

      <NumberInput
        label='Crafter Tip'
        direction='inside'
        value={crafterTip}
        onChange={(value) => setCrafterTip(value)}
      />
    </div>
  )
}

export default PaymentOptions;
