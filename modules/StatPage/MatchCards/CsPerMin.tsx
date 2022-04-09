import { Text } from "@mantine/core";

const CsPerMin = ({ cs, gameLength }: { cs: number; gameLength: number }) => {
  const csPerMin = cs / (gameLength / 60);
  const roundCsPerMin = Math.round(csPerMin * 10) / 10;

  return (
    <>
      <Text>{`${cs} (${roundCsPerMin})`}</Text>
    </>
  );
};

export default CsPerMin;
