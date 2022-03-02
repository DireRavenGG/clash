export const calcCSPerMin = (cs: number, gameLength: number) => {
  const gameLengthMin = gameLength / 1000 / 60; // milliseconds  / second / min
  const csPerMin = Math.round((cs / gameLengthMin) * 10) / 10;
  return csPerMin;
};
