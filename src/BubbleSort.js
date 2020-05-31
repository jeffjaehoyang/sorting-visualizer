export const getBubbleSortAnimations = (array) => {
  let animations  = [];
  let currentArray = array.slice();
  bubbleSort(currentArray, animations);
  array = currentArray;
  return [animations, array];
}

const bubbleSort = (currentArray, animations) => {
  let sortedTo = currentArray.length-1
  while (sortedTo > 0) {
    for (let i = 0; i < sortedTo; i++) {
      const firstItem = currentArray[i]
      const secondItem = currentArray[i+1]
      if (i === sortedTo-1) {
        animations.push([i, i+1, 'end'])
        animations.push([i, i+1, 'end'])
      } else {
        animations.push([i, i+1])
        animations.push([i, i+1])
      } 
      if (firstItem > secondItem) {
        animations.push([i, currentArray[i+1]])
        animations.push([i+1, currentArray[i]])
        swap(currentArray, i, i+1)
      } else {
        animations.push([-1, -1])
        animations.push([-1, -1])
      }
    }
    sortedTo--
  }
}

function swap(currentArray, firstIndex, secondIndex) {
  let temp = currentArray[firstIndex];
  currentArray[firstIndex] = currentArray[secondIndex];
  currentArray[secondIndex] = temp;
}