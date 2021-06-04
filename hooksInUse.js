import { useState, useEffect } from './src/framework/hooks';
import { createQueryToApi, fetchingNews, startEndpoint } from './src/data/APIHandlers';
import { render } from './src/framework/render';

export const appHooks = () => {
  const [submitWasClicked, setSubmitWasClicked] = useState(false);
  const [newsStorage, setNewsInStorage] = useState([]);
  const [resetWasClicked, setResetWasClicked] = useState(false);
  const [queryProperties, setQueryProperties] = useState({
    q: '*',
    topic: 'default',
    lang: 'default',
    country: 'default',
    page_size: 75,
    from: '',
  });

  window.state = queryProperties;

  // useEffect(() => {
  //     fetchingNews();
  //   });

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
      fetchingNews().then(news => {
        setNewsInStorage([...news]);
        setQueryProperties({
          q: '*',
          topic: 'default',
          lang: 'default',
          country: 'default',
          page_size: 75,
          from: '',
        });
        setResetWasClicked(false);
      });
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
