export const getHeapSortAnimations = (arrayToSort) => {
  const currentArray = arrayToSort.slice()
  const [sortedArray, animations] = heapSort(currentArray, [])
  return [animations, sortedArray]
}

export const heapSort = (array, animations) => {
  // Build our max heap.
  buildMaxHeap(array, animations);
  // Find last element.
  let lastElement = array.length - 1;
  // Continue heap sorting until we have
  // just one element left in the array.
  while(lastElement > 0) {
    animations.push(['height', 0, array[lastElement]])
    animations.push(['height', lastElement, array[0]])
    animations.push(['sorted', lastElement])
    swap(array, 0, lastElement);
    heapify(array, 0, lastElement, animations);
    lastElement -= 1
  }
	return [array, animations]
}

const buildMaxHeap = (array, animations) => {
	let i = Math.floor(array.length/2-1) // parent of last element in array
	while (i >= 0) {
		heapify(array, i, array.length, animations)
		i--
	}
}

const heapify = (heap, currIdx, maxPtr, animations) => {
	let index;
	while (currIdx < maxPtr) {
		index = currIdx
		const left = currIdx * 2 + 1
    const right = left + 1
    animations.push(['pointer', 'secondary', index])
    animations.push(['pointer', 'primary', index])
    if (left < maxPtr) {
      animations.push(['pointer', 'secondary', left])
      animations.push(['pointer', 'primary', left])
    }
    if (right < maxPtr) {
      animations.push(['pointer', 'secondary', right])
      animations.push(['pointer', 'primary', right])
    }
		if (left < maxPtr && heap[left] > heap[index]) {
			index = left
		}
		if (right < maxPtr && heap[right] > heap[index]) {
			index = right
		}		
		if (index === currIdx) {
			return
    }	
    animations.push(['height', currIdx, heap[index]])
    animations.push(['height', index, heap[currIdx]])
		swap(heap, currIdx, index)
		currIdx = index
	}
}

const swap = (array, firstIdx, secondIdx) => {
	const temp = array[firstIdx]
	array[firstIdx] = array[secondIdx]
	array[secondIdx] = temp
}