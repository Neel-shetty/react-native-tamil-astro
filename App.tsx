import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import Navigator from './src/router/Navigator';
import './src/utils/i18n';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} />
      <Navigator />
    </Provider>
  );
};

export default App;
