import { Challenge } from "@challenges/challengeRegistry";

export const ChallengePage = ({ challenge }: { challenge: Challenge }) => {
  return (
    <div>
      <h1>{challenge.name}</h1>
      <p>{challenge.details?.description}</p>
      {challenge.component ? (
        <challenge.component />
      ) : (
        <p>No component available.</p>
      )}
    </div>
  );
};
