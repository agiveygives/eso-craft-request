import { armorTraits, armorGlyphs, armorWeights } from '../constants/armorOptions'
import { jewelryTraits, jewelryGlyphs } from '../constants/jewelryOptions'
import { weaponTraits, weaponGlyphs, primaryWeapons, secondaryWeapons } from '../constants/weaponOptions'
import setOptions from '../constants/setOptions';
import styleOptions from '../constants/styleOptions';
import { qualityOptions } from '../constants/qualityOptions'

function createGearState(
  armor={
    head: { weight: '', glyph: '', set: '' },
    shoulder: { weight: '', glyph: '', set: '' },
    chest: { weight: '', glyph: '', set: '' },
    legs: { weight: '', glyph: '', set: '' },
    waist: { weight: '', glyph: '', set: '' },
    hands: { weight: '', glyph: '', set: '' },
    feet: { weight: '', glyph: '', set: '' }
  },
  jewelry={
    necklace: { trait: '', glyph: '', set: '' },
    ring1: { trait: '', glyph: '', set: '' },
    ring2: { trait: '', glyph: '', set: '' }
  },
  weapons={
    pieces: [],
    primary1: { weapon: '', glyph: '', set: '' },
    secondary1: { weapon: '', glyph: '', set: '' },
    primary2: { weapon: '', glyph: '', set: '' },
    secondary2: { weapon: '', glyph: '', set: '' }
  }
) {

  const secondary1Traits = weapons.secondary1.weapon === 'Shield' ? armorTraits : weaponTraits
  const secondary1Glyphs = weapons.secondary1.weapon === 'Shield' ? armorGlyphs : weaponGlyphs
  const secondary2Traits = weapons.secondary2.weapon === 'Shield' ? armorTraits : weaponTraits
  const secondary2Glyphs = weapons.secondary2.weapon === 'Shield' ? armorGlyphs : weaponGlyphs

  return {
    armorPieces: ['head', 'shoulder', 'chest', 'legs', 'waist', 'hands', 'feet'],
    jewelryPieces: ['necklace', 'ring1', 'ring2'],
    weaponPieces: weapons.pieces,
    armorAttributes: {
      head: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.head.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.head.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.head.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      shoulder: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.shoulder.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.shoulder.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.shoulder.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      chest: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.chest.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.chest.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.chest.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      legs: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.legs.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.legs.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.legs.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      waist: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.waist.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.waist.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.waist.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      hands: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.hands.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.hands.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.hands.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      feet: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weight: armorWeights.find(armorWeight => armorWeight.value === armor.feet.weight),
        Trait: armorTraits.find(armorTrait => armorTrait.value === 'Training'),
        Glyph: armorGlyphs.find(armorGlyph => armorGlyph.value === armor.feet.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === armor.feet.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      }
    },
    jewelryAttributes: {
      necklace: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Fine'),
        Trait: jewelryTraits.find(jewelryTrait => jewelryTrait.value === jewelry.necklace.trait),
        Glyph: jewelryGlyphs.find(jewelryGlyph => jewelryGlyph.value === jewelry.necklace.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === jewelry.necklace.set)
      },
      ring1: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Fine'),
        Trait: jewelryTraits.find(jewelryTrait => jewelryTrait.value === jewelry.ring1.trait),
        Glyph: jewelryGlyphs.find(jewelryGlyph => jewelryGlyph.value === jewelry.ring1.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === jewelry.ring1.set)
      },
      ring2: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Fine'),
        Trait: jewelryTraits.find(jewelryTrait => jewelryTrait.value === jewelry.ring2.trait),
        Glyph: jewelryGlyphs.find(jewelryGlyph => jewelryGlyph.value === jewelry.ring2.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === jewelry.ring2.set)
      }
    },
    weaponAttributes: {
      primary1: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weapon: primaryWeapons.find(primaryWeapon => primaryWeapon.value === weapons.primary1.weapon),
        Trait: weaponTraits.find(weaponTrait => weaponTrait.value === 'Training'),
        Glyph: weaponGlyphs.find(weaponGlyph => weaponGlyph.value === weapons.primary1.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === weapons.primary1.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      secondary1: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weapon: secondaryWeapons.find(secondaryWeapon => secondaryWeapon.value === weapons.secondary1.weapon),
        Trait: secondary1Traits.find(trait => trait.value === 'Training'),
        Glyph: secondary1Glyphs.find(glyph => glyph.value === weapons.secondary1.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === weapons.secondary1.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      primary2: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weapon: primaryWeapons.find(primaryWeapon => primaryWeapon.value === weapons.primary2.weapon),
        Trait: weaponTraits.find(weaponTrait => weaponTrait.value === 'Training'),
        Glyph: weaponGlyphs.find(weaponGlyph => weaponGlyph.value === weapons.primary2.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === weapons.primary2.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      },
      secondary2: {
        Quality: qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Weapon: secondaryWeapons.find(secondaryWeapon => secondaryWeapon.value === weapons.secondary2.weapon),
        Trait: secondary2Traits.find(trait => trait.value === 'Training'),
        Glyph: secondary2Glyphs.find(glyph => glyph.value === weapons.secondary2.glyph),
        'Glyph Quality': qualityOptions.find(qualityOption => qualityOption.value === 'Superior'),
        Set: setOptions.find(setOption => setOption.value === weapons.secondary2.set),
        Style: styleOptions.find(styleOption => styleOption.value === 'No Preference')
      }
    }
  }
}

export default {
  none: {
    display: 'None',
    gearStateAttributes: createGearState()
  },
  magDps: {
    display: 'Magicka DPS',
    gearStateAttributes: createGearState(
      {
        head:     { weight: 'Light',  glyph: 'Magicka', set: 'Armor of the Seducer' },
        shoulder: { weight: 'Light',  glyph: 'Magicka', set: 'Armor of the Seducer' },
        chest:    { weight: 'Heavy',  glyph: 'Magicka', set: 'Law of Julianos'      },
        legs:     { weight: 'Medium', glyph: 'Magicka', set: 'Law of Julianos'      },
        waist:    { weight: 'Light',  glyph: 'Magicka', set: 'Law of Julianos'      },
        hands:    { weight: 'Light',  glyph: 'Magicka', set: 'Law of Julianos'      },
        feet:     { weight: 'Light',  glyph: 'Magicka', set: 'Law of Julianos'      }
      },
      {
        necklace: { trait: 'Arcane', glyph: 'Increase Magical Harm', set: 'Magnus\' Gift' },
        ring1:    { trait: 'Arcane', glyph: 'Increase Magical Harm', set: 'Magnus\' Gift' },
        ring2:    { trait: 'Arcane', glyph: 'Increase Magical Harm', set: 'Magnus\' Gift' }
      },
      {
        pieces: ['primary1', 'primary2'],
        primary1:   { weapon: 'Lightning Staff', glyph: 'Flame', set: 'Magnus\' Gift' },
        secondary1: { weapon: '',                glyph: '', set: ''              },
        primary2:   { weapon: 'Lightning Staff', glyph: 'Flame', set: 'Magnus\' Gift' },
        secondary2: { weapon: '',                glyph: '', set: ''              }
      }
    )
  },
  stamDps: {
    display: 'Stamina DPS',
    gearStateAttributes: createGearState(
      {
        head:     { weight: 'Medium', glyph: 'Stamina', set: 'Night Mother\'s Gaze' },
        shoulder: { weight: 'Medium', glyph: 'Stamina', set: 'Night Mother\'s Gaze' },
        chest:    { weight: 'Heavy',  glyph: 'Stamina', set: 'Hunding\'s Rage'      },
        legs:     { weight: 'Medium', glyph: 'Stamina', set: 'Hunding\'s Rage'      },
        waist:    { weight: 'Light',  glyph: 'Stamina', set: 'Hunding\'s Rage'      },
        hands:    { weight: 'Medium', glyph: 'Stamina', set: 'Hunding\'s Rage'      },
        feet:     { weight: 'Medium', glyph: 'Stamina', set: 'Hunding\'s Rage'      }
      },
      {
        necklace: { trait: 'Robust', glyph: 'Increase Physical Harm', set: 'Ancient Dragonguard' },
        ring1:    { trait: 'Robust', glyph: 'Increase Physical Harm', set: 'Ancient Dragonguard' },
        ring2:    { trait: 'Robust', glyph: 'Increase Physical Harm', set: 'Ancient Dragonguard' }
      },
      {
        pieces: ['primary1', 'primary2'],
        primary1:   { weapon: 'Battle Axe', glyph: 'Flame', set: 'Ancient Dragonguard' },
        secondary1: { weapon: '',           glyph: '',      set: ''                    },
        primary2:   { weapon: 'Bow',        glyph: 'Flame', set: 'Ancient Dragonguard' },
        secondary2: { weapon: '',           glyph: '',      set: ''                    }
      }
    )
  },
  tank: {
    display: 'Tank',
    gearStateAttributes: createGearState(
      {
        head:     { weight: 'Heavy',  glyph: 'Stamina', set: 'Night\'s Silence' },
        shoulder: { weight: 'Heavy',  glyph: 'Health',  set: 'Night\'s Silence' },
        chest:    { weight: 'Heavy',  glyph: 'Stamina', set: 'Fortified Brass'  },
        legs:     { weight: 'Heavy',  glyph: 'Stamina', set: 'Fortified Brass'  },
        waist:    { weight: 'Light',  glyph: 'Health',  set: 'Fortified Brass'  },
        hands:    { weight: 'Heavy',  glyph: 'Health',  set: 'Fortified Brass'  },
        feet:     { weight: 'Medium', glyph: 'Health',  set: 'Fortified Brass'  }
      },
      {
        necklace: { trait: 'Robust', glyph: 'Reduce Feat Cost', set: 'Torug\'s Pact' },
        ring1:    { trait: 'Robust', glyph: 'Reduce Feat Cost', set: 'Torug\'s Pact' },
        ring2:    { trait: 'Robust', glyph: 'Reduce Feat Cost', set: 'Torug\'s Pact' }
      },
      {
        pieces: ['primary1', 'secondary1', 'primary2'],
        primary1:   { weapon: 'Sword',           glyph: 'Weakening', set: 'Torug\'s Pact' },
        secondary1: { weapon: 'Shield',          glyph: 'Health',    set: 'Torug\'s Pact' },
        primary2:   { weapon: 'Lightning Staff', glyph: 'Crushing',  set: 'Torug\'s Pact' },
        secondary2: { weapon: '',                glyph: '',          set: ''              }
      }
    )
  },
  healer: {
    display: 'Healer',
    gearStateAttributes: createGearState(
      {
        head:     { weight: 'Light',  glyph: 'Magicka', set: 'Magnus\' Gift'        },
        shoulder: { weight: 'Light',  glyph: 'Magicka', set: 'Magnus\' Gift'        },
        chest:    { weight: 'Heavy',  glyph: 'Magicka', set: 'Kaegrenac\'s Hope'    },
        legs:     { weight: 'Medium', glyph: 'Magicka', set: 'Kaegrenac\'s Hope'    },
        waist:    { weight: 'Light',  glyph: 'Magicka', set: 'Armor of the Seducer' },
        hands:    { weight: 'Light',  glyph: 'Magicka', set: 'Kaegrenac\'s Hope'    },
        feet:     { weight: 'Light',  glyph: 'Magicka', set: 'Armor of the Seducer' }
      },
      {
        necklace: { trait: 'Arcane', glyph: 'Reduce Spell Cost', set: 'Armor of the Seducer' },
        ring1:    { trait: 'Arcane', glyph: 'Reduce Spell Cost', set: 'Armor of the Seducer' },
        ring2:    { trait: 'Arcane', glyph: 'Reduce Spell Cost', set: 'Armor of the Seducer' }
      },
      {
        pieces: ['primary1', 'primary2'],
        primary1:   { weapon: 'Restoration Staff', glyph: 'Absorb Magicka', set: 'Kaegrenac\'s Hope' },
        secondary1: { weapon: '',                  glyph: '',               set: ''                  },
        primary2:   { weapon: 'Lightning Staff',   glyph: 'Absorb Magicka', set: 'Kaegrenac\'s Hope' },
        secondary2: { weapon: '',                  glyph: '',               set: ''                  }
      }
    )
  }
}
