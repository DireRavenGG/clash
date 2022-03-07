export const orderChamps = (allGames: any[]) => {
  allGames.sort((a, b) => (a.stats.matches < b.stats.matches ? 1 : -1));
  if (allGames.length < 10) {
    return allGames;
  } else {
    return allGames.slice(0, 10);
  }
};
