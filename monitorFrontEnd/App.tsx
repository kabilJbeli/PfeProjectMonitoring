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
import {useEffect, useState} from 'react';
import {_retrieveData, _storeData} from "./utils";
import {ReactNativeKeycloakProvider} from '@react-keycloak/native';

import keycloak from './keycloak';
import KeycloakLogin from "./components/KeycloakLogin";

const App = () => {

	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}, [])

	LogBox.ignoreAllLogs();


	const handleOnEvent = async (event:any,error:any) => {
		if(event === 'onTokenExpired'){
			_storeData('token', '');
			_storeData('userInfo', '');
			keycloak?.logout().then(response=>{
			}).catch(err=>{
				console.log('Logout Error: ',err)
			})
		}
	}

	const getKeycloak = () => {
		return (<ReactNativeKeycloakProvider
			onEvent={(event,error) => handleOnEvent(event,error)}
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
					toolbarColor:'#000',
					secondaryToolbarColor:'#000',
					navigationBarColor:'#000',
					navigationBarDividerColor:'#000',
					enableDefaultShare:true,
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
