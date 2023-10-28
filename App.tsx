/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InitComponent from './src/components/InitComponent';
import { Provider } from 'react-redux'
import { store } from './src/state/store';


function App(): JSX.Element {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <InitComponent />
      </SafeAreaProvider>
    </Provider>

  );
}



export default App;
