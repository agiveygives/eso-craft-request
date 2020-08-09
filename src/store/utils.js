import {
  equipmentMats, jewelryMats, ringMatCounts, necklaceMatCounts,
} from '../constants/materials';
import { qualityMats } from '../constants/qualityOptions';
import { additivePotencyRunes, subtractivePotencyRunes, aspectRunes } from '../constants/glyphMats';
import craftableLevels from '../constants/craftableLevels';

/**
 * Calculate the material type and amount needed for the provided piece.
 *
 * @param {String} level - The level of the gear to be crafted.
 * @param {String} gearType - The item type to calculate the materials for.
 * @param {String} weight - The weight of the item for material calculation.
 * @param {String} piece - The item to calculate the materials for.
 *
 * @returns an Object representing the materials needed for the specific item.
 */
const calculateItemMats = (level, gearType, weight, piece) => {
  let initialAmount = 5;
  let maxLevelStart = 13;

  const itemMats = {
    requestPiece: piece,
    gearType,
    weight: '',
    type: '',
    count: 0,
  };

  const getEquipmentMat = (matsList, itemWeight) => {
    const material = matsList.find((mat) => mat.levels.includes(level));
    const index = material.levels.indexOf(level);

    itemMats.weight = itemWeight;
    itemMats.type = material[itemWeight];
    if (level === 'CP 150') {
      itemMats.count = maxLevelStart;
    } else if (level === 'CP 160') {
      itemMats.count = maxLevelStart * 10;
    } else {
      itemMats.count = initialAmount + index;
    }
  };

  const getJewelryMat = (countList) => {
    const matIndex = jewelryMats.findIndex((mat) => mat.levels.includes(level));
    const levelIndex = jewelryMats[matIndex].levels.indexOf(level);

    itemMats.type = jewelryMats[matIndex].material;
    itemMats.count = countList[matIndex][levelIndex];
  };

  switch (gearType.toLowerCase()) {
    case 'chest':
      initialAmount = 7;
      maxLevelStart = 15;
      getEquipmentMat(equipmentMats, weight);
      break;
    case 'legs':
      initialAmount = 6;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, weight);
      break;
    case 'shield':
      initialAmount = 6;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, 'wood');
      break;
    case 'greatsword':
    case 'battle axe':
    case 'maul':
      initialAmount = 5;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'inferno staff':
    case 'frost staff':
    case 'lightning staff':
    case 'restoration staff':
    case 'bow':
      initialAmount = 3;
      maxLevelStart = 12;
      getEquipmentMat(equipmentMats, 'wood');
      break;
    case 'axe':
    case 'mace':
    case 'sword':
      initialAmount = 3;
      maxLevelStart = 11;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'dagger':
      initialAmount = 2;
      maxLevelStart = 10;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'ring':
      getJewelryMat(ringMatCounts);
      break;
    case 'necklace':
      getJewelryMat(necklaceMatCounts);
      break;
    default:
      getEquipmentMat(equipmentMats, weight);
      break;
  }

  return itemMats;
};

/**
 * Update the state materials based off the action being performed on the item.
 *
 * @param {Array} stateMats - The current materials present in state.
 * @param {Object} stateAttributes - The current attributes present in state.
 * @param {String} gearLevel - The current gear level present in state.
 * @param {Object} action - The action being performed on the item.
 *
 * @returns The update stateMats Object to update state with.
 */
const updateMats = (stateMats, stateAttributes, gearLevel, action) => {
  let newStateMats = stateMats;
  const weight = action.attribute === 'Weight'
    ? action.value
    : stateAttributes[action.piece].Weight;

  const gearType = (stateAttributes.display === 'Weapons')
    ? stateAttributes[action.piece].Weapon
    : stateAttributes[action.piece].display;

  const materials = calculateItemMats(
    gearLevel,
    gearType,
    weight,
    action.piece,
  );

  if (materials.type) {
    const matsIndex = newStateMats.findIndex((mat) => mat.requestPiece === action.piece);
    if (matsIndex >= 0
        && (newStateMats[matsIndex].type !== materials.type
          || newStateMats[matsIndex].count !== materials.count)
    ) {
      newStateMats.splice(matsIndex, 1);
      newStateMats = newStateMats.concat([materials]);
    } else if (matsIndex < 0) {
      newStateMats = newStateMats.concat([materials]);
    }
  }

  return newStateMats;
};

/**
 * Adds or removed the materials related to an item that has been added or removed from the request.
 *
 * @param {Array} pieces - Item pieces currently in state.
 * @param {Array} materials - The materials currently in state.
 * @param {Object} attributes - The attributes currently in state.
 * @param {String} gearLevel - The gear level currently in state.
 * @param {Object} action - The action being performed on state.
 */
const addRemovePieceMats = (pieces, materials, attributes, gearLevel, action) => {
  const updateAction = action;
  let updatedMaterials;

  if (pieces.length < action.pieces.length) {
    [updateAction.piece] = action.pieces.filter((piece) => !pieces.includes(piece));

    updatedMaterials = updateMats(
      materials,
      attributes,
      gearLevel,
      updateAction,
    );
  } else {
    [updateAction.piece] = pieces.filter((piece) => !action.pieces.includes(piece));

    const removeIndex = materials.findIndex((mat) => mat.requestPiece === updateAction.piece);
    if (removeIndex >= 0) materials.splice(removeIndex, 1);
    updatedMaterials = Array.from(materials);
  }

  return updatedMaterials;
};

/**
 * Update the trait/style stones for the request materials.
 *
 * @param {Array} stateStones - Trait/style stones currently in state.
 * @param {String} requestPiece - The piece this style is being applied to.
 * @param {String} stone - The trait/style stone to be added to the request Materials.
 *
 * @returns The updated Array of trait/style stone objects.
 */
const updateStones = (stateStones, requestPiece, stone) => {
  const updatedStones = stateStones;

  if (stone) {
    const stoneIndex = stateStones.findIndex((stateStone) => stateStone.requestPiece === requestPiece);

    const newStone = {
      requestPiece,
      stone,
    };

    if (stoneIndex >= 0 && stone === 'none') {
      updatedStones.splice(stoneIndex, 1);
    } else if (stoneIndex >= 0) {
      updatedStones[stoneIndex] = newStone;
    } else if (stone !== 'none') {
      updatedStones.push(newStone);
    }

    return Array.from(updatedStones);
  }
  return updatedStones;
};

/**
 * Add or removed trait/style stones from state depending on which piece is added or removed.
 *
 * @param {Array} statePieces - The pieces currently in state.
 * @param {Array} stateStones - The style stones currently in state.
 * @param {Object} attributes - The attributes currently in state.
 * @param {Array} options - Trait or Style options for the piece.
 * @param {String} type - Specifiying whether to update the Trait or Style stones.
 * @param {Object} action - The action being applied on state.
 *
 * @returns The updated Array of trait/style stone objects.
 */
const addRemoveStones = (statePieces, stateStones, attributes, options, type, action) => {
  let updatedStones;
  let piece;

  if (statePieces.length < action.pieces.length) {
    [piece] = action.pieces.filter((actionPiece) => !statePieces.includes(actionPiece));
    if (attributes[piece][type] !== '') {
      const { stone } = options.find((option) => option.value === attributes[piece][type]);

      updatedStones = updateStones(
        stateStones,
        piece,
        stone,
      );
    } else {
      updatedStones = stateStones;
    }
  } else {
    [piece] = statePieces.filter((statePiece) => !action.pieces.includes(statePiece));

    const removeIndex = stateStones.findIndex((mat) => mat.requestPiece === piece);
    if (removeIndex >= 0) stateStones.splice(removeIndex, 1);
    updatedStones = Array.from(stateStones);
  }

  return updatedStones;
};

/**
 * Update the Materials related to the item's quality.
 *
 * @param {Array} stateQualityMats - Quality materials currently in state.
 * @param {String} quality - The quality of the item being updated
 * @param {String} type - The type of item being updated (Heavy, Medium, Light, weapon, jewelry, wood).
 * @param {String} piece - The piece being updated.
 *
 * @returns the updated Array of quality materials.
 */
const updateQualityMats = (stateQualityMats, quality, type, piece) => {
  const updatedQualityMats = Array.from(stateQualityMats);
  let pieceIndex = updatedQualityMats.findIndex((mat) => mat.piece === piece);

  while (pieceIndex >= 0) {
    updatedQualityMats.splice(pieceIndex, 1);

    pieceIndex = updatedQualityMats.findIndex((mat) => mat.piece === piece);
  }

  qualityMats[type][quality].forEach((mats) => updatedQualityMats.push({ ...mats, piece }));

  return updatedQualityMats;
};

/**
 * Add or remove quality mats from state depending on which item was removed or added to the request.
 *
 * @param {Array} statePieces - Reqiest pieces currently in state.
 * @param {Array} stateQualityMats - Qulaity materials currently in state.
 * @param {Object} attributes - The attributes currently in state.
 * @param {String} type - The type of item being updated (Heavy, Medium, Light, weapon, jewelry, wood).
 * @param {Object} action - The action being performed on state.
 *
 * @returns the updated Array of quality materials.
 */
const addRemoveQualityMats = (statePieces, stateQualityMats, attributes, type, action) => {
  let itemType = type;
  let updatedMats = stateQualityMats;
  let piece;

  if (action.pieces.length > statePieces.length) {
    [piece] = action.pieces.filter((actionPiece) => !statePieces.includes(actionPiece));
    if (type === 'armor') {
      itemType = attributes[piece].Weight;
    } else if (type === 'weapon') {
      if (['axe', 'mace', 'sword', 'battle axe', 'maul', 'greatsword', 'dagger']
        .includes(attributes[piece].Weapon.toLowerCase())
      ) {
        itemType = 'Heavy';
      } else if (attributes[piece].Weapon !== '') {
        itemType = 'wood';
      } else {
        itemType = '';
      }
    }

    if (attributes[piece].Quality !== '' && itemType !== '') {
      updatedMats = updateQualityMats(stateQualityMats, attributes[piece].Quality, itemType, piece);
    }
  } else {
    [piece] = statePieces.filter((statePiece) => !action.pieces.includes(statePiece));

    let pieceIndex = updatedMats.findIndex((mat) => mat.piece === piece);

    while (pieceIndex >= 0) {
      updatedMats.splice(pieceIndex, 1);

      pieceIndex = updatedMats.findIndex((mat) => mat.piece === piece);
    }
  }

  return Array.from(updatedMats);
};

/**
 * Get glyph mats from constants and apply them to state.
 *
 * @param {Object} currentStateGlyphMats - The glyph materials currently in state.
 * @param {String} piece - Piece the glyph is being applied to.
 * @param {String} level - The level currently in state.
 * @param {String} potency - The type of glyph potency (additive or subtractive).
 * @param {String} essenceRune - The essence rune for the glyph being applied.
 * @param {String} quality - The quality of the glyph.
 *
 * @returns the update glyph materials Object.
 */
const getGlyphMats = (currentStateGlyphMats, piece, level, potency, essenceRune, quality) => {
  const glyphMats = currentStateGlyphMats;

  if (quality) {
    const aspectRune = aspectRunes.find((rune) => rune.quality === quality);

    const aspectRuneIndex = glyphMats.aspectRunes.findIndex((glyphMat) => glyphMat.piece === piece);

    if (aspectRuneIndex >= 0) {
      glyphMats.aspectRunes[aspectRuneIndex] = {
        piece,
        name: aspectRune.name,
      };
    } else {
      glyphMats.aspectRunes.push({
        piece,
        name: aspectRune.name,
      });
    }

    glyphMats.aspectRunes = Array.from(glyphMats.aspectRunes);
  }

  if (potency) {
    const potencyRunes = potency === 'additive' ? additivePotencyRunes : subtractivePotencyRunes;

    const levelIndex = craftableLevels.findIndex((craftableLevel) => craftableLevel === level);

    const potencyRune = potencyRunes.find((rune, index) => (
      potencyRunes.length === index + 1
        || (
          craftableLevels.findIndex((craftableLevel) => craftableLevel === rune.minimumCraftableLevel) <= levelIndex
          && craftableLevels.findIndex(
            (craftableLevel) => craftableLevel === potencyRunes[index + 1].minimumCraftableLevel,
          ) > levelIndex
        )
    ));

    const potencyRuneIndex = glyphMats.potencyRunes.findIndex((glyphMat) => glyphMat.piece === piece);

    if (potencyRuneIndex >= 0) {
      glyphMats.potencyRunes[potencyRuneIndex] = {
        piece,
        name: potencyRune.name,
        potency,
      };
    } else {
      glyphMats.potencyRunes.push({
        piece,
        name: potencyRune.name,
        potency,
      });
    }

    glyphMats.potencyRunes = Array.from(glyphMats.potencyRunes);
  }

  if (essenceRune) {
    const essenceRuneIndex = glyphMats.essenceRunes.findIndex((glyphMat) => glyphMat.piece === piece);

    if (essenceRuneIndex >= 0 && glyphMats.essenceRunes[essenceRuneIndex].name !== essenceRune) {
      glyphMats.essenceRunes[essenceRuneIndex] = {
        piece,
        name: essenceRune,
      };
    } else if (essenceRuneIndex < 0) {
      glyphMats.essenceRunes.push({
        piece,
        name: essenceRune,
      });
    }

    glyphMats.essenceRunes = Array.from(glyphMats.essenceRunes);
  }

  return glyphMats;
};

/**
 * Add or remove glyph mats based off which piece was added or removed from state.
 *
 * @param {Array} statePieces - The pieces currently in state.
 * @param {String} gearLevel - The gear level currently in state.
 * @param {Object} stateGlyphMats - The glyph materials currently in state.
 * @param {Object} attributes - The attributes currently in state.
 * @param {Array} glyphOptions - The glyph options related to the type of piece added or removed.
 * @param {Object} action - The action being applied on state.
 *
 * @returns the update glyph materials Object.
 */
const addRemoveGlyphMats = (statePieces, gearLevel, stateGlyphMats, attributes, glyphOptions, action) => {
  let updatedMats = stateGlyphMats;

  if (action.pieces.length > statePieces.length) {
    const addedPiece = action.pieces.filter((piece) => !statePieces.includes(piece))[0];

    const glyph = attributes[addedPiece].Glyph;
    const glyphQuality = attributes[addedPiece]['Glyph Quality'];

    if (glyph !== '') {
      const currentGlyph = glyphOptions.find((glyphOption) => glyphOption.value === glyph);

      updatedMats = getGlyphMats(
        updatedMats,
        addedPiece,
        gearLevel,
        currentGlyph.potency,
        currentGlyph.essenceRune,
      );
    }

    if (glyphQuality !== '') {
      updatedMats = getGlyphMats(
        updatedMats,
        addedPiece,
        gearLevel,
        undefined,
        undefined,
        glyphQuality,
      );
    }
  } else {
    const removedPiece = statePieces.filter((piece) => !action.pieces.includes(piece))[0];

    const essenceIndex = updatedMats.essenceRunes.findIndex((rune) => rune.piece === removedPiece);
    updatedMats.essenceRunes.splice(essenceIndex, 1);

    const potencyIndex = updatedMats.potencyRunes.findIndex((rune) => rune.piece === removedPiece);
    updatedMats.potencyRunes.splice(potencyIndex, 1);

    const aspectIndex = updatedMats.aspectRunes.findIndex((rune) => rune.piece === removedPiece);
    updatedMats.aspectRunes.splice(aspectIndex, 1);
  }

  return {
    essenceRunes: Array.from(updatedMats.essenceRunes),
    potencyRunes: Array.from(updatedMats.potencyRunes),
    aspectRunes: Array.from(updatedMats.aspectRunes),
  };
};

/**
 * Remove glyph materials related to the passed piece.
 *
 * @param {Object} glyphMaterials - The glyph materials currently in state.
 * @param {String} piece - The piece being removed.
 *
 * @returns the update glyph materials Object.
 */
const removeGlyph = (glyphMaterials, piece) => {
  const essenceIndex = glyphMaterials.essenceRunes.findIndex((rune) => rune.piece === piece);
  glyphMaterials.essenceRunes.splice(essenceIndex, 1);

  const potencyIndex = glyphMaterials.potencyRunes.findIndex((rune) => rune.piece === piece);
  glyphMaterials.potencyRunes.splice(potencyIndex, 1);

  const aspectIndex = glyphMaterials.aspectRunes.findIndex((rune) => rune.piece === piece);
  glyphMaterials.aspectRunes.splice(aspectIndex, 1);

  return {
    essenceRunes: Array.from(glyphMaterials.essenceRunes),
    potencyRunes: Array.from(glyphMaterials.potencyRunes),
    aspectRunes: Array.from(glyphMaterials.aspectRunes),
  };
};

export default {
  calculateItemMats,
  updateMats,
  addRemovePieceMats,
  updateStones,
  addRemoveStones,
  updateQualityMats,
  addRemoveQualityMats,
  getGlyphMats,
  addRemoveGlyphMats,
  removeGlyph,
};
