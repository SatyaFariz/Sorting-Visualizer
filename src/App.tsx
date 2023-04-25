import type { Component, Signal } from 'solid-js';
import { createSignal, Index } from 'solid-js';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort
} from './algorithms'
import { ColorMap, Algorithm, Animation } from './types';

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
  const [isSorted, setIsSorted]: Signal<boolean> = createSignal(false)

  const resetArray = () => {
    if(!isAnimating()) {
      setIsSorted(false)
      setArray(generateArray())
      setColor({})
    }
  };

  const visualize = (algorithm: (array: number[]) => Animation[]) => {
    if(isSorted()) {
      alert('Array is already sorted!')
      return
    }

    if(!isAnimating()) {
      setIsAnimating(true)
      const animations = algorithm(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])

          if(i === animations.length - 1) {
            setIsAnimating(false)
            setIsSorted(true)
          }
        }, ANIMATION_SPEED_MS * i)
      }
    }
  } 

  const algorithms: Algorithm[] = [
    {
      id: 'bubble_sort',
      title: 'Bubble Sort',
      onClick: () => visualize(bubbleSort)
    },
    {
      id: 'insertion_sort',
      title: 'Insertion Sort',
      onClick: () => visualize(insertionSort)
    },
    {
      id: 'selection_sort',
      title: 'Selection Sort',
      onClick: () => visualize(selectionSort)
    },
    {
      id: 'quick_sort',
      title: 'Quick Sort',
      onClick: () => visualize(quickSort)
    }
  ]

  return (
    <div>
      <div class={styles.header}>
        <div>Sorting Visualizer</div>
        <div class={styles.buttons}>
          <button
            disabled={isAnimating()}
            onClick={resetArray}
            class={styles.button}
          >
            Generate New Array
          </button>
          <div class={styles.separator}/>
          <Index each={algorithms}>{(algorithm, i) =>
            <button
              disabled={isAnimating()}
              onClick={algorithm().onClick}
              class={styles.button}
            >
              {algorithm().title}
            </button>
          }</Index>
        </div>
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
