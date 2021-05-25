/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { checkNullOrContent, getUrlForNewsImage } from '../data/dataHandlers.js';

export function NewsItem({ item }) {
  return (
    <>
      <div className={styles.flex__start}>
        <img className={styles.news__picture} src={getUrlForNewsImage(item.media)} />
        <div>
          <h2>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          </h2>
          <div>
            <div className={styles.flex__space_between}>
              {new Date(checkNullOrContent(item.published_date)).toLocaleDateString()}{' '}
              {new Date(checkNullOrContent(item.published_date)).toLocaleTimeString()}
              <strong>{checkNullOrContent(item.clean_url)}</strong>
            </div>
            <div>
              {checkNullOrContent(item.summary)}
              {'...'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}