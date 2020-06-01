export const getInsertionSortAnimations = (arrayToSort) => {
  let currentArray = arrayToSort.slice();
  const [sortedArray, animations] = insertionSort(currentArray, []);
  return [animations, sortedArray];
}

export const insertionSort = (arrayToSort, animations) => {
  for (let i = 1; i < arrayToSort.length; i++) {
    if (i === 0) continue;
    animations.push(['color', i, i-1])                       // change color as we go (to SECONDARY_COLOR)
    animations.push(['color', i, i-1])                       // change color as we go (to PRIMARY_COLOR)
		if (arrayToSort[i] < arrayToSort[i-1]) {
			while (arrayToSort[i] < arrayToSort[i-1]) {
        animations.push(['color', i, i-1])                   // change color traversing backwards (to SECONDARY_COLOR)
        animations.push(['color', i, i-1])                   // change color traversing backwards (to PRIMARY_COLOR)
        animations.push(['height', i, arrayToSort[i-1]])      // change height traversing backwards (to SECONDARY_COLOR)
        animations.push(['height', i-1, arrayToSort[i]])      // change height traversing backwards (to SECONDARY_COLOR)
				swap(i, i-1, arrayToSort);
				i--;
      }
		} else {
      animations.push(['color', null, null])               // don't do anything
      animations.push(['color', null, null])               // don't do anything
      animations.push(['height', null, null])               // don't do anything
      animations.push(['height', null, null])               // don't do anything
    }
  }
	return [arrayToSort, animations];
}

const swap = (first, second, array) => {
	const temp = array[first]
	array[first] = array[second]
	array[second] = temp
}