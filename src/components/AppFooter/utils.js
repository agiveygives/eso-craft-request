const buttonDisabled = (
  esoName,
  armorPieces,
  jewelryPieces,
  weaponPieces,
  armorAttributes,
  jewelryAttributes,
  weaponAttributes,
) => {
  if (esoName[0] !== '@' || esoName.length < 2
    || (!armorPieces.length && !jewelryPieces.length && !weaponPieces.length)
  ) {
    return true;
  }
  let undefinedAttributes = false;

  armorPieces.forEach((piece) => {
    Object.keys(armorAttributes[piece]).forEach((attribute) => {
      if (!armorAttributes[piece][attribute]) {
        if (attribute === 'Glyph Quality' && armorAttributes[piece].Glyph !== 'common.none') {
          undefinedAttributes = true;
        } else if (attribute !== 'Glyph Quality') {
          undefinedAttributes = true;
        }
      }
    });
  });

  jewelryPieces.forEach((piece) => {
    Object.keys(jewelryAttributes[piece]).forEach((attribute) => {
      if (!jewelryAttributes[piece][attribute]) {
        if (attribute === 'Glyph Quality' && jewelryAttributes[piece].Glyph !== 'common.none') {
          undefinedAttributes = true;
        } else if (attribute !== 'Glyph Quality') {
          undefinedAttributes = true;
        }
      }
    });
  });

  weaponPieces.forEach((piece) => {
    Object.keys(weaponAttributes[piece]).forEach((attribute) => {
      if (!weaponAttributes[piece][attribute] && weaponAttributes[piece].Glyph !== 'common.none') {
        if (attribute === 'Glyph Quality' && weaponAttributes[piece].Glyph !== 'common.none') {
          undefinedAttributes = true;
        } else if (attribute !== 'Glyph Quality') {
          undefinedAttributes = true;
        }
      }
    });
  });

  return undefinedAttributes;
};

export default buttonDisabled;
