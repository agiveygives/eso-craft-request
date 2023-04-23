import React from 'react';
import Select from 'react-select';
import { selectStyles } from './SelectStyles';
import { PropTypes } from './types';

const CustomSelect = ({ className, options, placeholder, defaultValue }: PropTypes) => {
  return (
    <Select
      className={className}
      options={options}
      placeholder={placeholder}
      defaultValue={defaultValue}
      styles={selectStyles}
    />
  )
}

export default CustomSelect;
