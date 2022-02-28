import MatchResult from "./MatchResult";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Match Details/Match Result",
  component: MatchResult,
} as ComponentMeta<typeof MatchResult>;

const Template: ComponentStory<typeof MatchResult> = (args) => (
  <MatchResult {...args} />
);

export const Victory = Template.bind({});
Victory.args = {
  won: true,
  roundsPlayed: 18,
  roundsWon: 13,
};

export const Defeat = Template.bind({});
Defeat.args = {
  won: false,
  roundsPlayed: 17,
  roundsWon: 4,
};
