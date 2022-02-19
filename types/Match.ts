export interface Match {
  roundResults: RoundResults[];
}

export interface RoundResults {
  playerStats: PlayerRoundStats[];
}

export interface PlayerRoundStats {
  id: string;
  damage: DamageLocation[];
}

export interface DamageLocation {
  legshots: number;
  bodyshots: number;
  headshots: number;
}
