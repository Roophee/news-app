import React from 'react';
import styles from '../../style.css';
import Account from './Account';
import Logo from './Logo';
import SearchForm from './SearchForm';

export function Header(props) {
  return (
    <>
      <header className={styles.header}>
        <div
          className={[
            styles.flex__center,
            styles.width_100,
            styles.border_bottom,
            styles.header__height,
          ].join(' ')}
        >
          <div className={[styles.flex__space_between, styles.width_80].join(' ')}>
            <Logo />
            <Account />
          </div>
        </div>
        <SearchForm {...props} />
      </header>
    </>
  );
}
