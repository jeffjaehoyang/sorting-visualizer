export const getSelectionSortAnimations = (arrayToSort) => {
  let currentArray = arrayToSort.slice();
  const [sortedArray, animations] = selectionSort(currentArray, []);
  return [animations, sortedArray];
}

export const selectionSort = (arrayToSort, animations) => {
  for (let anchor=0; anchor<arrayToSort.length; anchor++) {
		let currMin = arrayToSort[anchor];
		let currMinIdx = anchor
    let traversePtr = anchor + 1;
		while (traversePtr < arrayToSort.length) {
      animations.push(['compare', 'secondary', traversePtr]);                      // change the color of the element we are inspecting for minval SECONDARY_COLOR
      animations.push(['compare', 'primary', traversePtr]);                      // change the color of the element we inspected for minval PRIMARY_COLOR
			if (arrayToSort[traversePtr] < currMin) {
				currMinIdx = traversePtr;
				currMin = arrayToSort[traversePtr];
      }
			traversePtr++;
    }
    animations.push(['sorted', anchor]);                              // change the color of the sorted index to COMPLETED_COLOR
    animations.push(['height', anchor, arrayToSort[currMinIdx]]);     // change the height
    animations.push(['height', currMinIdx, arrayToSort[anchor]]);     // change the height
    swap(anchor, currMinIdx, arrayToSort)
	}
	return [arrayToSort, animations]
}

const swap = (first, second, array) => {
	const temp = array[first]
	array[first] = array[second]
	array[second] = temp
}