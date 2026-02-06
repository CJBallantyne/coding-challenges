// load all challenge entry components
const challengeModules = import.meta.glob<{
  default: React.ComponentType;
}>("/src/challenges/*/index.tsx", { eager: true });

console.log("challengeModules", challengeModules);

// load optional splash images
const splashImages = import.meta.glob<string>("./challenges/*/splash.png", {
  eager: true,
  import: "default",
});

function extractName(path: string): string {
  return path.split("/")[3]; // src/challenges/<name>/index.tsx
}

export type Challenge = {
  name: string;
  Component: React.ComponentType;
  splash: string | undefined;
  route: string;
};

export const challenges: Challenge[] | null = Object.entries(challengeModules)
  .map(([path, module]) => {
    const name = extractName(path);
    console.log("challenge path", path, "name", name);

    const splashPath = `./challenges/${name}/splash.png`;
    console.log("splashPath", splashPath, splashImages[splashPath]);

    return {
      name,
      Component: module.default,
      splash: splashImages[splashPath] || undefined,
      route: `/challenge/${name}`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
