import { Animation, ColorMap } from '@/types'

import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY,
  BAR_COLOR_SECONDARY
} from '@/constants'

const bubbleSort = (array: number[]): Animation[] => {
  let animations: Animation[] = []
  let sorted: ColorMap = {}
  
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
      animations.push({
        colors: {
          [j]: BAR_COLOR_PRIMARY,
          [j + 1]: BAR_COLOR_SECONDARY,
          ...sorted
        },
        array: array.slice()
      })
      if(j === array.length - i - 2) {
          sorted[array.length - 1 - i] = BAR_COLOR_SORTED
          if(j === 0) {
            sorted[0] = BAR_COLOR_SORTED
            sorted[1] = BAR_COLOR_SORTED
          }
      }
      if(array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp

        animations.push({
          colors: {
            [j]: BAR_COLOR_SECONDARY,
            [j + 1]: BAR_COLOR_PRIMARY,
            ...sorted
          },
          array: array.slice()
        })
      } else if(sorted[0]) {
        animations.push({
          colors: sorted,
          array: array.slice()
        })
      }
    }
  }

  return animations
}

export default bubbleSort