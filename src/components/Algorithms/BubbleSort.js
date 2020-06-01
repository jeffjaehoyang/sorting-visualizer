export const getBubbleSortAnimations = (arrayToSort) => {
  let currentArray = arrayToSort.slice();
  const [sortedArray, animations] = bubbleSort(currentArray, []);
  return [animations, sortedArray];
}

export const bubbleSort = (currentArray, animations) => {
  let sortedTo = currentArray.length-1
  while (sortedTo > 0) {
    for (let i = 0; i < sortedTo; i++) {
      const firstItem = currentArray[i]
      const secondItem = currentArray[i+1]
      if (i === sortedTo-1) {
        animations.push([i, i+1, 'end'])        // change color as we go (to SECONDARY_COLOR) && signal that last element is sorted
        animations.push([i, i+1, 'end'])        // change color as we go (to PRIMARY_COLOR) && signal that last element is sorted
      } else {
        animations.push([i, i+1])               // change color as we go, to SECONDARY_COLOR
        animations.push([i, i+1])               // change color as we go, to PRIMARY_COLOR
      } 
      if (firstItem > secondItem) {             // found unsorted pair
        animations.push([i, currentArray[i+1]]) // set the first item's bar height to the height of second item
        animations.push([i+1, currentArray[i]]) // set the second item's bar height to the height of first item 
        swap(currentArray, i, i+1)
      } else {
        animations.push([null, null])               // don't do anything
        animations.push([null, null])               // don't do anything
      }
    }
    sortedTo--
  }
  return [currentArray, animations]
}

function swap(currentArray, firstIdx, secondIdx) {
  const temp = currentArray[firstIdx];
  currentArray[firstIdx] = currentArray[secondIdx];
  currentArray[secondIdx] = temp;
}