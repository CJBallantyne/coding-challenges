import { BrowserRouter, Routes, Route } from "react-router-dom";
import { challenges } from "./challenges/challengeRegistry";
import { TopMenu } from "@components/TopMenu";
import { ChallengeGrid } from "@components/ChallengeGrid";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <TopMenu />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ChallengeGrid />} />

            {challenges &&
              challenges.map(({ route, Component }) => (
                <Route key={route} path={route} element={<Component />} />
              ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
