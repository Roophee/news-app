if (module.hot) {
  module.hot.accept();
}
import React from 'react';
import { render } from 'react-dom';
import { App } from './src/components/App';

render(<App />, document.getElementById('app-root'));
