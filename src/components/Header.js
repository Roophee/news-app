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
        {/*<div className={[styles.flex__center, styles.width_100, styles.border_bottom]}>*/}
        {/*  <div className={[styles.flex__space_between, styles.width_80]}>*/}
        {/*    <img*/}
        {/*      style="height: 50px;"*/}
        {/*      src="https://archive.org/download/news-logo/news-logo.png"*/}
        {/*      alt="logo"*/}
        {/*    />*/}
        {/*    <Account />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand">News App</a>
            <button className="btn btn-outline-success" style="margin-right: 20px" type="button">
              Login
            </button>
          </div>
        </nav>
        <div className={styles.flex__center}>
          <form>
            <div>
              <label>
                Keyword{' '}
                <input
                  className="input-group input-group-sm mb-3"
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
                  className="form-select form-select-sm"
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
                  className="form-select form-select-sm"
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
                  className="form-select form-select-sm"
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
                From date{' '}
                <input
                  className="input-group input-group-sm mb-3"
                  type="date"
                  name="from"
                  id="from"
                  value={queryProperties.from}
                  onChange={event => queryPropertySetter(event.target.id, event.target.value)}
                />
              </label>
            </div>
            <div className={[styles.flex__start, styles.flex__column, styles.align_self_start]}>
              <label className={[styles.flex__start, styles.flex__column, styles.align_self_start]}>
                Page size{' '}
                <input
                  class="form-range"
                  style="width: 80px"
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
              <input
                className="btn btn-success"
                type="submit"
                value="Search"
                onClick={event => {
                  event.preventDefault();
                  setSubmitWasClicked(true);
                }}
              />
              <button
                className="btn btn-danger"
                type="button"
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
      </div>
    </>
  );
}
