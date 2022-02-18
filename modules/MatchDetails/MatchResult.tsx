type MatchResultProps = {
  won: boolean;
  roundsWon: number;
  roundsPlayed: number;
};

const MatchResult = ({ won, roundsWon, roundsPlayed }: MatchResultProps) => {
  return (
    <>
      <div>{won ? "Victory" : "Defeat"}</div>
      <div>{`${roundsWon} / ${roundsPlayed - roundsWon}`}</div>
    </>
  );
};

export default MatchResult;
