import { useEffect } from "react";
import { Button } from "react-bootstrap";

const testDict: Record<string, string> = {
  connor: "c00l",
  bing: "chilling",
};

const searchString = "bing.chilling";

const dictionaryAlgorithms = () => {
  useEffect(() => {
    console.log("Test Data");
    console.table(testDict);
  }, []);

  const runAlgorithm = () => {
    const [firstString, secondString] = searchString.split(".");
    if (testDict[firstString] == secondString) {
      console.log(`Found ${firstString}.${testDict[firstString]}`);
    } else {
      console.log("Search string combination not found");
    }
  };

  return (
    <div>
      <Button onClick={runAlgorithm}>GO!</Button>
    </div>
  );
};

export default dictionaryAlgorithms;
