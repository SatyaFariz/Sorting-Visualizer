import { Animation, ColorMap } from "../types"
import { AuxiliaryArrayItem } from '../types'

const PRIMARY_COLOR = 'blue'
const SORTED_COLOR = 'purple'
const COLOR_ONE = 'pink'
const COLOR_TWO = 'yellow'

const mergeSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []
  const sorted: ColorMap = {}

  const arrayItems: AuxiliaryArrayItem[] = array.map((value, i) => ({
    value,
    originalIndex: i
  }))
  mergeSortHelper(array, arrayItems, animations)

  for(let i = 0; i < array.length; i++) sorted[i] = SORTED_COLOR

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
    colors[leftHalf[i].originalIndex] = COLOR_ONE
  }

  for(let i = 0; i < rightHalf.length; i++) {
    colors[rightHalf[i].originalIndex] = COLOR_TWO
  }

  let i = 0, j = 0, k = 0

  while(i < leftSize && j < rightSize) {
    const temp = array[k]
    if(leftHalf[i].value <= rightHalf[j].value) {

      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: PRIMARY_COLOR
        }
      })

      array[k] = leftHalf[i]
      originalArray[temp.originalIndex] = leftHalf[i].value

      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: PRIMARY_COLOR
        },
        array: originalArray.slice()
      })
      i++
    } else {
      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: PRIMARY_COLOR
        }
      })

      array[k] = rightHalf[j]
      originalArray[temp.originalIndex] = rightHalf[j].value
      animations.push({
        colors: {
          ...colors,
          [temp.originalIndex]: PRIMARY_COLOR
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
        [temp.originalIndex]: PRIMARY_COLOR
      }
    })
    array[k] = leftHalf[i]
    originalArray[temp.originalIndex] = leftHalf[i].value
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: PRIMARY_COLOR
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
        [temp.originalIndex]: PRIMARY_COLOR
      }
    })
    array[k] = rightHalf[j]
    originalArray[temp.originalIndex] = rightHalf[j].value
    animations.push({
      colors: {
        ...colors,
        [temp.originalIndex]: PRIMARY_COLOR
      },
      array: originalArray.slice()
    })
    j++
    k++
  }
}

export default mergeSort