import React from 'react';
import styles from '../../style.css';
import {
  authorHandler,
  checkNullOrContent,
  getDateLabel,
  getUrlForNewsImage,
  newsSourceHandler,
} from '../data/dataHandlers.js';

export function NewsItem({ item }) {
  return (
    <>
      <div className={[styles.flex__start, styles.news__item, styles.margin__bottom].join(' ')}>
        <img
          className={styles.news__picture}
          src={getUrlForNewsImage(item.media, item.clean_url)}
          alt="News_photo"
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
                {authorHandler(item.author)}
                {newsSourceHandler(item.author, item.clean_url)}
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
