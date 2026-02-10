// load all challenge entry components
const challengeModules = import.meta.glob<{
  default: React.ComponentType;
}>("/src/challenges/*/index.tsx", { eager: true });

// load optional splash images
const splashImages = import.meta.glob<string>("/src/challenges/*/splash.png", {
  eager: true,
  import: "default",
});

const details = import.meta.glob<ChallengeDetails>(
  "/src/challenges/*/details.json",
  {
    eager: true,
    import: "default",
  },
);

function extractName(path: string): string {
  return path.split("/")[3]; // src/challenges/<name>/index.tsx
}

function extractDetails(path: string): ChallengeDetails {
  const detailsPath = path.replace("index.tsx", "details.json");
  return details[detailsPath];
}

export type ChallengeDetails =
  | {
      description?: string;
      [key: string]: any;
    }
  | undefined;

export type Challenge = {
  name: string;
  details: ChallengeDetails;
  component: React.ComponentType;
  splash: string | undefined;
  route: string;
};

export const challenges: Challenge[] | null = Object.entries(challengeModules)
  .map(([path, module]) => {
    const name = extractName(path);
    const details = extractDetails(path);

    const splashPath = `./challenges/${name}/splash.png`;

    return {
      name,
      details,
      component: module.default,
      splash: splashImages[splashPath] || undefined,
      route: `/challenge/${name}`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
