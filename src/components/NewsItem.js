import React from 'react';
import styles from '../../style.css';
import { checkNullOrContent, getDateLabel, getUrlForNewsImage } from '../data/dataHandlers.js';

export function NewsItem({ item }) {
  return (
    <>
      <div className={[styles.flex__start, styles.news__item, styles.margin__bottom].join(' ')}>
        <img
          className={styles.news__picture}
          src={getUrlForNewsImage(item.media, item.clean_url)}
        />
        <div className={styles.width_100}>
          <h3>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          </h3>
          <div>
            <div
              className={[
                styles.flex__space_between,
                styles.padding_bottom_5px,
                styles.news__data,
                styles.margin__bottom,
              ].join(' ')}
            >
              <span>
                {getDateLabel(checkNullOrContent(item.published_date))}{' '}
                {new Date(checkNullOrContent(item.published_date)).toLocaleTimeString()}
              </span>
              <strong>
                {checkNullOrContent(item.author)}
                {!checkNullOrContent(item.author)
                  ? checkNullOrContent(item.clean_url)
                  : ` ( ${checkNullOrContent(item.clean_url)} )`}
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
