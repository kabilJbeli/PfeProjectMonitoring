/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {StyleSheet, View, LogBox} from 'react-native';
import Navigation from './components/Navigation';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {Provider} from 'react-redux';
import {Store} from './redux/Store';
import {StatusBar} from 'react-native';

import Login from './components/Login';
import {SafeAreaView} from 'react-navigation';
import Routes from './Routes';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  LogBox.ignoreAllLogs();
  const logoutUser = (logout: any) => {
    setLoggedIn(!logout);
  };
  const getInitialView = (): any => {
    let returnedValue: any;
    if (loggedIn == true) {
      returnedValue = (
        <Provider store={Store}>
          <NavigationContainer>
            <StatusBar translucent={false} backgroundColor="#262626" />
            <Routes />
            <Navigation
              logout={(value: any) => {
                logoutUser(value);
              }}
            />
          </NavigationContainer>
        </Provider>
      );
    } else {
      returnedValue = (
        <Provider store={Store}>
          <SafeAreaView style={styles.containerLogin}>
            <StatusBar translucent={false} backgroundColor="#262626" />
            <Login
              changeSignInStatus={(
                value: boolean | ((prevState: boolean) => boolean),
              ) => setLoggedIn(value)}
            />
          </SafeAreaView>
        </Provider>
      );
    }
    return returnedValue;
  };

  return getInitialView();
};

const styles = StyleSheet.create({
  containerLogin: {
    backgroundColor: '#262626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  background: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
export default App;
