export interface TeamDto {
  id: string;
  tournamentId: number;
  name: string;
  iconId: number;
  tier: number;
  captain: string;
  abbreviation: string;
  players: PlayerDto[];
}

interface PlayerDto {
  summonerId: string;
  position: string;
  role: string;
}
