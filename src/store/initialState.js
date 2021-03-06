const initialState = {
  locale: 'en-US',
  guildMnemonic: '',
  guildRequestCode: '',
  guildData: {},
  termsAccepted: false,
  termsOpen: true,
  review: false,
  success: false,
  failed: false,
  lastMessage: '',
  esoName: '',
  levelSliderValue: 0,
  payment: 'user.payment.materials',
  gearLevel: '1',
  notes: '',
  armorPieces: [],
  jewelryPieces: [],
  weaponPieces: [],
  armorAttributes: {
    display: 'gear.armor',
    head: {
      display: 'gear.armor.head',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    shoulder: {
      display: 'gear.armor.shoulder',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    chest: {
      display: 'gear.armor.chest',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    legs: {
      display: 'gear.armor.legs',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    waist: {
      display: 'gear.armor.waist',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    hands: {
      display: 'gear.armor.hands',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    feet: {
      display: 'gear.armor.feet',
      Quality: '',
      Weight: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
  },
  jewelryAttributes: {
    display: 'gear.jewelry',
    necklace: {
      display: 'gear.jewelry.necklace',
      Quality: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
    },
    ring1: {
      display: 'gear.jewelry.ring',
      Quality: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
    },
    ring2: {
      display: 'gear.jewelry.ring',
      Quality: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
    },
  },
  weaponAttributes: {
    display: 'gear.weapons',
    primary1: {
      display: 'gear.weapon.primary.display',
      Quality: '',
      Weapon: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    secondary1: {
      display: 'gear.weapon.secondary.display',
      Quality: '',
      Weapon: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    primary2: {
      display: 'gear.weapon.primary.display',
      Quality: '',
      Weapon: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
    secondary2: {
      display: 'gear.weapon.secondary.display',
      Quality: '',
      Weapon: '',
      Trait: '',
      Glyph: '',
      'Glyph Quality': '',
      Set: '',
      Style: '',
    },
  },
  materials: [],
  traits: [],
  styles: [],
  quality: [],
  glyphMaterials: {
    essenceRunes: [],
    potencyRunes: [],
    aspectRunes: [],
  },
};

export default initialState;
