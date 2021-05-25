/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import {
  setItemToLocalStore,
  defaultSearch,
  getItemFromLocalStore,
  getQueryParam,
  queryProperties,
} from '../data/dataHandlers';
import { fetchingNews } from '../data/APIHandlers';
import { App } from './App';
import { render } from '../framework/render';
import Account from './Account';

// console.log(queryProperties);
queryProperties.entries().map(item => setItemToLocalStore(item[0], item[1]));

export function Header() {
  function queryParamFromHandler(event) {
    setItemToLocalStore(event.target.id, event.target.value);
  }

  window.queryParamFromHandler = queryParamFromHandler;

  const applyQueryParamFromHandler = event => {
    event.preventDefault();
    window.queryParamFromHandler(event);
  };

  const checkValueFromFormItem = () => {
    fetchingNews(createQueryToApi()).then(news => renderMain(news));
    // .catch(err => console.log('2', err));
  };

  window.someHamdler = checkValueFromFormItem;

  const onSubmitHandler = event => {
    event.preventDefault();
    window.someHamdler();
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

  function pageSizeHandler(event) {
    setItemToLocalStore(event.target.id, event.target.value);
  }

  window.pageSizeHandler = pageSizeHandler;

  const applyPageSizeHandler = event => {
    event.preventDefault();
    window.pageSizeHandler(event);
  };

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
  window.render = render;
  window.getQueryParam = getQueryParam;

  const applyResetFilters = event => {
    window.resetFilters(event);
    window.fetchingNews().then(news => {
      window.render('app-root', App);
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.flex__center + '' + styles.width_100 + '' + styles.border_bottom}>
          <div className={styles.flex__space_between + '' + styles.width_80}>
            <img
              style=" height: 50px;"
              src="https://archive.org/download/news-logo/news-logo.png"
              alt="logo"
            />
            <Account />
          </div>
        </div>
        <form>
          <div>
            <label>
              Keyword{' '}
              <input
                type="text"
                name="search"
                value={getQueryParam('q')}
                id="q"
                onChange={applySetValueInLocalStorage}
              />
            </label>
          </div>
          <div>
            <label>
              Category{' '}
              <select name="topic" id="topic" onChange={applySetValueInLocalStorage}>
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
              </select>
            </label>
          </div>
          <div>
            <label>
              Language{' '}
              <select name="lang" id="lang" onChange={applySetValueInLocalStorage}>
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
              </select>
            </label>
          </div>
          <div>
            <label>
              Country{' '}
              <select name="country" id="country" onChange={applySetValueInLocalStorage}>
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
              </select>
            </label>
          </div>
          <div>
            <label>
              Page size{' '}
              <input
                style="width: 7vw"
                type="range"
                min="25"
                max="100"
                value={getItemFromLocalStore('page_size')}
                name="page_size"
                id="page_size"
                onChange={applyPageSizeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              From date{' '}
              <input
                type="date"
                name="from"
                id="from"
                value={getItemFromLocalStore('from')}
                onChange={applyQueryParamFromHandler}
              />
            </label>
          </div>
          <div>
            <input
              style="background-color: #C8E6C9;"
              type="submit"
              value="Search"
              onClick={onSubmitHandler}
            />
            <button type="button" style="background-color: #ffcdd2;" onClick={applyResetFilters}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
