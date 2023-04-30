import { Animation } from "../types"

const mergeSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []
  console.log('before sort', array)
  mergeSortHelper(array)
  console.log('after sort', array)
  return animations
}

const mergeSortHelper = (array: number[]) => {
  if(array.length < 2) return

  const midIdx = Math.floor(array.length / 2)
  const leftHalf = array.slice(0, midIdx)
  const rightHalf = array.slice(midIdx, array.length)

  mergeSortHelper(leftHalf)
  mergeSortHelper(rightHalf)
  merge(array, leftHalf, rightHalf)
}

const merge = (array: number[], leftHalf: number[], rightHalf: number[]) => {
  const leftSize = leftHalf.length
  const rightSize = rightHalf.length

  let i = 0, j = 0, k = 0

  while(i < leftSize && j < rightSize) {
    if(leftHalf[i] <= rightHalf[j]) {
      array[k] = leftHalf[i]
      i++
    } else {
      array[k] = rightHalf[j]
      j++
    }

    k++
  }

  while(i < leftSize) {
    array[k] = leftHalf[i]
    i++
    k++
  }

  while(j < rightSize) {
    array[k] = rightHalf[j]
    j++
    k++
  }
}

export default mergeSort