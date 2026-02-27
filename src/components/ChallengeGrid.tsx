import { useState } from "react";
import { Challenge, challenges } from "../challenges/challengeRegistry";
import { ChallengeCard } from "./ChallengeCard";
import { Col, Container, Row } from "react-bootstrap";

export const ChallengeGrid = () => {
  const [search, setSearch] = useState("");

  const filtered = challenges
    ? challenges.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  function splitChallengesIntoGrid(challenges: Challenge[], columns: number) {
    const result = [];
    for (let i = 0; i < challenges.length; i += columns) {
      // Slice a portion of the array from index i up to (but not including) i + chunkSize
      result.push(challenges.slice(i, i + columns));
    }
    return result;
  }
  const rows = splitChallengesIntoGrid(filtered, 3);
  const renderRow = (row: Challenge[]) => {
    return (
      <Row>
        {row.map((challenge) => {
          return (
            <Col>
              <ChallengeCard key={challenge.name} challenge={challenge} />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className="p-4 d-flex justify-content-center">
      <Container className="grid grid-cols-auto gap-4">
        <Row>
          <input
            className="mb-4 p-2 ps-4 rounded-pill border border-2 border-primary bw"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Row>
        {rows.map((row) => renderRow(row))}
        {filtered.length === 0 && (
          <Row>
            <p>No challenges found.</p>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ChallengeGrid;
