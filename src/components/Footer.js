import React from 'react';
import styles from '../../style.css';

export function Footer() {
  return (
    <footer className={[styles.footer, styles.flex__center, styles.border_top].join(' ')}>
      <div className={[styles.flex__space_between, styles.width_80].join(' ')}>
        <div className="col-3">
          <span className="text-muted ">&#160;&#160;Powered by </span>
          <a
            className={[styles.link, styles.warning_color].join(' ')}
            href="https://newscatcherapi.com/"
            target="_blank"
          >
            &#12296;/newscatcher&#12297;
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
    </footer>
  );
}
