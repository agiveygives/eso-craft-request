import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const generateSelectOptions = (option, key = 'Payment Option', optiondata = {}) => (
  <MenuItem optiondata={optiondata} piecekey={key} value={option}>{option}</MenuItem>
);

export default {
  generateSelectOptions
};
