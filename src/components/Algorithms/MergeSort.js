export function getMergeSortAnimations(array) {
  let currentArray = array.slice();
  const [sortedArray, animations] = mergeSort(currentArray, 0, currentArray.length - 1, []);
  return [animations, sortedArray];
}

export function mergeSort(currentArray, startIndex, endIndex, animations) {
  if(startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex)/2);
  mergeSort(currentArray, startIndex, middleIndex, animations);
  mergeSort(currentArray, middleIndex + 1, endIndex, animations);
  merge(currentArray, startIndex, middleIndex, endIndex, animations);
  return [currentArray, animations]
}

function merge(currentArray, startIndex, middleIndex, endIndex, animations) {
  let sortArray = [];
  let i = startIndex;
  let j = middleIndex + 1;
  while(i <= middleIndex && j <= endIndex) {
      //Comparing value at ith and jth index so push them to change their color
      animations.push([i, j]);
      //By changing color we imply that we are comparing those two values and then again we should revert back to their original color so push them again
      animations.push([i, j]);
      if(currentArray[i] <= currentArray[j]) {
          //We should overwrite the value at (i+startIndex)th index with ith index so push them to highlight swap their heights
          animations.push([sortArray.length + startIndex, currentArray[i]]);
          sortArray.push(currentArray[i++]);
      }
      else {
          //We should overwrite the value at (i+startIndex)th index with jth index so push them to highlight swap their heights
          animations.push([sortArray.length + startIndex, currentArray[j]]);
          sortArray.push(currentArray[j++]);
      }
  }
  while(i <= middleIndex) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([sortArray.length + startIndex, currentArray[i]]);
      sortArray.push(currentArray[i++]);
  }
  while(j <= endIndex) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([sortArray.length + startIndex, currentArray[j]]);
      sortArray.push(currentArray[j++]);
  }
  for (let i = startIndex; i <= endIndex; i++) {
      currentArray[i] = sortArray[i - startIndex];
  }
}