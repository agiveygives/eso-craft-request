export const qualityMats = {
  Light: {
    Normal: [],
    Fine: [
      { count: 2, material: 'Hemming' }
    ],
    Superior: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' }
    ],
    Epic: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' },
      { count: 4, material: 'Elegant Lining' }
    ],
    Legendary: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' },
      { count: 4, material: 'Elegant Lining' },
      { count: 8, material: 'Dreagh Wax' }
    ]
  },
  Medium: {
    Normal: [],
    Fine: [
      { count: 2, material: 'Hemming' }
    ],
    Superior: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' }
    ],
    Epic: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' },
      { count: 4, material: 'Elegant Lining' }
    ],
    Legendary: [
      { count: 2, material: 'Hemming' },
      { count: 3, material: 'Embroidery' },
      { count: 4, material: 'Elegant Lining' },
      { count: 8, material: 'Dreagh Wax' }
    ]
  },
  Heavy: {
    Normal: [],
    Fine: [
      { count: 2, material: 'Honing Stone' }
    ],
    Superior: [
      { count: 2, material: 'Honing Stone' },
      { count: 3, material: 'Dwarven Oil' }
    ],
    Epic: [
      { count: 2, material: 'Honing Stone' },
      { count: 3, material: 'Dwarven Oil' },
      { count: 4, material: 'Grain Solvent' }
    ],
    Legendary: [
      { count: 2, material: 'Honing Stone' },
      { count: 3, material: 'Dwarven Oil' },
      { count: 4, material: 'Grain Solvent' },
      { count: 8, material: 'Tempering Alloy' }
    ]
  },
  wood: {
    Normal: [],
    Fine: [
      { count: 2, material: 'Pitch' }
    ],
    Superior: [
      { count: 2, material: 'Pitch' },
      { count: 3, material: 'Turpen' }
    ],
    Epic: [
      { count: 2, material: 'Pitch' },
      { count: 3, material: 'Turpen' },
      { count: 4, material: 'Mastic' }
    ],
    Legendary: [
      { count: 2, material: 'Pitch' },
      { count: 3, material: 'Turpen' },
      { count: 4, material: 'Mastic' },
      { count: 8, material: 'Rosin' }
    ]
  },
  Jewelry: {
    Normal: [],
    Fine: [
      { count: 1, material: 'Terne Plating' }
    ],
    Superior: [
      { count: 1, material: 'Terne Plating' },
      { count: 2, material: 'Iridium Plating' }
    ],
    Epic: [
      { count: 1, material: 'Terne Plating' },
      { count: 2, material: 'Iridium Plating' },
      { count: 3, material: 'Zircon Plating' }
    ],
    Legendary: [
      { count: 1, material: 'Terne Plating' },
      { count: 2, material: 'Iridium Plating' },
      { count: 3, material: 'Zircon Plating' },
      { count: 4, material: 'Chromium Plating' }
    ]
  }
};

export const qualityOptions = [
  { value: 'Normal', label: 'Normal', color: '#888888', isFixed: true },
  { value: 'Fine', label: 'Fine', color: '#2DC50E', isFixed: true },
  { value: 'Superior', label: 'Superior', color: '#3A92FF', isFixed: true },
  { value: 'Epic', label: 'Epic', color: '#A02EF7', isFixed: true },
  { value: 'Legendary', label: 'Legendary', color: '#CCAA1A', isFixed: true }
];
