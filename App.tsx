import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import Navigator from './src/router/Navigator';
import './src/utils/i18n';
import {StatusBar} from 'react-native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={'light-content'} />
        <Navigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
