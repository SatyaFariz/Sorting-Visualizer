import type { Component, Signal } from 'solid-js';
import { createSignal, Index } from 'solid-js';
import bubbleSort from './algorithms/bubbleSort'
import insertionSort from './algorithms/insertionSort'
import selectionSort from './algorithms/selectionSort'
import quickSort from './algorithms/quickSort'
import { ColorMap } from './types';

import styles from './App.module.css';

import {
  NUMBER_OF_BARS,
  BAR_COLOR,
  MAX_BAR_HEIGHT,
  MIN_BAR_HEIGHT,
  ANIMATION_SPEED_MS
} from './constants'



// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomInt(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateArray(): number[] {
  const array = [];
  for (let i = 0; i < NUMBER_OF_BARS; i++) {
    array.push(randomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
  }
  return array
}

const App: Component = () => {
  const [array, setArray]: Signal<number[]> = createSignal(generateArray());
  const [color, setColor]: Signal<ColorMap> = createSignal({});
  const [isAnimating, setIsAnimating]: Signal<boolean> = createSignal(false)

  const resetArray = () => {
    if(!isAnimating()) {
      setArray(generateArray())
      setColor({})
    }
  };

  const animateBubbleSort = () => {
    if(!isAnimating()) {
      setIsAnimating(true)
      const animations = bubbleSort(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])

          if(i === animations.length - 1) setIsAnimating(false)
        }, ANIMATION_SPEED_MS * i)
      }
    }
  }

  const animateInsertionSort = () => {
    if(!isAnimating()) {
      setIsAnimating(true)
      const animations = insertionSort(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])
          
          if(i === animations.length - 1) setIsAnimating(false)
        }, ANIMATION_SPEED_MS * i)
      }
    }
  }

  const animateSelectionSort = () => {
    if(!isAnimating()) {
      setIsAnimating(true)
      const animations = selectionSort(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])
          
          if(i === animations.length - 1) setIsAnimating(false)
        }, ANIMATION_SPEED_MS * i)
      }
    }
  }

  const animateQuickSort = () => {
    if(!isAnimating()) {
      setIsAnimating(true)
      const animations = quickSort(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])

          if(i === animations.length - 1) setIsAnimating(false)
        }, ANIMATION_SPEED_MS * i)
      }
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
              "background-color": color()[i] || BAR_COLOR,
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
