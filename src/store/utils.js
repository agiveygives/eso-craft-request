import { equipmentMats, jewelryMats, ringMatCounts, necklaceMatCounts } from '../constants/materials';
import { qualityMats } from '../constants/qualityOptions';
import { additivePotencyRunes, subtractivePotencyRunes, aspectRunes } from '../constants/glyphMats';
import craftableLevels from '../constants/craftableLevels';

const calculateItemMats = (level, gearType, weight, piece) => {
  let initialAmount = 5;
  let maxLevelStart = 13;

  const itemMats = {
    requestPiece: piece,
    gearType: gearType,
    weight: '',
    type: '',
    count: 0
  };

  const getEquipmentMat = (matsList, weight) => {
    const material = matsList.find(mat => mat.levels.includes(level));
    const index = material.levels.indexOf(level);

    itemMats.weight = weight;
    itemMats.type = material[weight];
    if (level === 'CP 150') {
      itemMats.count = maxLevelStart;
    } else if (level === 'CP 160') {
      itemMats.count = maxLevelStart * 10;
    } else {
      itemMats.count = initialAmount + index;
    }
  }

  const getJewelryMat = (countList) => {
    const matIndex = jewelryMats.findIndex(mat => mat.levels.includes(level));
    const levelIndex = jewelryMats[matIndex].levels.indexOf(level);

    itemMats.type = jewelryMats[matIndex].material;
    itemMats.count = countList[matIndex][levelIndex];
  }

  switch(gearType.toLowerCase()) {
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
      getEquipmentMat(equipmentMats, 'wood')
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
}

const updateMats = (stateMats, stateAttributes, gearLevel, action) => {
  const weight = action.attribute === 'Weight'
    ? action.value
    : stateAttributes[action.piece].Weight;

  const gearType = (stateAttributes.display === 'Weapons')
    ? stateAttributes[action.piece].Weapon
    : stateAttributes[action.piece].display

  const materials = calculateItemMats(
    gearLevel,
    gearType,
    weight,
    action.piece
  );

  if(materials.type === undefined) return stateMats;

  const matsIndex = stateMats.findIndex(mat => mat.requestPiece === action.piece);
  if(matsIndex >= 0 &&
      (stateMats[matsIndex].type !== materials.type
        || stateMats[matsIndex].count !== materials.count)
    ) {
      stateMats.splice(matsIndex, 1);
      stateMats = stateMats.concat([materials]);
  } else if(matsIndex < 0) {
    stateMats = stateMats.concat([materials]);
  }

  return stateMats;
}

const addRemovePieceMats = (pieces, materials, attributes, gearLevel, action) => {
  let updatedMaterials;

  if (pieces.length < action.pieces.length) {
    action.piece = action.pieces.filter(piece => !pieces.includes(piece))[0];

    updatedMaterials = updateMats(
      materials,
      attributes,
      gearLevel,
      action
    );
  } else {
    action.piece = pieces.filter(piece => !action.pieces.includes(piece))[0];

    const removeIndex = materials.findIndex(mat => mat.requestPiece === action.piece);
    if (removeIndex >= 0) materials.splice(removeIndex, 1);
    updatedMaterials = Array.from(materials);
  }

  return updatedMaterials;
}

const addRemoveStones = (pieces, stateStones, attributes, options, type, action) => {
  let updatedStones;
  let piece;

  if (pieces.length < action.pieces.length) {
    piece = action.pieces.filter(piece => !pieces.includes(piece))[0];
    if (attributes[piece][type] !== "") {
      const stone = options.find(option => option.value === attributes[piece][type]).stone;

      updatedStones = updateStones(
        stateStones,
        piece,
        stone
      );
    } else {
      updatedStones = stateStones;
    }
  } else {
    piece = pieces.filter(piece => !action.pieces.includes(piece))[0];

    const removeIndex = stateStones.findIndex(mat => mat.requestPiece === piece);
    if (removeIndex >= 0) stateStones.splice(removeIndex, 1);
    updatedStones = Array.from(stateStones);
  }

  return updatedStones;
}

const updateStones = (stateStones, requestPiece, stone) => {
  if (stone) {
    const stoneIndex = stateStones.findIndex(stateStone => stateStone.requestPiece === requestPiece);

    const newStone = {
      requestPiece,
      stone
    };

    if (stoneIndex >= 0 && stone === 'none') {
      stateStones.splice(stoneIndex, 1);
    } else if (stoneIndex >= 0) {
      stateStones[stoneIndex] = newStone;
    } else if (stone !== 'none') {
      stateStones.push(newStone);
    }

    return Array.from(stateStones);
  } else {
    return stateStones;
  }
}

const updateQualityMats = (stateQualityMats, quality, type, piece) => {
  const updatedQualityMats = Array.from(stateQualityMats);
  let pieceIndex = updatedQualityMats.findIndex(mat => mat.piece === piece);

  while (pieceIndex >= 0) {
    updatedQualityMats.splice(pieceIndex, 1);

    pieceIndex = updatedQualityMats.findIndex(mat => mat.piece === piece);
  }

  qualityMats[type][quality].forEach(mats => updatedQualityMats.push({ ...mats, piece }))

  return updatedQualityMats;
};

const addRemoveQualityMats = (statePieces, stateQualityMats, attributes, type, action) => {
  let updatedMats = stateQualityMats;
  let piece;

  if (action.pieces.length > statePieces.length) {
    piece = action.pieces.filter(piece => !statePieces.includes(piece))[0];
    if (type === 'armor') {
      type = attributes[piece].Weight;
    } else if (type === 'weapon') {
      if(['axe', 'mace', 'sword', 'battle axe', 'maul', 'greatsword', 'dagger']
            .includes(attributes[piece].Weapon.toLowerCase())
        ) {
          type = 'Heavy';
      } else if (attributes[piece].Weapon !== '') {
        type = 'wood';
      } else {
        type = '';
      }
    }

    if (attributes[piece].Quality !== '' && type !== '') {
      updatedMats = updateQualityMats(stateQualityMats, attributes[piece].Quality, type, piece);
    }
  } else {
    piece = statePieces.filter(piece => !action.pieces.includes(piece))[0];

    let pieceIndex = updatedMats.findIndex(mat => mat.piece === piece);

    while (pieceIndex >= 0) {
      updatedMats.splice(pieceIndex, 1);

      pieceIndex = updatedMats.findIndex(mat => mat.piece === piece);
    }
  }

  return Array.from(updatedMats);
}

const getGlyphMats = (currentStateGlyphMats, piece, level, potency, essenceRune, quality) => {
  if (quality) {
    const aspectRune = aspectRunes.find(aspectRune => aspectRune.quality === quality);

    const aspectRuneIndex = currentStateGlyphMats.aspectRunes.findIndex(glyphMat => glyphMat.piece === piece);

    if (aspectRuneIndex >= 0) {
      currentStateGlyphMats.aspectRunes[aspectRuneIndex] = {
        piece,
        name: aspectRune.name
      }
    } else {
      currentStateGlyphMats.aspectRunes.push({
        piece,
        name: aspectRune.name
      });
    }

    currentStateGlyphMats.aspectRunes = Array.from(currentStateGlyphMats.aspectRunes);
  }

  if (potency) {
    let potencyRunes = potency === 'additive' ? additivePotencyRunes : subtractivePotencyRunes;

    const levelIndex = craftableLevels.findIndex(craftableLevel => craftableLevel === level);

    const potencyRune = potencyRunes.find((rune, index) => (
      potencyRunes.length === index + 1
        || (
          craftableLevels.findIndex(level => level === rune.minimumCraftableLevel) <= levelIndex
          && craftableLevels.findIndex(level => level === potencyRunes[index + 1].minimumCraftableLevel) > levelIndex
        )
    ));

    const potencyRuneIndex = currentStateGlyphMats.potencyRunes.findIndex(glyphMat => glyphMat.piece === piece);

    if (potencyRuneIndex >= 0) {
      currentStateGlyphMats.potencyRunes[potencyRuneIndex] = {
        piece,
        name: potencyRune.name,
        potency
      }
    } else {
      currentStateGlyphMats.potencyRunes.push({
        piece,
        name: potencyRune.name,
        potency
      });
    }

    currentStateGlyphMats.potencyRunes = Array.from(currentStateGlyphMats.potencyRunes);
  }

  if (essenceRune) {
    const essenceRuneIndex = currentStateGlyphMats.essenceRunes.findIndex(glyphMat => glyphMat.piece === piece);

    if (essenceRuneIndex >= 0 && currentStateGlyphMats.essenceRunes[essenceRuneIndex].name !== essenceRune) {
      currentStateGlyphMats.essenceRunes[essenceRuneIndex] = {
        piece,
        name: essenceRune
      }
    } else if (essenceRuneIndex < 0) {
      currentStateGlyphMats.essenceRunes.push({
        piece,
        name: essenceRune
      });
    }

    currentStateGlyphMats.essenceRunes = Array.from(currentStateGlyphMats.essenceRunes);
  }

  return currentStateGlyphMats;
}

const addRemoveGlyphMats = (statePieces, gearLevel, stateGlyphMats, attributes, glyphOptions, action) => {
  let updatedMats = stateGlyphMats;

  if (action.pieces.length > statePieces.length) {
    const addedPiece = action.pieces.filter(piece => !statePieces.includes(piece))[0];

    const glyph = attributes[addedPiece].Glyph;
    const glyphQuality = attributes[addedPiece]['Glyph Quality'];

    if (glyph !== '') {
      const currentGlyph = glyphOptions.find(glyphOption => glyphOption.value === glyph);

      updatedMats = getGlyphMats(
        updatedMats,
        addedPiece,
        gearLevel,
        currentGlyph.potency,
        currentGlyph.essenceRune
      )
    }

    if (glyphQuality !== '') {
      updatedMats = getGlyphMats(
        updatedMats,
        addedPiece,
        gearLevel,
        undefined,
        undefined,
        glyphQuality
      )
    }

  } else {
    const removedPiece = statePieces.filter(piece => !action.pieces.includes(piece))[0];

    const essenceIndex = updatedMats.essenceRunes.findIndex(rune => rune.piece === removedPiece);
    updatedMats.essenceRunes.splice(essenceIndex, 1);

    const potencyIndex = updatedMats.potencyRunes.findIndex(rune => rune.piece === removedPiece);
    updatedMats.potencyRunes.splice(potencyIndex, 1);

    const aspectIndex = updatedMats.aspectRunes.findIndex(rune => rune.piece === removedPiece);
    updatedMats.aspectRunes.splice(aspectIndex, 1);
  }

  return {
    essenceRunes: Array.from(updatedMats.essenceRunes),
    potencyRunes: Array.from(updatedMats.potencyRunes),
    aspectRunes: Array.from(updatedMats.aspectRunes)
  };
}

export default {
  calculateItemMats,
  updateMats,
  addRemovePieceMats,
  updateStones,
  addRemoveStones,
  updateQualityMats,
  addRemoveQualityMats,
  getGlyphMats,
  addRemoveGlyphMats
}
