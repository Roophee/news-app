if (module.hot) {
  module.hot.accept();
}

import styles from './style.css';
import API_KEY from '.env';
const startEndpoint =
  'https://free-news.p.rapidapi.com/v1/search?q=*&lang=uk&country=ua&page_size=100&';
const App = document.querySelector('.app-root');
const queryProperties = {
  q: '*',
  topic: 'default',
  lang: 'default',
  country: 'default',
  page_size: '75',
  from: '',
};

function getItemFromLocalStore(key) {
  return window.localStorage.getItem(`${key}`);
}

function setItemToLocalStore(key, value) {
  return window.localStorage.setItem(key, value);
}

const defaultSearch = input => {
  return input.trim() === '' ? '*' : input.trim();
};

const setValueInLocalStorage = event => {
  // console.log(event.target.id, event.target.value);
  setItemToLocalStore(event.target.id, defaultSearch(event.target.value));
};

window.setValueInLocalStorage = setValueInLocalStorage;

const applySetValueInLocalStorage = event => {
  event.preventDefault();
  window.setValueInLocalStorage(event);
};

const valuesFromKey = key => {
  return !(
    getItemFromLocalStore(`${key}`) == false || getItemFromLocalStore(`${key}`) === 'default'
  )
    ? `${key}=${getItemFromLocalStore(`${key}`)}&`
    : ``;
};

const createQueryToApi = () => {
  let url = `https://free-news.p.rapidapi.com/v1/search?`;
  Object.keys(queryProperties)
    .filter(item => item !== 'from')
    .map(key => (url += valuesFromKey(key)));
  if (getItemFromLocalStore('from') !== '') {
    return (url += `from=${getItemFromLocalStore('from').replaceAll('-', '/')}`);
  }
  return url;
};

const fetchingNews = (url = startEndpoint) => {
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

fetchingNews().then(news => renderApp(news));
// .catch(err => console.log('1', err));

const checkNullOrContent = arg => {
  return arg === null ? '' : arg;
};

const returnPlaceHolderUrl = () => {
  return 'https://via.placeholder.com/450x250.png?text=NoImage';
};

const getUrlForNewsImage = url => {
  return checkNullOrContent(url).includes('https')
    ? checkNullOrContent(url)
    : checkNullOrContent(url).includes('http')
    ? checkNullOrContent(url).replace('http', 'https')
    : returnPlaceHolderUrl();
};

const checkValueFromFormItem = () => {
  fetchingNews(createQueryToApi()).then(news => renderMain(news));
  // .catch(err => console.log('2', err));
};

const onSubmitHandler = event => {
  event.preventDefault();
  window.someHamdler();
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

window.someHamdler = checkValueFromFormItem;

function resetFilters(event) {
  event.preventDefault();
  // console.log('=======');
  Object.keys(queryProperties).forEach(item => {
    // console.log('00');
    if (item !== 'q' && item !== 'page_size' && item !== 'from') {
      // console.log('11');
      setItemToLocalStore(item, 'default');
    }
    if (item === 'q') {
      // console.log('22');
      setItemToLocalStore(item, '*');
    }
    if (item === 'from') {
      // console.log('33');
      setItemToLocalStore(item, '');
    }
  });
}

window.resetFilters = resetFilters;
window.fetchingNews = fetchingNews;
window.renderApp = renderApp;

const applyResetFilters = event => {
  window.resetFilters(event);
  window.fetchingNews().then(news => {
    window.renderApp(news);
  });
};

function queryParamFromHandler(event) {
  setItemToLocalStore(event.target.id, event.target.value);
}

window.queryParamFromHandler = queryParamFromHandler;

const applyQueryParamFromHandler = event => {
  event.preventDefault();
  window.queryParamFromHandler(event);
};

function pageSizeHandler(event) {
  setItemToLocalStore(event.target.id, event.target.value);
}

window.pageSizeHandler = pageSizeHandler;

const applyPageSizeHandler = event => {
  event.preventDefault();
  window.pageSizeHandler(event);
};

const normalizeNews = news => {
  return news.sort(sortNewsByTimeStamp).filter(filterNewsByRealTimeStamp);
};

const getQueryParam = name => {
  if (getItemFromLocalStore(name) !== '*') {
    return `${getItemFromLocalStore(name)}`;
  }
  return '';
};

function Header() {
  return `
    <header class="
    ${styles.header}
    ">
    <div class="${styles.flex__center} ${styles.width_100} ${styles.border_bottom}">
      <div class="${styles.flex__space_between} ${styles.width_80}">
        <img style=" height: 50px;" src="https://archive.org/download/news-logo/news-logo.png" alt="logo"/>
        ${Account()}
      </div>
    </div>
    <form>
    <div>
    <label>Keyword <input type="text" name="search" value="${getQueryParam(
      'q',
    )}" id="q" onChange="(${applySetValueInLocalStorage})(event)"/></label>
    </div>
    <div>
    <label>Category <select name="topic" id="topic"  onChange="(${applySetValueInLocalStorage})(event)">
    <option value="default">Any</option>
    <option value="business">Business</option>
    <option value="beauty">Beauty</option>
    <option value="entertainment">Entertainment</option>
    <option value="economics">Economics</option>
    <option value="finance">Finance</option>
    <option value="food">Food</option>
    <option value="news">General</option>
    <option value="music">Music</option>
    <option value="politics">Politics</option>
    <option value="science">Science</option>
    <option value="sport">Sport</option>
    <option value="tech">Technology</option>
    <option value="travel">Travel</option>
    <option value="world">World</option>
    </select></label>
    </div>
    <div>
    <label>Language <select name="lang" id="lang"  onChange="(${applySetValueInLocalStorage})(event)">
    <option value="default">Any</option>
    <option value="uk">Ukrainian </option>
    <option value="de">German</option>
    <option value="en">English</option>
    <option value="ru">Russian</option>
    <option value="it">Italian </option>
    <option value="lt">Lithuanian </option>
    <option value="pt">Portuguese</option>
    <option value="es">Espanian</option>
    <option value="cn">Chinese</option>
    </select></label>
    </div>
    <div>
    <label>Country <select name="country"  id="country" onChange="(${applySetValueInLocalStorage})(event)">
    <option value="default">Any</option>
    <option value="ua">Ukraine</option>
    <option value="us">USA</option>
    <option value="ru">Russia</option>
    <option value="de">Germany</option>
    <option value="gb">Great Britain</option>
    <option value="it">Italy</option>
    <option value="lt">Lithuania</option>
    <option value="pt">Portugal</option>
    <option value="sp">Spain</option>
    <option value="ch">China</option>
    </select></label>
    </div>
    <div>
    <label>Page size <input style="width: 7vw" type="range" min="25" max="100" value="${getItemFromLocalStore(
      'page_size',
    )}" name="page_size" id="page_size"
    onChange="(${applyPageSizeHandler})(event)"></label>
    </div> 
    <div>
    <label>From date <input type="date" name="from" id="from" value="${getItemFromLocalStore(
      'from',
    )}" onChange="(${applyQueryParamFromHandler})(event)"></label>
    </div>
    <div>
    <input style="background-color: #C8E6C9;" type="submit" value="Search" onClick="(${onSubmitHandler})(event)"/>
    <button type="button" style="background-color: #ffcdd2;" onClick="(${applyResetFilters})(event)">Reset</button>
    </div>
    </form>
    </header>
  `;
}

function Account() {
  return `
  <div class="${styles.flex__space_between}">
    <div>
    <img class="${styles.header__avatar}" src="https://img2.freepng.ru/20180720/ivv/kisspng-computer-icons-user-profile-avatar-job-icon-5b521c567f49d7.5742234415321078625214.jpg" alt="user">
    </div>  
    <button>Log In</button>
  </div>
  `;
}

function Main(news) {
  return `
  <main class="${styles.main}">
  ${NewsList(news)};
  </main>`;
}

function NewsItem(item) {
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

function NewsList(news) {
  return `
  ${
    news === undefined
      ? `<h3>No matches for your search</h3>`
      : normalizeNews(news).length > 0
      ? normalizeNews(news)
          .map(item => {
            return NewsItem(item);
          })
          .join('')
      : `<h3>No matches for your search</h3>`
  }
  `;
}

function renderMain(news) {
  document.querySelector('main').innerHTML = `${NewsList(news)}`;
}

function renderApp(apiData) {
  App.innerHTML = `
    ${Header()}
    ${Main(apiData)}
`;
}
