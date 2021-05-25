if (module.hot) {
  module.hot.accept();
}
import { render } from './src/framework/render';
import { App } from './src/components/App';
import { fetchingNews } from './src/data/APIHandlers';

fetchingNews().then(news => render(App, 'app-root'));
