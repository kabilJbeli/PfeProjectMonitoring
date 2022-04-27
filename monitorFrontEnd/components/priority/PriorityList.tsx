import * as React from 'react';
import {ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";
import { ModalButton } from "../modal/Button";
import {Modal} from "../modal/modal";
import {useNavigation} from "@react-navigation/native";
import {_storeData} from "../../utils";

const PriorityList = (props: any) => {
	const navigation = useNavigation();

	const [priorities, setPriorities] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [message,setMessage]= useState<string>('');
	const [isModalVisible,setModalVisible]  = useState(false);
	const [titleMessage,setTitleMessage]= useState<string>('');
	const [isRemoveModalVisible, setModalRemoveVisible] = useState(false);
	const [priorityId, setPriorityId] = useState<any>('');


	const handleRemoveModal = (isVisible: boolean) => {
		setModalRemoveVisible(isVisible);
	}

	const handleModal = (isVisible:boolean) =>{
		setModalVisible(isVisible);
	}
	const getPriorities = () => {
		setLoading(true);
		// Update the document title using the browser API
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/priority/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				console.log(response.data)
				setPriorities(response.data);
				setLoading(false);
			})
			.catch((err: any) => {
				console.error('api/priority/all',err);

			});
	};

	useEffect(() => {
		getPriorities();
	}, [props]);

	const removeItem = (priorityID: Number) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/priority/delete/` + priorityID,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				getPriorities();
				handleModal(true);
				setMessage("Priority removed with success");
				setTitleMessage("Success")
			})
			.catch((err: any) => {
				handleModal(true);
				setTitleMessage("Warning")

				setMessage("Can't remove this priority as it's attached to other tasks");
				console.error('api/priority/delete',err)
			});
	};

	const updateItem = (priorityID: Number) => {
		_storeData('priorityID', JSON.stringify(priorityID));

		// @ts-ignore
		navigation.navigate('updatePriority', {id: priorityID});
	};

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

	const RemoveProjectHandler = () => {
		handleRemoveModal(false);

		setTimeout(() => {
			removeItem(priorityId);
		}, 500);
	}
	const getLatestPriorities = () => {
		if (loading) {
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
								<Text style={styles.textModal}>Are you sure you want to remove this priority?</Text>
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
						data={priorities}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={priorities.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<Text style={styles.text}>
									Priority Title : {item.priorityTitle}
								</Text>
								<View style={styles.buttonWrapper}>

									<Pressable
										style={({pressed}) => [{opacity: pressed ? 1 : 0.85},styles.button, styles.delete]}
										onPress={() => {
											setPriorityId(item.priorityID);
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
										style={({pressed}) => [{opacity: pressed ? 1 : 0.85},styles.button, styles.borderButton, styles.update]}
										onPress={() => {
											updateItem(item.priorityID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											Update
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
	return getLatestPriorities();
};
export default PriorityList;

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
		padding: 15,
		paddingTop: 0
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
		backgroundColor: '#6e6e6e',
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
