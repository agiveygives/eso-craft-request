import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export const generateSelectOptions = (option, key = 'Payment Option', optiondata = {}) => (
  <MenuItem key={option} optiondata={optiondata} piecekey={key} value={option}>{option}</MenuItem>
);

export default {
  generateSelectOptions
};
