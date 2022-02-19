import PlayerStats from "./PlayerStats";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Match Details/Player Stats",
  component: PlayerStats,
} as ComponentMeta<typeof PlayerStats>;

const Template: ComponentStory<typeof PlayerStats> = (args) => (
  <PlayerStats {...args} />
);

export const Stats = Template.bind({});
Stats.args = {
  score: 500,
  kills: 18,
  deaths: 14,
  assists: 6,
};
