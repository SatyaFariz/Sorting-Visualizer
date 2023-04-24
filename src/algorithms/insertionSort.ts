type Animations = {
  colors: { [index: number]: string },
  array?: number[]
}

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = 'blue'
const SORTED_COLOR = 'yellow'

const insertionSort = (array: number[]): Animations[] => {
  const animations: Animations[] = []
  let sorted: { [index: number]: string } = {}
  for(let i = 1; i < array.length; i++) {
    const current = array[i]
    let j = i - 1
    while(j >= 0 && array[j] > current) {
      array[j + 1] = array[j]
      animations.push({
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
    animations.push({
      colors: {
        [current]: PRIMARY_COLOR,
        ...sorted
      },
      array: array.slice()
    })
  }
  
  return animations
}

export default insertionSort