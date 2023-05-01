import type { Component, Signal } from 'solid-js';
import { createSignal, Index } from 'solid-js';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  heapSort
} from './algorithms'
import { ColorMap, Algorithm, Animation } from './types';
import Logo from './components/Logo'

import styles from './App.module.css';

import {
  NUMBER_OF_BARS,
  BAR_COLOR_DEFAULT,
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
  const [isAnimating, setIsAnimating]: Signal<number> = createSignal(-1)
  const [isSorted, setIsSorted]: Signal<boolean> = createSignal(false)

  const resetArray = () => {
    if(isAnimating() < 0) {
      setIsSorted(false)
      setArray(generateArray())
      setColor({})
    }
  };

  const visualize = (i: number, algorithm: (array: number[]) => Animation[]) => {
    if(isSorted()) {
      alert('Array is already sorted!')
      return
    }

    if(isAnimating() < 0) {
      setIsAnimating(i)
      const animations = algorithm(array())
      for(let i = 0; i < animations.length; i++) {
        setTimeout(() => {
          setColor(animations[i].colors)
          if(animations[i].array)
            setArray(animations[i].array as number[])

          if(i === animations.length - 1) {
            setIsAnimating(-1)
            setIsSorted(true)
          }
        }, ANIMATION_SPEED_MS * i)
      }
    }
  }

  const algorithms: Algorithm[] = [
    {
      title: 'Bubble Sort',
      onClick: (i) => () => visualize(i, bubbleSort)
    },
    {
      title: 'Selection Sort',
      onClick: (i) => () => visualize(i, selectionSort)
    },
    {
      title: 'Insertion Sort',
      onClick: (i) => () => visualize(i, insertionSort)
    },
    {
      title: 'Quick Sort',
      onClick: (i) => () => visualize(i, quickSort)
    },
    {
      title: 'Merge Sort',
      onClick: (i) => () => visualize(i, mergeSort)
    },
    {
      title: 'Heap Sort',
      onClick: (i) => () => visualize(i, heapSort)
    },
  ]

  return (
    <div>
      <div class={styles.header}>
        <div>
          <Logo/>
        </div>
        <div class={styles.buttons}>
          <button
            disabled={isAnimating() >= 0}
            onClick={resetArray}
            class={styles.button}
          >
            Generate New Array
          </button>
          <div class={styles.separator}/>
          <Index each={algorithms}>{(algorithm, i) =>
            <button
              disabled={isAnimating() >= 0}
              onClick={algorithm().onClick(i)}
              class={isAnimating() === i ? styles.buttonActive : styles.button}
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
              'background-color': color()[i] || BAR_COLOR_DEFAULT,
              'height': `${num()}px`
            }}
          >
          </div>
        }</Index>
      </div>
    </div>
  );
};

export default App;
