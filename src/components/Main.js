/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { NewsList } from './NewsList';

export function Main() {
  let news = window.news;
  return (
    <>
      <div className={styles.main}>{NewsList(news)};</div>;
    </>
  );
}
