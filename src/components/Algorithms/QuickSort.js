export const getQuickSortAnimations = (arrayToSort) => {
  let currentArray = arrayToSort.slice();
  const [sortedArray, animations] = quickSort(currentArray, 0, currentArray.length - 1, []);
  return [animations, sortedArray]
}

export const quickSort = (array, start=0, end=array.length-1, animations) => {
	if (array.length === 0 || array.length === 1) return [array, animations]
  const sortedIdx = partition(array, start, end, animations)
	if (start < sortedIdx-1) quickSort(array, start, sortedIdx-1, animations)
  if (sortedIdx < end) quickSort(array, sortedIdx, end, animations)
	return [array, animations]
}

const partition = (array, start, end, animations) => {
	const swap = (arr, i, j) => { // helper function to swap elements 
		const temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
	// const pivot = array[Math.floor((start+end)/2)]
	const pivot = array[start]
	let left = start
	let right = end
	while (left <= right) {
		while (array[left] < pivot) {
      animations.push(['pointer', 'secondary', left])
      animations.push(['pointer', 'primary', left])
			left++
		}
		while (array[right] > pivot) {
      animations.push(['pointer', 'secondary', right])
      animations.push(['pointer', 'primary', right])
			right--
		}
		if (left <= right) {
      animations.push(['height', left, array[right]])
      animations.push(['height', right, array[left]])
			swap(array, left, right)
			left++
			right--
		}
  }
  animations.push(['sorted', left])
	return left
}