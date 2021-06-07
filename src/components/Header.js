import React from 'react';
import { defaultSearch } from '../data/dataHandlers.js';
import styles from '../../style.css';
import Account from './Account';
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
    return Object.entries(options).map(([value, text], index) => {
      const optionProperties = {
        stateValue,
        value,
        text,
      };
      return <Option key={index} {...optionProperties} />;
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
      <header className={styles.header}>
        <div className={[styles.flex__center, styles.width_100, styles.border_bottom].join(' ')}>
          <div className={[styles.flex__space_between, styles.width_80].join(' ')}>
            <img
              style={{ height: 50 + 'px' }}
              src="https://archive.org/download/news-logo/news-logo.png"
              alt="logo"
            />
            <Account />
          </div>
        </div>
        <div className={styles.flex__center}>
          <form className={styles.flex__center}>
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                Keyword
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
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                Category
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
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                Language
                <select
                  className="form-select form-select-sm"
                  name="lang"
                  id="lang"
                  onChange={event => queryPropertySetter(event.target.id, event.target.value)}
                >
                  {createOptionGroup(queryProperties.lang, languageOptions)}
                </select>
              </label>
            </div>
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                Country
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
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                From date
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
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <label className={[styles.flex__start, styles.flex__column].join(' ')}>
                Page size &#160;
                <input
                  className="form-range"
                  style={{ width: 80 + 'px' }}
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
            <div className={[styles.flex__start, styles.flex__column].join(' ')}>
              <div>
                <input
                  style={{ backgroundColor: '#C8E6C9' }}
                  type="submit"
                  value="Search"
                  onClick={event => {
                    event.preventDefault();
                    setSubmitWasClicked(true);
                  }}
                />
                <button
                  style={{ backgroundColor: '#ffcdd2' }}
                  type="button"
                  onClick={event => {
                    event.preventDefault();
                    setResetWasClicked(true);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </>
  );
}
