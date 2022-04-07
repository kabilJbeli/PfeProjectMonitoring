import * as React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {showToastWithGravity} from "../../utils";
import {useNavigation} from "@react-navigation/native";


const AddProjectComponent = (props: any) => {
	const [date, setDate] = useState(new Date());
	const [isEnabled, setIsEnabled] = useState(false);
	const [clients, setClients] = useState<any[]>([]);
	const [projectManagers, setProjectManagers] = useState<any[]>([]);

	const [expectedEndDate, setExpectedEndDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [openEndDate, setOpenEndDate] = useState(false);
	let textInput: any = React.createRef();
	let descriptionInput: any = React.createRef();
	const navigation = useNavigation();

	const defaultState = {
		project: {
			projectTitle: '',
			projectDescription: '',
			projectStatus: 'Created',
			projectManager:null,
			client:null,
			startDate: new Date(),
			endDate: new Date(),
		},
	};

	const [state, setState] = useState<any>(defaultState);
	const getButtonStatus = (): boolean => {
		return (
			state.project.projectTitle === '' ||
			state.project.projectDescription === '' ||
			state.project.projectStatus === null
		);
	};
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
	useEffect(()=>{
		getProjectManagers().then((data:any)=>{
			const projectManagers: any[] = [];
			if (data) {
				data.map((item: any) => {
					projectManagers.push({label: item.name+' '+item.lastName, value: item});
				});
				setProjectManagers(projectManagers);
				setIsEnabled(true);
			}
		});

	},[props])

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
	}, []);

	const addProject = () => {
		axios
			.post(`${Environment.API_URL}/api/project/add`, state.project)
			.then((res: any) => {
				// @ts-ignore
				navigation.navigate('projects');

				showToastWithGravity('Project Successfully Added');
				setState(defaultState);
				setDate(new Date());
				setExpectedEndDate(new Date());
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	};




	const DisplayAddProjectScreen = (): any => {
		let returnedElements: any;
		if (isEnabled) {
			returnedElements = (
				<View>
					<View style={{
						height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
						backgroundColor: '#00a3cc'

					}}>
						<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
							Add Project</Text>
					</View>
					<View style={styles.modalView}>
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
								numberOfLines={2}
								style={{textAlignVertical: 'top'}}
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
									addProject();
								}}>
								<Text
									style={{
										textAlign: 'center',
										color: '#fff',
										fontWeight: '500',
									}}>
									Add New Project
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.cancelWrapper}
								onPress={() => {
									setState(defaultState);

								}}>
								<Text
									style={{
										textAlign: 'center',
										color: '#fff',
										fontWeight: '500',
									}}>
									Reset
								</Text>
							</TouchableOpacity>

						</View>
					</View>
				</View>
			);
		} else {
			returnedElements = (<View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
				<View style={{padding:15}}>
				<ActivityIndicator size="large" color="#d81e05"/>
				</View>
				<Text>Still Loading ...</Text></View>)
		}
		return returnedElements;
	}

	return DisplayAddProjectScreen()
};
export default AddProjectComponent;
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
