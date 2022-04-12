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
import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect} from 'react';
import {_storeData} from "./utils";
import {ReactNativeKeycloakProvider} from '@react-keycloak/native';

import keycloak from './keycloak';
import KeycloakLogin from "./components/login/KeycloakLogin";
import OneSignal from 'react-native-onesignal';

const App = () => {
	//OneSignal Init Code
	OneSignal.setLogLevel(6, 0);
	OneSignal.setAppId("b0edf1d1-f910-4a09-9127-8b5f32ac9ebc");
	//END OneSignal Init Code

	//Method for handling notifications opened
	OneSignal.setNotificationOpenedHandler(notification => {
		console.log("OneSignal: notification opened:", notification);
	});

	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}, [])

	LogBox.ignoreAllLogs();


	const handleOnEvent = async (event: any, error: any) => {
		if (event === 'onTokenExpired') {
			_storeData('token', '');
			_storeData('userInfo', '');
			keycloak?.logout().then(response => {
			}).catch(err => {
				console.log('Logout Error: ', err)
			})
		}
	}

	const getKeycloak = () => {
		return (<ReactNativeKeycloakProvider
			onEvent={(event, error) => handleOnEvent(event, error)}
			authClient={keycloak}
			initOptions={{
				redirectUri: 'monitorfrontend://homepage',
				// if you need to customize "react-native-inappbrowser-reborn" View you can use the following attribute
				inAppBrowserOptions: {
					// For iOS check: https://github.com/proyecto26/react-native-inappbrowser#ios-options
					// For Android check: https://github.com/proyecto26/react-native-inappbrowser#android-options
					hasBackButton: false,
					showTitle: true,
					enableUrlBarHiding: false,
					toolbarColor: '#000',
					secondaryToolbarColor: '#000',
					navigationBarColor: '#000',
					navigationBarDividerColor: '#000',
					enableDefaultShare: true,
					animations: {
						startEnter: 'slide_in_right',
						startExit: 'slide_out_left',
						endEnter: 'slide_in_left',
						endExit: 'slide_out_right'
					},

				},
				scopes: ['email offline_access web-origins role_list profile'],

			}}
		>
			<KeycloakLogin/>
		</ReactNativeKeycloakProvider>)
	};

	return getKeycloak();

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
