import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { challenges } from "@challenges/challengeRegistry";

export function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateRandomChallenge = () => {
    if (!challenges) return;
    const currentChallengeIndex = challenges.findIndex((challenge) => {
      return challenge.route === location.pathname;
    });
    const navigationOptions =
      currentChallengeIndex === -1
        ? challenges
        : challenges.toSpliced(currentChallengeIndex, 1);

    const randomIndex = Math.floor(Math.random() * navigationOptions.length);
    const randomChallenge = navigationOptions[randomIndex];
    navigate(randomChallenge.route);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={navigateHome}>
          <img
            alt=""
            src="/icon-updated.png"
            width="30"
            height="30"
            className="d-inline-block align-center pr-2"
          />
          Coding Challenges
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={navigateHome}>Home</Nav.Link>
            <Nav.Link onClick={navigateRandomChallenge}>
              Random Challenge
            </Nav.Link>
            <NavDropdown title="Challenges" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={navigateRandomChallenge}>
                Random Challenge
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {challenges &&
                challenges.map((challenge) => (
                  <NavDropdown.Item
                    key={challenge.name}
                    onClick={() => navigate(challenge.route)}
                  >
                    {challenge.name}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
