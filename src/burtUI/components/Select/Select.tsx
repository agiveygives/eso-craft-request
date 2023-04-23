import React from 'react';
import NativeSelect from './NativeSelect';
import StyledSelect from './StyledSelect';
import { BaseSelectPropTypes } from './types';

const Select = ({ className, options }: BaseSelectPropTypes) => {
  return (
    <StyledSelect className={className} options={options} />
  )
}

export default Select;
