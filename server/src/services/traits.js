export const TRAITS = {
  analytical: 'Tahliliy fikrlash',
  technical: 'Texnologiyaga qiziqish',
  creative: 'Ijodkorlik',
  visual: 'Vizual did',
  social: 'Odamlar bilan ishlash',
  care: 'G‘amxo‘rlik va yordam',
  communication: 'Muloqot va nutq',
  leadership: 'Yetakchilik',
  business: 'Iqtisodiy fikrlash',
  science: 'Tabiiy fanlarga qiziqish',
  math: 'Matematik qobiliyat',
  detail: 'Diqqat va aniqlik',
  practical: 'Amaliy ish va qurish',
  justice: 'Adolat va dalil bilan ishlash',
  research: 'Izlanuvchanlik'
};

export const TRAIT_KEYS = Object.keys(TRAITS);

export function traitLabel(key) {
  return TRAITS[key] || key;
}
