import React, {useEffect, useState} from "react";
import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from "@react-navigation/native";
import IconM from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData} from "../../utils";
import {Modal} from "../modal/modal";
import {ModalButton} from "../modal/Button";

const ChangePasswordComponent = (props: any) => {
	const navigation = useNavigation();
	const defaultState ={
		password:{
			password:null,
			confirmPassword:null
		}
	};
	const [message,setMessage]= useState<string>('');
	const [isModalVisible,setModalVisible]  = useState(false);
	const [titleMessage,setTitleMessage]= useState<string>('');
const [userInfo,setUserInfo] = useState<any>({});
const [state,setState] = useState<any>(defaultState);


	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
			}
		});
	}, [props]);


const updatePassword = () =>{
	axios({
		method: 'GET',
		url: `${Environment.API_URL}/api/keycloak/updatePassword?username=${userInfo.email}&newPassword=${state.password.password}`,
		headers: {
			'Content-Type': 'application/json',
			useQueryString: false,
		},
		params: {},
	})
		.then(response => {
			setTitleMessage('Success');
			setMessage('The password has been updated successfully');
			setModalVisible(true);
			setState(defaultState);
		})
		.catch((err: any) => {
			setTitleMessage('Error');
			setMessage('An error has occurred during the update of the password');
			setModalVisible(true);
			console.error('api/keycloak/updatePassword?username',err);
		});

}
	const	getButtonStatus = ()=>{
		return state.password.password ===null ||  state.password.confirmPassword ===null || state.password.password !== state.password.confirmPassword
	}
	const handleModal = (isVisible:boolean) =>{
		setModalVisible(isVisible);
	}
	return (
		<SafeAreaView>
			<Modal isVisible={isModalVisible}>
				<Modal.Container>
					<Modal.Header title={titleMessage} />
					<Modal.Body>
						<Text style={styles.textModal}>{message}</Text>
					</Modal.Body>
					<Modal.Footer>
						<ModalButton title="I understand" onPress={()=>handleModal(false)} />
					</Modal.Footer>
				</Modal.Container>
			</Modal>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#2c65c9'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Change Password</Text>
			</View>
			<View style={{padding: 15}}>
				<View>
					<Pressable
						style={{width: 80, flexDirection: 'row'}}
						onPress={() => {
							navigation.goBack();
						}}
					><IconM name='arrow-back' size={20} color={'#000'}/>
						<Text style={{paddingLeft: 10, fontWeight: 'bold'}}
						>Go Back</Text>
					</Pressable>
				</View>
			</View>
			<View style={{padding: 15}}>
				<View style={{width: '100%'}}>
					<Text>New Password</Text>
					<Input
						leftIcon={<Icon name="disc" size={20} color={'#000'}/>}
						inputContainerStyle={styles.InputContainerStyle}
						leftIconContainerStyle={styles.LeftIconContainerStyle}
						errorStyle={styles.ErrorStyle}
						onChangeText={(value: any) => setState((prevState: any) => {
							let password = Object.assign({}, prevState.password);
							password.password = value;
							return {password};
						})}
						value={state.password?.password || ''}
						secureTextEntry={true}
						autoCompleteType={false}
					/>
				</View>
			</View>

			<View style={{padding: 15}}>
				<View style={{width: '100%'}}>
					<Text>Validate New Password</Text>
					<Input
						leftIcon={<Icon name="disc" size={20} color={'#000'}/>}
						inputContainerStyle={styles.InputContainerStyle}
						leftIconContainerStyle={styles.LeftIconContainerStyle}
						errorMessage={state.password.password !== state.password.confirmPassword ? 'The provided passwords are not the same':''}
						errorStyle={styles.ErrorStyle}
						onChangeText={(value: any) => setState((prevState: any) => {
							let password = Object.assign({}, prevState.password);
							password.confirmPassword = value;
							return {password};
						})}
						value={state.password?.confirmPassword || ''}
						secureTextEntry={true}
						autoCompleteType={false}
					/>
				</View>
			</View>

			<View style={{paddingVertical:0,padding: 20}}>
				<Pressable
					disabled={getButtonStatus()}
					style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
						backgroundColor: '#2c65c9',
						padding: 15,
						marginBottom: 10
					},{opacity:getButtonStatus()?0.4:0.8}]}
					onPress={() => {
				updatePassword()
					}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>Update Password</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)

}
export default ChangePasswordComponent;

const styles = StyleSheet.create({
	columnDisplay: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
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
		height: '100%',
		padding: 0,
		backgroundColor: '#fff',
	},
	modalView: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 0,
		alignItems: 'center',
		shadowColor: '#fff',
		borderColor: '#fff',
		shadowOpacity: 0,
		shadowRadius: 0,
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
	textModal:{
		textAlign:"center",
		fontSize:18
	}
});
