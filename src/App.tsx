import { BrowserRouter, Routes, Route } from "react-router-dom";
import { challenges } from "./challenges/challengeRegistry";
import { TopNav } from "@components/TopNav";
import { ChallengeGrid } from "@components/ChallengeGrid";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto p-4">
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
