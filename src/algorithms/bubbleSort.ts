type Animation = {
  colors: { [index: number]: string },
  array: number[]
}

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'purple'

const bubbleSort = (array: number[]): Animation[] => {
  let animations: Animation[] = []
  let sorted: { [index: number]: string } = {}
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
      animations.push({
        colors: {
          [j]: PRIMARY_COLOR,
          [j + 1]: SECONDARY_COLOR,
          ...sorted
        },
        array: array.slice()
      })
      if(j === array.length - i - 2) {
          sorted[array.length - 1 - i] = SORTED_COLOR
          if(j === 0) {
            sorted[0] = SORTED_COLOR
            sorted[1] = SORTED_COLOR
          }
      }
      if(array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp

        animations.push({
          colors: {
            [j]: SECONDARY_COLOR,
            [j + 1]: PRIMARY_COLOR,
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