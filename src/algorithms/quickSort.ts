import { Animation, ColorMap } from '../types'

import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY,
  BAR_COLOR_SECONDARY
} from '../constants'

const quickSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []
  const sorted: ColorMap = {}

  quickSortHelper(array, 0, array.length - 1, animations, sorted)

  return animations
}

const quickSortHelper = (array: number[], leftIdx: number, rightIdx: number, animations: Animation[], sorted: ColorMap) => {
  if(leftIdx >= rightIdx) return

  const pivotIdx: number = partition(array, leftIdx, rightIdx, animations, sorted)

  quickSortHelper(array, leftIdx, pivotIdx - 1, animations, sorted)
  quickSortHelper(array, pivotIdx + 1, rightIdx, animations, sorted)
  for(let i = rightIdx; i >= 0; i--) {
    if(sorted[i]) break

    sorted[i] = BAR_COLOR_SORTED
  }
  animations.push({
    colors: {
      ...sorted
    },
    array: array.slice()
  })
}

const partition = (array: number[], leftIdx: number, rightIdx: number, animations: Animation[], sorted: ColorMap): number => {
  const pivot = array[rightIdx]

  let i = leftIdx - 1
  for(let j = leftIdx; j < rightIdx; j++) {
    if(array[j] < pivot) {
      i++
      animations.push({
        colors: {
          ...sorted,
          [i]: BAR_COLOR_PRIMARY,
          [j]: BAR_COLOR_SECONDARY
        },
        array: array.slice()
      })
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
      animations.push({
        colors: {
          ...sorted,
          [i]: BAR_COLOR_SECONDARY,
          [j]: BAR_COLOR_PRIMARY
        },
        array: array.slice()
      })
    }
  }
  
  const k = i + 1
  if(k !== rightIdx) {
    animations.push({
      colors: {
        ...sorted,
        [k]: BAR_COLOR_PRIMARY,
        [rightIdx]: BAR_COLOR_SECONDARY
      },
      array: array.slice()
    })

    const temp = array[k]
    array[k] = array[rightIdx]
    array[rightIdx] = temp

    animations.push({
      colors: {
        ...sorted,
        [k]: BAR_COLOR_SECONDARY,
        [rightIdx]: BAR_COLOR_PRIMARY
      },
      array: array.slice()
    })
  }
  

  return k
}

export default quickSort