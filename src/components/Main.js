import React from 'react';
import styles from '../../style.css';
import { NewsList } from './NewsList';

export function Main(props) {
  return (
    <>
      <main className={styles.main}>{NewsList(props.news)}</main>
    </>
  );
}
