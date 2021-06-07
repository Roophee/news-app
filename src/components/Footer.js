import React from 'react';
import styles from '../../style.css';

export function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-3">
            <span className="text-muted ">Powered by </span>
            <a className={styles.link} href="https://newscatcherapi.com/" target="_blank">
              <span className={styles.warning_color}>&#12296;/newscatcher&#12297;</span>
            </a>
          </div>
          <div className="col-3">
            <span className="text-muted ">
              Module task in{' '}
              <a
                className={[styles.link, styles.warning_color].join(' ')}
                href="https://kottans.org"
                target="_blank"
              >
                Kottans
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
