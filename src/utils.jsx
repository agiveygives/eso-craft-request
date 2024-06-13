import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

// eslint-disable-next-line default-param-last
export const generateSelectOptions = (option, key = 'Payment Option', optiondata = {}, intl) => (
  <MenuItem key={option} optiondata={optiondata} piecekey={key} value={option}>
    {intl.formatMessage({ id: option })}
  </MenuItem>
);

const utils = {
  generateSelectOptions,
};

export default utils;
