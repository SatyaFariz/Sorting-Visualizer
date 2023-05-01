import { Animation, ColorMap } from '../types'

import {
  BAR_COLOR_SORTED,
  BAR_COLOR_PRIMARY,
  BAR_COLOR_SECONDARY
} from '../constants'


const selectionSort = (array: number[]): Animation[] => {
  const animation: Animation[] = []
  const sorted: ColorMap = {}
  for(let i = 0; i < array.length - 1; i++) {
    let min = i
    
    for(let j = i + 1; j < array.length; j++) {
      animation.push({
        colors: {
          [min]: BAR_COLOR_PRIMARY,
          [j]: BAR_COLOR_SECONDARY,
          ...sorted
        }
      })
      if(array[j] < array[min])
        min = j
    }

    
    const temp = array[i]
    array[i] = array[min]
    array[min] = temp
    sorted[i] = BAR_COLOR_SORTED
    if(i === array.length - 2)
      sorted[i + 1] = BAR_COLOR_SORTED

    animation.push({
      colors: {...sorted},
      array: array.slice()
    })
  }
  return animation
}

export default selectionSort