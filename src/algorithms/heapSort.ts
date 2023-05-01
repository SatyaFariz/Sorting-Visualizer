import { Animation, ColorMap } from '../types'

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'purple'

const heapSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []

  let lastParentNode = Math.floor(array.length / 2 - 1)
  let lastChild = array.length - 1

  while(lastParentNode >= 0) {
    heapify(array, array.length, lastParentNode, animations)
    lastParentNode--
  }

  while(lastChild >= 0) {
    animations.push({
      colors: {
        [0]: PRIMARY_COLOR,
        [lastChild]: SECONDARY_COLOR
      }
    });

    [array[0], array[lastChild]] = [array[lastChild], array[0]]

    animations.push({
      colors: {
        [0]: SECONDARY_COLOR,
        [lastChild]: PRIMARY_COLOR
      },
      array: array.slice()
    })

    heapify(array, lastChild, 0, animations)
    lastChild--
  }

  return animations
}

const heapify = (array: number[], length: number, parentIdx: number, animations: Animation[]) => {
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
        [parentIdx]: PRIMARY_COLOR,
        [largest]: SECONDARY_COLOR
      }
    });

    [array[parentIdx], array[largest]] = [array[largest], array[parentIdx]]
    animations.push({
      colors: {
        [parentIdx]: SECONDARY_COLOR,
        [largest]: PRIMARY_COLOR
      },
      array: array.slice()
    })
    heapify(array, length, largest, animations)
  }
}

export default heapSort