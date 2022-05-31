import {Image, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {useKeycloak} from "@react-keycloak/native";
import {_storeData} from "../../utils";
import {Provider} from "react-redux";
import {Store} from "../../redux/Store";
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "../navigation/Navigation";
import Images from "../../assets/Images";
import {Text} from "react-native-elements";
import jwt_decode from "jwt-decode";
import Icon from 'react-native-vector-icons/Feather';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import axios from "axios";

const KeycloakLogin = () => {
	const {keycloak, initialized} = useKeycloak();
	const [token, setToken] = useState<any>(null);

	const getUserInfo = () => {
		if (keycloak?.token) {
			let decodedJwtData: any = jwt_decode(keycloak?.token)
			_storeData('userRoles', JSON.stringify(decodedJwtData.realm_access.roles));
			let userInfo = {
				firstName: decodedJwtData.given_name,
				lastName: decodedJwtData.family_name,
				email: decodedJwtData.email,
				name: decodedJwtData.name,
				username: decodedJwtData.preferred_username,
				roles: decodedJwtData.realm_access.roles

			}
			if (token === null) {
				setToken(keycloak?.token);
			}

			_storeData('token', JSON.stringify(keycloak?.token));
			_storeData('refreshToken', JSON.stringify(keycloak?.refreshToken));
			_storeData('userInfo', JSON.stringify(userInfo));

		} else {
			keycloak?.loadUserInfo().then(val => {
				getUserInfo()
			});
		}

	}
	const logoutUser = (logout: any) => {
		keycloak?.logout().then(response => {
			_storeData('token', '');
			_storeData('userInfo', '');
			_storeData('refreshToken', '');
			setToken(null);
		}).catch(err => {
			console.error('Logout Error: ', err)
		})
	};

	const getApplicationMainView = (tokenValue: any) => {
		let returnedValue;

		if (!keycloak?.authenticated) {

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
								style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, styles.loginButton]}

								onPress={() => keycloak?.login().then(val => {
								})}>
								<Text style={styles.loginButtonText}>Login To Proceed</Text>
								<Icon name="arrow-right" size={22} color={'#fff'}/>
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingView>
			)
		} else {
			if (token === null) {
				getUserInfo();
			}

			if(token){
				axios.interceptors.request.use(
				request=>{
					if(request.url?.includes('/api/') && request.headers !== undefined){
						/**
						 * To Enable the security please uncomment the code below
						 */
						request.headers['Content-Type']='application/json';
						//request.headers['Authorization'] ='Bearer '+token;
					}
					console.info(request);
					return request

				},
					error=>{
					return Promise.reject(error)
					}
				);
			}

			returnedValue = (
				<Provider store={Store}>
					<PaperProvider theme={theme}>
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
					</PaperProvider>
				</Provider>
			);

		}
		return returnedValue;

	}


	return getApplicationMainView(token);
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
		paddingRight: 15
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


const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#3498db',
		accent: '#f1c40f',
	},
};
