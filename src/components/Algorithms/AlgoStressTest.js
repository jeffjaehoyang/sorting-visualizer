import { mergeSort } from './MergeSort';
import { quickSort } from './QuickSort';

export function AlgoStressTest(sortingAlgorithm, testLevel) {
  const NUM_ARRAYS = testLevel;
  let testArraySet = [];
  let falseCount = 0;
  let trueCount = 0;
  let executionTime;
  for (let i = 0; i < NUM_ARRAYS; i++) {
    const randomTestArray = Array(generateRandomNumber(1, 1000)).fill().map(() => generateRandomNumber(-10000, 10000));
    testArraySet.push(randomTestArray);
  }
  const start = performance.now()
  for (let testArray of testArraySet) {
    if(sortingAlgorithm === quickSort || sortingAlgorithm === mergeSort) {
      const [sortedArray, animations] = sortingAlgorithm(testArray, 0, testArray.length-1, [])
      if (sortedArray !== testArray.sort((a, b) => a - b)) {
        falseCount++;
      } else {
        trueCount++;
      }
    } else {
      const [sortedArray, animations] = sortingAlgorithm(testArray, [])
      if (sortedArray !== testArray.sort((a, b) => a - b)) {
        falseCount++;
      } else {
        trueCount++;
      }
    } 
  }
  const end = performance.now()
  executionTime = (end - start).toFixed(2)
  return [falseCount, trueCount, executionTime]
}

// Function to generate random number  
function generateRandomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}  