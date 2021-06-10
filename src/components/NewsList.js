import React from 'react';
import { normalizeNews } from '../data/dataHandlers.js';
import { NewsItem } from './NewsItem';

export function NewsList(news) {
  const startPage = <h3>Select filters and search for news</h3>;
  return (
    <>
      {news === undefined
        ? startPage
        : normalizeNews(news).length > 0
        ? normalizeNews(news).map(item => <NewsItem item={item} key={item._id} />)
        : startPage}
    </>
  );
}
