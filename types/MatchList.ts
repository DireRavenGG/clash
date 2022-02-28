export interface MatchesListDto {
  puuid: string;
  history: MatchesListEntryDto[];
}

export interface MatchesListEntryDto {
  matchId: string;
  gameStartTimeMillis: number;
  teamId: string;
}
