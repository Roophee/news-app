/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { checkNullOrContent, getUrlForNewsImage } from '../data/dataHandlers';

export function NewsItem(item) {
  return `
          <div class=" ${styles.flex__start}">
            <img class="${styles.news__picture}" src="${getUrlForNewsImage(item.media)}">
            <div>
              <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
              <div>${new Date(checkNullOrContent(item.published_date)).toLocaleDateString()} 
                   ${new Date(checkNullOrContent(item.published_date)).toLocaleTimeString()}
               </div>
              <div class="${styles.flex__space_between}">
                <div>Автор: <strong>${checkNullOrContent(item.author)}</strong></div>
                <div><strong>${checkNullOrContent(item.clean_url)}</strong></div>
              </div><br/>
                <div>${checkNullOrContent(item.summary)}</div>
            </div>
          </div>
          `;
}
