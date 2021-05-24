/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { Header } from './Header';
import { Main } from './Main';

export function App(data) {
  return `
  ${Header()}
  ${Main(data)}
    `;
}
