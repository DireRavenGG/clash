import MatchCard from "./MatchCard";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Match Details/Match Card",
  component: MatchCard,
} as ComponentMeta<typeof MatchCard>;

const Template: ComponentStory<typeof MatchCard> = (args) => (
  <MatchCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  won: true,
  roundsPlayed: 18,
  roundsWon: 13,
  score: 500,
  kills: 18,
  deaths: 14,
  assists: 6,
  uuid: "test",
  character: "Jett",
  match: {
    matchInfo: {
      matchId: "1",
      mapId: "haven",
      gameLengthMillis: 1,
      gameStartMillis: 0,
      provisioningFlowId: "",
      isCompleted: true,
      customGameName: "",
      queueId: "1",
      gameMode: "competitive",
      isRanked: true,
      seasonId: "3",
    },
    players: [
      {
        puuid: "test",
        gameName: "1",
        tagLine: "",
        teamId: "",
        partyId: "",
        characterId: "",
        stats: {
          score: 1,
          roundsPlayed: 1,
          kills: 1,
          deaths: 1,
          assists: 1,
          playtimeMillis: 1,
          abilityCasts: {
            grenadeCasts: 1,
            ability1Casts: 1,
            ability2Casts: 1,
            ultimateCasts: 1,
          },
        },
        competitiveTier: 1,
        playerCard: "",
        playerTitle: "",
      },
    ],
    coaches: [{ puuid: "", teamId: "" }],
    teams: [
      { teamId: "", won: true, roundsPlayed: 20, roundsWon: 13, numPoints: 13 },
    ],
    roundResults: [
      {
        roundNum: 1,
        roundResult: "",
        roundCeremony: "",
        winningTeam: "",
        bombPlanter: "",
        bombDefuser: "",
        plantRoundTime: 1,
        defusePlayerLocation: { x: 1, y: 1 },
        plantPlayerLocations: [
          {
            puuid: "",
            viewRadians: 1,
            location: { x: 1, y: 1 },
          },
        ],
        plantLocations: { x: 1, y: 1 },
        plantSite: "a",
        defuseRoundTime: 3,
        playerStats: [
          {
            puuid: "test",
            kills: [
              {
                timeSinceGameStartMillis: 1,
                timeSinceRoundStartMillis: 1,
                killer: "",
                victim: "",
                victimLocation: { x: 1, y: 1 },
                assistants: [""],
                playerLocations: [
                  { puuid: "", viewRadians: 1, location: { x: 1, y: 1 } },
                ],
                finishingDamage: {
                  damageType: "",
                  damageItem: "vandal",
                  isSecondaryFireMode: true,
                },
              },
            ],
            damage: [
              {
                receiver: "",
                damage: 1,
                legshots: 1,
                bodyshots: 1,
                headshots: 1,
              },
            ],
            score: 1,
            economy: {
              loadoutValue: 1,
              weapon: "",
              armor: "",
              remaining: 1,
              spent: 1,
            },
            ability: {
              grenadeEffects: "",
              ability1Effects: "",
              ability2Effects: "",
              ulitmateEffects: "",
            },
          },
        ],
      },
    ],
  },
};