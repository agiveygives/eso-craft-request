import { StylesConfig } from 'react-select';
import { SelectOptionType } from '@/types/selectOption';

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const selectStyles: StylesConfig<SelectOptionType> = {
  control: (styles) => ({ ...styles, backgroundColor: 'var(--input--background-color)' }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'var(--input--background-color)',
    color: 'var(--input--color)',
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = data.color || 'var(--primary)';
    return {
      ...styles,
      backgroundColor: isSelected
        ? color
        : 'var(--input--background-color)',
      color: 'var(--input--color)',
      filter: isFocused
        ? 'contrast(70%)'
        : undefined,
      cursor: 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected
          ? color
          : undefined,
        filter: !isSelected
          ? 'contrast(70%)'
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, color: 'var(--input--color)', ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('red') }),
  singleValue: (styles, { data }) => ({ ...styles, color: 'var(--input--color)', ...dot(data.color || 'var(--primary)') }),
};
