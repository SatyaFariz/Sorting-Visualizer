import { Animation, ColorMap } from '../types'
import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY,
  BAR_COLOR_SECONDARY
} from '../constants'


const heapSort = (array: number[]): Animation[] => {
  const sorted: ColorMap = {}
  const animations: Animation[] = []

  let lastParentNode = Math.floor(array.length / 2 - 1)
  let lastChild = array.length - 1

  while(lastParentNode >= 0) {
    heapify(array, array.length, lastParentNode, animations, sorted)
    lastParentNode--
  }

  while(lastChild >= 0) {
    sorted[lastChild] = BAR_COLOR_SORTED
    animations.push({
      colors: {
        ...sorted,
        [0]: BAR_COLOR_PRIMARY,
        [lastChild]: BAR_COLOR_SECONDARY
      }
    });

    [array[0], array[lastChild]] = [array[lastChild], array[0]]

    animations.push({
      colors: {
        ...sorted,
        [0]: BAR_COLOR_SECONDARY,
        [lastChild]: BAR_COLOR_PRIMARY
      },
      array: array.slice()
    })

    heapify(array, lastChild, 0, animations, sorted)
    lastChild--
  }

  animations.push({
    colors: {
      ...sorted
    }
  })

  return animations
}

const heapify = (array: number[], length: number, parentIdx: number, animations: Animation[], sorted: ColorMap) => {
  let largest = parentIdx
  const left = parentIdx * 2 + 1
  const right = left + 1

  if(left < length && array[left] > array[largest]) {
    largest = left
  }

  if(right < length && array[right] > array[largest]) {
    largest = right
  }

  if(largest !== parentIdx) {
    animations.push({
      colors: {
        ...sorted,
        [parentIdx]: BAR_COLOR_PRIMARY,
        [largest]: BAR_COLOR_SECONDARY
      }
    });

    [array[parentIdx], array[largest]] = [array[largest], array[parentIdx]]
    animations.push({
      colors: {
        ...sorted,
        [parentIdx]: BAR_COLOR_SECONDARY,
        [largest]: BAR_COLOR_PRIMARY
      },
      array: array.slice()
    })
    heapify(array, length, largest, animations, sorted)
  }
}

export default heapSort