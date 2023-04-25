import { Animation } from "../types"

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'purple'

const quickSort = (array: number[]): Animation[] => {
  const animations: Animation[] = []
  const sorted: { [index: number]: string } = {}

  qs(array, 0, array.length - 1, animations, sorted)

  return animations
}

const qs = (array: number[], leftIdx: number, rightIdx: number, animations: Animation[], sorted: { [index: number]: string }) => {
  if(leftIdx >= rightIdx) return

  const pivotIdx: number = partition(array, leftIdx, rightIdx, animations, sorted)

  qs(array, leftIdx, pivotIdx - 1, animations, sorted)
  qs(array, pivotIdx + 1, rightIdx, animations, sorted)
  for(let i = rightIdx; i >= 0; i--) {
    sorted[i] = SORTED_COLOR
    sorted[pivotIdx] = SORTED_COLOR
  }
  animations.push({
    colors: {
      ...sorted
    },
    array: array.slice()
  })
}

const partition = (array: number[], leftIdx: number, rightIdx: number, animations: Animation[], sorted: { [index: number]: string }): number => {
  const pivot = array[rightIdx]

  let i = leftIdx - 1
  for(let j = leftIdx; j < rightIdx; j++) {
    if(array[j] < pivot) {
      i++
      animations.push({
        colors: {
          ...sorted,
          [i]: PRIMARY_COLOR,
          [j]: SECONDARY_COLOR
        },
        array: array.slice()
      })
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
      animations.push({
        colors: {
          ...sorted,
          [i]: SECONDARY_COLOR,
          [j]: PRIMARY_COLOR
        },
        array: array.slice()
      })
    }
  }
  
  if(i + 1 !== rightIdx) {
    animations.push({
      colors: {
        ...sorted,
        [i + 1]: PRIMARY_COLOR,
        [rightIdx]: SECONDARY_COLOR
      },
      array: array.slice()
    })

    const temp = array[i + 1]
    array[i + 1] = array[rightIdx]
    array[rightIdx] = temp

    animations.push({
      colors: {
        ...sorted,
        [i + 1]: SECONDARY_COLOR,
        [rightIdx]: PRIMARY_COLOR
      },
      array: array.slice()
    })
  }
  

  return i + 1
}

export default quickSort