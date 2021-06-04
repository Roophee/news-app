export const queryProperties = {
  q: '*',
  topic: 'default',
  lang: 'default',
  country: 'default',
  page_size: '75',
  from: '',
};

export const errorString =
  'Status code more then 200. It could be a connection or server error. Try submitting your request again.';

export const getResponseErrorNewsArticle = error => {
  return {
    articles: [
      {
        title: 'Response received with an Error',
        published_date: '1970-01-01 00:00:00',
        summary: error,
        media:
          'https://media.istockphoto.com/photos/computer-error-picture-id1222806141?k=6&m=1222806141&s=612x612&w=0&h=7KXHxbzikLbq4MXqxiEPO4wbKkd6ckRVXACDCJUA908=',
      },
    ],
  };
};

export const getResponseNoMatch = () => {
  return [
    {
      title: 'No matches for your search.',
      published_date: '1970-01-01 00:00:00',
      summary: 'No matches',
      media: 'https://via.placeholder.com/450x250.png/F5F5F5/d32f2f?text=No Matches',
    },
  ];
};

export const checkNullOrContent = arg => {
  return arg === null ? '' : arg;
};

const concatTimeStamp = time => {
  if (time) {
    return time.replace(' ', 'T');
  }
};

const sortNewsByTimeStamp = (a, b) => {
  return (
    Date.parse(concatTimeStamp(b.published_date)) - Date.parse(concatTimeStamp(a.published_date))
  );
};

const filterNewsByRealTimeStamp = article => {
  return Date.parse(concatTimeStamp(article.published_date)) <= Date.now();
};

export const normalizeNews = news => {
  return news.sort(sortNewsByTimeStamp).filter(filterNewsByRealTimeStamp);
};

export const getQueryParam = name => {
  if (getItemFromLocalStore(name) !== '*' && getItemFromLocalStore(name) !== '0') {
    return `${getItemFromLocalStore(name)}`;
  }
  return '';
};

const returnPlaceHolderUrl = () => {
  return 'https://via.placeholder.com/450x250.png/F5F5F5/d32f2f?text=No Image';
};

export const getUrlForNewsImage = url => {
  return checkNullOrContent(url).includes('https')
    ? checkNullOrContent(url)
    : checkNullOrContent(url).includes('http')
    ? checkNullOrContent(url).replace('http', 'https')
    : returnPlaceHolderUrl();
};

export const defaultSearch = input => {
  return input.trim() === '' ? '*' : input.trim();
};

export const valuesFromKey = (key, value) => {
  return !(value == false || value === 'default') ? `${key}=${value}&` : ``;
};

export default queryProperties;
