import { useState, useEffect } from 'react';
import { createQueryToApi, fetchingNews } from './src/data/APIHandlers';

const initialQueryPropertyState = {
  q: '*',
  topic: 'default',
  lang: 'default',
  country: 'default',
  page_size: 75,
  from: '',
};

export const appHooks = () => {
  const [submitWasClicked, setSubmitWasClicked] = useState(false);
  const [newsStorage, setNewsInStorage] = useState([]);
  const [resetWasClicked, setResetWasClicked] = useState(false);
  const [queryProperties, setQueryProperties] = useState(initialQueryPropertyState);

  window.state = queryProperties;

  useEffect(() => {
    if (submitWasClicked) {
      fetchingNews(createQueryToApi(queryProperties)).then(news => {
        setNewsInStorage([...news]);
        setSubmitWasClicked(false);
      });
    }
  }, [submitWasClicked]);

  useEffect(() => {
    if (resetWasClicked) {
      setNewsInStorage([]);
      setQueryProperties(initialQueryPropertyState);
      setResetWasClicked(false);
    }
  }, [resetWasClicked]);

  return {
    submitWasClicked,
    setSubmitWasClicked,
    newsStorage,
    queryProperties,
    setQueryProperties,
    setResetWasClicked,
  };
};
