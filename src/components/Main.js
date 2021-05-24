/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { NewsList } from './NewsList';

export function Main(news) {
  return `
  <main class="${styles.main}">
  ${NewsList(news)};
  </main>`;
}
