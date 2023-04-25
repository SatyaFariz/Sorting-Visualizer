import { JSX } from "solid-js/jsx-runtime"

export type Animation = {
  colors: ColorMap,
  array?: number[]
}

export type ColorMap = {
  [index: number]: string
}

export type AlgorithmMap = {
  id: string,
  title: string,
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
}