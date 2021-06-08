import React from 'react';
import { defaultSearch } from '../data/dataHandlers.js';
import OptionsGroup from './OptionsGroup';
import styles from '../../style.css';

export default function SearchForm(props) {
  const {
    submitWasClicked,
    setSubmitWasClicked,
    queryProperties,
    setQueryProperties,
    setResetWasClicked,
  } = props;

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
      <div className={[styles.flex__center, styles.width_80].join(' ')}>
        <form className={styles.flex__start}>
          <div className={[styles.flex__start, styles.flex__column].join(' ')}>
            <label className={[styles.flex__start, styles.flex__column].join(' ')}>
              Keyword
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
          <div className={[styles.flex__start, styles.flex__column].join(' ')}>
            <label className={[styles.flex__start, styles.flex__column].join(' ')}>
              Category
              <select
                name="topic"
                id="topic"
                value={queryProperties.topic}
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                <OptionsGroup optionsType={'topicOptions'} />
              </select>
            </label>
          </div>
          <div className={[styles.flex__start, styles.flex__column].join(' ')}>
            <label className={[styles.flex__start, styles.flex__column].join(' ')}>
              Language
              <select
                name="lang"
                id="lang"
                value={queryProperties.lang}
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                <OptionsGroup optionsType={'languageOptions'} />
              </select>
            </label>
          </div>
          <div className={[styles.flex__start, styles.flex__column].join(' ')}>
            <label className={[styles.flex__start, styles.flex__column].join(' ')}>
              Country
              <select
                name="country"
                id="country"
                value={queryProperties.country}
                onChange={event => queryPropertySetter(event.target.id, event.target.value)}
              >
                <OptionsGroup optionsType={'countryOptions'} />
              </select>
            </label>
          </div>
          <div className={[styles.flex__start, styles.flex__column].join(' ')}>
            <label className={[styles.flex__start, styles.flex__column].join(' ')}>
              From date
              <input
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
              News quantity &#160;
              <input
                style={{ minWidth: 80 + 'px', width: 10 + 'vw' }}
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
          <div className={[styles.flex__center, styles.align_self_start].join(' ')}>
            <button
              className={styles.form__buttons}
              style={{ backgroundColor: '#C8E6C9' }}
              type="submit"
              onClick={event => {
                event.preventDefault();
                setSubmitWasClicked(true);
              }}
            >
              Search
            </button>
            <button
              className={styles.form__buttons}
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
        </form>
      </div>
    </>
  );
}
