import React from 'react';
import { normalizeNews } from '../data/dataHandlers.js';
import { NewsItem } from './NewsItem';

export function NewsList(news) {
  const startPage = <h3>Setup your filters and search a news</h3>;
  return (
    <>
      {news === undefined
        ? startPage
        : normalizeNews(news).length > 0
        ? normalizeNews(news).map((item, idx) => <NewsItem item={item} key={idx} />)
        : startPage}
    </>
  );
}
