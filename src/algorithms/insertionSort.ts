import { Animation } from "../types"

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'yellow'

const insertionSort = (array: number[]): Animation[] => {
  const Animation: Animation[] = []
  let sorted: { [index: number]: string } = {}
  for(let i = 1; i < array.length; i++) {
    const current = array[i]
    let j = i - 1
    while(j >= 0 && array[j] > current) {
      array[j + 1] = array[j]
      Animation.push({
        colors: {
          ...sorted,
          [i]: PRIMARY_COLOR,
          [j]: SECONDARY_COLOR,
        }
      })
      j--
    }

    array[j + 1] = current
    for(let k = 0; k <= i; k++) {
      sorted[k] = SORTED_COLOR
    }
    Animation.push({
      colors: {
        [current]: PRIMARY_COLOR,
        ...sorted
      },
      array: array.slice()
    })
  }
  
  return Animation
}

export default insertionSort