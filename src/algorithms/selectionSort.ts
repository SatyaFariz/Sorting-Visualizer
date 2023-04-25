import { Animation } from "../types"

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'purple'

const selectionSort = (array: number[]): Animation[] => {
  const animation: Animation[] = []
  const sorted: { [index: number]: string } = {}
  for(let i = 0; i < array.length - 1; i++) {
    let min = i
    
    for(let j = i + 1; j < array.length; j++) {
      animation.push({
        colors: {
          [min]: PRIMARY_COLOR,
          [j]: SECONDARY_COLOR,
          ...sorted
        }
      })
      if(array[j] < array[min])
        min = j
    }

    
    const temp = array[i]
    array[i] = array[min]
    array[min] = temp
    sorted[i] = SORTED_COLOR
    if(i === array.length - 2)
      sorted[i + 1] = SORTED_COLOR

    animation.push({
      colors: {...sorted},
      array: array.slice()
    })
  }
  return animation
}

export default selectionSort