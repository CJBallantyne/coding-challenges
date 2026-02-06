import { useState } from "react";
import { challenges } from "../challenges/challengeRegistry";
import { ChallengeCard } from "./ChallengeCard";

export const ChallengeGrid = () => {
  const [search, setSearch] = useState("");

  const filtered = challenges
    ? challenges.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <>
      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-auto gap-4 p-4">
        {filtered.map((challenge) => (
          <ChallengeCard key={challenge.name} challenge={challenge} />
        ))}
      </div>
    </>
  );
};

export default ChallengeGrid;
