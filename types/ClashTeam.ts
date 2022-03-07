export interface TeamDto {
  id: string;
  tournamentId: number;
  name: string;
  iconId: number;
  tier: number;
  captain: string;
  abbreviation: string;
  players: ClashPlayerDto[];
}

export interface ClashPlayerDto {
  summonerId: string;
  position: string;
  role: string;
}
