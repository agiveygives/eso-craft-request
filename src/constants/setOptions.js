// https://en.uesp.net/wiki/Online:Craftable_Sets

const craftedSets = [
  "Adept Rider",
  "Alessia's Bulwark",
  "Armor Master",
  "Armor of the Seducer",
  "Ashen Grip",
  "Assassin's Guile",
  "Clever Alchemist",
  "Daedric Trickery",
  "Death's Wind",
  "Eternal Hunt",
  "Eyes of Mara",
  "Fortified Brass",
  "Grave-Stake Collector",
  "Hist Bark",
  "Hunding's Rage",
  "Innate Axiom",
  "Kaegrenac's Hope",
  "Kvatch Gladiator",
  "Law of Julianos",
  "Magnus' Gift",
  "Mechanical Acuity",
  "Might of the Lost Legion",
  "Morkuldin",
  "Nocturnal's Favor",
  "Naga Shaman",
  "Night Mother's Gaze",
  "Night's Silence",
  "Noble's Conquest",
  "Oblivion's Foe",
  "Orgnum's Scales",
  "Pelinial's Aptitude",
  "Redistributor",
  "Shacklebreaker",
  "Shalidor's Curse",
  "Sload's Semblance",
  "Song of Lamac",
  "Spectre's Eye",
  "Tava's Favor",
  "Torug's Pact",
  "Trials by Fire",
  "Twice-Born Star",
  "Twilight's Embrace",
  "Vampire's Kiss",
  "Varen's Legacy",
  "Way of the Arena",
  "Whitestrake's Retribution",
  "Willow's Path",
  "Coldharbour's Favorite",
  "Senche-raht's Grit",
  "Vastarie's Tutelage",
  "Ancient Dragonguard",
  "Daring Corsair",
  "New Moon Acolyte",
  "Critical Riposte",
  "Dauntless Combatant",
  "Unchained Aggressor",
  "Dragon's Appetite",
  "Spell Parasite",
  "Stuhn's Favor",
  "Legacy of Karth",
  "Red Eagle’s Fury",
  "Aetherial Ascension",
];

export default [
  { value: 'None', label: 'None', color: '#fcb935', isFixed: true }
].concat(craftedSets.sort().map(set => ({ value: set, label: set, color: '#2DC50E', isFixed: true })))
