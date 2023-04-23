import type { TFunction } from 'i18next';
import { GearPieceType } from '../../types/gearPiece';

export const armorPieces: GearPieceType[] = [
  {
    key: 'head',
    label: 'Head',
    selected: false,
  },
  {
    key: 'shoulder',
    label: 'Shoulder',
    selected: false,
  },
  {
    key: 'chest',
    label: 'Chest',
    selected: false,
  },
  {
    key: 'legs',
    label: 'Legs',
    selected: false,
  },
  {
    key: 'waist',
    label: 'Waist',
    selected: false,
  },
  {
    key: 'hands',
    label: 'Hands',
    selected: false,
  },
  {
    key: 'feet',
    label: 'Feet',
    selected: false,
  },
];

export const armorWeights = (t: TFunction) => [
  {
    value: 'gear.armor.weight.light',
    label: t('gear.armor.weight.light'),
  },
  {
    value: 'gear.armor.weight.medium',
    label: t('gear.armor.weight.medium'),
  },
  {
    value: 'gear.armor.weight.heavy',
    label: t('gear.armor.weight.heavy'),
  },
];

export const armorTraits = (t: TFunction) => [
  {
    value: 'common.none',
    // stone: 'common.none',
    label: t('common.none'),
  },
  {
    value: 'gear.armor.traits.divines',
    // stone: 'gear.armor.traits.divines.stone',
    label: t('gear.armor.traits.divines'),
  },
  {
    value: 'gear.armor.traits.impenetrable',
    // stone: 'gear.armor.traits.impenetrable.stone',
    label: t('gear.armor.traits.impenetrable'),
  },
  {
    value: 'common.traits.infused',
    // stone: 'gear.armor.traits.infused.stone',
    label: t('common.traits.infused'),
  },
  {
    value: 'gear.armor.traits.invigorating',
    // stone: 'gear.armor.traits.invigorating.stone',
    label: t('gear.armor.traits.invigorating'),
  },
  {
    value: 'common.traits.nirnhoned',
    // stone: 'gear.armor.traits.nirnhoned.stone',
    label: t('common.traits.nirnhoned'),
  },
  {
    value: 'gear.armor.traits.reinforced',
    // stone: 'gear.armor.traits.reinforced.stone',
    label: t('gear.armor.traits.reinforced'),
  },
  {
    value: 'gear.armor.traits.sturdy',
    // stone: 'gear.armor.traits.sturdy.stone',
    label: t('gear.armor.traits.sturdy'),
  },
  {
    value: 'common.traits.training',
    // stone: 'gear.armor.traits.training.stone',
    label: t('common.traits.training'),
  },
  {
    value: 'gear.armor.traits.wellFitted',
    // stone: 'gear.armor.traits.wellFitted.stone',
    label: t('gear.armor.traits.wellFitted'),
  },
];

export const armorGlyphs = (t: TFunction) => [
  {
    value: 'common.none',
    label: t('common.none'),
  },
  {
    value: 'gear.armor.glyphs.health',
    // essenceRune: 'Oko',
    // potency: 'additive',
    label: t('gear.armor.glyphs.health'),
  },
  {
    value: 'gear.armor.glyphs.magicka',
    // essenceRune: 'Makko',
    // potency: 'additive',
    label: t('gear.armor.glyphs.magicka'),
  },
  {
    value: 'gear.armor.glyphs.stamina',
    // essenceRune: 'Deni',
    // potency: 'additive',
    label: t('gear.armor.glyphs.stamina'),
  },
  {
    value: 'gear.armor.glyphs.prismaticDefense',
    // essenceRune: 'Hakeijo',
    // potency: 'additive',
    label: t('gear.armor.glyphs.prismaticDefense'),
  },
];
