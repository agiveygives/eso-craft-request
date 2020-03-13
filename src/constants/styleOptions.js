export const styles = [
  { name: "Abah's Watch", material: "Polished Shilling" },
  { name: "Akaviri", material: "Goldscale" },
  { name: "Aldmeri Dominion", material: "Eagle Feather" },
  { name: "Ancient Elf", material: "Palladium" },
  { name: "Ancient Orc", material: "Cassiterite" },
  { name: "Anequina", material: "Shimmering Sand" },
  { name: "Apostle", material: "Polished Brass" },
  { name: "Argonian", material: "Flint" },
  { name: "Ashlander", material: "Ash Canvas" },
  { name: "Assassins League", material: "Tainted Blood" },
  { name: "Barbaric", material: "Copper" },
  { name: "Bloodforge", material: "Bloodroot Flux" },
  { name: "Buoyant Armiger", material: "Volcant Viridian" },
  { name: "Breton", material: "Molybdenum" },
  { name: "Celestial", material: "Star Sapphire" },
  { name: "Daedric", material: "Daedra Heart" },
  { name: "Daggerfall Covenant", material: "Lion Fang" },
  { name: "Dark Brotherhood", material: "Black Beeswax" },
  { name: "Dark Elf (Dunmer)", material: "Obsidian" },
  { name: "Dead Water", material: "Crocodile Leather" },
  { name: "Draugr", material: "Pristine Shroud" },
  { name: "Dreadhorn", material: "Minotaur Bezoar" },
  { name: "Dremora", material: "Warrior's Heart Ashes" },
  { name: "Dro-m’Athra", material: "Defiled Whiskers" },
  { name: "Dwemer", material: "Dwemer Frame" },
  { name: "Ebonheart Pact", material: "Dragon Scute" },
  { name: "Ebonshadow", material: "Tenebrous Cord" },
  { name: "Ebony", material: "Night Pumice" },
  { name: "Elder Argonian", material: "Hackwing Plumage" },
  { name: "Fang Lair", material: "Dragon Bone" },
  { name: "Glass", material: "Malachite" },
  { name: "Grim Harlequin", material: "Grinmaterial" },
  { name: "High Elf (Altmer)", material: "Adamantite" },
  { name: "Hlaalu", material: "Bonemold Resin" },
  { name: "Hollowjack", material: "Amber Marble" },
  { name: "Honor Guard", material: "Read Diamond Seals" },
  { name: "Huntsman", material: "Bloodscent Dew" },
  { name: "Imperial", material: "Nickel" },
  { name: "Khajiit", material: "Moonmaterial" },
  { name: "Malacath", material: "Potash" },
  { name: "Mazzatun", material: "Leviathan Scrimshaw" },
  { name: "Mercenary", material: "Laurel" },
  { name: "Militant Ordinator", material: "Lustrous Sphalerite" },
  { name: "Minotaur", material: "Oxblood Fungus" },
  { name: "Morag Tong", material: "Boiled Carapace" },
  { name: "Nord", material: "Corundum" },
  { name: "Orc", material: "Manganese" },
  { name: "Order Of The Hour", material: "Pearl Sand" },
  { name: "Outlaw", material: "Rogue's Soot" },
  { name: "Primal", material: "Argentum" },
  { name: "Psijic Order", material: "Vitrified Malondo" },
  { name: "Pyandonean", material: "Sea Serpent Hide" },
  { name: "Ra Gada", material: "Ancient Sandmaterial" },
  { name: "Redguard", material: "Starmetal" },
  { name: "Redoran", material: "Polished Scarab Elytra" },
  { name: "Frostcaster", material: "Stalhrim" },
  { name: "Sapiarch", material: "Culanda Lacquer" },
  { name: "Scalecaller", material: "Infected Flesh" },
  { name: "Silken Ring", material: "Distilled Slowsilver" },
  { name: "Silver Dawn", material: "Argent Pelts" },
  { name: "Skinchanger", material: "Wolfsbane Incense" },
  { name: "Soul Shriven", material: "Azure Plasm" },
  { name: "Telvanni", material: "Wrought Ferrofungus" },
  { name: "Thieves Guild", material: "Fine Chalk" },
  { name: "Trinimac", material: "Auric Tusk" },
  { name: "Tsaesci", material: "Snake Fang" },
  { name: "Welkynar", material: "Gryphon Plume" },
  { name: "Wood Elf (Bosmer)", material: "Bone" },
  { name: "Worm Cult", material: "Desecrated Grave Soil" },
  { name: "Xivkyn", material: "Charcoal of Remorse" },
  { name: "Yokudan", material: "Ferrous Salts" },
  { name: "Pellitine", material: "Dragonthread" },
  { name: "Coldsnap Goblin", material: "Goblin-cloth Scrap" },
  { name: "Meridian", material: "Auroran Dust" },
  { name: "Dragonguard", material: "Gilding Salts" },
  { name: "Refabricated", material: "Polished Rivets" },
  { name: "Sunspire", material: "Frost Embers" },
  { name: "Moongrave Fane", material: "Blood of Sahrotnax" },
  { name: "Stags of Z'en", material: "Oath Cord" },
  { name: "Shield of Senchal", material: "Carmine Shieldsilk" }
];

export default [
  { value: 'No Preference', stone: 'Any Style Stone', label: 'No Preference', color: '#fcb935', isFixed: true }
].concat(
  styles.sort((a, b) => (a.name > b.name) ? 1 : -1)
  .map(style => ({ value: style.name, stone: style.stone, label: style.name, color: '#2DC50E', isFixed: true }))
)
