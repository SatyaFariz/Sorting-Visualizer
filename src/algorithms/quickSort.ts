import { Animation } from "../types"

const quickSort = (array: number[]): number[] => {
  console.log('not sorted', array)
  qs(array, 0, array.length - 1)

  console.log('sorted', array)
  return array
}

const qs = (array: number[], leftIdx: number, rightIdx: number) => {
  if(leftIdx >= rightIdx) return

  const pivotIdx: number = partition(array, leftIdx, rightIdx)

  qs(array, leftIdx, pivotIdx - 1)
  qs(array, pivotIdx + 1, rightIdx)
}

const partition = (array: number[], leftIdx: number, rightIdx: number): number => {
  const pivot = array[rightIdx]

  let i = leftIdx - 1
  for(let j = leftIdx; j < rightIdx; j++) {
    if(array[j] < pivot) {
      i++
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  const temp = array[i + 1]
  array[i + 1] = array[rightIdx]
  array[rightIdx] = temp
  return i + 1
}

export default quickSort