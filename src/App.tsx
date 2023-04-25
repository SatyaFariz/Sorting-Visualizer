import type { Component, Signal } from 'solid-js';
import { createSignal, Index } from 'solid-js';
import bubbleSort from './algorithms/bubbleSort'
import insertionSort from './algorithms/insertionSort'
import selectionSort from './algorithms/selectionSort'
import quickSort from './algorithms/quickSort'
import { ColorMap } from './types';

import styles from './App.module.css';

const NUMBER_OF_BARS = 100;
const ANIMATION_SPEED_MS = 10;
// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';


// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomInt(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateArray(): number[] {
  const array = [];
  for (let i = 0; i < NUMBER_OF_BARS; i++) {
    array.push(randomInt(5, 730));
  }
  return array
}

const App: Component = () => {
  const [array, setArray]: Signal<number[]> = createSignal(generateArray());
  const [color, setColor]: Signal<ColorMap> = createSignal({});
  const resetArray = () => {
    setArray(generateArray())
    setColor({})
  };

  const animateBubbleSort = () => {
    const animations = bubbleSort(array())
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setColor(animations[i].colors)
        if(animations[i].array)
          setArray(animations[i].array as number[])
      }, ANIMATION_SPEED_MS * i)
    }
  }

  const animateInsertionSort = () => {
    const animations = insertionSort(array())
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setColor(animations[i].colors)
        if(animations[i].array)
          setArray(animations[i].array as number[])
      }, ANIMATION_SPEED_MS * i)
    }
  }

  const animateSelectionSort = () => {
    const animations = selectionSort(array())
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setColor(animations[i].colors)
        if(animations[i].array)
          setArray(animations[i].array as number[])
      }, ANIMATION_SPEED_MS * i)
    }
  }

  const animateQuickSort = () => {
    const animations = quickSort(array())
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setColor(animations[i].colors)
        if(animations[i].array)
          setArray(animations[i].array as number[])
      }, ANIMATION_SPEED_MS * i)
    }
  }

  return (
    <div>
      <div class={styles.header}>
        <button onClick={resetArray}>Generate new array</button>
        <button onClick={animateBubbleSort}>Bubble Sort</button>
        <button onClick={animateInsertionSort}>Insertion Sort</button>
        <button onClick={animateSelectionSort}>Selection Sort</button>
        <button onClick={animateQuickSort}>Quick Sort</button>
      </div>
      <div class={styles.bars}>
        <Index each={array()}>{(num, i) =>
          <div
            class={styles.bar}
            style={{
              "background-color": color()[i] ? color()[i] : PRIMARY_COLOR,
              "height": `${num()}px`
            }}
          >
          </div>
        }</Index>
      </div>
    </div>
  );
};

export default App;
