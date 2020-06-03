import { mergeSort } from './MergeSort';
import { quickSort } from './QuickSort';

export function AlgoStressTest(sortingAlgorithm, testLevel) {
  const NUM_ARRAYS = testLevel;
  let testArraySet = [];
  let falseCount = 0;
  let trueCount = 0;
  for (let i = 0; i < NUM_ARRAYS; i++) {
    const randomTestArray = Array(generateRandomNumber(1, 1000)).fill().map(() => generateRandomNumber(-10000, 10000));
    testArraySet.push(randomTestArray);
  }
  for (let testArray of testArraySet) {
    if(sortingAlgorithm === quickSort || sortingAlgorithm === mergeSort) {
      if (sortingAlgorithm(testArray, 0, testArray.length-1, [])[0] !== testArray.sort((a, b) => a - b)) {
        falseCount++;
      } else {
        trueCount++;
      }
    } else {
      if (sortingAlgorithm(testArray, [])[0] !== testArray.sort((a, b) => a - b)) {
        falseCount++;
      } else {
        trueCount++;
      }
    } 
  }
  return [falseCount, trueCount]
}

// Function to generate random number  
function generateRandomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}  