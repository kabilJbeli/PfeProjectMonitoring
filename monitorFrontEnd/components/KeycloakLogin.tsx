import {Button, Image, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/native";
import {_retrieveData, _storeData} from "../utils";
import {Provider} from "react-redux";
import {Store} from "../redux/Store";
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./Navigation";
import Images from "../assets/Images";
import {Text} from "react-native-elements";

const KeycloakLogin = () => {
	const {keycloak, initialized} = useKeycloak();
	const [token, setToken] = useState<any>(null);

	_retrieveData('token').then((result: any) => {
		setToken(result);
	});

	if(!token){
		keycloak?.init({
			onLoad: 'check-sso'
		}).then(val => {
		})

	}

	if (keycloak?.token) {
		_storeData('token', JSON.stringify(keycloak?.token));
		keycloak?.loadUserProfile().then((val: any) => {
			_storeData('userInfo', JSON.stringify(val));
		});
	}







	const logoutUser = (logout: any) => {
		keycloak?.logout().then(response=>{
			_storeData('token', '');
			_storeData('userInfo', '');
			setToken(null);
		}).catch(err=>{
			console.log('Logout Error: ',err)
		})
	};

	const getApplicationMainView = () => {
		let returnedValue;
		if (!token || token === null ) {
			returnedValue = (
			<KeyboardAvoidingView
				enabled={true}
				style={styles.containerView}
				behavior="padding"
				keyboardVerticalOffset={-300}>
				<StatusBar translucent={false} backgroundColor="#262626"/>
				<View style={styles.loginScreenContainer}>
					<View style={styles.loginFormView}>
						<View style={{alignItems: 'center'}}>
							<Image
								source={Images.logo}
								resizeMode={'contain'}
								style={{
									width: '100%',
									height: 120,
								}}
							/>
						</View>
						<Pressable
							style={styles.loginButton}
							onPress={() => keycloak?.login().then(val => {
								console.log(val)
							})}>
							<Text style={styles.loginButtonText}>Login To Proceed</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
			)
		} else {
			returnedValue=	(<Provider store={Store}>
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
			</Provider>)

		}
		return returnedValue;

	}


	return getApplicationMainView();
};
export default KeycloakLogin;

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: '#262626',

	},
	loginScreenContainer: {
		flex: 1,
	},
	logoText: {
		fontSize: 40,
		fontWeight: '800',
		marginTop: 150,
		marginBottom: 30,
		textAlign: 'center',
	},
	loginFormView: {
		flex: 1,
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
	},
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fafafa',
		paddingLeft: 10,
		marginTop: 5,
		marginBottom: 5,
	},
	loginButton: {
		backgroundColor: '#d81e05',
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		width: 250,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
	},
	fbLoginButton: {
		height: 45,
		marginTop: 10,
		backgroundColor: 'transparent',
	},
	errorMessage: {
		color: 'red',
		paddingBottom: 10,
		textAlign: 'center',
		fontSize: 12,
	},
});







