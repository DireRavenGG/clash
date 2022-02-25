export interface MatchDto {
  matchInfo: MatchInfoDto;
  players: PlayerDto[];
  coaches: CoachDto[];
  teams: TeamDto[];
  roundResults: RoundResultsDto[];
}

interface MatchInfoDto {
  matchId: string;
  mapId: string;
  gameLengthMillis: number;
  gameStartMillis: number;
  provisioningFlowId: string;
  isCompleted: boolean;
  customGameName: string;
  queueId: string;
  gameMode: string;
  isRanked: boolean;
  seasonId: string;
}

interface PlayerDto {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: string;
  partyId: string;
  characterId: string;
  stats: PlayerStatsDto;
  competitiveTier: number;
  playerCard: string;
  playerTitle: string;
}

interface PlayerStatsDto {
  score: number;
  roundsPlayed: number;
  kills: number;
  deaths: number;
  assists: number;
  playtimeMillis: number;
  abilityCasts: AbilityCastsDto;
}

interface AbilityCastsDto {
  grenadeCasts: number;
  ability1Casts: number;
  ability2Casts: number;
  ultimateCasts: number;
}

interface CoachDto {
  puuid: string;
  teamId: string;
}

interface TeamDto {
  teamId: string;
  won: boolean;
  roundsPlayed: number;
  roundsWon: number;
  numPoints: number;
}

interface PlayerLocationsDto {
  puuid: string;
  viewRadians: number;
  location: LocationDto;
}

interface LocationDto {
  x: number;
  y: number;
}

export interface PlayerRoundStatsDto {
  puuid: string;
  kills: KillDto[];
  damage: DamageDto[];
  score: number;
  economy: EconomyDto;
  ability: AbilityDto;
}

interface KillDto {
  timeSinceGameStartMillis: number;
  timeSinceRoundStartMillis: number;
  killer: string;
  victim: string;
  victimLocation: LocationDto;
  assistants: string[];
  playerLocations: PlayerLocationsDto[];
  finishingDamage: FinishingDamageDto;
}

interface FinishingDamageDto {
  damageType: string;
  damageItem: string;
  isSecondaryFireMode: boolean;
}

export interface DamageDto {
  receiver: string;
  damage: number;
  legshots: number;
  bodyshots: number;
  headshots: number;
}

interface EconomyDto {
  loadoutValue: number;
  weapon: string;
  armor: string;
  remaining: number;
  spent: number;
}

interface AbilityDto {
  grenadeEffects: string;
  ability1Effects: string;
  ability2Effects: string;
  ulitmateEffects: string;
}

export interface RoundResultsDto {
  roundNum: number;
  roundResult: string;
  roundCeremony: string;
  winningTeam: string;
  bombPlanter: string;
  bombDefuser: string;
  plantRoundTime: number;
  plantPlayerLocations: PlayerLocationsDto[];
  plantLocations: LocationDto;
  plantSite: string;
  defuseRoundTime: number;
  defusePlayerLocation: LocationDto;
  playerStats: PlayerRoundStatsDto[];
}
