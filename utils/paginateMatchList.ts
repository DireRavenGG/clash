export const paginateMatchList = (arr: string[]) => {
  const firstTwenty = arr.slice(0, 21);
  arr.splice(0, 20);
  return firstTwenty;
};
