import { Animation, ColorMap } from '../types'

import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY,
  BAR_COLOR_TERTIARY
} from '../constants'


const insertionSort = (array: number[]): Animation[] => {
  const Animation: Animation[] = []
  let sorted: ColorMap = {}
  for(let i = 1; i < array.length; i++) {
    const current = array[i]
    let j = i - 1
    while(j >= 0 && array[j] > current) {
      array[j + 1] = array[j]
      Animation.push({
        colors: {
          ...sorted,
          [i]: BAR_COLOR_PRIMARY,
          [j]: BAR_COLOR_TERTIARY,
        }
      })
      j--
    }

    array[j + 1] = current
    for(let k = 0; k <= i; k++) {
      sorted[k] = BAR_COLOR_SORTED
    }
    Animation.push({
      colors: {
        [current]: BAR_COLOR_PRIMARY,
        ...sorted
      },
      array: array.slice()
    })
  }
  
  return Animation
}

export default insertionSort