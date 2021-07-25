import React from 'react';
import RootComponent from './components/RootComponent';
import ConfigProvider from './graphql/ConfigProvider';

const App = () => {
  return (
    <ConfigProvider>
      <RootComponent />
    </ConfigProvider>
  );
};

export default App;
