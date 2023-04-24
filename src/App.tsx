import type { Component, Signal } from 'solid-js';
import { createSignal, Index } from 'solid-js';
import {getMergeSortAnimations} from './algorithms/mergeSort';
import bubbleSort from './algorithms/bubbleSort'

import styles from './App.module.css';

const NUMBER_OF_BARS = 5;
const ANIMATION_SPEED_MS = 1000;
// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

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
  const [color, setColor]: Signal<{[index: number]: string}> = createSignal({});
  const [height, setHeight]: Signal<{[index: number]: number}> = createSignal({});
  const resetArray = () => {
    setArray(generateArray())
    setColor({})
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array());
    for (let i = 0; i < animations.length; i++) {
      // const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        // const barOneStyle = arrayBars[barOneIdx].style;
        // const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          // barOneStyle.backgroundColor = color;
          // barTwoStyle.backgroundColor = color;
          setColor(prev => ({ ...prev, [barOneIdx]: color, [barTwoIdx]: color }))
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          // const barOneStyle = arrayBars[barOneIdx].style;
          // barOneStyle.height = `${newHeight}px`;
          setHeight(prev => ({ ...prev, [barOneIdx]: newHeight }))
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  const animateBubbleSort = () => {
    const animations = bubbleSort(array())
    for(let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setColor(animations[i].colors)
        setArray(animations[i].array)
      }, ANIMATION_SPEED_MS * i)
    }
  }

  return (
    <div>
      <div class={styles.header}>
        <button onClick={resetArray}>Generate new array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={animateBubbleSort}>Bubble Sort</button>
      </div>
      <div class={styles.bars}>
        <Index each={array()}>{(num, i) =>
          <div
            class={styles.bar}
            style={{
              "background-color": color()[i] ? color()[i] : PRIMARY_COLOR,
              "height": height()[i] ? `${height()[i]}px` : `${num()}px`
            }}
          >
          </div>
        }</Index>
      </div>
    </div>
  );
};

export default App;
