import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {_retrieveData} from "../../utils";
import IconM from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import axios from "axios";
import Environment from "../../Environment";
import {Modal} from "../modal/modal";
import {ModalButton} from "../modal/Button";

export const updateUserComponent = (props: any) => {
	const [memberInfo, setMemberInfo] = useState<any>({});
	const navigation = useNavigation();
	const [state, setState] = useState<any>({
		role: {
			role: null
		}
	});
	const [message, setMessage] = useState<string>('');
	const [isModalVisible, setModalVisible] = useState(false);
	const [titleMessage, setTitleMessage] = useState<string>('');
	useEffect(() => {
		_retrieveData('memberInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setMemberInfo(parsedInfo);
			}
		});
	}, [props]);

	const updateRole = () => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/keycloak/updateRole?username=${memberInfo.email}&role=${state.role.role}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTitleMessage('Success');
				setMessage('The user role has been updated successfully');
				setModalVisible(true);

			})
			.catch((err: any) => {
				setTitleMessage('Error');
				setMessage('An error has occurred during the update of the user role');
				setModalVisible(true);
				console.error(err);
			});

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
				backgroundColor: '#da1971'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					User Information</Text>
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
			<View>
				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>First Name:</Text>
					<Text>{memberInfo?.name || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Last Name:</Text>
					<Text>{memberInfo?.lastName || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Email:</Text>
					<Text>{memberInfo?.email || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Current Role:</Text>
					<Text>{memberInfo?.role || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Mobile Number:</Text>
					<Text>{memberInfo?.telephone || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Address:</Text>
					<Text>{memberInfo?.address || ''}</Text>
				</View>

				<View style={{width: '100%', marginBottom: 15, padding: 15}}>
					<Dropdown
						style={{width: '100%'}}
						label={'Affect New Role'}
						data={[
							{label: 'Administrator', value: 'ADMINISTRATOR'},
							{label: 'Manager', value: 'MANAGER'},
							{label: 'Employee', value: 'EMPLOYEE'},
							{label: 'Client', value: 'CLIENT'},
						]}
						onChangeText={(value: any) => setState((prevState: any) => {
							let role = Object.assign({}, prevState.role);

							role.role = value;
							return {role};
						})}
						value={state.role.role}
					/>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10}}>
					<Pressable
						disabled={state.role.role === null}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
							backgroundColor: '#da1971',
							padding: 15,
							marginBottom: 10
						}]}
						onPress={() => {
							updateRole();

						}}>
						<Text style={{color: '#fff', textAlign: 'center'}}>Update Role</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textModal: {
		textAlign: "center",
		fontSize: 18
	}
});
