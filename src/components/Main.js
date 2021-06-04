/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { NewsList } from './NewsList';

export function Main(props) {
  return (
    <>
      <div className={styles.main}>{NewsList(props.news)}</div>
    </>
  );
}
