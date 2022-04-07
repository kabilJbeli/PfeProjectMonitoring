import * as React from 'react';
import {ActivityIndicator, Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Environment from '../../Environment';
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {_retrieveData, showToastWithGravity} from "../../utils";
import {useIsFocused, useRoute, useNavigation} from "@react-navigation/native";


const UpdateProjectScreen = (props: any) => {
	const [date, setDate] = useState(new Date());
	const [isEnabled, setIsEnabled] = useState(false);
	const [ProjectStatusData, setProjectStatusData] = useState<any[]>([]);
	const [expectedEndDate, setExpectedEndDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [openEndDate, setOpenEndDate] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();
	const [projectID, setProjectId] = useState<any>(null);
	const [clients, setClients] = useState<any[]>([]);
	const [projectManagers, setProjectManagers] = useState<any[]>([]);
	const defaultState = {
		project: {
			projectID: '',
			projectTitle: '',
			projectDescription: '',
			projectStatus: null,
			startDate: new Date(),
			endDate: new Date(),
			projectManager:null,
			client:null
		},
	};
	const [state, setState] = useState<any>(defaultState);


	const getClients = () => {
		return new Promise((resolve, reject) => {
			axios
				.get<any[]>(`${Environment.API_URL}/api/member/getMemberByRole?role=CLIENT`, {})
				.then((res: any) => {
					resolve(res.data);
				}).catch((error: any) => {
				console.error(error);
			});
		})

	}
	const getProjectManagers = () => {
		return new Promise((resolve, reject) => {
			axios
				.get<any[]>(`${Environment.API_URL}/api/member/getProjectManagers`, {})
				.then((res: any) => {
					resolve(res.data);
				}).catch((error: any) => {
				console.error(error);
			});
		})

	}


	useEffect(() => {
		getClients().then((data: any) => {
			const clients: any[] = [];
			if (data) {
				data.map((item: any) => {
					clients.push({label: item.name, value: item});
				});
				setClients(clients);
				setIsEnabled(true);
			}

		}).catch(error => {
			console.error(`HTTP error: ${error.name} => ${error.message}`);
			throw "fail request at: GET /projectStatus";
		});

		getProjectManagers().then((data:any)=>{
			const projectManagers: any[] = [];
			if (data) {
				data.map((item: any) => {
					projectManagers.push({label: item.name+' '+item.lastName, value: item});
				});
				setProjectManagers(projectManagers);
				setIsEnabled(true);
			}
		}).catch(error => {
			console.error(`HTTP error: ${error.name} => ${error.message}`);
			throw "fail request at: GET /projectStatus";
		});
	}, [props]);
	const getProps = () => {
		_retrieveData('updatedProjectId').then((value) => {
			if (loading && state.project.projectID !== projectID) {
				getProjectInformation(value);
			}

			setProjectId(value);
		})
		if (!loading && projectID && state.project) {
			return (DisplayAddProjectScreen())
		} else {
			return (
				<View style={{width: '100%', height: '100%', justifyContent: 'center'}}><ActivityIndicator size="large"
																										   color="#d81e05"/></View>)
		}
	}

	const getProjectInformation = (projectId: string) => {
		axios
			.get<any[]>(`${Environment.API_URL}/api/project/${projectId}`, {})
			.then((res: any) => {
				setLoading(false);
				res.data.projectID = projectID;
				setExpectedEndDate(new Date(res.data.endDate));
				setDate(new Date(res.data.startDate));
				setState({project: res.data});
				setLoading(false);
			}).catch((error: any) => {
			console.error(error);
		});
	}

	const getButtonStatus = (): boolean => {
		return (
			state.project.projectTitle === '' ||
			state.project.projectDescription === '' ||
			state.project.projectStatus === null
		);
	};



	const cancelAndGoBack = () => {
		navigation.goBack();
		setState(defaultState);
	}



	const updateProject = () => {
		axios
			.put(`${Environment.API_URL}/api/project/update/${state.project.projectID}`, state.project)
			.then((res: any) => {
				navigation.goBack();

				showToastWithGravity('Project Successfully Updated');
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	};

	const DisplayAddProjectScreen = (): any => {
			let returnedElements = (
				<View>
					<View style={{
						height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
						backgroundColor: '#00a3cc'

					}}>
						<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
							Update Project</Text>
					</View>
					<View style={styles.modalView}>
						<View style={{width:'100%',alignItems:'flex-start',marginBottom:15}}>
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
						<View style={{width: '100%'}}>
							<Text>Project Title</Text>
							<Input
								leftIcon={<Icon name="tag" size={20} color={'#000'}/>}
								inputContainerStyle={styles.InputContainerStyle}
								leftIconContainerStyle={styles.LeftIconContainerStyle}
								errorStyle={styles.ErrorStyle}
								onChangeText={(text: string) =>
									setState((prevState: any) => {
										let project = Object.assign({}, prevState.project);
										project.projectTitle = text;
										return {project};
									})
								}
								value={state.project.projectTitle}
								autoCompleteType={false}
							/>
						</View>

						<View style={{width: '100%'}}>
							<Text>Project Description</Text>
							<Input
								multiline={true}
								leftIcon={<IconM name="description" size={20} color={'#000'}/>}
								inputContainerStyle={styles.InputContainerStyle}
								leftIconContainerStyle={styles.LeftIconContainerStyle}
								errorStyle={styles.ErrorStyle}
								onChangeText={(text: string) =>
									setState((prevState: any) => {
										let project = Object.assign({}, prevState.project);
										project.projectDescription = text;
										return {project};
									})
								}
								value={state.project.projectDescription}
								autoCompleteType={false}
							/>
						</View>

						<View style={{width: '100%', marginBottom: 15}}>
							<Dropdown
								style={{width: '100%'}}
								label={'Project Status'}
								data={ProjectStatusData}
								onChangeText={(value: any) => setState((prevState: any) => {
									let project = Object.assign({}, prevState.project);
									project.projectStatus = value;
									return {project};
								})}
								value={state.project.projectStatus}
							/>
						</View>
						<View
							style={{
								width: '100%',
								marginBottom: 20,
							}}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
								}}>
								<Text>Start Date: {Moment(date).format('DD-MM-YYYY')} </Text>
								<Button title="Change" onPress={() => setOpen(true)}/>
							</View>
							<DatePicker
								modal
								mode={'date'}
								open={open}
								date={date}
								onConfirm={(startDate: any) => {
									setOpen(false);
									setDate(startDate);
								}}
								onCancel={() => {
									setOpen(false);
								}}
								onDateChange={(chosenDate: Date) =>
									setState((prevState: any) => {
										let project = Object.assign({}, prevState.project);
										project.startDate = chosenDate;
										return {project};
									})
								}

							/>
						</View>

						<View style={{width: '100%', marginBottom: 20}}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
								}}>
								<Text>
									Expected End Date: {Moment(expectedEndDate).format('DD-MM-YYYY')}
								</Text>
								<Button title="Change" onPress={() => setOpenEndDate(true)}/>
							</View>
							<DatePicker
								modal
								mode={'date'}
								open={openEndDate}
								date={expectedEndDate}
								onConfirm={(endDate: any) => {
									setOpenEndDate(false);
									setExpectedEndDate(endDate);
								}}
								onCancel={() => {
									setOpenEndDate(false);
								}}
								onDateChange={(chosenEndDate: Date) =>
									setState((prevState: any) => {
										let project = Object.assign({}, prevState.project);
										project.endDate = chosenEndDate;
										return {project};
									})
								}
							/>
						</View>

						<View style={{width: '100%', marginBottom: 15}}>
							<Dropdown
								style={{width: '100%'}}
								label={'Project Manager'}
								data={projectManagers}
								onChangeText={(value:any)=>	setState((prevState: any) => {
									let project = Object.assign({}, prevState.project);
									project.projectManager = value;
									return {project};
								})}
								value={state.project?.projectManager?.name || ''}

							/>
						</View>
						<View style={{width: '100%', marginBottom: 15}}>
							<Dropdown
								style={{width: '100%'}}
								label={'Client'}
								data={clients}
								onChangeText={(value:any)=>	setState((prevState: any) => {
									let project = Object.assign({}, prevState.project);
									project.client = value;
									return {project};
								})}
								value={state.project?.client?.name || ''}
							/>
						</View>
						<View style={styles.columnDisplay}>

							<TouchableOpacity
								disabled={getButtonStatus()}
								style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
								onPress={() => {
									updateProject();
								}}>
								<Text
									style={{
										textAlign: 'center',
										color: '#fff',
										fontWeight: '500',
									}}>
									Update Project Information
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.cancelWrapper}
								onPress={() => {
									cancelAndGoBack();
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
				</View>
			);

		return returnedElements;
	}

	return getProps();
};
export default UpdateProjectScreen;
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
		width:'100%'

	},
	cancelWrapper: {
		backgroundColor: '#c8003f',
		padding: 10,
		opacity: 1,
		width:'100%',
		marginTop:15
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
});
