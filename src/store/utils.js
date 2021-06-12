import {
  equipmentMats, jewelryMats, ringMatCounts, necklaceMatCounts,
} from '../constants/materials';
import { qualityMats } from '../constants/qualityOptions';
import { additivePotencyRunes, subtractivePotencyRunes, aspectRunes } from '../constants/glyphMats';
import craftableLevels from '../constants/craftableLevels';

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

  const getEquipmentMat = (matsList, eqWeight) => {
    const material = matsList.find((mat) => mat.levels.includes(level));
    const index = material.levels.indexOf(level);

    itemMats.weight = eqWeight;
    itemMats.type = material[eqWeight];
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

  switch (gearType) {
    case 'gear.armor.chest':
      initialAmount = 7;
      maxLevelStart = 15;
      getEquipmentMat(equipmentMats, weight);
      break;
    case 'gear.armor.legs':
      initialAmount = 6;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, weight);
      break;
    case 'gear.weapon.shield':
      initialAmount = 6;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, 'wood');
      break;
    case 'gear.weapon.greatsword':
    case 'gear.weapon.battleAxe':
    case 'gear.weapon.maul':
      initialAmount = 5;
      maxLevelStart = 14;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'gear.weapon.infernoStaff':
    case 'gear.weapon.frostStaff':
    case 'gear.weapon.lightningStaff':
    case 'gear.weapon.restorationStaff':
    case 'gear.weapon.bow':
      initialAmount = 3;
      maxLevelStart = 12;
      getEquipmentMat(equipmentMats, 'wood');
      break;
    case 'gear.weapon.axe':
    case 'gear.weapon.mace':
    case 'gear.weapon.sword':
      initialAmount = 3;
      maxLevelStart = 11;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'gear.weapon.dagger':
      initialAmount = 2;
      maxLevelStart = 10;
      getEquipmentMat(equipmentMats, 'Heavy');
      break;
    case 'gear.jewelry.ring':
      getJewelryMat(ringMatCounts);
      break;
    case 'gear.jewelry.necklace':
      getJewelryMat(necklaceMatCounts);
      break;
    default:
      getEquipmentMat(equipmentMats, weight);
      break;
  }

  return itemMats;
};

const updateMats = (stateMats, stateAttributes, gearLevel, action) => {
  const weight = action.attribute === 'Weight'
    ? action.value
    : stateAttributes[action.piece].Weight;

  const gearType = (stateAttributes.display === 'gear.weapons')
    ? stateAttributes[action.piece].Weapon
    : stateAttributes[action.piece].display;

  const materials = calculateItemMats(
    gearLevel,
    gearType,
    weight,
    action.piece,
  );

  if (materials.type === undefined) return stateMats;

  const matsIndex = stateMats.findIndex((mat) => mat.requestPiece === action.piece);
  if (matsIndex >= 0
      && (stateMats[matsIndex].type !== materials.type
        || stateMats[matsIndex].count !== materials.count)
  ) {
    stateMats.splice(matsIndex, 1);
    stateMats.push(materials);
  } else if (matsIndex < 0) {
    stateMats.push(materials);
  }

  return Array.from(stateMats);
};

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

const updateStones = (stateStones, requestPiece, stone) => {
  if (stone) {
    const updatedStones = stateStones;
    const stoneIndex = updatedStones.findIndex((stateStone) => stateStone.requestPiece === requestPiece);

    const newStone = {
      requestPiece,
      stone,
    };

    if (stoneIndex >= 0 && stone === 'common.none') {
      updatedStones.splice(stoneIndex, 1);
    } else if (stoneIndex >= 0) {
      updatedStones[stoneIndex] = newStone;
    } else if (stone !== 'common.none') {
      updatedStones.push(newStone);
    }

    return Array.from(updatedStones);
  }
  return stateStones;
};

const addRemoveStones = (pieces, stateStones, attributes, options, type, action) => {
  let updatedStones;
  let piece;

  if (pieces.length < action.pieces.length) {
    [piece] = action.pieces.filter((actionPiece) => !pieces.includes(actionPiece));
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
    [piece] = pieces.filter((p) => !action.pieces.includes(p));

    const removeIndex = stateStones.findIndex((mat) => mat.requestPiece === piece);
    if (removeIndex >= 0) stateStones.splice(removeIndex, 1);
    updatedStones = Array.from(stateStones);
  }

  return updatedStones;
};

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

const addRemoveQualityMats = (statePieces, stateQualityMats, attributes, type, action) => {
  let itemType = type;
  let updatedMats = stateQualityMats;
  let piece;

  if (action.pieces.length > statePieces.length) {
    [piece] = action.pieces.filter((p) => !statePieces.includes(p));
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
          craftableLevels.findIndex((craftLevel) => craftLevel === rune.minimumCraftableLevel) <= levelIndex
          && craftableLevels.findIndex((craftLevel) => (
            craftLevel === potencyRunes[index + 1].minimumCraftableLevel
          )) > levelIndex
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

const utils = {
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

export default utils;
