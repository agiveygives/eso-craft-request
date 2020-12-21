import craftLevels from './craftableLevels';

function EquipmentMat(matLevels, lightMat, mediumMat, heavyMat, woodMat) {
  this.levels = matLevels;
  this.Light = lightMat;
  this["gear.armor.weight.light"] = lightMat;
  this.Medium = mediumMat;
  this["gear.armor.weight.medium"] = mediumMat;
  this.Heavy = heavyMat;
  this["gear.armor.weight.heavy"] = heavyMat;
  this.wood = woodMat;
}

EquipmentMat.prototype = {
  levels: [],
  Light: '',
  Medium: '',
  Heavy: '',
  wood: ''
}

export const equipmentMats = [
  new EquipmentMat(
    craftLevels.slice(0, 7),
    'materials.light.jute',
    'materials.medium.rawhide',
    'materials.heavy.ironIngots',
    'materials.wood.sandedMaple'
  ),
  new EquipmentMat(
    craftLevels.slice(7, 12),
    'materials.light.flax',
    'materials.medium.hide',
    'materials.heavy.steel',
    'materials.wood.sandedOak'
  ),
  new EquipmentMat(
    craftLevels.slice(12, 17),
    'materials.light.cotton',
    'materials.medium.leather',
    'materials.heavy.orichalcumIngots',
    'materials.wood.sandedBeech'
  ),
  new EquipmentMat(
    craftLevels.slice(17, 22),
    'materials.light.spidersilk',
    'materials.medium.thickLeather',
    'materials.heavy.dwarvenIngots',
    'materials.wood.sandedHickory'
  ),
  new EquipmentMat(
    craftLevels.slice(22, 25),
    'materials.light.ebonthread',
    'materials.medium.fellHide',
    'materials.heavy.ebonyIngots',
    'materials.wood.sandedYew'
  ),
  new EquipmentMat(
    craftLevels.slice(25, 28),
    'materials.light.kreshFiber',
    'materials.medium.topgrainHide',
    'materials.heavy.calciniumIngots',
    'materials.wood.sandedBirch'
  ),
  new EquipmentMat(
    craftLevels.slice(28, 31),
    'materials.light.ironthread',
    'materials.medium.ironHide',
    'materials.heavy.galatiteIngots',
    'materials.wood.sandedAsh'
  ),
  new EquipmentMat(
    craftLevels.slice(31, 33),
    'materials.light.silverweave',
    'materials.medium.superbHide',
    'materials.heavy.quicksilverIngots',
    'materials.wood.sandedMahogany'
  ),
  new EquipmentMat(
    craftLevels.slice(33, 39),
    'materials.light.voidCloth',
    'materials.medium.shadowhide',
    'materials.heavy.voidstoneIngots',
    'materials.wood.sandedNightwood'
  ),
  new EquipmentMat(
    craftLevels.slice(39, 41),
    'materials.light.ancestorSilk',
    'materials.medium.rubedoHide',
    'materials.heavy.rubediteIngots',
    'materials.wood.sandedRubyAsh'
  )
]

export const jewelryMats = [
  { levels: craftLevels.slice(0, 12), material: 'materials.jewelry.pewterOunce' },
  { levels: craftLevels.slice(12, 25), material: 'materials.jewelry.copperOunce' },
  { levels: craftLevels.slice(25, 31), material: 'materials.jewelry.silverOunce' },
  { levels: craftLevels.slice(31, 39), material: 'materials.jewelry.electrumOunce' },
  { levels: craftLevels.slice(39, 41), material: 'materials.jewelry.platinumOunce' }
]

export const ringMatCounts = [
  [2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [4, 6, 8, 10, 12, 14, 16],
  [6, 8, 10, 12, 14, 16, 18],
  [10, 100]
];

export const necklaceMatCounts = [
  [3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 19, 20],
  [5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 23],
  [6, 9, 12, 15, 18, 21, 24],
  [8, 12, 16, 20, 24, 28, 32],
  [15, 150]
];
