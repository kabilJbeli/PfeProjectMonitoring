import * as React from 'react';
import {
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import axios from 'axios';
import Environment from '../../Environment';
import {useState} from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import IconFontisto from 'react-native-vector-icons/Fontisto';

import validator from 'validator';
import {showToastWithGravity} from "../../utils";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import {useNavigation} from "@react-navigation/native";


const User = () => {
	const defaultState = {
		user: {
			role: '',
			name: '',
			lastName: '',
			email: '',
			Telephone: '',
			Address: '',
			password: '',
		},
	};
	const [state, setState] = useState(defaultState);
	const navigation = useNavigation();

	const [emailValid, setEmailValid] = useState(false);
	const checkEmail = (email: string) => {
		setEmailValid(validator.isEmail(email));
	};
	const addUser = () => {
		axios
			.post(`${Environment.API_URL}/api/keycloak/user?username=${state.user.name}
			&email=${state.user.email}&firstname=${state.user.name}&lastname=${state.user.lastName}
			&password=${state.user.password}&role=${state.user.role}&address=${state.user.Address}&telephone=${state.user.Telephone}`, {})
			.then((res: any) => {
				// @ts-ignore
				navigation.navigate('UserManagement');
				showToastWithGravity('User Successfully Added');
				setState(defaultState);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has occurred!!!');
			console.error(error);
		});
	};

	const getButtonStatus = (): boolean => {
		return state.user.name === '' ||
			state.user.lastName === '' ||
			state.user.email === '' ||
			emailValid === false ||
			state.user.password === '' ||
			state.user.Telephone === '' ||
			state.user.Address === '' ||
			state.user.role === '';

	};
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#da1971'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Add User </Text>
			</View>
			<ScrollView style={{paddingRight: 15, height: '100%', backgroundColor: '#fff'}}>
				<View style={styles.container}>

					<View style={{width: '100%'}}>
						<Text>User Name</Text>
						<Input
							leftIcon={<Icon name="user-plus" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.name = text;
									return {user};
								})
							}
							value={state.user.name}
							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>User Last Name</Text>
						<Input
							leftIcon={<Icon name="user-plus" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.lastName = text;
									return {user};
								})
							}
							value={state.user.lastName}

							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>User Email</Text>
						<Input
							leftIcon={<IconFontisto name="email" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorMessage={!emailValid ? 'Please verify the email address' : ''}
							errorStyle={styles.ErrorStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.email = text;
									checkEmail(text);
									return {user};
								})
							}
							value={state.user.email}

							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>User Password</Text>
						<Input
							leftIcon={<Icon name="disc" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.password = text;
									return {user};
								})
							}
							value={state.user.password}

							secureTextEntry={true}
							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>Address</Text>
						<Input
							leftIcon={<FontAwesomeIcon name="address-card-o" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.Address = text;
									return {user};
								})
							}
							value={state.user.Address}

							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>Telephone</Text>
						<Input
							leftIcon={<Icon name="phone" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							onChangeText={text =>
								setState(prevState => {
									let user = Object.assign({}, prevState.user);
									user.Telephone = text;
									return {user};
								})
							}
							keyboardType="numeric"
							value={state.user.Telephone}

							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Role'}
							data={[
								{label: 'Administrator', value: 'ADMINISTRATOR'},
								{label: 'Manager', value: 'MANAGER'},
								{label: 'Employee', value: 'EMPLOYEE'},
								{label: 'Client', value: 'CLIENT'},
							]}
							onChangeText={(value: any) => setState((prevState: any) => {
								let user = Object.assign({}, prevState.user);

								user.role = value;
								return {user};
							})}
							value={state.user.role}
						/>
					</View>
					<View style={styles.columnDisplay}>

						<TouchableOpacity
							disabled={getButtonStatus()}
							style={[styles.buttonWrapper, {opacity: getButtonStatus() ? 0.5 : 1}]}
							onPress={() => {
								addUser();
							}}>
							<Text style={{textAlign: 'center', color: '#fff', fontWeight: '500'}}>
								Add New User
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.cancelWrapper} onPress={() => {
							setState(defaultState);
						}}>
							<Text style={{textAlign: 'center', color: '#fff', fontWeight: '500'}}>
								Reset
							</Text>
						</TouchableOpacity>
					</View>
				</View>

			</ScrollView>
		</SafeAreaView>
	);
};
export default User;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		padding: 15,
		paddingRight: 0,
		backgroundColor: '#fff',
		flex: 1
	},
	columnDisplay: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 22,
	},
	buttonWrapper: {
		backgroundColor: '#1f9683',
		padding: 10,
		opacity: 1,
		width: '100%',

	},
	cancelWrapper: {
		backgroundColor: '#c8003f',
		padding: 10,
		opacity: 1,
		marginTop: 15,
		width: '100%',
	},
	disabled: {
		opacity: 0.5,
		backgroundColor: '#1f9683',
		padding: 10,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 0,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 0,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '100%',
		height: '100%',
	},
	button: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	InputContainerStyle: {
		width: '100%',
		borderStyle: 'solid',
		borderColor: '#000',
		display: 'flex',
		justifyContent: 'center',
	},
	LeftIconContainerStyle: {},
	ErrorStyle: {},
});
