import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import axios from "axios";
import Environment from "../../Environment";
import {showToastWithGravity} from "../../utils";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const AddProjectStatus = () => {
	const defaultState = {
		projectStatus: {
			projectStatusTitle: '',
		},
	};
	const [state, setState] = useState(defaultState);


	const getButtonStatus = (): boolean => {
		return (
			state.projectStatus.projectStatusTitle === ''
		);
	};
	const addProjectStatus = () => {
		axios
			.post(`${Environment.API_URL}/api/projectStatus/add`, state.projectStatus)
			.then((res: any) => {
				showToastWithGravity('Project Status Successfully Added');
				setState(defaultState);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	};
	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<View style={{width: '100%'}}>
					<Text>Project Status Title</Text>
					<Input
						leftIcon={<Icon name="tag" size={20} color={'#000'}/>}
						inputContainerStyle={styles.InputContainerStyle}
						leftIconContainerStyle={styles.LeftIconContainerStyle}
						errorStyle={styles.ErrorStyle}
						onChangeText={(text: string) =>
							setState((prevState: any) => {
								let projectStatus = Object.assign({}, prevState.projectStatus);
								projectStatus.projectStatusTitle = text;
								return {projectStatus};
							})
						}
						value={state.projectStatus.projectStatusTitle}
						autoCompleteType={false}
					/>
				</View>

				<View style={styles.columnDisplay}>
					<TouchableOpacity
						style={styles.cancelWrapper}
						onPress={() => {
							//props.clickHandler(!props.visible);
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
					<TouchableOpacity
						disabled={getButtonStatus()}
						style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
						onPress={() => {
							addProjectStatus();
						}}>
						<Text
							style={{
								textAlign: 'center',
								color: '#fff',
								fontWeight: '500',
							}}>
							Add Project Status
						</Text>
					</TouchableOpacity>
				</View>
			</View>

		</View>
	);
};
export default AddProjectStatus;
const styles = StyleSheet.create({
	columnDisplay: {
		display: 'flex',
		flexDirection: 'row',
		position: 'relative',
		width: '100%',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 22,
	},
	buttonWrapper: {
		backgroundColor: 'green',
		padding: 10,
		opacity: 1,
	},
	cancelWrapper: {
		backgroundColor: '#F22F46',
		padding: 10,
		opacity: 1,
	},
	disabled: {
		opacity: 0.5,
		backgroundColor: 'green',
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
});
