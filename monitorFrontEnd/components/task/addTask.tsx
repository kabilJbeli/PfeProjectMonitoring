import * as React from 'react';
import {Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, showToastWithGravity} from "../../utils";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';

const AddTask = (props: any) => {
	const defaultTask = {
		task: {
			sprint: null,
			project: null,
			category: null,
			priority: null,
			taskStatus: 'ToDo',
			assignee: null,
			reporter: null,
			taskTitle: null,
			taskDuration: null,
			taskDescription: null,
			taskEstimation: null,
			isCreatedByClient: false,
			isClientTaskValidated:false,
			client: null
		}
	};
	const [userInfo, setUserInfo] = useState<any>(null);
	const [task, setTask] = useState<any>(defaultTask);
	const [projects, setProjects] = useState<any[]>([]);
	const [taskType, setTaskType] = useState<any[]>([]);

	const [sprints, setSprints] = useState<any[]>([]);
	const [members, setMembers] = useState<any[]>([]);
	const [priorities, setPriorities] = useState<any[]>([]);

	const navigation = useNavigation();
	const getPriorities = () => {
		// Update the document title using the browser API
		const priorityLocal: any[] = [];
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
				response.data.map((item: any) => {
					priorityLocal.push({label: item.priorityTitle, value: item})
				})
				setPriorities(priorityLocal);
			})
			.catch((err: any) => {
				console.error('api/priority/all',err);

			});
	};


	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				getTaskTypes();
				getMember(parsedInfo.email);
				setUserInfo(parsedInfo);
				if (parsedInfo.roles.includes('CLIENT')) {
					getClientProjects(parsedInfo);
				} else if (parsedInfo.roles.includes('MANAGER')) {
					getUserSpecificProjects(parsedInfo);
				}
			}
		});
		getPriorities();
	}, [props]);


	const createTask = () => {
		axios
			.post(`${Environment.API_URL}/api/task/add`, task.task)
			.then((res: any) => {
				showToastWithGravity('Task Successfully Created');
				setTask(defaultTask);
				if(userInfo && userInfo.roles && userInfo.roles.includes('CLIENT')){
					// @ts-ignore
					navigation.navigate('myPendingTasks');
				}else{
					// @ts-ignore
					navigation.navigate('Task');
				}

			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error('api/task/add',error);
		});
	}
	const cancelTask = () => {
		setTask(defaultTask);
		// @ts-ignore
		navigation.navigate('Task');
		showToastWithGravity('Task Creation Canceled');

	}
	const getUserSpecificProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [];
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/project/getProjectsByProjectManager?email=${userInfoParam.email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: {}
		})
			.then(response => {

				response.data.map((item: any) => {
					localProject.push({
						label: item.projectTitle, value: item
					})
				})
				setProjects(localProject);
			})
			.catch((err: any) => {
			});
	};


	const getClientProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/getProjectsByClient?email=${userInfoParam.email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localProject.push({
						label: item.projectTitle, value: item
					})
				})
				setProjects(localProject);
			})
			.catch((err: any) => {
			});
	};


	const getMember = (email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/member/getMemberByEmail?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				if (response.data.role ==='CLIENT') {
					setTask((prevState: any) => {
						let task = Object.assign({}, prevState.task);
						task.client = response.data;
						task.isCreatedByClient=true;
						task.isClientTaskValidated=false;
						return {task};
					});
				}
				if (response.data.role ==='MANAGER') {
					setTask((prevState: any) => {
						let task = Object.assign({}, prevState.task);
						task.reporter = response.data;
						return {task};
					});
				}
			})
			.catch((err: any) => {
			});
	}

	const getTaskTypes = () => {
		// Update the document title using the broconwser API
		const localTask: any = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/category/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {

				response.data.map((item: any) => {
					localTask.push({
						label: item.categoryTitle, value: item
					})
				})
				setTaskType(localTask);
			})
			.catch((err: any) => {
			});
	};

	const getSelectedProjectMembers = (projectId: number) => {
		const localMemberData: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/findProjectMembers?projectId=${projectId}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localMemberData.push({label: item.name + ' ' + item.lastName, value: item});
				})
				setMembers(localMemberData);
			})
			.catch((err: any) => {
			});

	}

	const getButtonStatus = (): boolean | undefined => {
		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			return task.task.project === null || task.task.assignee === null || task.task.priority === null ||
				task.task.taskDescription === null || task.task.taskTitle === null || task.task.taskEstimation === null ||
				task.task.project === '' || task.task.assignee === '' || task.task.priority === '' ||
				task.task.taskDescription === '' || task.task.taskTitle === '' || task.task.taskEstimation === '';
		} else if (userInfo && userInfo.roles && userInfo.roles.includes('CLIENT')) {
			return task.task.project === null || task.task.priority === null ||
				task.task.taskDescription === null || task.task.taskTitle === null ||
				task.task.project === '' || task.task.priority === '' ||
				task.task.taskDescription === '' || task.task.taskTitle === ''
		}
	}

	const getAssigneeDropdown = (): any => {
		let returnedDropDown: any = (<View></View>);
		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			returnedDropDown = (<View style={{width: '100%', marginBottom: 15}}>
				<Dropdown
					style={{width: '100%'}}
					label={'Assignee'}
					disabled={members.length === 0 ? true : false}
					data={members}
					onChangeText={(value: any) => setTask((prevState: any) => {
						let task = Object.assign({}, prevState.task);
						task.assignee = value;
						return {task};
					})}
					value={task.task?.assignee || null}
				/>
			</View>);

		}
		return returnedDropDown;
	}

	const getSprintsByProject = (projectID:number)=>{
		const localSprintData:any[]=[];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getProjectSprints?projectID=${projectID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localSprintData.push({label: item.sprintTitle, value: item});
				})
				setSprints(localSprintData);
			})
			.catch((err: any) => {
			});

	}

	const getSprintDropdown = (): any => {
		let returnedDropDown: any = (<View></View>);
		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			returnedDropDown = (<View style={{width: '100%', marginBottom: 15}}>
				<Dropdown
					style={{width: '100%'}}
					disabled={sprints.length === 0 ? true : false}
					label={'Sprint (optional)'}
					data={sprints}
					onChangeText={(value: any) => setTask((prevState: any) => {
						let task = Object.assign({}, prevState.task);
						task.sprint = value;
						return {task};
					})}
					value={task.task?.sprint || null}
				/>
			</View>);

		}
		return returnedDropDown;
	}
	const getEstimatedtTime = ():any=>{
		let returnedDropDown: any = (<View></View>);
		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			returnedDropDown = (<View style={{width: '100%'}}>
			<Text>Estimated Time in hours</Text>
			<Input
				leftIcon={<Ionicons name="time" size={20} color={'#000'}/>}
				inputContainerStyle={styles.InputContainerStyle}
				leftIconContainerStyle={styles.LeftIconContainerStyle}
				errorStyle={styles.ErrorStyle}
				onChangeText={(text: string) =>
					setTask((prevState: any) => {
						let task = Object.assign({}, prevState.task);
						task.taskEstimation = text;
						return {task};
					})
				}
				value={task.task?.taskEstimation}
				keyboardType="numeric"
				autoCompleteType={false}
			/>
		</View>);}
		return returnedDropDown;
	}
	return (
		<SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Create Task</Text>
			</View>
			<ScrollView scrollEnabled={true} style={{height: Dimensions.get('screen').height - 280, paddingBottom: 15}}>
				<View style={styles.containerWrapper}>

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Project'}
							data={projects}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.project = value;
								getSprintsByProject(value.projectID);
								getSelectedProjectMembers(value.projectID);
								return {task};
							})}
							value={task.task?.project || null}
						/>
					</View>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Issue Type'}
							data={taskType}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.category = value;
								return {task};
							})}
							value={task.task?.category || null}
						/>
					</View>
					<View style={{width: '100%'}}>
						<Text>Summary</Text>
						<Input
							leftIcon={<MaterialIcons name="title" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setTask((prevState: any) => {
									let task = Object.assign({}, prevState.task);
									task.taskTitle = text;
									return {task};
								})
							}
							value={task.task.taskTitle}
							autoCompleteType={false}
						/>
					</View>

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Priority'}
							data={priorities}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.priority = value;
								return {task};
							})}
							value={task.task?.priority || null}
						/>
					</View>

					<View style={{width: '100%'}}>
						<Text>Description</Text>
						<Input
							multiline={true}
							leftIcon={<MaterialIcons name="description" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setTask((prevState: any) => {
									let task = Object.assign({}, prevState.task);
									task.taskDescription = text;
									return {task};
								})
							}
							value={task.task.taskDescription}
							autoCompleteType={false}
						/>
					</View>

					{getAssigneeDropdown()}


					{getSprintDropdown()}

					{getEstimatedtTime()}

					<View style={{width: '100%'}}>
						<TouchableOpacity
							style={[styles.buttonCreate, {opacity: getButtonStatus() ? 0.5 : 1}]}

							disabled={getButtonStatus()}
							onPress={() => {
								createTask();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Create
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonCancel}
							onPress={() => {
								cancelTask();
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
export default AddTask;
const styles = StyleSheet.create({
	containerWrapper: {
		padding: 15,
		height: "100%"
	},
	title: {
		fontSize: 22,
	},
	buttonCreate: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#1f9683',
	},
	buttonCancel: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#c8003f',
		marginTop: 15
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
