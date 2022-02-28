import { MatchesListEntryDto } from "types/MatchList";

export const paginateMatchList = (arr: MatchesListEntryDto[]) => {
  const firstTwenty = arr.slice(0, 21);
  arr.splice(0, 20);
  return firstTwenty;
};
