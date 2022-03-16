/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {StyleSheet, LogBox} from 'react-native';
import Navigation from './components/Navigation';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {Provider} from 'react-redux';
import {Store} from './redux/Store';
import {StatusBar} from 'react-native';

import Login from './components/Login';
import SafeAreaView from 'react-native-safe-area-view';
import {_retrieveData} from "./utils";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	LogBox.ignoreAllLogs();
	const logoutUser = (logout: any) => {
		setLoggedIn(!logout);
	};

	const getInitialView = (): any => {
		let returnedValue: any;

		_retrieveData('loggedIn').then((result: any) => {
			console.log('isLoggedIn in Store:',result)
			setIsLoggedIn(Boolean(result));
		});
		console.log('isLoggedIn in out of Store:',loggedIn)

		if (loggedIn === true || isLoggedIn === true) {
			returnedValue = (
				<Provider store={Store}>
					<NavigationContainer>
						<StatusBar
							translucent={true}
							backgroundColor="#262626"
							animated={true}
						/>
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
						<StatusBar translucent={false} backgroundColor="#262626"/>
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
	}
});
export default App;
