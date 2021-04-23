if (module.hot) {
  module.hot.accept();
}

import styles from './style.css';
import news from './storage';
const APIKey = '9d9d86bb24494ac49811063c8ddc0653';
const reservApiKey = 'e1b7d424d3ee4d279d24fbd5c3b8c509';
const startEndpoint =
  'https://newsapi.org/v2/top-headlines?country=ua&pageSize=50&apiKey=e1b7d424d3ee4d279d24fbd5c3b8c509';
const App = document.querySelector('.app-root');
const queryProperties = {
  category: '',
  country: '',
  q: '',
  pageSize: '',
};

fetchingNews();

const addQueryParam = (param, value) => {
  queryProperties[param] = value;
};

const valuesFromKey = key => {
  return !(queryProperties[key] == false || queryProperties[key] === 'default')
    ? `${key}=${queryProperties[key]}&`
    : '';
};

const createQueryToApi = () => {
  let url = `https://newsapi.org/v2/top-headlines?`;
  Object.keys(queryProperties).map(key => (url += valuesFromKey(key)));
  url += `apiKey=${reservApiKey}`;
  return url;
};

function fetchingNews(url = startEndpoint) {
  fetch(`${url}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderApp(data.articles);
    });
}

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

const urlForNewsImage = url => {
  return checkNullOrContent(url) == '' ? returnPlaceHolderUrl() : checkNullOrContent(url);
};

const checkValueFromFormItem = () => {
  Object.keys(queryProperties).map(key => {
    addQueryParam(key, document.querySelector(`#${key}`).value.trim());
  });
  fetchingNews(createQueryToApi());
};

const onSubmitHandler = event => {
  event.preventDefault();
  window.someHamdler();
};

const insertComponent = args => {
  return checkComponentOrProps(args) ? args() : args;
};

window.someHamdler = checkValueFromFormItem;

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
    <label>Keyword <input type="text" name="search" value="" id="q"/></label>
    <label>Category <select name="category" id="category" default="-----------">
    <option value="default">-----------</option>
    <option value="business">Business</option>
    <option value="entertainment">Entertainment</option>
    <option value="general">General</option>
    <option value="health">Health</option>
    <option value="science">Science</option>
    <option value="sports">Sports</option>
    <option value="technology">Technology</option>
    </select></label>
    <label>Country <select name="country" id="country" default="-----------">
    <option value="default">-----------</option>
    <option value="ua">Ukraine</option>
    <option value="us">USA</option>
    <option value="ru">Russia</option>
    <option value="gb">Great Britain</option>
    <option value="it">Italy</option>
    <option value="lt">Lithuania</option>
    <option value="ch">China</option>
    </select></label>
    <label>Pages <input type="range" min="20" max="100" value="30" name="pageSize" id="pageSize"></label>
    <input type="submit" value="Search" onClick="(${onSubmitHandler})(event)"/>
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
  ${news
    .map(item => {
      return `
    <div class=" ${styles.flex__start}">
      <img class="${styles.news__picture}" src="${urlForNewsImage(item.urlToImage)}">
      <div>
        <h2><a href="${item.url}" target="_blank">${item.title}</a></h2>
        <div>${new Date(checkNullOrContent(item.publishedAt)).toLocaleDateString()}</div>
        <div class="${styles.flex__space_between}">
          <div>Автор: <strong>${checkNullOrContent(item.author)}</strong></div>
          <div><strong>${checkNullOrContent(item.source.name)}</strong></div>
        </div><br/>
          <div>${checkNullOrContent(item.description)}</div>
      </div>
    </div>
    `;
    })
    .join('')}
</main>`;
}

function renderApp(apiData) {
  App.innerHTML = `
    ${Header([Account])}
    ${Main(apiData)}
`;
}
