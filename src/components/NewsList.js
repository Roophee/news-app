/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { normalizeNews } from '../data/dataHandlers';
import { NewsItem } from './NewsItem';

export function NewsList(news) {
  return (
    <>
      {news === undefined
        ? '<h3>No matches for your search</h3>'
        : normalizeNews(news).length > 0
        ? normalizeNews(news).map(item => <NewsItem item={item} />)
        : '<h3>No matches for your search</h3>'}
    </>
  );
}
