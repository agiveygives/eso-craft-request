// https://en.uesp.net/wiki/Online:Styles

import styles from './styles';

export const rawMotifs = [
  {
    value: 'style.none', stone: 'stone.any', label: 'style.none', color: '#fcb935', isFixed: true,
  },
].concat(
  styles.map((style) => ({
    value: style.name, stone: style.stone, label: style.name, color: '#2DC50E', isFixed: true,
  })),
);

const sortedMotifs = (intl) => [
  {
    value: 'style.none', stone: 'stone.any', label: 'style.none', color: '#fcb935', isFixed: true,
  },
].concat(
  styles.sort((a, b) => ((intl.formatMessage({ id: a.name }) > intl.formatMessage({ id: b.name })) ? 1 : -1))
    .map((style) => ({
      value: style.name, stone: style.stone, label: style.name, color: '#2DC50E', isFixed: true,
    })),
);

export default sortedMotifs;
