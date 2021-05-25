// /** @jsx createElement */
// /** @jsxFrag createFragment */
// import { createElement, createFragment } from '../framework/element';
import { getItemFromLocalStore, valuesFromKey } from './dataHandlers';

const startEndpoint =
  'https://free-news.p.rapidapi.com/v1/search?q=*&lang=uk&country=ua&page_size=100&';
export const createQueryToApi = () => {
  let url = `https://free-news.p.rapidapi.com/v1/search?`;
  Object.keys(queryProperties)
    .filter(item => item !== 'from')
    .map(key => (url += valuesFromKey(key)));
  if (getItemFromLocalStore('from') !== '') {
    return (url += `from=${getItemFromLocalStore('from').replaceAll('-', '/')}`);
  }
  return url;
};

export const fetchingNews = (url = startEndpoint) => {
  return fetch(`${url}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${process.env.API_KEY}`,
      'x-rapidapi-host': 'free-news.p.rapidapi.com',
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      // console.log('error', err);
    })
    .then(data => {
      window.news = data.articles;
      return window.news;
    });
};
