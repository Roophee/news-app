/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { normalizeNews } from '../data/dataHandlers.js';
import { NewsItem } from './NewsItem';

export function NewsList(news) {
  const noMatches = <h3>No matches for your search</h3>;
  return (
    <>
      {news === undefined
        ? noMatches
        : normalizeNews(news).length > 0
        ? normalizeNews(news).map(item => <NewsItem item={item} />)
        : noMatches}
    </>
  );
}
