if (module.hot) {
  module.hot.accept();
}

import styles from './style.css';
const startEndpoint = 'https://free-news.p.rapidapi.com/v1/search?q=*&lang=uk&&page_size=100&';
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
};

function setItemToLocalStore(key, value) {
  return window.localStorage.setItem(key, value);
};

Object.keys(queryProperties).forEach(item => {
  setItemToLocalStore(item, queryProperties[item]);
});

const defaultSearch = input => {
  return input.trim() === '' ? '*' : input.trim();
};

const setValueInLocalStorage = event => {
  setItemToLocalStore(event.target.id, defaultSearch(event.target.value));
  event.target.value
    ? (event.target.querySelector(`option[value=${event.target.value}]`).selected = true)
    : '';
};

window.setValueInLocalStorage = setValueInLocalStorage;

const setValueInLocalStorage2 = event => {
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
    return (url += `&from=${getItemFromLocalStore('from').replaceAll('-', '/')}`);
  }
  return url;
};

const fetchingNews = (url = startEndpoint) => {
  fetch(`${url}`, {
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
      renderApp(data.articles);
    });
};

fetchingNews();

const checkComponentOrProps = args => {
  if (typeof args === 'function') {
    return true;
  }
  return false;
};

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
  fetchingNews(createQueryToApi());
};

const onSubmitHandler = event => {
  event.preventDefault();
  window.someHamdler();
};

const insertComponent = args => {
  return checkComponentOrProps(args) ? args() : args;
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
  Object.keys(queryProperties).forEach(item => {
    if (item !== 'q' && item !== 'page_size' && item !== 'from') {
      setItemToLocalStore(item, 'default');
    }
    if (item === 'q') {
      setItemToLocalStore(item, '*');
    }
    if (item === 'from') {
      setItemToLocalStore(item, '');
    }
  });
}

window.resetFilters = resetFilters;
window.setSelectedFilters = setSelectedFilters;

const applyResetFilters = event => {
  window.resetFilters(event);
  window.setSelectedFilters();
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

function Header(args) {
  return `
    <header class="
    ${styles.header}
    ">
    <div class="${styles.flex__center} ${styles.width_100} ${styles.border_bottom}">
      <div class="${styles.flex__space_between} ${styles.width_80}">
        <img style=" height: 50px;" src="https://archive.org/download/news-logo/news-logo.png" alt="logo"/>
        ${args.length > 0 ? args.map(arg => insertComponent(arg)).join('') : ''}
      </div>
    </div>
    <form>
    <div class="">
    <label>Keyword <input type="text" name="search" value="*" id="q" onChange="(${setValueInLocalStorage2})(event)"/></label>
    </div>
    <div class="">
    <label>Category <select name="topic" id="topic" default="default" onChange="(${setValueInLocalStorage2})(event)">
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
    <div class="">
    <label>Language <select name="lang" id="lang" default="default" onChange="(${setValueInLocalStorage2})(event)">
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
    <div class="">
    <label>Country <select name="country" default="default" id="country" onChange="(${setValueInLocalStorage2})(event)">
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
    <div class="">
    <label>Page size <input style="width: 7vw" type="range" min="25" max="100" value="50" name="page_size" id="page_size"
    onChange="(${applyPageSizeHandler})(event)"></label>
    </div>
    <div class="">
    <label>From date <input type="date" name="from" id="from" value="" onChange="(${applyQueryParamFromHandler})(event)"></label>
    </div>
    <div class="">
    <input style="background-color: #C8E6C9;" type="submit" value="Search" onClick="(${onSubmitHandler})(event)"/>
    <button style="background-color: #ffcdd2;" onClick="(${applyResetFilters})(event)">Reset</button>
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
  ${
    news === undefined
      ? `<h3>No matches for your search</h3>`
      : normalizeNews(news).length > 0
      ? normalizeNews(news)
          .map(item => {
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
          })
          .join('')
      : `<h3>No matches for your search</h3>`
  }
</main>`;
}

function setSelectedFilters() {
  Object.keys(queryProperties).forEach(item => {
    if (item !== 'q' && item !== 'page_size' && item !== 'from') {
      document
        .querySelector(`#${item}`)
        .querySelector(`option[value=${getItemFromLocalStore(item)}]`).selected = true;
    }
    if (item === 'q') {
      if (getItemFromLocalStore(item) !== '') {
        document.querySelector(`#${item}`).value = `${getItemFromLocalStore(item)}`;
      } else {
        document.querySelector(`#${item}`).value = `*`;
      }
    }
    if (item === 'from' || 'page_size') {
      document.querySelector(`#${item}`).value = getItemFromLocalStore(`${item}`);
    }
  });
}

function renderApp(apiData) {
  App.innerHTML = `
    ${Header([Account])}
    ${Main(apiData)}
`;
  setSelectedFilters();
}
