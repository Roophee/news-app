if (module.hot) {
  module.hot.accept();
}
import { render } from './src/framework/render';
import { App } from './src/components/App';
import { fetchingNews } from './src/data/APIHandlers';
// const App = document.querySelector('.app-root');

fetchingNews().then(news => render('.app-root', App));
// .catch(err => console.log('1', err));
//
// function renderMain(news) {
//   document.querySelector('main').innerHTML = `${NewsList(news)}`;
// }
//
// function renderApp() {
//   App.innerHTML = `
//     ${Header()}
//     ${Main()}
// `;
// }
