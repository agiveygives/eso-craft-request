import craftLevels from './craftableLevels';

function EquipmentMat(matLevels, lightMat, mediumMat, heavyMat, woodMat) {
  this.levels = matLevels;
  this.Light = lightMat;
  this.Medium = mediumMat;
  this.Heavy = heavyMat;
  this.wood = woodMat;
}

EquipmentMat.prototype = {
  levels: [],
  Light: '',
  Medium: '',
  Heavy: '',
  wood: '',
};

export const equipmentMats = [
  new EquipmentMat(craftLevels.slice(0, 7), 'Jute', 'Rawhide', 'Iron Ingots', 'Sanded Maple'),
  new EquipmentMat(craftLevels.slice(7, 12), 'Flax', 'Hide', 'Steel', 'Sanded Oak'),
  new EquipmentMat(craftLevels.slice(12, 17), 'Cotton', 'Leather', 'Orichalcum Ingots', 'Sanded Beech'),
  new EquipmentMat(craftLevels.slice(17, 22), 'Spidersilk', 'Thick Leather', 'Dwarven Ingots', 'Sanded Hickory'),
  new EquipmentMat(craftLevels.slice(22, 25), 'Ebonthread', 'Fell Hide', 'Ebony Ingots', 'Sanded Yew'),
  new EquipmentMat(craftLevels.slice(25, 28), 'Kresh Fiber', 'Topgrain Hide', 'Calcinium Ingots', 'Sanded Birch'),
  new EquipmentMat(craftLevels.slice(28, 31), 'Ironthread', 'Iron Hide', 'Galatite Ingots', 'Sanded Ash'),
  new EquipmentMat(craftLevels.slice(31, 33), 'Silverweave', 'Superb Hide', 'Quicksilver Ingots', 'Sanded Mahogany'),
  new EquipmentMat(craftLevels.slice(33, 39), 'Void Cloth', 'Shadowhide', 'Voidstone Ingots', 'Sanded Nightwood'),
  new EquipmentMat(craftLevels.slice(39, 41), 'Ancestor Silk', 'Rubedo Hide', 'Rubedite Ingots', 'Sanded Ruby Ash'),
];

export const jewelryMats = [
  { levels: craftLevels.slice(0, 12), material: 'Pewter Ounce' },
  { levels: craftLevels.slice(12, 25), material: 'Copper Ounce' },
  { levels: craftLevels.slice(25, 31), material: 'Silver Ounce' },
  { levels: craftLevels.slice(31, 39), material: 'Electrum Ounce' },
  { levels: craftLevels.slice(39, 41), material: 'Platinum Ounce' },
];

export const ringMatCounts = [
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [4, 6, 8, 10, 12, 14, 16],
  [6, 8, 10, 12, 14, 16, 18],
  [10, 100],
];

export const necklaceMatCounts = [
  [3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 19, 20],
  [5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 23],
  [6, 9, 12, 15, 18, 21, 24],
  [8, 12, 16, 20, 24, 28, 32],
  [15, 150],
];
