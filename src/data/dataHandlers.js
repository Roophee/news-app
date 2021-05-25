export const queryProperties = {
  q: '*',
  topic: 'default',
  lang: 'default',
  country: 'default',
  page_size: '75',
  from: '',
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

export function getItemFromLocalStore(key) {
  return window.localStorage.getItem(`${key}`);
}

export function setItemToLocalStore(key, value) {
  return window.localStorage.setItem(key, value);
}

export const getQueryParam = name => {
  if (getItemFromLocalStore(name) !== '*' && getItemFromLocalStore(name) !== '0') {
    return `${getItemFromLocalStore(name)}`;
  }
  return '';
};

const returnPlaceHolderUrl = () => {
  return 'https://via.placeholder.com/450x250.png?text=NoImage';
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

export const valuesFromKey = key => {
  return !(
    getItemFromLocalStore(`${key}`) == false || getItemFromLocalStore(`${key}`) === 'default'
  )
    ? `${key}=${getItemFromLocalStore(`${key}`)}&`
    : ``;
};

export default queryProperties;
