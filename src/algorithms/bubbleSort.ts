type Animation = {
  colors: { [index: number]: string },
  array: number[]
}
const bubbleSort = (array: number[]): Animation[] => {
  let animations: Animation[] = []
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
      animations.push({
        colors: {
          [j]: 'red',
          [j + 1]: 'blue'
        },
        array: array.slice()
      })
      if(array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        
        animations.push({
          colors: {
            [j]: 'blue',
            [j + 1]: 'red'
          },
          array: array.slice()
        })
      }
    }
  }
  return animations
}

export default bubbleSort