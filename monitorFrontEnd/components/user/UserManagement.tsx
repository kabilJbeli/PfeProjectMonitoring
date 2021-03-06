import * as React from 'react';
import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";
import {_storeData, Props} from "../../utils";
import {Dimensions} from 'react-native';
import {Modal} from "../modal/modal";
import {ModalButton} from "../modal/Button";


const UserManagement = ( props: any) => {
	const navigation = useNavigation();

	const [users, setUsers] = useState<any[]>([]);
	const [message,setMessage]= useState<string>('');
	const [isModalVisible,setModalVisible]  = useState(false);
	const [titleMessage,setTitleMessage]= useState<string>('');
	const [isRemoveModalVisible, setModalRemoveVisible] = useState(false);
	const [userId, setUserId] = useState<any>('');


	const handleRemoveModal = (isVisible: boolean) => {
		setModalRemoveVisible(isVisible);
	}
	const handleModal = (isVisible:boolean) =>{
		setModalVisible(isVisible);
	}
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	const FlatListItemSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: 'transparent',
				}}
			/>
		);
	};

	const getUsers = () => {
		// Update the document title using the browser API
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/member/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setUsers(response.data);
			})
			.catch((err: any) => {
			});
		setTimeout(() => setLoading(false), 1000);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const removeItem = (email: String) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/keycloak/user/?username=` + email,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				setLoading(true);
				getUsers();
				handleModal(true);
				setTitleMessage("Success");
				setMessage("User removed with success");
			})
			.catch((err: any) => {
				handleModal(true);
				setTitleMessage("Warning");
				setMessage("Can't remove this user as it's attached to other entities");
				console.error('api/keycloak/user',err);
			});
	};

	const updateItem = (userID: Number) => {


		// @ts-ignore
		navigation.navigate("updateUser", {id: userID});
	};

	const RemoveProjectHandler = () => {
		handleRemoveModal(false);

		setTimeout(() => {
			removeItem(userId);
		}, 500);
	}

	const getLatestUserInfo = () => {
		if (!isFocused || users.length === 0) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#d81e05"/>
				</View>
			);
		} else {
			return (
				<View>
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

					<Modal isVisible={isRemoveModalVisible}>
						<Modal.Container>
							<Modal.Header title={"Warning"}/>
							<Modal.Body>
								<Text style={styles.textModal}>Are you sure you want to remove this user?</Text>
							</Modal.Body>
							<Modal.Footer>
								<View style={{width: '50%',alignItems:"center"}}>
									<ModalButton title="Cancel"  onPress={() => handleRemoveModal(false)}/>
								</View>
								<View style={{width: '50%',alignItems:"center"}}>
									<ModalButton title="Yes" color="#1f9683" onPress={() => RemoveProjectHandler()}/>
								</View>
							</Modal.Footer>
						</Modal.Container>
					</Modal>

					<FlatList
						style={{height: Dimensions.get('screen').height - 300}}
						keyExtractor={(item, index) => index.toString()}
						data={users}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={users.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<View>
									<Text style={styles.text}>User Name: {item.name}</Text>

								</View>
								<View>
									<Text style={styles.text}>Last Name: {item.lastName}</Text>
								</View>
								<View>
									<Text style={styles.text}>
										Email: {item.email}
									</Text>
								</View>

								<View style={{
									display: 'flex', width: '100%', justifyContent: 'space-between',
									flexDirection: 'row', paddingBottom: 15

								}}>
									<Text style={styles.text}>
										Telephone: {item.telephone}
									</Text>

									<Text style={styles.text}>
										Role: {item.role}
									</Text>
								</View>
								<View style={styles.buttonWrapper}>
									<Pressable
										style={({pressed}) => [{opacity: pressed ? 1 : 0.8},styles.button, styles.delete]}
										onPress={() => {
											setUserId(item.email);
											handleRemoveModal(true);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											Remove
										</Text>
									</Pressable>
									<Pressable
										style={({pressed}) => [{opacity: pressed ? 1 : 0.8},styles.button, styles.borderButton, styles.view]}

										onPress={() => {
											_storeData('memberInfo', JSON.stringify(item));
											updateItem(item.userID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											View
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					/>
				</View>
			);
		}
	};


	return getLatestUserInfo();
};
export default UserManagement;
const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('screen').height - 300,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	overlay: {
		backgroundColor: '#fff',
		height: '100%',
		width: '100%',
		position: 'relative',
		top: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3,
		flex: 1,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	project: {
		backgroundColor: '#fff',
		padding: 20,
		paddingBottom: 0,
		paddingRight: 0,
		paddingLeft: 0,
		margin: 15,
		marginTop: 10,
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,

	},
	text: {
		color: '#000',
		textTransform: 'none',
		width: 'auto',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
	},
	titleWrapper: {
		paddingLeft: 15,
		paddingRight: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',

	},
	title: {
		color: '#000',
		fontSize: 20,
		textTransform: 'none',
		maxWidth: 250,
		overflow: 'hidden',
		height: 30
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		marginBottom: 15,
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#fff',
		width: '50%',
		padding: 10,
		textAlign: 'center',
	},
	borderButton: {
		borderStyle: 'solid',
		borderLeftColor: '#fff',
		borderWidth: 1,
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
	},
	delete: {
		backgroundColor: '#c8003f',
	},
	view: {
		backgroundColor: '#00a3cc',
	},
	update: {
		backgroundColor: '#1f9683',
	},
	status: {
		backgroundColor: '#6e6e6e',
		borderRadius: 90,
		//height:15,
		padding: 5,
		paddingLeft: 9,
		paddingRight: 9,
		color: '#fff',
		fontSize: 10,
		textAlign: 'center'
	},
	textModal:{
		textAlign:"center",
		fontSize:18
	}
});
