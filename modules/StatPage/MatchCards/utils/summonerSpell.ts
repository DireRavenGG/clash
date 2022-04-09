export const summonerSpell = (spell: number) => {
  let spellName = "Flash";
  switch (spell) {
    case 21:
      spellName = "Barrier";
      break;
    case 14:
      spellName = "Dot";
      break;
    case 12:
      spellName = "Teleport";
      break;
    case 11:
      spellName = "Smite";
      break;
    case 6:
      spellName = "Haste";
      break;
    case 7:
      spellName = "Heal";
      break;
    case 3:
      spellName = "Exhaust";
      break;
    case 1:
      spellName = "Boost";
      break;

    default:
      break;
  }
  return spellName;
};
