import { Button } from "react-bootstrap";

const INPUT_ARRAY_SIZE = 10;

const sortingAlgorithmExamples = () => {
  const runAlgorithm = () => {
    // create a random array of ints
    const inputArray: number[] = [];
    for (let i = 0; i < INPUT_ARRAY_SIZE; i++) {
      inputArray.push(Math.floor(Math.random() * 10));
    }
    console.log("INPUT ARRAY");
    console.table(inputArray);
    inputArray.sort();
    console.log("SORTED ARRAY");
    console.table(inputArray);
  };

  return (
    <div>
      <Button onClick={runAlgorithm}>GO!</Button>
    </div>
  );
};

export default sortingAlgorithmExamples;
