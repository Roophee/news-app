import React from 'react';
import styles from '../../style.css';

export default function Logo() {
  return (
    <a
      className={[styles.link, styles.warning_color].join(' ')}
      href="https://roophee.github.io/news-app/"
    >
      News App
    </a>
  );
}
