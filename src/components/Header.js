/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { fetchingNews, createQueryToApi } from '../data/APIHandlers';
import { render } from '../framework/render';
import { appHooks } from '../../hooksInUse';
import {
  setItemToLocalStore,
  defaultSearch,
  getQueryParam,
  queryProperties,
} from '../data/dataHandlers.js';
import styles from '../../style.css';
import Account from './Account';
import { Main } from './Main';
import { App } from './App';
import { Option } from './Option';

export function Header(props) {
  const {
    submitWasClicked,
    setSubmitWasClicked,
    queryProperties,
    setQueryProperties,
    setResetWasClicked,
  } = props;
  const topicOptions = {
    default: 'Any',
    business: 'Business',
    beauty: 'Beauty',
    entertainment: 'Entertainment',
    economics: 'Economics',
    finance: 'Finance',
    food: 'Food',
    news: 'General',
    music: 'Music',
    politics: 'Politics',
    science: 'Science',
    sport: 'Sport',
    tech: 'Technology',
    travel: 'Travel',
    world: 'World',
  };
  const languageOptions = {
    default: 'Any',
    uk: 'Ukrainian',
    de: 'German',
    en: 'English',
    ru: 'Russian',
    it: 'Italian',
    lt: 'Lithuanian',
    pt: 'Portuguese',
    es: 'Spanish',
    cn: 'Chinese',
  };
  const countryOptions = {
    default: 'Any',
    ua: 'Ukraine',
    us: 'USA',
    ru: 'Russia',
    de: 'Germany',
    gb: 'Great Britain',
    it: 'Italy',
    lt: 'Lithuania',
    pt: 'Portugal',
    sp: 'Spain',
    ch: 'China',
  };

  const createOptionGroup = (stateValue, options) => {
    return Object.entries(options).map(([value, text]) => {
      const optionProperties = {
        stateValue,
        value,
        text,
      };
      return <Option {...optionProperties} />;
    });
  };

  const keywordGetter = () => {
    if (queryProperties.q === '*') return '';
    return queryProperties.q;
  };

  const queryPropertySetter = (property, value) => {
    setQueryProperties({
      ...queryProperties,
      [property]: value,
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={[styles.flex__center, styles.width_100, styles.border_bottom]}>
          <div className={[styles.flex__space_between, styles.width_80]}>
            <img
              style="height: 50px;"
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
                value={keywordGetter()}
                id="q"
                onChange={event =>
                  queryPropertySetter(event.target.id, defaultSearch(event.target.value))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Category{' '}
              <select
                name="topic"
                id="topic"
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                {createOptionGroup(queryProperties.topic, topicOptions)}
              </select>
            </label>
          </div>
          <div>
            <label>
              Language{' '}
              <select
                name="lang"
                id="lang"
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                {' '}
                {createOptionGroup(queryProperties.lang, languageOptions)}
              </select>
            </label>
          </div>
          <div>
            <label>
              Country{' '}
              <select
                name="country"
                id="country"
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                {createOptionGroup(queryProperties.country, countryOptions)}
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
                value={queryProperties.page_size}
                name="page_size"
                id="page_size"
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
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
                value={queryProperties.from}
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              />
            </label>
          </div>
          <div>
            <input
              style="background-color: #C8E6C9;"
              type="submit"
              value="Search"
              onClick={event => {
                event.preventDefault();
                setSubmitWasClicked(true);
              }}
            />
            <button
              type="button"
              style="background-color: #ffcdd2;"
              onClick={event => {
                event.preventDefault();
                setResetWasClicked(true);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
