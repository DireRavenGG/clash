import { Avatar } from "@mantine/core";

type PlayerDetailsProps = {
  character: string;
};
const PlayerDetails = ({ character }: PlayerDetailsProps) => {
  return (
    <>
      {/* Figure Out what character returns. 
          if its a string like "Jett" or a link to a file
      */}
      <Avatar radius="xl" size="lg"></Avatar>
    </>
  );
};

export default PlayerDetails;
