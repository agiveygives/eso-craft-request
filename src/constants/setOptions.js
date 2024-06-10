// https://en.uesp.net/wiki/Online:Craftable_Sets
// use https://eso-sets.com/ to get French translations

import craftedSets from './sets';

const sortedSets = (intl) => [
  {
    value: 'common.none', label: 'common.none', color: '#fcb935', isFixed: true,
  },
].concat(
  craftedSets.sort((a, b) => ((intl.formatMessage({ id: a }) > intl.formatMessage({ id: b })) ? 1 : -1))
    .map((set) => ({
      value: set, label: set, color: '#2DC50E', isFixed: true,
    })),
);

export default sortedSets;
