import { BrowserRouter, Routes, Route } from "react-router-dom";
import { challenges } from "./challenges/challengeRegistry";
import { TopNav } from "@components/TopNav";
import { ChallengeGrid } from "@components/ChallengeGrid";
import { ChallengePage } from "@components/ChallengePage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<ChallengeGrid />} />

            {challenges &&
              challenges.map((challenge) => (
                <Route
                  key={challenge.route}
                  path={challenge.route}
                  element={<ChallengePage challenge={challenge} />}
                />
              ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
