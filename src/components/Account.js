/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';

export default function Account() {
  return `
  <div class="${styles.flex__space_between}">
    <div>
    <img class="${styles.header__avatar}" src="https://img2.freepng.ru/20180720/ivv/kisspng-computer-icons-user-profile-avatar-job-icon-5b521c567f49d7.5742234415321078625214.jpg" alt="user">
    </div>  
    <button>Log In</button>
  </div>
  `;
}
