import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { type Challenge } from "../challenges/challengeRegistry";
import { useNavigate } from "react-router-dom";

export const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(challenge.route);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={challenge.splash || undefined} />
      <Card.Body>
        <Card.Title>{challenge.name}</Card.Title>
        <Card.Text>
          {challenge.details?.description || "No description available."}
        </Card.Text>
        <Button variant="primary" onClick={handleClick}>
          Start!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ChallengeCard;
