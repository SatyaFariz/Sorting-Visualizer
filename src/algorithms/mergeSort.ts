import { Animation, ColorMap, AuxiliaryArrayItem } from '@/types'

import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY
} from '@/constants'

const COLOR_ONE = '#8ab4f8'
const COLOR_TWO = '#bfa4fa'


const mergeSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []
  const sorted: ColorMap = {}

  const auxiliaryArray: AuxiliaryArrayItem[] = array.map((value, i) => ({
    value,
    originalIndex: i
  }))
  mergeSortHelper(array, auxiliaryArray, animations)

  for(let i = 0; i < array.length; i++) sorted[i] = BAR_COLOR_SORTED

  animations.push({
    colors: { ...sorted }
  })
  return animations
}

const mergeSortHelper = (originalArray: number[], array: AuxiliaryArrayItem[], animations: Animation[]) => {
  if(array.length < 2) return

  const midIdx = Math.floor(array.length / 2)
  const leftHalf = array.slice(0, midIdx)
  const rightHalf = array.slice(midIdx, array.length)

  mergeSortHelper(originalArray, leftHalf, animations)
  mergeSortHelper(originalArray, rightHalf, animations)
  merge(originalArray, array, leftHalf, rightHalf, animations)
}

const merge = (originalArray: number[], array: AuxiliaryArrayItem[], leftHalf: AuxiliaryArrayItem[], rightHalf: AuxiliaryArrayItem[], animations: Animation[]) => {
  const leftSize = leftHalf.length
  const rightSize = rightHalf.length

  const colors: ColorMap = {}
  for(let i = 0; i < leftHalf.length; i++) {
    colors[leftHalf[i].originalIndex] = COLOR_TWO
  }

  for(let i = 0; i < rightHalf.length; i++) {
    colors[rightHalf[i].originalIndex] = COLOR_ONE
  }

  let i = 0, j = 0, k = 0

  while(i < leftSize && j < rightSize) {
    const temp = array[k]
    if(leftHalf[i].value <= rightHalf[j].value) {

      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: BAR_COLOR_PRIMARY
        }
      })

      array[k] = leftHalf[i]
      originalArray[temp.originalIndex] = leftHalf[i].value

      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: BAR_COLOR_PRIMARY
        },
        array: originalArray.slice()
      })
      i++
    } else {
      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: BAR_COLOR_PRIMARY
        }
      })

      array[k] = rightHalf[j]
      originalArray[temp.originalIndex] = rightHalf[j].value
      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: BAR_COLOR_PRIMARY
        },
        array: originalArray.slice()
      })
      j++
    }

    k++
  }

  while(i < leftSize) {
    const temp = array[k]
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: BAR_COLOR_PRIMARY
      }
    })
    array[k] = leftHalf[i]
    originalArray[temp.originalIndex] = leftHalf[i].value
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: BAR_COLOR_PRIMARY
      },
      array: originalArray.slice()
    })
    i++
    k++
  }

  while(j < rightSize) {
    const temp = array[k]
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: BAR_COLOR_PRIMARY
      }
    })
    array[k] = rightHalf[j]
    originalArray[temp.originalIndex] = rightHalf[j].value
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: BAR_COLOR_PRIMARY
      },
      array: originalArray.slice()
    })
    j++
    k++
  }
}

export default mergeSort