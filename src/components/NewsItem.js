/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { checkNullOrContent, getUrlForNewsImage } from '../data/dataHandlers.js';

export function NewsItem({ item }) {
  return (
    <>
      <div className={[styles.flex__start, styles.news__item]}>
        <img className={styles.news__picture} src={getUrlForNewsImage(item.media)} />
        <div className={styles.width_100}>
          <h4>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          </h4>
          <div>
            <div
              className={[styles.flex__space_between, styles.padding_bottom_5px, styles.news__data]}
            >
              <span>
                {new Date(checkNullOrContent(item.published_date)).toLocaleDateString()}{' '}
                {new Date(checkNullOrContent(item.published_date)).toLocaleTimeString()}
              </span>
              <strong>
                {checkNullOrContent(item.author)} ({checkNullOrContent(item.clean_url)})
              </strong>
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
