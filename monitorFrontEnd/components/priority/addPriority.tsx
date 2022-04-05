import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Environment from "../../Environment";
import {showToastWithGravity} from "../../utils";

const AddPriority = () => {
	const defaultState = {
		priority:{
			priorityTitle:null
		}
	};
	const [state,setPriority] = useState(defaultState);

	const addPriority = ()=>{
		axios
			.post(`${Environment.API_URL}/api/priority/add`, state.priority)
			.then((res: any) => {
				showToastWithGravity('Priority Successfully Added');
				setPriority(defaultState);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	}
	const getButtonStatus = ():boolean=>{
		return state.priority.priorityTitle === null || state.priority.priorityTitle ===''
	}

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Add Priority</Text>
			</View>
			<ScrollView style={{height:'100%',backgroundColor:'#fff'}}>
				<View style={styles.modalView}>
					<View style={{width: '100%'}}>
						<Text>Priority Title</Text>
						<Input
							leftIcon={<Icon name="tag" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setPriority((prevState: any) => {
									let priority = Object.assign({}, prevState.priority);
									priority.priorityTitle = text;
									return {priority};
								})
							}
							value={state.priority.priorityTitle || ''}
							autoCompleteType={false}
						/>
					</View>

					<View style={styles.columnDisplay}>
						<TouchableOpacity
							disabled={getButtonStatus()}
							style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
							onPress={() => {
								addPriority();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Add New Task Priority
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.cancelWrapper}
							onPress={() => {
								setPriority(defaultState);
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Cancel
							</Text>
						</TouchableOpacity>

					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
export default AddPriority;

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
		width:'100%',

	},
	cancelWrapper: {
		backgroundColor: '#c8003f',
		padding: 10,
		opacity: 1,
		marginTop:15,
		width:'100%',

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
		backgroundColor: '#fff',
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
});
