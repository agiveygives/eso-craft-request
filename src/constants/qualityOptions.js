export const qualityMats = {
  'gear.armor.weight.light': {
    'quality.normal': [],
    'quality.fine': [
      { count: 2, material: 'materials.light.quality.fine' },
    ],
    'quality.superior': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
    ],
    'quality.epic': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
      { count: 4, material: 'materials.light.quality.epic' },
    ],
    'quality.legendary': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
      { count: 4, material: 'materials.light.quality.epic' },
      { count: 8, material: 'materials.light.quality.legendary' },
    ],
  },
  'gear.armor.weight.medium': {
    'quality.normal': [],
    'quality.fine': [
      { count: 2, material: 'materials.light.quality.fine' },
    ],
    'quality.superior': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
    ],
    'quality.epic': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
      { count: 4, material: 'materials.light.quality.epic' },
    ],
    'quality.legendary': [
      { count: 2, material: 'materials.light.quality.fine' },
      { count: 3, material: 'materials.light.quality.superior' },
      { count: 4, material: 'materials.light.quality.epic' },
      { count: 8, material: 'materials.light.quality.legendary' },
    ],
  },
  'gear.armor.weight.heavy': {
    'quality.normal': [],
    'quality.fine': [
      { count: 2, material: 'materials.heavy.quality.fine' },
    ],
    'quality.superior': [
      { count: 2, material: 'materials.heavy.quality.fine' },
      { count: 3, material: 'materials.heavy.quality.superior' },
    ],
    'quality.epic': [
      { count: 2, material: 'materials.heavy.quality.fine' },
      { count: 3, material: 'materials.heavy.quality.superior' },
      { count: 4, material: 'materials.heavy.quality.epic' },
    ],
    'quality.legendary': [
      { count: 2, material: 'materials.heavy.quality.fine' },
      { count: 3, material: 'materials.heavy.quality.superior' },
      { count: 4, material: 'materials.heavy.quality.epic' },
      { count: 8, material: 'materials.heavy.quality.legendary' },
    ],
  },
  wood: {
    'quality.normal': [],
    'quality.fine': [
      { count: 2, material: 'materials.wood.quality.fine' },
    ],
    'quality.superior': [
      { count: 2, material: 'materials.wood.quality.fine' },
      { count: 3, material: 'materials.wood.quality.superior' },
    ],
    'quality.epic': [
      { count: 2, material: 'materials.wood.quality.fine' },
      { count: 3, material: 'materials.wood.quality.superior' },
      { count: 4, material: 'materials.wood.quality.epic' },
    ],
    'quality.legendary': [
      { count: 2, material: 'materials.wood.quality.fine' },
      { count: 3, material: 'materials.wood.quality.superior' },
      { count: 4, material: 'materials.wood.quality.epic' },
      { count: 8, material: 'materials.wood.quality.legendary' },
    ],
  },
  Jewelry: {
    'quality.normal': [],
    'quality.fine': [
      { count: 1, material: 'materials.jewelry.quality.fine' },
    ],
    'quality.superior': [
      { count: 1, material: 'materials.jewelry.quality.fine' },
      { count: 2, material: 'materials.jewelry.quality.superior' },
    ],
    'quality.epic': [
      { count: 1, material: 'materials.jewelry.quality.fine' },
      { count: 2, material: 'materials.jewelry.quality.superior' },
      { count: 3, material: 'materials.jewelry.quality.epic' },
    ],
    'quality.legendary': [
      { count: 1, material: 'materials.jewelry.quality.fine' },
      { count: 2, material: 'materials.jewelry.quality.superior' },
      { count: 3, material: 'materials.jewelry.quality.epic' },
      { count: 4, material: 'materials.jewelry.quality.legendary' },
    ],
  },
};

export const qualityOptions = [
  {
    value: 'quality.normal', label: 'quality.normal', color: '#888888', isFixed: true,
  },
  {
    value: 'quality.fine', label: 'quality.fine', color: '#2DC50E', isFixed: true,
  },
  {
    value: 'quality.superior', label: 'quality.superior', color: '#3A92FF', isFixed: true,
  },
  {
    value: 'quality.epic', label: 'quality.epic', color: '#A02EF7', isFixed: true,
  },
  {
    value: 'quality.legendary', label: 'quality.legendary', color: '#CCAA1A', isFixed: true,
  },
];
